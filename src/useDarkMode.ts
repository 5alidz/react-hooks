import { useState, useEffect } from 'react';
const matchDark = '(prefers-color-scheme: dark)';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(
      typeof window != 'undefined' &&
        window.matchMedia &&
        window.matchMedia(matchDark).matches
    );
  }, []);

  useEffect(() => {
    const matcher = window.matchMedia(matchDark);
    const onChange = ({ matches }: MediaQueryListEvent) => setIsDark(matches);
    matcher.addListener(onChange);
    return () => matcher.removeListener(onChange);
  }, [setIsDark]);

  return isDark;
}
