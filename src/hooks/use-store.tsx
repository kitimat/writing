import React from "react";
import {
  MAX_MS,
  TICK_RATE_MS,
  TYPING_DEBOUNCE,
  PLACEHOLDER
} from "../constants";

type State = {
  text: string;
  placeholder: string;
  timeRemaining: number;
  isTyping: boolean;
};

type Action =
  | { type: "UPDATE_TEXT"; text: string }
  | { type: "STOPPED_TYPING" }
  | { type: "TICK" };

const initialState: State = {
  text: "",
  placeholder: PLACEHOLDER,
  timeRemaining: MAX_MS,
  isTyping: false
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_TEXT":
      if (action.text.length <= state.text.length) {
        return state;
      }

      return {
        ...state,
        text: action.text,
        isTyping: true
      };
    case "STOPPED_TYPING":
      return {
        ...state,
        isTyping: false
      };
    case "TICK":
      if (!state.isTyping || state.timeRemaining <= 0) {
        return state;
      }

      return {
        ...state,
        timeRemaining: state.timeRemaining - TICK_RATE_MS
      };
    default:
      return state;
  }
};

export const useStore = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const actions = React.useMemo(() => {
    let typingTimeoutId: number = -1;

    return {
      updateText(text: string) {
        clearTimeout(typingTimeoutId);

        dispatch({ type: "UPDATE_TEXT", text });

        typingTimeoutId = window.setTimeout(() => {
          dispatch({ type: "STOPPED_TYPING" });
        }, TYPING_DEBOUNCE);
      },
      tick() {
        dispatch({ type: "TICK" });
      }
    };
  }, [dispatch]);

  return [state, actions] as [State, typeof actions];
};
