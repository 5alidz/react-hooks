// credit -> https://github.com/hswolff/youtube/blob/master/videos/react-demos/src/demo/use-event-listener.tsx
import { useEffect, useRef } from 'react';

type DocumentCallback<T extends keyof DocumentEventMap> = (
  e: DocumentEventMap[T]
) => void;
type WindowCallback<T extends keyof WindowEventMap> = (
  e: WindowEventMap[T]
) => void;

export function useDocumentEvent<T extends keyof DocumentEventMap>(
  type: T,
  callback: DocumentCallback<T>
) {
  const handler = useRef(callback);
  handler.current = callback;

  useEffect(() => {
    const internalHandler = (e: DocumentEventMap[T]) => handler.current(e);
    document.addEventListener(type, internalHandler);
    return () => document.removeEventListener(type, internalHandler);
  }, [type]);
}

export function useWindowEvent<T extends keyof WindowEventMap>(
  type: T,
  callback: WindowCallback<T>
) {
  const handler = useRef(callback);
  handler.current = callback;

  useEffect(() => {
    const internalHandler = (e: WindowEventMap[T]) => handler.current(e);
    window.addEventListener(type, internalHandler);
    return () => window.removeEventListener(type, internalHandler);
  }, [type]);
}
