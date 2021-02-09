// @ts-ignore
import React from "react";

const Emoji: React.FC<any> = (props) => (
  <span
    className="emoji"
    role="img"
    aria-label={props.label ? props.label : ""}
    aria-hidden={props.label ? "false" : "true"}
  >
        {props.symbol}
    </span>
);

export { Emoji };
