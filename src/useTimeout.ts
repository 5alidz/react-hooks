import { useEffect, useRef } from 'react';

export function useTimeout(callback: () => void, time = 0) {
  const callbackRef = useRef<null | (() => void)>(null);
  callbackRef.current = callback;
  useEffect(() => {
    const timerId = setTimeout(callbackRef.current || (() => undefined), time);
    return () => {
      window.clearTimeout(timerId);
    };
  }, [time]);
}
