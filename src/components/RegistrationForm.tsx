import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SendIcon, MessageCircleIcon } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
interface RegistrationFormProps {
  onSubmit: () => void;
}

const NIVEL_OPCIONES = [
  {
    value: 'es_nuevo',
    label: 'Es nuevo para mí.',
    shortLabel: 'Nuevo',
  },
  { value: 'basico', label: 'Básico', shortLabel: 'Básico' },
  { value: 'avanzado', label: 'Avanzado', shortLabel: 'Avanzado' },
] as const;

const CIUDADES_COLOMBIA = [
  'Bogotá',
  'Medellín',
  'Cali',
  'Barranquilla',
  'Cartagena',
  'Bucaramanga',
  'Cúcuta',
  'Pereira',
  'Santa Marta',
  'Ibagué',
  'Manizales',
  'Villavicencio',
  'Pasto',
  'Montería',
  'Neiva',
  'Armenia',
  'Sincelejo',
  'Valledupar',
  'Popayán',
  'Tunja',
] as const;

type NivelValor = (typeof NIVEL_OPCIONES)[number]['value'];

interface RegFormState {
  nombre: string;
  correo: string;
  whatsapp: string;
  ciudad: string;
  profesion: string;
  nivelExperiencia: NivelValor | '';
}

interface FormErrors {
  nombre?: string;
  correo?: string;
  whatsapp?: string;
  ciudad?: string;
  profesion?: string;
  nivelExperiencia?: string;
}
export function RegistrationForm({ onSubmit }: RegistrationFormProps) {
  const googleScriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL as
  string | undefined;
  const [formData, setFormData] = useState<RegFormState>({
    nombre: '',
    correo: '',
    whatsapp: '',
    ciudad: '',
    profesion: '',
    nivelExperiencia: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const trackMetaLead = () => {
    const win = window as typeof window & {
      fbq?: (...args: unknown[]) => void;
    };

    if (typeof win.fbq === 'function') {
      win.fbq('track', 'Lead');
      // Fallback explícito por pixel ID para asegurar envío en cuentas con múltiples píxeles.
      win.fbq('trackSingle', '2028720024406086', 'Lead');
    }
  };

  const trackMetaCompleteRegistration = () => {
    const win = window as typeof window & {
      fbq?: (...args: unknown[]) => void;
    };

    if (typeof win.fbq === 'function') {
      win.fbq('track', 'CompleteRegistration');
      win.fbq('trackSingle', '2028720024406086', 'CompleteRegistration');
    }
  };
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'Ingresa tu nombre';
    }
    if (!formData.correo.trim()) {
      newErrors.correo = 'Ingresa tu correo electrónico';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = 'Ingresa un correo válido';
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = 'Ingresa tu número de WhatsApp';
    } else if (!/^[\d\s\-+()]{7,20}$/.test(formData.whatsapp)) {
      newErrors.whatsapp = 'Ingresa un número válido';
    }
    if (!formData.ciudad.trim()) {
      newErrors.ciudad = 'Ingresa tu ciudad';
    }
    if (!formData.profesion.trim()) {
      newErrors.profesion = 'Ingresa tu profesión o área de formación';
    }
    if (!formData.nivelExperiencia) {
      newErrors.nivelExperiencia = 'Selecciona una opción';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange =
    (field: keyof RegFormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        field === 'nivelExperiencia'
          ? (e.target.value as NivelValor)
          : e.target.value;
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }
    };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    trackMetaLead();
    if (!googleScriptUrl) {
      setSubmitError(
        'Falta configurar el formulario. Agrega VITE_GOOGLE_SCRIPT_URL en tu archivo .env.'
      );
      return;
    }
    setIsSubmitting(true);
    setSubmitError('');

    const nivelLabel =
      NIVEL_OPCIONES.find((o) => o.value === formData.nivelExperiencia)?.label ??
      '';

    // Mismos nombres que espera Google Apps Script (p.nombre, p.ciudad, etc.).
    // Orden documentado para alinear con columnas: createdAt, nombre, correo, whatsapp, profesion, ciudad, nivelExperiencia, source
    const payload = new URLSearchParams();
    payload.append('createdAt', new Date().toISOString());
    payload.append('nombre', formData.nombre.trim());
    payload.append('correo', formData.correo.trim().toLowerCase());
    payload.append('whatsapp', formData.whatsapp.trim());
    payload.append('profesion', formData.profesion.trim());
    payload.append('ciudad', formData.ciudad.trim());
    payload.append('nivelExperiencia', nivelLabel);
    payload.append('nivelCodigo', formData.nivelExperiencia);
    payload.append('source', 'landing-bodyscience-3d');

    const fetchInit: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: payload.toString(),
    };

    try {
      // Standard POST first. If the script has strict CORS, fallback to no-cors.
      try {
        const response = await fetch(googleScriptUrl, fetchInit);
        const responseText = await response.text();
        const looksLikeScriptError =
        responseText.includes('TypeError:') ||
        responseText.includes('Script function not found') ||
        responseText.includes('<title>Error</title>');

        if (!response.ok || looksLikeScriptError) {
          throw new Error('Google Script response error');
        }
      } catch (error) {
        // CORS/network failures throw in fetch; fallback for Apps Script endpoints.
        if (error instanceof TypeError) {
          await fetch(googleScriptUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: fetchInit.headers,
            body: payload.toString(),
          });
        } else {
          throw error;
        }
      }

      trackMetaCompleteRegistration();

      setFormData({
        nombre: '',
        correo: '',
        whatsapp: '',
        ciudad: '',
        profesion: '',
        nivelExperiencia: '',
      });
      setIsSubmitting(false);
      onSubmit();
    } catch {
      setIsSubmitting(false);
      setSubmitError(
        'No se pudo enviar tu registro. Intenta nuevamente en unos segundos.'
      );
    }
  };
  const inputBaseClass =
  'w-full px-4 py-3.5 rounded-xl bg-navy-lighter/80 border text-white placeholder-muted text-base font-medium transition-all duration-200 focus:ring-2 focus:ring-accent/50 focus:border-accent/60';
  return (
    <section
      id="registro"
      className="w-full bg-gradient-to-b from-navy via-navy-light to-navy py-20 md:py-28 px-6 relative overflow-hidden">
      
      <div
        className="pointer-events-none absolute inset-0 grid-pattern-premium opacity-[0.5] md:opacity-[0.6]"
        aria-hidden
      />

      <div className="relative z-10 max-w-lg mx-auto">
        <SectionHeading
          eyebrow="Registro"
          titleBefore="Reserva tu "
          titleHighlight="lugar"
          subtitle={
            <>
              Completa tus datos para asegurar tu cupo en{' '}
              <span className="text-white font-semibold">
                BodyScience <span className="text-accent">3D</span>
              </span>
              .
            </>
          }
          marginBottomClass="mb-10"
          subtitleClassName="mx-auto mt-5 max-w-xl text-base md:text-lg text-muted text-center leading-relaxed"
        />

        <motion.form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5"
          initial={{
            opacity: 0,
            y: 30
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            margin: '-60px'
          }}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1]
          }}>
          
          {/* Nombre */}
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-semibold text-text-light mb-2">
              
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              placeholder="Tu nombre completo"
              value={formData.nombre}
              onChange={handleChange('nombre')}
              className={`${inputBaseClass} ${errors.nombre ? 'border-red-400/70 ring-1 ring-red-400/30' : 'border-primary/30'}`}
              aria-invalid={!!errors.nombre}
              aria-describedby={errors.nombre ? 'nombre-error' : undefined} />
            
            {errors.nombre &&
            <p
              id="nombre-error"
              className="mt-1.5 text-sm text-red-400 font-medium"
              role="alert">
              
                {errors.nombre}
              </p>
            }
          </div>

          {/* Correo */}
          <div>
            <label
              htmlFor="correo"
              className="block text-sm font-semibold text-text-light mb-2">
              
              Correo electrónico
            </label>
            <input
              id="correo"
              type="email"
              placeholder="tu@correo.com"
              value={formData.correo}
              onChange={handleChange('correo')}
              className={`${inputBaseClass} ${errors.correo ? 'border-red-400/70 ring-1 ring-red-400/30' : 'border-primary/30'}`}
              aria-invalid={!!errors.correo}
              aria-describedby={errors.correo ? 'correo-error' : undefined} />
            
            {errors.correo &&
            <p
              id="correo-error"
              className="mt-1.5 text-sm text-red-400 font-medium"
              role="alert">
              
                {errors.correo}
              </p>
            }
          </div>

          {/* WhatsApp */}
          <div>
            <label
              htmlFor="whatsapp"
              className="block text-sm font-semibold text-text-light mb-2">
              
              Número de WhatsApp
            </label>
            <input
              id="whatsapp"
              type="tel"
              value={formData.whatsapp}
              onChange={handleChange('whatsapp')}
              className={`${inputBaseClass} ${errors.whatsapp ? 'border-red-400/70 ring-1 ring-red-400/30' : 'border-primary/30'}`}
              aria-invalid={!!errors.whatsapp}
              aria-describedby={errors.whatsapp ? 'whatsapp-error' : undefined} />
            
            {errors.whatsapp &&
            <p
              id="whatsapp-error"
              className="mt-1.5 text-sm text-red-400 font-medium"
              role="alert">
              
                {errors.whatsapp}
              </p>
            }
          </div>

          {/* Ciudad */}
          <div>
            <label
              htmlFor="ciudad"
              className="mb-2 block text-sm font-semibold text-text-light"
            >
              Ciudad
            </label>
            <div className="relative">
            <select
              id="ciudad"
              value={formData.ciudad}
              onChange={handleChange('ciudad')}
              className={`${inputBaseClass} appearance-none pr-11 ${errors.ciudad ? 'border-red-400/70 ring-1 ring-red-400/30' : 'border-primary/30'}`}
              aria-invalid={!!errors.ciudad}
              aria-describedby={errors.ciudad ? 'ciudad-error' : undefined}
            >
              <option value="" disabled>
                Selecciona tu ciudad
              </option>
              {CIUDADES_COLOMBIA.map((ciudad) => (
                <option key={ciudad} value={ciudad}>
                  {ciudad}
                </option>
              ))}
            </select>
            <span
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text-light/80"
              aria-hidden
            >
              ▼
            </span>
            </div>
            {errors.ciudad && (
              <p
                id="ciudad-error"
                className="mt-1.5 text-sm font-medium text-red-400"
                role="alert"
              >
                {errors.ciudad}
              </p>
            )}
          </div>

          {/* Profesión */}
          <div>
            <label
              htmlFor="profesion"
              className="block text-sm font-semibold text-text-light mb-2">
              
              Profesión o área de formación
            </label>
            <input
              id="profesion"
              type="text"
              placeholder="Ej: Nutrición, Fisioterapia, Entrenamiento..."
              value={formData.profesion}
              onChange={handleChange('profesion')}
              className={`${inputBaseClass} ${errors.profesion ? 'border-red-400/70 ring-1 ring-red-400/30' : 'border-primary/30'}`}
              aria-invalid={!!errors.profesion}
              aria-describedby={
              errors.profesion ? 'profesion-error' : undefined
              } />
            
            {errors.profesion &&
            <p
              id="profesion-error"
              className="mt-1.5 text-sm text-red-400 font-medium"
              role="alert">
              
                {errors.profesion}
              </p>
            }
          </div>

          {/* Nivel de experiencia — segmentos compactos */}
          <fieldset>
            <legend className="mb-2.5 block text-sm font-semibold tracking-tight text-text-light">
              Tu nivel de experiencia
            </legend>
            <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-1.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] ring-1 ring-white/[0.04]">
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                {NIVEL_OPCIONES.map((opt) => (
                  <label
                    key={opt.value}
                    title={opt.label}
                    className="group relative cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="nivelExperiencia"
                      value={opt.value}
                      checked={formData.nivelExperiencia === opt.value}
                      onChange={handleChange('nivelExperiencia')}
                      className="peer sr-only"
                    />
                    <span
                      className="flex min-h-[3.25rem] flex-col items-center justify-center rounded-xl border border-transparent bg-navy-lighter/70 px-1.5 py-2 text-center transition-all duration-200 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent/60 peer-checked:border-accent/55 peer-checked:bg-accent/[0.14] peer-checked:shadow-[0_0_24px_-6px_rgba(0,183,79,0.45)] peer-checked:ring-1 peer-checked:ring-accent/35 group-hover:border-white/12 group-hover:bg-navy-lighter/90 sm:min-h-[3.5rem] sm:px-2"
                    >
                      <span className="text-[13px] font-bold leading-tight text-white sm:text-sm">
                        {opt.shortLabel}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
            {errors.nivelExperiencia && (
              <p
                id="nivel-error"
                className="mt-2 text-sm font-medium text-red-400"
                role="alert"
              >
                {errors.nivelExperiencia}
              </p>
            )}
          </fieldset>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-accent via-[#14d064] to-accent-light py-4 text-lg font-extrabold tracking-[0.01em] text-[#041325] shadow-[0_16px_34px_-14px_rgba(0,183,79,0.65),0_10px_0_0_rgba(5,70,34,0.55),0_0_30px_rgba(0,183,79,0.35),inset_0_1px_0_0_rgba(255,255,255,0.35),inset_0_-2px_0_0_rgba(5,80,38,0.45)] ring-1 ring-white/30 transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:brightness-110 hover:shadow-[0_26px_52px_-16px_rgba(0,183,79,0.72),0_14px_0_0_rgba(5,70,34,0.48),0_0_46px_rgba(0,183,79,0.42),inset_0_1px_0_0_rgba(255,255,255,0.45)] active:translate-y-0.5 active:scale-[0.985] active:shadow-[0_10px_22px_-10px_rgba(0,183,79,0.58),0_4px_0_0_rgba(5,70,34,0.5),0_0_24px_rgba(0,183,79,0.3),inset_0_2px_0_0_rgba(255,255,255,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:scale-100"
            aria-label="Registrarme gratis en BodyScience 3D">
            
            {isSubmitting ?
            <>
                <svg
                className="animate-spin w-5 h-5"
                viewBox="0 0 24 24"
                fill="none">
                
                  <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4" />
                
                  <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                
                </svg>
                <span>Registrando...</span>
              </> :

            <>
                <SendIcon className="w-5 h-5" />
                <span>Registrarme gratis</span>
              </>
            }
          </button>

          {submitError &&
          <p className="text-sm text-red-400 font-medium" role="alert">
              {submitError}
            </p>
          }
        </motion.form>

        {/* WhatsApp info note */}
        <motion.div
          className="mt-8 flex items-start gap-3 p-4 rounded-xl bg-navy-lighter/50 border border-primary/15"
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true,
            margin: '-40px'
          }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1]
          }}>
          
          <MessageCircleIcon className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted leading-relaxed">
            Tu registro se completa en dos pasos: primero llenas el formulario y
            luego te unes al grupo oficial de WhatsApp del evento.
          </p>
        </motion.div>
      </div>
    </section>);

}