import React from "react";

type SelectionCallback = (sel: Selection) => void;

export const useGetSelection = (cb: SelectionCallback) => {
  if (!document.getSelection) {
    return;
  }

  const callbackRef = React.useRef<SelectionCallback>();

  React.useEffect(() => {
    callbackRef.current = cb;
  }, [cb]);

  React.useLayoutEffect(() => {
    const selectionChangeCallback = () => {
      const next = document.getSelection();

      if (next !== null) callbackRef.current!(next);
    };

    document.addEventListener("selectionchange", selectionChangeCallback);
    return () =>
      document.removeEventListener("selectionchange", selectionChangeCallback);
  }, []);
};
