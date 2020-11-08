import { useState } from 'react';

const clamp = (n: number, min: number, max: number) =>
  n < min ? min : n > max ? max : n;

export function useCounter(initialValue = 0, min = 0, max = Infinity) {
  const [count, setCount] = useState(clamp(initialValue, min, max));
  return [
    count,
    (incrementBy = 1) => setCount(clamp(count + incrementBy, min, max)),
    (decrementBy = 1) => setCount(clamp(count - decrementBy, min, max)),
  ] as const;
}
