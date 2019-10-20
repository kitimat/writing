import React from "react";
import style from "./time.css";
import { MAX_MS, MAX_HUE, FINISHED_MESSAGE } from "../constants";

type Props = {
  remaining: number;
};

export const Time = (props: Props) => {
  const percentLeft = props.remaining / MAX_MS;
  const hue = Math.floor(MAX_HUE * percentLeft);

  const width = `${percentLeft * 100}%`;
  const background = `hsl(${hue}, 75%, 65%)`;

  return (
    <div className={style.timeContainer}>
      <div className={style.timeUnderlay} />
      <div className={style.time} style={{ background, width }} />
      <div className={style.message}>
        {props.remaining === 0 && FINISHED_MESSAGE}
      </div>
    </div>
  );
};
