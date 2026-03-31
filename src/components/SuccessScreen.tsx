import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, MessageCircleIcon } from 'lucide-react';
interface SuccessScreenProps {
  isVisible: boolean;
}
export function SuccessScreen({ isVisible }: SuccessScreenProps) {
  return (
    <AnimatePresence>
      {isVisible &&
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center px-6"
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        exit={{
          opacity: 0
        }}
        transition={{
          duration: 0.3
        }}>
        
          {/* Backdrop */}
          <div className="absolute inset-0 bg-navy/90 backdrop-blur-md" />

          {/* Card */}
          <motion.div
          className="relative w-full max-w-md rounded-2xl bg-gradient-to-b from-navy-light to-navy border border-primary/20 p-8 md:p-10 text-center shadow-2xl"
          initial={{
            opacity: 0,
            scale: 0.9,
            y: 20
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            y: 10
          }}
          transition={{
            duration: 0.5,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1]
          }}>
          
            {/* Glow behind icon */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-accent/15 blur-2xl" />

            {/* Check icon */}
            <motion.div
            className="relative mx-auto mb-6"
            initial={{
              scale: 0
            }}
            animate={{
              scale: 1
            }}
            transition={{
              delay: 0.3,
              duration: 0.5,
              type: 'spring',
              stiffness: 200,
              damping: 15
            }}>
            
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                <CheckCircleIcon
                className="w-10 h-10 text-accent"
                strokeWidth={2} />
              
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
            className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight"
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.4,
              duration: 0.5
            }}>
            
              Tu registro fue exitoso
            </motion.h2>

            {/* Confirmation text */}
            <motion.p
            className="text-text-light/80 text-base mb-2"
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.5,
              duration: 0.5
            }}>
            
              Ya reservaste tu lugar en{' '}
              <span className="font-semibold text-white">
                BodyScience <span className="text-accent">3D</span>
              </span>
              .
            </motion.p>

            {/* Instruction */}
            <motion.p
            className="text-muted text-sm leading-relaxed mb-8"
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.6,
              duration: 0.5
            }}>
            
              Ahora da el siguiente paso y únete al grupo oficial de WhatsApp
              para recibir recordatorios, novedades y la información de acceso
              al evento.
            </motion.p>

            {/* WhatsApp CTA */}
            <motion.a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 w-full py-4 bg-accent hover:bg-accent-light text-white font-bold text-base rounded-xl glow-green transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.7,
              duration: 0.5
            }}
            aria-label="Unirme al grupo de WhatsApp de BodyScience 3D">
            
              <MessageCircleIcon className="w-5 h-5" />
              Unirme al grupo de WhatsApp
            </motion.a>

            {/* Subtle divider */}
            <motion.div
            className="mt-6 pt-5 border-t border-primary/15"
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              delay: 0.9,
              duration: 0.5
            }}>
            
              <p className="text-xs text-muted">
                Revisa tu correo electrónico para más detalles sobre el evento.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}