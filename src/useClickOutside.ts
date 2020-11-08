// credit -> custom hooks in React Talk by Tanner Linsley
import { useRef, MutableRefObject } from 'react';
import { useDocumentEvent } from './useEventListener';

export function useClickOutside(
  elementRef: MutableRefObject<HTMLElement | undefined | null>,
  callback: (e: DocumentEventMap['click']) => void
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useDocumentEvent('click', e => {
    if (
      !elementRef?.current?.contains(e.target as Node) &&
      callbackRef.current
    ) {
      callbackRef.current(e);
    }
  });
}
