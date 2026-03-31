import React from 'react';
import { motion } from 'framer-motion';

export interface SectionHeadingProps {
  eyebrow: string;
  titleBefore: string;
  titleHighlight: string;
  titleAfter?: string;
  subtitle: React.ReactNode;
  /** Clase de margen inferior del bloque (ej. mb-12, mb-14, mb-10) */
  marginBottomClass?: string;
  className?: string;
  /** Clases del contenedor del subtítulo (tamaño / color base) */
  subtitleClassName?: string;
}

export function SectionHeading({
  eyebrow,
  titleBefore,
  titleHighlight,
  titleAfter = '',
  subtitle,
  marginBottomClass = 'mb-12',
  className = '',
  subtitleClassName = 'mx-auto mt-5 max-w-xl text-sm leading-relaxed text-muted md:text-base',
}: SectionHeadingProps) {
  return (
    <motion.div
      className={`text-center ${marginBottomClass} ${className}`}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-light/95 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
        <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(0,183,79,0.85)]" />
        {eyebrow}
      </span>

      <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
        {titleBefore}
        <span className="bg-gradient-to-r from-white via-text-light to-white/70 bg-clip-text text-transparent">
          {titleHighlight}
        </span>
        {titleAfter}
      </h2>

      <div
        className="mx-auto mt-4 h-1 w-20 max-w-[min(100%,12rem)] rounded-full bg-gradient-to-r from-transparent via-accent/90 to-transparent shadow-[0_0_20px_rgba(0,183,79,0.35)]"
        aria-hidden
      />

      <div className={subtitleClassName}>{subtitle}</div>
    </motion.div>
  );
}
