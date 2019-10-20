import React from "react";

type State = {
  text: string;
  placeholder: string;
  secondsRemaining: number;
  isTyping: boolean;
};

type Action =
  | { type: "UPDATE_TEXT"; text: string }
  | { type: "STOPPED_TYPING" }
  | { type: "TICK" };

const initialState: State = {
  text: "",
  placeholder: "",
  secondsRemaining: 60 * 5, // 5 minutes
  isTyping: false
};

const reducer = (state: State, action: Action) => {
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

      if (state.secondsRemaining <= 0) {
        return state;
      }

      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1
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
        }, 1000);
      },
      startTicking() {
        const tickIntervalId = setInterval(() => {
          dispatch({ type: "TICK" });
        }, 1000);

        return () => clearInterval(tickIntervalId);
      }
    };
  }, [dispatch]);

  return [state, actions] as [State, typeof actions];
};
