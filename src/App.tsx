import React, { useState } from 'react';
import { HomePage } from './components/HomePage';
import { ProgramsPage } from './components/ProgramsPage';
import { EnrollmentWizard } from './components/EnrollmentWizard';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import { OfflineStatus } from './components/OfflineStatus';
import { BottomNav } from './components/BottomNav';
import { ProgramId } from './types';

type ViewMode = 'home' | 'programs' | 'wizard';

export default function App() {
  const [view, setView] = useState<ViewMode>('home');
  const [selectedProgramForWizard, setSelectedProgramForWizard] = useState<ProgramId | undefined>(undefined);

  const handleStartEnrollment = (programId?: ProgramId) => {
    setSelectedProgramForWizard(programId);
    setView('wizard');
  };

  const handleViewPrograms = () => {
    setView('programs');
  };

  const handleBackToHome = () => {
    setView('home');
    setSelectedProgramForWizard(undefined);
  };

  return (
    <div className="min-h-screen bg-[#0F3324] sm:py-6 flex justify-center items-center font-sans antialiased selection:bg-[#FF7A00] selection:text-white">
      {/* Phone container wrapper: full width on mobile up to 430px, centered with mobile frame appearance on PC */}
      <div className="w-full max-w-[430px] min-h-screen sm:min-h-[820px] sm:rounded-[36px] bg-[#FFF8E7] text-[#123D2C] flex flex-col relative overflow-x-hidden shadow-2xl border-0 sm:border-4 sm:border-[#198C4A]/30">
        
        {/* PWA Install Banner */}
        <PWAInstallPrompt />

        {/* Offline Connection Status Bar */}
        <OfflineStatus />

        {/* Main View Router */}
        <div className="flex-1 flex flex-col w-full">
          {view === 'home' && (
            <HomePage
              onStartEnrollment={() => handleStartEnrollment()}
              onViewPrograms={handleViewPrograms}
            />
          )}

          {view === 'programs' && (
            <ProgramsPage
              onSelectProgramToEnroll={(progId) => handleStartEnrollment(progId)}
              onBackToHome={handleBackToHome}
            />
          )}

          {view === 'wizard' && (
            <EnrollmentWizard
              initialProgramId={selectedProgramForWizard}
              onExitWizard={handleBackToHome}
            />
          )}
        </div>

        {/* Fixed Bottom Navigation Bar */}
        <BottomNav
          currentView={view}
          onNavigateHome={handleBackToHome}
          onNavigateEnrollment={() => handleStartEnrollment()}
        />
      </div>
    </div>
  );
}

