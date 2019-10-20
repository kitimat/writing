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
      if (!state.isTyping) {
        return state;
      }

      if (state.timeRemaining <= 0) {
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

        typingTimeoutId = setTimeout(() => {
          dispatch({ type: "STOPPED_TYPING" });
        }, TYPING_DEBOUNCE);
      },
      startTicking() {
        const tickIntervalId = setInterval(() => {
          dispatch({ type: "TICK" });
        }, TICK_RATE_MS);

        return () => clearInterval(tickIntervalId);
      }
    };
  }, [dispatch]);

  return [state, actions] as [State, typeof actions];
};
