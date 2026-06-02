'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { THEMES, ACCENT_REDS, TweakState, DEFAULT_TWEAKS } from '@/lib/themes';

interface ThemeContextValue {
  tweaks: TweakState;
  updateTweak: (key: keyof TweakState, val: string) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  tweaks: DEFAULT_TWEAKS,
  updateTweak: () => {},
  isDark: false,
});

export function useTheme() {
  return useContext(ThemeContext);
}

function applyTheme(theme: string, accentRed: string) {
  const vars = { ...THEMES[theme], ...ACCENT_REDS[accentRed] };
  const root = document.documentElement;
  Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [tweaks, setTweaks] = useState<TweakState>(DEFAULT_TWEAKS);

  useEffect(() => {
    applyTheme(tweaks.theme, tweaks.accentRed);
  }, [tweaks]);

  const updateTweak = (key: keyof TweakState, val: string) => {
    setTweaks(prev => ({ ...prev, [key]: val }));
  };

  const isDark = tweaks.theme === 'dark' || tweaks.theme === 'bold' || tweaks.theme === 'slate';

  return (
    <ThemeContext.Provider value={{ tweaks, updateTweak, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}
