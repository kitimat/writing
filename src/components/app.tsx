import React from "react";
import { Editor } from "./editor";
import { useStore } from "../lib/use-store";
import style from "./app.css";

export const App = () => {
  const [state, actions] = useStore();
  const editorRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => actions.startTicking(), []);

  const focusTrap = React.useCallback(() => {
    editorRef.current!.focus();
  }, [editorRef]);

  return (
    <>
      <header className={style.header}></header>
      <main className={style.container}>
        <div className={style.editorWrapper} onClick={focusTrap}>
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
