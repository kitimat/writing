import React from "react";
import { useStore } from "../hooks/use-store";
import { useInterval } from "../hooks/use-interval";
import { Editor } from "./editor";
import { Time } from "./time";
import style from "./app.css";
import { TICK_RATE_MS } from "../constants";

export const App = () => {
  const [state, actions] = useStore();
  const editorRef = React.useRef<HTMLTextAreaElement>(null);

  useInterval(actions.tick, TICK_RATE_MS);

  const focusTrap = React.useCallback(() => {
    const textarea = editorRef.current!;
    textarea.focus();
  }, [editorRef.current]);

  return (
    <>
      <header className={style.header}></header>
      <main className={style.container}>
        <div className={style.editorWrapper} onClick={focusTrap}>
          <Time remaining={state.timeRemaining} />
          <Editor
            ref={editorRef}
            text={state.text}
            placeholder={state.placeholder}
            onChangeText={actions.updateText}
          />
        </div>
      </main>
      <footer className={style.footer}></footer>
    </>
  );
};
