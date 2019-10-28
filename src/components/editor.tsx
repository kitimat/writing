import React from "react";
import { useGetSelection } from "../hooks/use-get-selection";
import style from "./editor.css";

type Props = {
  text: string;
  placeholder: string;
  disabled: boolean;
  onChangeText(next: string): void;
};

export const Editor = React.forwardRef<HTMLTextAreaElement, Props>(
  (props: Props, ref: React.Ref<HTMLTextAreaElement>) => {
    const removeSelection = () => {
      const textAreaRef = ref && "current" in ref ? ref.current : null;

      if (textAreaRef) {
        textAreaRef.selectionStart = Number.MAX_SAFE_INTEGER;
        textAreaRef.selectionEnd = Number.MAX_SAFE_INTEGER;
      }
    };

    useGetSelection(removeSelection);

    const handleChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
      removeSelection();

      const next = ev.currentTarget.value;
      props.onChangeText(next);
    };

    const handleKeyDown = (ev: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (ev.which === 8) ev.preventDefault();
      removeSelection();
    };

    return (
      <div className={style.editorContainer}>
        <textarea
          ref={ref}
          className={style.editor}
          value={props.text}
          placeholder={props.placeholder}
          disabled={props.disabled}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onMouseMove={removeSelection}
          onMouseDown={removeSelection}
          onMouseUp={removeSelection}
          autoFocus
          spellCheck={false}
        />
      </div>
    );
  }
);
