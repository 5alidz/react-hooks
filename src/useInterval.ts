import { useRef, useEffect } from 'react';

export function useInterval(callback: () => void, interval = 0) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  useEffect(() => {
    const timerId = setInterval(callbackRef.current, interval);
    return () => {
      window.clearInterval(timerId);
    };
  }, [interval]);
}
