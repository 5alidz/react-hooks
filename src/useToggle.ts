import { useState } from 'react';

export function useToggle(initialState = false) {
  const [isTrue, setIsTrue] = useState(initialState);
  return [isTrue, () => setIsTrue(!isTrue)];
}
