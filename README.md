# CEA Micaela Bastidas - PWA de Preinscripción Accesible

Aplicación web progresiva (PWA) de preinscripción rápida, accesible e intuitiva para el **Centro de Educación Alternativa (CEA) "Micaela Bastidas"** en Poroma - Chuquisaca, Bolivia.

Diseñada pensando en la inclusión digital para jóvenes y adultos de comunidades rurales, garantizando navegación paso a paso con botones grandes, textos sencillos, apoyo auditivo y funcionamiento sin conexión a internet.

---

## 🚀 Características principales

1. **Inclusión Digital & Accesibilidad:**
   - Botones y tarjetas táctiles de gran tamaño (min 60px de altura, texto >= 18px).
   - Experiencia de guiado "paso a paso" con facilitador visual del CEA.
   - Ilustraciones vectoriales claras sin necesidad de leer párrafos largos.
   - Asistente de voz accesible (**ESCUCHAR** / **SILENCIAR**).
   - Solo 3 datos escritos por teclado: nombre, celular y comunidad.

2. **Cuenta Regresiva Real:**
   - Fecha límite: **10 de agosto de 2026**.
   - Muestra días restantes en números normales.
   - Enlace directo de ayuda a WhatsApp (`+591 67641695`).

3. **Modo Offline & PWA:**
   - Instalable en el teléfono como PWA ("Guardar esta aplicación en mi celular").
   - Service Worker para caché de interfaz, ilustraciones e imágenes.
   - Cola de envíos pendientes en almacenamiento local cuando no hay señal de internet.
   - Sincronización automática con Supabase al recuperar la conexión.

4. **Conexión con Supabase:**
   - Integración con la tabla `preinscripciones`.
   - Generación de código único cliente `CEA-XXXXXX`.
   - Descarga de comprobante de preinscripción en imagen PNG.

---

## 🛠️ Instalación y Desarrollo Local

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env

# Editar .env con las credenciales de Supabase:
# VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
# VITE_SUPABASE_ANON_KEY=tu-clave-anonima-publica

# 3. Ejecutar en modo desarrollo
npm run dev
```

La aplicación se abrirá en `http://localhost:3000`.

---

## 🧪 Pruebas Unitarias

Para ejecutar las pruebas del contador de tiempo, normalización de teléfono celular y generador de códigos:

```bash
npx tsx src/utils/utils.test.ts
```

---

## 📦 Compilación para Producción

Para generar los archivos estáticos optimizados y verificar la compilación:

```bash
npm run build
```

Los archivos finales se generarán en el directorio `dist/`.

---

## 🔐 Configuración de Supabase

Estructura de la tabla `preinscripciones`:

| Columna | Tipo | Descripción |
| :--- | :--- | :--- |
| `id` | uuid / bigint | Generado por Supabase |
| `creado_en` | timestamp | Fecha creada por Supabase |
| `nombre_completo` | text | Nombre del estudiante |
| `numero_celular` | text | Teléfono celular de contacto |
| `comunidad` | text | Comunidad o localidad donde vive |
| `carrera_elegida` | text | Carrera y centro seleccionado |
| `tiene_15_o_mas` | boolean | Confirmación de edad |
| `tiene_carnet` | boolean | Posee carnet de identidad |
| `codigo_preinscripcion` | text | Código único `CEA-XXXXXX` |

*Nota de seguridad:* La política RLS en Supabase solo permite `INSERT` con el rol público `anon`.
Actualización del escudo
