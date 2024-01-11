import * as React from 'react';

export type ThrottledFn = (...args: unknown[]) => void;
export type UseThrottleOptions = { leading?: boolean; trailing?: boolean };

export const useThrottle = (
  fn: ThrottledFn,
  timeout: number,
  option: UseThrottleOptions,
  deps: unknown[] = [],
) => {
  const timerId = React.useRef<ReturnType<typeof setTimeout>>();
  const lastArgs = React.useRef<unknown[]>();

  const opt = React.useMemo(
    () => ({
      leading: true,
      trailing: true,
      ...option,
    }),
    [option],
  );

  // const callback = React.useMemo(() => fn, [fn]);

  return React.useCallback(
    function (...args: unknown[]) {
      const { trailing, leading } = opt;

      const waitFn = () => {
        if (trailing && lastArgs.current) {
          fn(...lastArgs.current);
          lastArgs.current = undefined;
          timerId.current = setTimeout(waitFn, timeout);
        } else {
          timerId.current = undefined;
        }
      };

      if (!timerId.current && leading) {
        fn(...args);
      } else {
        lastArgs.current = args;
      }

      if (!timerId.current) {
        timerId.current = setTimeout(waitFn, timeout);
      }
    },
    [opt, fn, timeout],
  );
};