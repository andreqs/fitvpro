import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PlayCircle, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { SectionHeading } from './SectionHeading';

export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
          return;
        }
        video.pause();
      },
      { threshold: 0.55 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleToggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted) {
      void video.play().catch(() => {});
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#0F2035] via-navy-light to-navy px-4 py-16 sm:px-6 md:py-28">
      {/* Ambiente */}
      <div
        className="pointer-events-none absolute inset-0 grid-pattern opacity-[0.11]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[min(55vh,420px)] w-[min(95vw,720px)] -translate-x-1/2 rounded-full bg-primary/[0.14] blur-[100px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-accent/[0.09] blur-[90px]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Video"
          titleBefore="Conoce de qué trata "
          titleHighlight="este evento"
          subtitle="Una mirada rápida al enfoque y al tono del evento antes de profundizar en cada tema."
        />

        <motion.div
          className="relative mx-auto mt-4 max-w-[min(100%,56rem)]"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{
            duration: 0.75,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Resplandor detrás del reproductor */}
          <div
            className="pointer-events-none absolute -inset-3 rounded-[1.25rem] bg-gradient-to-br from-accent/18 via-primary/12 to-transparent opacity-70 blur-2xl sm:-inset-6 sm:rounded-[2rem] sm:blur-3xl md:-inset-10 md:rounded-[2.25rem]"
            aria-hidden
          />

          <div className="relative">
            {/* Marco gradiente tipo “premium frame” */}
            <div className="rounded-[1.2rem] bg-gradient-to-br from-white/[0.22] via-white/[0.08] to-white/[0.03] p-[1px] shadow-[0_24px_48px_-26px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06)_inset] sm:rounded-[1.75rem] sm:shadow-[0_32px_64px_-24px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06)_inset] md:rounded-[2rem]">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[calc(1.2rem-1px)] bg-black ring-1 ring-black/40 sm:aspect-video sm:rounded-[calc(1.75rem-1px)] md:rounded-[calc(2rem-1px)]">
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-contain sm:object-cover"
                  controls
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  poster="/hero-bodyscience.png"
                  aria-label="Video introductorio del evento BodyScience 3D"
                >
                  {/* Fallback de compatibilidad: algunos codificados MP4 no reproducen igual en todos los navegadores */}
                  <source src="/0328.mp4" type="video/mp4" />
                  <source src="/experiencias-isak-kelly-4.mp4" type="video/mp4" />
                  Tu navegador no soporta el video.
                </video>
                <button
                  type="button"
                  onClick={handleToggleSound}
                  className="absolute right-3 top-3 z-[2] inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-gradient-to-r from-primary/70 via-navy/85 to-primary/70 px-2.5 py-1.5 text-[10px] font-semibold text-white shadow-[0_0_18px_rgba(27,59,138,0.45),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-md transition duration-300 hover:brightness-110 hover:shadow-[0_0_28px_rgba(0,183,79,0.42),0_10px_24px_-12px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.24)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:right-5 sm:top-5 sm:px-3 sm:py-2 sm:text-xs"
                  aria-label={isMuted ? 'Activar sonido del video' : 'Silenciar video'}
                >
                  {isMuted ? (
                    <VolumeX className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                  ) : (
                    <Volume2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden />
                  )}
                  {isMuted ? 'Activar sonido' : 'Sonido activo'}
                </button>

                {/* Viñeta + brillo superior (legibilidad de badges) */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20 sm:from-navy/50 sm:via-navy/5 sm:to-navy/25" />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-10%,rgba(255,255,255,0.12),transparent_55%)] opacity-70 sm:opacity-90" />

                {/* Badges */}
                <div className="pointer-events-none absolute left-3 top-3 z-[1] flex flex-wrap items-center gap-1.5 sm:left-5 sm:top-5 sm:gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-navy/70 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-text-light shadow-[0_8px_24px_-10px_rgba(0,0,0,0.5)] backdrop-blur-md ring-1 ring-white/10 sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[0.14em] sm:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.5)]">
                    <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
                    BodyScience 3D
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-accent/35 bg-accent/15 px-2 py-1 text-[10px] font-semibold text-white shadow-[0_0_20px_-8px_rgba(0,183,79,0.45)] backdrop-blur-sm sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-xs sm:shadow-[0_0_24px_-4px_rgba(0,183,79,0.45)]">
                    <PlayCircle className="h-3.5 w-3.5 text-accent sm:h-4 sm:w-4" strokeWidth={2} aria-hidden />
                    Experiencias reales
                  </span>
                </div>

                {/* Esquinas — marco L */}
                <div
                  className="pointer-events-none absolute left-3 top-12 z-[1] h-7 w-7 rounded-tl-lg border-l-2 border-t-2 border-accent/45 shadow-[0_0_16px_rgba(0,183,79,0.2)] sm:left-5 sm:top-16 sm:h-10 sm:w-10 sm:rounded-tl-xl sm:shadow-[0_0_20px_rgba(0,183,79,0.2)]"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute bottom-3 right-3 z-[1] h-7 w-7 rounded-br-lg border-b-2 border-r-2 border-white/30 sm:bottom-5 sm:right-5 sm:h-10 sm:w-10 sm:rounded-br-xl"
                  aria-hidden
                />

                {/* Barra inferior sutil */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/85 to-transparent sm:h-24 sm:from-navy/80" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
