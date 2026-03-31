import React from 'react';
import { motion } from 'framer-motion';
import {
  CalendarDays,
  Clock,
  Monitor,
  BadgePercent,
  ShieldCheck,
} from 'lucide-react';
import { SectionHeading } from './SectionHeading';

const iconClass = 'h-6 w-6 sm:h-7 sm:w-7';
const iconStroke = 2;

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  index: number;
  className?: string;
  emphasize?: boolean;
}

function InfoItem({
  icon,
  label,
  value,
  index,
  className = '',
  emphasize = false,
}: InfoItemProps) {
  return (
    <motion.div
      className={`group relative flex min-h-[140px] flex-col items-center justify-center overflow-hidden rounded-2xl px-4 py-5 text-center backdrop-blur-xl transition-[box-shadow,transform] duration-300 sm:min-h-[152px] sm:rounded-3xl sm:px-5 sm:py-6 ${
        emphasize
          ? 'border border-accent/40 bg-white/[0.06] shadow-[0_0_0_1px_rgba(0,183,79,0.12),0_20px_50px_-18px_rgba(0,183,79,0.2),0_16px_40px_-20px_rgba(0,0,0,0.5)]'
          : 'border border-white/[0.08] bg-white/[0.04] shadow-[0_16px_48px_-20px_rgba(0,0,0,0.55)]'
      } ${className}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        delay: index * 0.09,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {emphasize ? (
        <>
          <div
            className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-100 shadow-[0_0_20px_rgba(0,183,79,0.55)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/20 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden
          />
        </>
      ) : (
        <div
          className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          aria-hidden
        />
      )}

      <div
        className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-primary/15 blur-3xl opacity-50"
        aria-hidden
      />

      <div
        className={`relative mb-3 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:scale-105 sm:mb-3.5 sm:h-14 sm:w-14 ${
          emphasize
            ? 'bg-gradient-to-br from-accent/35 to-accent/10 shadow-[0_0_28px_-4px_rgba(0,183,79,0.65),inset_0_1px_0_0_rgba(255,255,255,0.15)] ring-1 ring-accent/40'
            : 'bg-white/[0.08] shadow-[0_8px_24px_-8px_rgba(0,183,79,0.25),inset_0_1px_0_0_rgba(255,255,255,0.1)] ring-1 ring-white/15'
        }`}
      >
        <div
          className={
            emphasize
              ? 'text-white drop-shadow-[0_0_12px_rgba(0,183,79,0.8)]'
              : 'text-accent drop-shadow-[0_0_8px_rgba(0,183,79,0.35)]'
          }
        >
          {icon}
        </div>
      </div>

      <span className="mb-1.5 block font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:text-[11px]">
        {label}
      </span>
      <div className="flex max-w-[13rem] flex-col items-center gap-1.5 text-center font-sans">
        {value}
      </div>
    </motion.div>
  );
}

export function EventInfo() {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-navy-light)] px-6 py-20 font-sans md:py-28">
      {/* Imagen de fondo alusiva (misma línea visual que el sitio) */}
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.14]"
        style={{ backgroundImage: "url('/card-composicion.svg')" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--color-navy-light)] via-[var(--color-navy-light)]/88 to-[var(--color-navy-light)]"
        aria-hidden
      />

      {/* Glow esmeralda suave */}
      <div
        className="pointer-events-none absolute left-1/2 top-[12%] h-[min(45vh,380px)] w-[min(92vw,640px)] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,183,79,0.16)_0%,transparent_68%)] blur-[90px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 translate-x-1/4 translate-y-1/4 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,183,79,0.08)_0%,transparent_55%)] blur-[70px]"
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.07]" aria-hidden />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Logística"
          titleBefore="Información del "
          titleHighlight="evento"
          subtitle="Fecha, formato y acceso en un vistazo — todo lo que necesitas para organizarte y compartirlo con tu equipo."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-5">
          <InfoItem
            icon={<CalendarDays className={iconClass} strokeWidth={iconStroke} />}
            label="Fecha"
            emphasize
            index={0}
            value={
              <>
                <span className="bg-gradient-to-r from-white via-slate-100 to-white/90 bg-clip-text text-base font-extrabold leading-snug text-transparent sm:text-lg">
                  8, 9 y 10 de abril
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  2026
                </span>
              </>
            }
          />

          <InfoItem
            icon={<Clock className={iconClass} strokeWidth={iconStroke} />}
            label="Hora"
            emphasize
            index={1}
            value={
              <>
                <span className="text-base font-extrabold leading-tight text-white sm:text-lg">
                  8:00 p. m.
                </span>
                <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent">
                  Hora Colombia
                </span>
              </>
            }
          />

          <InfoItem
            icon={<Monitor className={iconClass} strokeWidth={iconStroke} />}
            label="Modalidad"
            value={
              <span className="text-[15px] font-bold text-white sm:text-base md:text-[17px]">
                Online
              </span>
            }
            index={2}
          />

          <InfoItem
            icon={<BadgePercent className={iconClass} strokeWidth={iconStroke} />}
            label="Costo"
            value={
              <span className="text-[15px] font-bold text-white sm:text-base md:text-[17px]">
                Gratuito
              </span>
            }
            index={3}
          />

          <InfoItem
            icon={<ShieldCheck className={iconClass} strokeWidth={iconStroke} />}
            label="Acceso"
            value={
              <span className="text-[15px] font-bold text-white sm:text-base md:text-[17px]">
                Con registro
              </span>
            }
            index={4}
          />
        </div>
      </div>
    </section>
  );
}
