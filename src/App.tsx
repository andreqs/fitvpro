import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { ValueBullets } from './components/ValueBullets';
import { EventInfo } from './components/EventInfo';
import { RegistrationForm } from './components/RegistrationForm';
import { SuccessScreen } from './components/SuccessScreen';
export function App() {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegistration = () => {
    setIsRegistered(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <div className="w-full min-h-screen bg-navy">
      <HeroSection />
      <ValueBullets />
      <EventInfo />
      <RegistrationForm onSubmit={handleRegistration} />

      {/* Footer */}
      <footer className="w-full bg-navy border-t border-primary/10 py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
          <img
            src="/logo-fitvprostudio_(1).png"
            alt="Fitv-Pro Studio"
            className="w-16 h-16 object-contain opacity-60" />
          
          <p className="text-xs text-muted text-center">
            © {new Date().getFullYear()} Fitv-Pro Studio · Fitness con
            Propósito
          </p>
        </div>
      </footer>

      {/* Success overlay */}
      <SuccessScreen isVisible={isRegistered} />
    </div>);

}