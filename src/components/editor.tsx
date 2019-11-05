import React from "react";
import style from "./editor.css";

type Props = {
  text: string;
  placeholder: string;
  disabled: boolean;
  onChangeText(next: string): void;
};

export const Editor = (props: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const next = props.text + ev.currentTarget.value;
    props.onChangeText(next);
  };

  const handleBlur = (ev: React.SyntheticEvent) => {
    ev.preventDefault();
    inputRef.current!.focus();
  };

  return (
    <div className={style.editorContainer}>
      <input
        ref={inputRef}
        onChange={handleChange}
        onBlur={handleBlur}
        value=""
        autoFocus
        disabled={props.disabled}
        className={style.input}
      />
      <textarea
        disabled
        className={style.editor}
        value={props.text}
        placeholder={props.placeholder}
        spellCheck={false}
      />
    </div>
  );
};
