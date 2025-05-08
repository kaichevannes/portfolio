'use client';

import React, { ReactNode } from 'react';

// From https://www.joshwcomeau.com/react/dark-mode/
interface SoundContextType {
  soundOn: Boolean | undefined;
  setSoundOn: (value: Boolean) => void;
}

const SoundOnContext = React.createContext<SoundContextType | undefined>(undefined);

const SoundOnProvider = ({ children }: { children: ReactNode }) => {
  const [soundOn, rawSetSoundOn] = React.useState<Boolean>();

  React.useEffect(() => {
    const persistedValue = JSON.parse(window.localStorage.getItem('sound') ?? 'true');
    rawSetSoundOn(persistedValue);
  }, []);

  const setSoundOn = (value: Boolean) => {
    window.localStorage.setItem('sound', JSON.stringify(value));
    rawSetSoundOn(value);
  };

  return (
    <SoundOnContext.Provider value={{ soundOn, setSoundOn }}>
      {children}
    </SoundOnContext.Provider>
  );
};

const useSoundOn = () => {
  const context = React.useContext(SoundOnContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};

export { SoundOnProvider, useSoundOn }
