import React from "react";
import style from "./editor.css";

type Props = {
  text: string;
  placeholder: string;
  onChangeText(next: string): void;
};

export const Editor = React.forwardRef<HTMLTextAreaElement, Props>(
  (props: Props, ref) => {
    const handleChange = (ev: React.SyntheticEvent<HTMLTextAreaElement>) => {
      const next = ev.currentTarget.value;
      props.onChangeText(next);
    };

    return (
      <div className={style.editorContainer}>
        <textarea
          ref={ref}
          className={style.editor}
          value={props.text}
          onChange={handleChange}
          autoFocus
          placeholder={props.placeholder}
        />
      </div>
    );
  }
);
