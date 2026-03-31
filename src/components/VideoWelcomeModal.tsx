import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Volume2, VolumeX } from 'lucide-react';

interface VideoWelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPrimaryAction: () => void;
}

export function VideoWelcomeModal({
  isOpen,
  onClose,
  onPrimaryAction,
}: VideoWelcomeModalProps) {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
            aria-label="Cerrar video de bienvenida"
          />

          <motion.div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#071325]/95 shadow-[0_40px_120px_-24px_rgba(0,0,0,0.8)] sm:rounded-3xl"
            initial={{ y: 28, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent sm:text-xs">
              Bienvenido
            </p>
            <h3 className="text-sm font-bold text-white sm:text-base">
              Conoce BodyScience 3D en 60 segundos
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-gradient-to-br from-primary/45 to-navy/80 text-white shadow-[0_0_16px_rgba(27,59,138,0.35)] transition duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            aria-label="Cerrar popup"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="relative aspect-video w-full bg-black">
          <video
            className="h-full w-full object-contain"
            autoPlay
            controls
            loop
            playsInline
            muted={isMuted}
            poster="/hero-bodyscience.png"
            preload="auto"
          >
            <source src="/0328.mp4" type="video/mp4" />
            <source src="/experiencias-isak-kelly-4.mp4" type="video/mp4" />
            Tu navegador no soporta el video.
          </video>

          <button
            type="button"
            onClick={() => setIsMuted((prev) => !prev)}
            className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-gradient-to-r from-primary/70 via-navy/85 to-primary/70 px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-[0_0_18px_rgba(27,59,138,0.45),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-md transition duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:right-4 sm:top-4"
            aria-label={isMuted ? 'Activar sonido' : 'Silenciar video'}
          >
            {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            {isMuted ? 'Activar sonido' : 'Silenciar'}
          </button>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 bg-gradient-to-r from-white/[0.03] via-white/[0.015] to-transparent px-4 py-4 sm:flex-row sm:px-6">
          <div className="flex flex-col items-center gap-1 text-center sm:items-start sm:text-left">
            <span className="inline-flex items-center rounded-full border border-accent/35 bg-accent/12 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
              Cupos limitados
            </span>
            <p className="text-xs font-medium text-slate-200 sm:text-sm">
              Mira el enfoque del evento y asegura tu lugar en esta edicion.
            </p>
          </div>
          <button
            type="button"
            onClick={onPrimaryAction}
            className="rounded-full bg-gradient-to-r from-accent via-[#18cf63] to-accent-light px-6 py-2.5 text-sm font-extrabold tracking-wide text-[#031125] shadow-[0_0_30px_rgba(0,183,79,0.5),0_14px_30px_-12px_rgba(0,183,79,0.6),inset_0_1px_0_rgba(255,255,255,0.35)] ring-1 ring-white/25 transition duration-300 hover:scale-[1.03] hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            Reservar mi lugar
          </button>
        </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
