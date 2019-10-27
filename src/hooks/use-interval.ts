import React from "react";

// See https://overreacted.io/making-setinterval-declarative-with-react-hooks/

export const useInterval = (cb: () => void, ms: number) => {
  const callbackRef = React.useRef<() => void>();

  React.useEffect(() => {
    callbackRef.current = cb;
  }, [cb]);

  React.useEffect(() => {
    const tick = () => {
      if (callbackRef.current) callbackRef.current();
    };

    let intervalId = setInterval(tick, ms);
    return () => clearInterval(intervalId);
  }, [ms]);
};
