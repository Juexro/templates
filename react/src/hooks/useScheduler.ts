import { DependencyList, useCallback, useEffect, useRef } from 'react';

export default function useScheduler(fn: Function, delay = 0, deps: DependencyList = []) {
  const callback = useRef(fn);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const isDestroy = useRef(false);

  useEffect(() => {
    return () => {
      isDestroy.current = true;
    };
  }, []);

  const set = useCallback(() => {
    timeout.current && clearTimeout(timeout.current);
    timeout.current = setTimeout(async () => {
      await callback.current(isDestroy.current);
      set();
    }, delay);
  }, [delay]);

  useEffect(() => {
    callback.current = fn;
  }, [fn]);

  const clear = useCallback(() => {
    timeout.current && clearTimeout(timeout.current);
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [delay]);

  useEffect(set, deps);

  return [set, clear];
}