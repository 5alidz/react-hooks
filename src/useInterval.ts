import { useRef, useEffect } from 'react';

export function useInterval(callback: () => void, interval = 0) {
  const callbackRef = useRef<null | (() => void)>(null);
  callbackRef.current = callback;
  useEffect(() => {
    const timerId = setInterval(callbackRef.current || (() => undefined), interval);
    return () => {
      window.clearInterval(timerId);
    };
  }, [interval]);
}
