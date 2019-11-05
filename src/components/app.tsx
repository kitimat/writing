import React from "react";
import { useStore } from "../hooks/use-store";
import { useInterval } from "../hooks/use-interval";
import { Editor } from "./editor";
import { Time } from "./time";
import style from "./app.css";
import { TICK_RATE_MS } from "../constants";

export const App = () => {
  const [state, actions] = useStore();

  useInterval(actions.tick, TICK_RATE_MS);

  return (
    <>
      <header className={style.header}></header>
      <main className={style.container}>
        <div className={style.editorWrapper}>
          <Time remaining={state.timeRemaining} />
          <Editor
            text={state.text}
            placeholder={state.placeholder}
            disabled={state.timeRemaining === 0}
            onChangeText={actions.updateText}
          />
        </div>
      </main>
      <footer className={style.footer}></footer>
    </>
  );
};
