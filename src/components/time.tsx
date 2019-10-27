import React from "react";
import style from "./time.css";
import { MAX_MS, MAX_HUE } from "../constants";
import { useInterval } from "../hooks/use-interval";

type Props = {
  remaining: number;
};

const SECOND_MS = 1000;
const MINUTE_MS = 60 * SECOND_MS;

export const Time = React.memo((props: Props) => {
  const isComplete = props.remaining === 0;
  const [blinked, setBlinked] = React.useState(false);

  const intervalCb = React.useCallback(() => {
    if (isComplete) {
      setBlinked(!blinked);
    }
  }, [isComplete, blinked]);

  useInterval(intervalCb, 500);

  const minutesLeft = Math.floor(props.remaining / MINUTE_MS);
  const secondsLeft = Math.ceil((props.remaining % MINUTE_MS) / SECOND_MS);
  const formattedTimeLeft = `${minutesLeft}:${("0" + secondsLeft).slice(-2)}`;

  const messageStyle = {
    visibility: blinked ? ("hidden" as "hidden") : ("visible" as "visible"),
    color: isComplete ? "hsl(0, 75%, 65%)" : "rgb(49, 53, 58)"
  };

  return (
    <div className={style.timeContainer}>
      <div className={style.timeUnderlay} />
      <div className={style.message} style={messageStyle}>
        {formattedTimeLeft}
      </div>
    </div>
  );
});
