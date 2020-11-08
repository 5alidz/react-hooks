import { useRef, useEffect } from 'react';

function createFrames(
  callback: () => void,
  fps = 60
): [(time: number) => void, () => void] {
  const FRAME_MIN_TIME = (1000 / 60) * (60 / fps) - (1000 / 60) * 0.5;
  let lastFrameTime = 0;
  const shouldSkip = (time: number) => time - lastFrameTime < FRAME_MIN_TIME;
  let raf: number;
  return [
    function loop(time: number) {
      if (shouldSkip(time)) {
        raf = requestAnimationFrame(loop);
        return; // prevent drawing the next frame
      }
      lastFrameTime = time;
      callback();
      raf = requestAnimationFrame(loop);
    },
    () => cancelAnimationFrame(raf),
  ];
}

export function useAnimationFrame(callback: () => void) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  useEffect(() => {
    const id = requestAnimationFrame(callbackRef.current || (() => undefined));
    return () => cancelAnimationFrame(id);
  }, []);
}

export function useAnimationFrameLoop(callback: () => void, fps = 60) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;
  useEffect(() => {
    const [loop, cancel] = createFrames(callbackRef.current, fps);
    requestAnimationFrame(loop);
    return cancel;
  }, [fps]);
}
