import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDownIcon, Sparkles } from 'lucide-react';

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function HeroSection() {
  const prefersReducedMotion = useReducedMotion();

  const scrollToForm = () => {
    const el = document.getElementById('registro');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-navy">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bodyscience.png')" }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/75 to-[#0F2035]" />

      {/* Grid + halos */}
      <div className="absolute inset-0 grid-pattern opacity-20" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-[28%] h-[min(70vw,520px)] w-[min(95vw,720px)] -translate-x-1/2 rounded-full bg-primary/20 blur-[110px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[18%] right-[5%] h-64 w-64 rounded-full bg-accent/[0.12] blur-[90px]"
        aria-hidden
      />

      {/* Floating accent orbs */}
      <motion.div
        className="absolute right-[15%] top-20 h-3 w-3 rounded-full bg-accent/50 shadow-[0_0_24px_rgba(0,183,79,0.5)]"
        animate={
          prefersReducedMotion
            ? {}
            : { y: [0, -15, 0], opacity: [0.45, 0.95, 0.45] }
        }
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
      <motion.div
        className="absolute bottom-32 left-[10%] h-2 w-2 rounded-full bg-accent/40"
        animate={
          prefersReducedMotion
            ? {}
            : { y: [0, -20, 0], opacity: [0.35, 0.85, 0.35] }
        }
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        aria-hidden
      />
      <motion.div
        className="absolute left-[8%] top-[40%] h-1.5 w-1.5 rounded-full bg-primary-light/50"
        animate={
          prefersReducedMotion
            ? {}
            : { y: [0, -10, 0], opacity: [0.35, 0.75, 0.35] }
        }
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        aria-hidden
      />

      {/* Columna de contenido */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[115%] w-[130%] max-w-[920px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(27,59,138,0.22),transparent_65%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[95%] w-[108%] max-w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-[3rem] bg-gradient-to-b from-white/[0.05] to-transparent opacity-90"
          aria-hidden
        />

        <div className="relative flex w-full max-w-3xl flex-col items-center px-5 py-6 sm:max-w-4xl sm:px-7 sm:py-8 md:px-8">
          {/* Logo */}
          <motion.div
            className="relative mb-6"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <motion.img
              src="/logo-fitvprostudio_(1).png"
              alt="Fitv-Pro Studio — Fitness con Propósito"
              className="mx-auto block h-[4.25rem] w-auto max-w-[min(100%,22rem)] object-contain drop-shadow-[0_2px_24px_rgba(0,0,0,0.45),0_0_20px_rgba(0,0,0,0.25)] md:h-[5.5rem]"
              animate={
                prefersReducedMotion
                  ? {}
                  : { y: [0, -3, 0] }
              }
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Eyebrow */}
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.1)] backdrop-blur-md ring-1 ring-white/10"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(0,183,79,0.9)]" />
            </span>
            <Sparkles className="h-3.5 w-3.5 text-accent" aria-hidden />
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-text-light">
              Evento gratuito
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="mb-6 text-5xl font-extrabold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <span className="bg-gradient-to-br from-white via-text-light to-white/75 bg-clip-text text-transparent drop-shadow-[0_4px_32px_rgba(0,0,0,0.35)]">
              BodyScience{' '}
            </span>
            <span className="relative inline-block [perspective:800px]">
              <span
                className="pointer-events-none absolute left-[0.09em] top-[0.1em] -z-[2] text-[#06351b]/80 blur-[0.5px]"
                aria-hidden
              >
                3D
              </span>
              <span
                className="pointer-events-none absolute left-[0.06em] top-[0.07em] -z-[1] text-accent-dark/85"
                aria-hidden
              >
                3D
              </span>
              <span
                className="relative z-[1] inline-block bg-gradient-to-b from-[#72ffc1] via-accent to-[#00a647] bg-clip-text text-transparent [transform:rotateX(8deg)]"
                style={{
                  textShadow:
                    '0 6px 0 rgba(0,88,39,0.35), 0 0 32px rgba(0,183,79,0.45), 0 0 70px rgba(0,183,79,0.22)',
                  WebkitTextStroke: '1px rgba(210, 255, 236, 0.36)',
                }}
              >
                3D
              </span>
              <span
                className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-white/70 via-white/10 to-transparent bg-clip-text text-transparent"
                aria-hidden
                style={{ WebkitTextStroke: '0.8px rgba(255,255,255,0.22)' }}
              >
                3D
              </span>
              <span
                className="pointer-events-none absolute inset-0 -z-0 blur-2xl opacity-60"
                aria-hidden
                style={{
                  background:
                    'radial-gradient(circle, rgba(0,183,79,0.55) 0%, transparent 70%)',
                }}
              />
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mb-4 max-w-2xl text-lg font-medium text-text-light/90 md:text-xl"
            style={{ textShadow: '0 2px 28px rgba(0,0,0,0.45)' }}
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            Evento gratuito sobre composición corporal, salud y ejercicio
          </motion.p>

          {/* Promise */}
          <motion.p
            className="mb-10 max-w-xl text-base leading-relaxed text-muted md:text-lg"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.35)' }}
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            Descubre una visión más práctica, actual y profesional para comprender
            la composición corporal y fortalecer tu criterio en contextos reales.
          </motion.p>

          {/* CTA */}
          <motion.div
            custom={5}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="relative"
          >
            <div
              className="pointer-events-none absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-accent/45 via-primary/40 to-accent-light/90 opacity-75 blur-lg"
              aria-hidden
            />
            <motion.button
              type="button"
              onClick={scrollToForm}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-accent via-[#11ce60] to-accent-light px-8 py-4 text-lg font-extrabold tracking-[0.01em] text-[#041325] shadow-[0_14px_34px_-12px_rgba(0,183,79,0.65),0_10px_0_0_rgba(5,70,34,0.55),0_0_30px_rgba(0,183,79,0.35),inset_0_1px_0_0_rgba(255,255,255,0.35),inset_0_-2px_0_0_rgba(5,80,38,0.45)] ring-1 ring-white/30 transition duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_24px_48px_-14px_rgba(0,183,79,0.72),0_14px_0_0_rgba(5,70,34,0.48),0_0_44px_rgba(0,183,79,0.45),inset_0_1px_0_0_rgba(255,255,255,0.45)] active:translate-y-0.5 active:shadow-[0_10px_22px_-10px_rgba(0,183,79,0.58),0_4px_0_0_rgba(5,70,34,0.5),0_0_24px_rgba(0,183,79,0.3),inset_0_2px_0_0_rgba(255,255,255,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/65 focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
              whileHover={
                prefersReducedMotion ? {} : { scale: 1.04, y: -2 }
              }
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              aria-label="Reserva tu lugar en BodyScience 3D"
            >
              <span className="relative z-[1]">Reserva tu lugar</span>
              <span
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/15 opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden
              />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <span className="text-xs uppercase tracking-[0.25em] text-text-light/70">
          Descubre más
        </span>
        <motion.div
          animate={
            prefersReducedMotion ? {} : { y: [0, 8, 0] }
          }
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDownIcon className="h-5 w-5 text-accent/80" />
        </motion.div>
      </motion.div>
    </section>
  );
}
