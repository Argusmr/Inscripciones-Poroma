import React, { useState, useEffect, useRef } from 'react';
import { StepNumber, RegistrationDraft, ProgramId, AudioKey } from '../types';
import { PROGRAMS } from '../config';
import { GuideAvatar } from './GuideAvatar';
import { ProgressIndicator } from './ProgressIndicator';
import { VisualChoiceCard } from './VisualChoiceCard';
import { AudioButton } from './AudioButton';
import { ComputerIcon, CookingIcon, Age15Icon, IDCardIcon, PersonNameIcon, PhoneIcon, CommunityIcon } from './SVGIllustrations';
import { normalizeBolivianPhone, isValidBolivianPhone, formatPhoneDisplay } from '../utils/phone';
import { generateRegistrationCode } from '../utils/codeGenerator';
import { saveDraftProgress, getDraftProgress, clearDraftProgress, savePendingSubmission } from '../utils/indexedDB';
import { submitRegistration } from '../lib/supabase';
import { SuccessReceipt } from './SuccessReceipt';
import { WhatsAppHelp } from './WhatsAppHelp';

interface EnrollmentWizardProps {
  initialProgramId?: ProgramId;
  onExitWizard: () => void;
}

export const EnrollmentWizard: React.FC<EnrollmentWizardProps> = ({
  initialProgramId,
  onExitWizard,
}) => {
  const [step, setStep] = useState<StepNumber>(initialProgramId ? 1 : 0);
  const [draft, setDraft] = useState<RegistrationDraft>(() => {
    const saved = getDraftProgress();
    const defaultProgram = PROGRAMS.find(p => p.id === initialProgramId) || PROGRAMS[0];
    return {
      carreraElegida: saved.carreraElegida || defaultProgram.fullDatabaseName,
      carreraId: saved.carreraId || (initialProgramId || 'computacion'),
      tiene15OMas: saved.tiene15OMas !== undefined ? saved.tiene15OMas : true,
      tieneCarnet: saved.tieneCarnet !== undefined ? saved.tieneCarnet : true,
      nombreCompleto: saved.nombreCompleto || '',
      numeroCelular: saved.numeroCelular || '',
      comunidad: saved.comunidad || '',
      codigoPreinscripcion: saved.codigoPreinscripcion || generateRegistrationCode(),
      creadoEn: saved.creadoEn || new Date().toISOString(),
      syncState: 'pending',
    };
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResultStatus, setSubmitResultStatus] = useState<'sent' | 'pending' | null>(null);

  const titleRef = useRef<HTMLHeadingElement | null>(null);

  // Auto-save draft on changes
  useEffect(() => {
    saveDraftProgress(draft);
  }, [draft]);

  // Focus management accessibility when step changes
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus();
      titleRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setValidationError(null);
  }, [step]);

  const updateDraft = (fields: Partial<RegistrationDraft>) => {
    setDraft(prev => ({ ...prev, ...fields }));
  };

  const handleNextStep = () => {
    setValidationError(null);

    if (step === 4) { // Name step
      if (!draft.nombreCompleto.trim() || draft.nombreCompleto.trim().length < 2) {
        setValidationError('Por favor, escribe tu nombre y apellido.');
        return;
      }
    }

    if (step === 5) { // Phone step
      const normalized = normalizeBolivianPhone(draft.numeroCelular);
      if (!isValidBolivianPhone(normalized)) {
        setValidationError('Revisa el número. Debe tener 8 números.');
        return;
      }
      updateDraft({ numeroCelular: normalized });
    }

    if (step === 6) { // Community step
      if (!draft.comunidad.trim() || draft.comunidad.trim().length < 2) {
        setValidationError('Por favor, escribe el nombre de tu comunidad o barrio.');
        return;
      }
    }

    setStep(prev => (prev < 8 ? (prev + 1) as StepNumber : prev));
  };

  const handlePrevStep = () => {
    setValidationError(null);
    if (step === 1) {
      onExitWizard();
    } else {
      setStep(prev => (prev > 0 ? (prev - 1) as StepNumber : prev));
    }
  };

  const handleSubmitFinal = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setValidationError(null);

    const finalDraft = {
      ...draft,
      codigoPreinscripcion: draft.codigoPreinscripcion || generateRegistrationCode(),
    };

    const res = await submitRegistration(finalDraft);

    if (res.success) {
      setSubmitResultStatus('sent');
      clearDraftProgress();
      setIsSubmitting(false);
      setStep(8); // Go to final receipt
    } else {
      if (!navigator.onLine) {
        savePendingSubmission(finalDraft);
        setSubmitResultStatus('pending');
        clearDraftProgress();
        setIsSubmitting(false);
        setStep(8);
      } else {
        setValidationError('No pudimos guardar tu preinscripción. Intenta nuevamente');
        setIsSubmitting(false);
      }
    }
  };

  // Audio key helper for current step
  const getAudioKeyForStep = (): AudioKey => {
    switch (step) {
      case 0: return 'bienvenida';
      case 1: return 'elegir-carrera';
      case 2: return 'edad';
      case 3: return 'carnet';
      case 4:
      case 5:
      case 6: return 'datos';
      default: return 'final';
    }
  };

  // Step 0: Welcome Screen
  if (step === 0) {
    return (
      <div className="w-full min-h-screen bg-[#FFF8E7] p-4 pb-16 flex flex-col justify-between max-w-[430px] mx-auto space-y-4 select-none">
        <div className="space-y-4 text-center my-auto">
          <GuideAvatar message="Hola. No te preocupes, yo te ayudo paso a paso." />

          <div className="bg-white p-5 rounded-2xl border-3 border-[#198C4A] shadow-md space-y-3">
            <h1 ref={titleRef} tabIndex={-1} className="text-2xl sm:text-3xl font-black text-[#123D2C] uppercase">
              Preinscripción CEA Micaela Bastidas
            </h1>
            <p className="text-lg text-[#198C4A] font-bold">
              Te haremos unas preguntas muy sencillas para guardar tu cupo.
            </p>
            <AudioButton audioKey="bienvenida" className="mx-auto" />
          </div>

          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full btn-large bg-[#FF7A00] text-white rounded-2xl font-black text-2xl border-2 border-white hover:bg-[#E66E00] active:scale-98 transition-all shadow-lg uppercase cursor-pointer min-h-[58px]"
          >
            EMPEZAR
          </button>
        </div>

        <WhatsAppHelp />
      </div>
    );
  }

  // Step 8: Final Receipt Screen
  if (step === 8) {
    return (
      <SuccessReceipt
        draft={draft}
        isOnlineSaved={submitResultStatus === 'sent'}
        onReset={onExitWizard}
      />
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#FFF8E7] flex flex-col justify-between max-w-[430px] mx-auto select-none pb-16">
      {/* Top Step Progress Bar */}
      <ProgressIndicator
        currentStep={step}
        totalSteps={6}
        onBack={handlePrevStep}
        showBack={step > 0}
      />

      {/* Main Wizard Content Area */}
      <main className="flex-1 w-full mx-auto p-4 space-y-4 flex flex-col justify-between">
        <div className="space-y-4">
          {/* Guide Facilitator Speech */}
          <div className="flex items-center justify-between gap-2">
            <GuideAvatar
              className="flex-1"
              message={
                step === 1 ? 'Elige lo que quieres aprender.' :
                step === 2 ? '¿Tienes quince años o más?' :
                step === 3 ? '¿Tienes carnet de identidad?' :
                step === 4 ? 'Escribe tu nombre completo.' :
                step === 5 ? 'Escribe tu número de celular.' :
                step === 6 ? 'Escribe la comunidad en que vives.' :
                'Revisa si todos tus datos están bien antes de enviar.'
              }
            />
            <AudioButton audioKey={getAudioKeyForStep()} />
          </div>

          {/* Validation Banner if any */}
          {validationError && (
            <div className="bg-[#FFD43B] text-[#C62828] p-3 rounded-xl border-2 border-[#C62828] font-extrabold text-base text-center shadow-md animate-bounce">
              ⚠️ {validationError}
            </div>
          )}

          {/* STEP 1: CAREER */}
          {step === 1 && (
            <div className="space-y-3">
              <h2 ref={titleRef} tabIndex={-1} className="text-2xl font-black text-[#123D2C] text-center uppercase">
                ¿Qué quieres aprender?
              </h2>

              <div className="flex flex-col gap-3">
                {PROGRAMS.map((prog, idx) => {
                  const isSelected = draft.carreraElegida === prog.fullDatabaseName;
                  return (
                    <VisualChoiceCard
                      key={prog.id}
                      id={prog.id}
                      isSelected={isSelected}
                      onSelect={() => {
                        updateDraft({
                          carreraElegida: prog.fullDatabaseName,
                          carreraId: prog.id,
                        });
                      }}
                      title={prog.shortTitle}
                      subtitle={prog.officialName}
                      location={prog.location}
                      showPointerHand={idx === 0}
                      illustration={
                        prog.id === 'computacion' ? (
                          <ComputerIcon size={90} />
                        ) : (
                          <CookingIcon size={90} />
                        )
                      }
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: AGE */}
          {step === 2 && (
            <div className="space-y-4 text-center">
              <h2 ref={titleRef} tabIndex={-1} className="text-2xl font-black text-[#123D2C] uppercase">
                ¿Tienes 15 años o más?
              </h2>

              <div className="flex justify-center my-1">
                <Age15Icon size={110} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => updateDraft({ tiene15OMas: true })}
                  className={`btn-large rounded-2xl font-black text-2xl border-3 transition-all cursor-pointer shadow-md min-h-[58px] ${
                    draft.tiene15OMas === true
                      ? 'bg-[#FF7A00] text-white border-white ring-2 ring-[#FF7A00]/40 scale-[1.02]'
                      : 'bg-white text-[#123D2C] border-[#198C4A]/40 hover:border-[#198C4A]'
                  }`}
                >
                  SÍ
                </button>

                <button
                  type="button"
                  onClick={() => updateDraft({ tiene15OMas: false })}
                  className={`btn-large rounded-2xl font-black text-2xl border-3 transition-all cursor-pointer shadow-md min-h-[58px] ${
                    draft.tiene15OMas === false
                      ? 'bg-[#FF7A00] text-white border-white ring-2 ring-[#FF7A00]/40 scale-[1.02]'
                      : 'bg-white text-[#123D2C] border-[#198C4A]/40 hover:border-[#198C4A]'
                  }`}
                >
                  NO
                </button>
              </div>

              {draft.tiene15OMas === false && (
                <div className="bg-[#FFD43B]/90 text-[#123D2C] p-3 rounded-xl border border-[#198C4A] font-extrabold text-base text-center shadow-sm">
                  💚 Puedes continuar. El CEA revisará tu caso y te orientará.
                </div>
              )}
            </div>
          )}

          {/* STEP 3: CARNET */}
          {step === 3 && (
            <div className="space-y-4 text-center">
              <h2 ref={titleRef} tabIndex={-1} className="text-2xl font-black text-[#123D2C] uppercase">
                ¿Tienes carnet de identidad?
              </h2>

              <div className="flex justify-center my-1">
                <IDCardIcon size={110} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => updateDraft({ tieneCarnet: true })}
                  className={`btn-large rounded-2xl font-black text-2xl border-3 transition-all cursor-pointer shadow-md min-h-[58px] ${
                    draft.tieneCarnet === true
                      ? 'bg-[#FF7A00] text-white border-white ring-2 ring-[#FF7A00]/40 scale-[1.02]'
                      : 'bg-white text-[#123D2C] border-[#198C4A]/40 hover:border-[#198C4A]'
                  }`}
                >
                  SÍ
                </button>

                <button
                  type="button"
                  onClick={() => updateDraft({ tieneCarnet: false })}
                  className={`btn-large rounded-2xl font-black text-2xl border-3 transition-all cursor-pointer shadow-md min-h-[58px] ${
                    draft.tieneCarnet === false
                      ? 'bg-[#FF7A00] text-white border-white ring-2 ring-[#FF7A00]/40 scale-[1.02]'
                      : 'bg-white text-[#123D2C] border-[#198C4A]/40 hover:border-[#198C4A]'
                  }`}
                >
                  NO
                </button>
              </div>

              {draft.tieneCarnet === false && (
                <div className="bg-[#FFD43B]/90 text-[#123D2C] p-3 rounded-xl border border-[#198C4A] font-extrabold text-base text-center shadow-sm">
                  💚 Puedes continuar. Te explicaremos qué hacer.
                </div>
              )}
            </div>
          )}

          {/* STEP 4: NAME */}
          {step === 4 && (
            <div className="space-y-3">
              <h2 ref={titleRef} tabIndex={-1} className="text-2xl font-black text-[#123D2C] text-center uppercase">
                ¿Cómo te llamas?
              </h2>

              <div className="flex justify-center my-1">
                <PersonNameIcon size={100} />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="nombreInput" className="block text-base font-bold text-[#198C4A]">
                  Escribe tu nombre y apellido:
                </label>
                <input
                  id="nombreInput"
                  type="text"
                  value={draft.nombreCompleto}
                  onChange={(e) => updateDraft({ nombreCompleto: e.target.value })}
                  placeholder="Ejemplo: María Quispe"
                  className="w-full bg-white text-[#123D2C] font-extrabold text-xl p-3.5 rounded-2xl border-3 border-[#198C4A] focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/30 outline-none shadow-inner"
                  autoComplete="name"
                />
              </div>
            </div>
          )}

          {/* STEP 5: PHONE */}
          {step === 5 && (
            <div className="space-y-3">
              <h2 ref={titleRef} tabIndex={-1} className="text-2xl font-black text-[#123D2C] text-center uppercase">
                ¿Cuál es tu celular?
              </h2>

              <div className="flex justify-center my-1">
                <PhoneIcon size={100} />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="celularInput" className="block text-base font-bold text-[#198C4A]">
                  Escribe tu celular (8 números):
                </label>
                <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border-3 border-[#198C4A] focus-within:border-[#FF7A00] focus-within:ring-2 focus-within:ring-[#FF7A00]/30 shadow-inner">
                  <span className="bg-[#198C4A] text-white font-black text-lg py-2 px-3 rounded-xl flex-shrink-0 select-none">
                    +591
                  </span>
                  <input
                    id="celularInput"
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={draft.numeroCelular}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateDraft({ numeroCelular: val });
                    }}
                    placeholder="71234567"
                    className="w-full bg-transparent text-[#123D2C] font-extrabold text-xl outline-none"
                    autoComplete="tel-national"
                  />
                </div>
                {draft.numeroCelular && (
                  <p className="text-sm font-bold text-[#198C4A] text-right">
                    Vista previa: +591 {formatPhoneDisplay(draft.numeroCelular)}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* STEP 6: COMMUNITY */}
          {step === 6 && (
            <div className="space-y-3">
              <h2 ref={titleRef} tabIndex={-1} className="text-2xl font-black text-[#123D2C] text-center uppercase">
                ¿En qué comunidad vives?
              </h2>

              <div className="flex justify-center my-1">
                <CommunityIcon size={100} />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="comunidadInput" className="block text-base font-bold text-[#198C4A]">
                  Escribe tu comunidad, pueblo o barrio:
                </label>
                <input
                  id="comunidadInput"
                  type="text"
                  value={draft.comunidad}
                  onChange={(e) => updateDraft({ comunidad: e.target.value })}
                  placeholder="Ejemplo: Poroma"
                  className="w-full bg-white text-[#123D2C] font-extrabold text-xl p-3.5 rounded-2xl border-3 border-[#198C4A] focus:border-[#FF7A00] focus:ring-2 focus:ring-[#FF7A00]/30 outline-none shadow-inner"
                />
              </div>
            </div>
          )}

          {/* STEP 7: CONFIRMATION SUMMARY */}
          {step === 7 && (
            <div className="space-y-4">
              <h2 ref={titleRef} tabIndex={-1} className="text-2xl font-black text-[#123D2C] text-center uppercase">
                Revisa tus datos
              </h2>

              <div className="bg-white p-4 rounded-2xl border-3 border-[#198C4A] shadow-md space-y-3">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#198C4A]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🎓</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#198C4A] uppercase">Carrera</p>
                    <p className="text-base font-black text-[#123D2C]">{draft.carreraElegida}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-b border-gray-100 pb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#198C4A]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">👤</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#198C4A] uppercase">Nombre</p>
                    <p className="text-base font-black text-[#123D2C]">{draft.nombreCompleto}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-b border-gray-100 pb-2">
                  <div className="w-10 h-10 rounded-xl bg-[#198C4A]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">📱</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#198C4A] uppercase">Celular</p>
                    <p className="text-base font-black text-[#123D2C]">+591 {formatPhoneDisplay(draft.numeroCelular)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#198C4A]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🏡</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#198C4A] uppercase">Comunidad</p>
                    <p className="text-base font-black text-[#123D2C]">{draft.comunidad}</p>
                  </div>
                </div>
              </div>

              {/* Data usage note */}
              <div className="bg-[#FFF8E7] p-2.5 rounded-xl border border-[#198C4A]/40 text-center font-bold text-xs sm:text-sm text-[#123D2C]">
                🔒 Usaremos tus datos solo para tu inscripción.
              </div>

              {/* Confirmation Actions */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleSubmitFinal}
                  disabled={isSubmitting}
                  className="w-full btn-large bg-[#FF7A00] text-white rounded-2xl font-black text-xl border-2 border-white hover:bg-[#E66E00] active:scale-98 transition-all shadow-md cursor-pointer uppercase flex items-center justify-center gap-2 min-h-[56px]"
                >
                  {isSubmitting ? (
                    <span>ENVIANDO...</span>
                  ) : (
                    <span>ENVIAR MI PREINSCRIPCIÓN</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full btn-large bg-white text-[#123D2C] border-2 border-[#198C4A] hover:bg-gray-100 rounded-2xl font-extrabold text-base cursor-pointer min-h-[48px]"
                >
                  CAMBIAR MIS DATOS
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Step Navigation Button (CONTINUAR) */}
        {step >= 1 && step <= 6 && (
          <div className="pt-2">
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full btn-large bg-[#FF7A00] text-white rounded-2xl font-black text-2xl border-2 border-white hover:bg-[#E66E00] active:scale-98 transition-all shadow-lg uppercase cursor-pointer min-h-[58px]"
            >
              CONTINUAR
            </button>
          </div>
        )}
      </main>

      <WhatsAppHelp carreraContext={draft.carreraElegida} />
    </div>
  );
};

