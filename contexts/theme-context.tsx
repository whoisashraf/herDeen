import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Appearance, useColorScheme as useRNColorScheme } from 'react-native';

export type ThemeMode = 'system' | 'light' | 'dark';

type ThemeContextValue = {
  themeMode: ThemeMode;
  colorScheme: 'light' | 'dark';
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
};

const ThemeModeContext = createContext<ThemeContextValue | null>(null);

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useRNColorScheme() ?? 'light';
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    if (typeof Appearance.setColorScheme === 'function') {
      Appearance.setColorScheme(mode === 'system' ? null : mode);
    }
  }, []);

  const colorScheme = themeMode === 'system' ? systemScheme : themeMode;

  const value = useMemo<ThemeContextValue>(
    () => ({
      themeMode,
      colorScheme,
      isDark: colorScheme === 'dark',
      setThemeMode,
    }),
    [colorScheme, setThemeMode, themeMode]
  );

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
}

export function useThemeMode() {
  const context = useContext(ThemeModeContext);
  const systemScheme = useRNColorScheme() ?? 'light';

  if (context) {
    return context;
  }

  return {
    themeMode: 'system' as ThemeMode,
    colorScheme: systemScheme,
    isDark: systemScheme === 'dark',
    setThemeMode: () => { },
  };
}
