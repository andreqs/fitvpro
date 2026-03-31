import React from 'react';
import { motion } from 'framer-motion';
import {
  EyeIcon,
  BarChart3Icon,
  TargetIcon,
  AlertTriangleIcon,
} from 'lucide-react';
import { SectionHeading } from './SectionHeading';
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};
interface ValueCardProps {
  icon: React.ReactNode;
  text: string;
  imageSrc: string;
  imageAlt: string;
  index: number;
}
function ValueCard({ icon, text, imageSrc, imageAlt, index }: ValueCardProps) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl border border-primary/30"
      custom={index}
      initial="hidden"
      whileInView="visible"
      whileHover={{
        y: -4
      }}
      viewport={{
        once: true,
        margin: '-60px'
      }}
      variants={cardVariants}>
      
      <img
        src={imageSrc}
        alt={imageAlt}
        loading="lazy"
        className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-navy/55 to-navy/85" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_40%)]" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <div className="mb-4 w-12 h-12 rounded-full bg-white/10 border border-white/30 backdrop-blur-sm flex items-center justify-center shadow-[0_0_30px_rgba(47,128,237,0.35)]">
          <div className="text-accent">{icon}</div>
        </div>
        <p className="text-white text-lg md:text-xl leading-snug font-semibold tracking-wide drop-shadow-[0_3px_16px_rgba(0,0,0,0.55)]">
          {text}
        </p>
      </div>
    </motion.div>);

}
export function ValueBullets() {
  return (
    <section className="w-full bg-gradient-to-b from-navy via-navy to-navy-light py-20 md:py-28 px-6 relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="relative z-10 max-w-4xl mx-auto">
        <SectionHeading
          eyebrow="Contenido"
          titleBefore="¿Qué encontrarás en "
          titleHighlight="este evento"
          titleAfter="?"
          subtitle="Cuatro bloques prácticos para afianzar criterio y llevar ideas aplicables a tu entorno real."
          marginBottomClass="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ValueCard
            icon={<EyeIcon className="w-5 h-5" />}
            text="Una mirada más clara y actual sobre la composición corporal"
            imageSrc="/card-composicion.svg"
            imageAlt="Especialista analizando composición corporal"
            index={0} />
          
          <ValueCard
            icon={<BarChart3Icon className="w-5 h-5" />}
            text="Criterios para una mejor interpretación de resultados"
            imageSrc="/card-criterios.svg"
            imageAlt="Pantallas con análisis de métricas y resultados"
            index={1} />
          
          <ValueCard
            icon={<TargetIcon className="w-5 h-5" />}
            text="Aplicaciones útiles en salud, ejercicio y rendimiento"
            imageSrc="/card-rendimiento.svg"
            imageAlt="Entrenamiento enfocado en salud y rendimiento"
            index={2} />
          
          <ValueCard
            icon={<AlertTriangleIcon className="w-5 h-5" />}
            text="Análisis de errores frecuentes en la práctica profesional"
            imageSrc="/card-errores.svg"
            imageAlt="Profesional revisando reportes para detectar errores"
            index={3} />
          
        </div>
      </div>
    </section>);

}