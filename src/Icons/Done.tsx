import React, { FC } from "react";
import { DoneProps } from "./DoneProps";
import { parseSize } from "./utils/utils";

const Done: FC<DoneProps> = (props: DoneProps) => {
  const {
    size,
    color,
    colorFill = "none",
    onClick,
    style = {},
    className,
  } = props;
  const finalSize = parseSize(size);
  return (
    <svg
      style={onClick ? { ...{ cursor: "pointer", ...style } } : style}
      onClick={() => onClick?.()}
      xmlns="http://www.w3.org/2000/svg"
      //enableBackground="new 0 0 24 24"
      height={`${finalSize}px`}
      viewBox="0 0 24 24"
      width={`${finalSize}px`}
      fill={color ? color : "#000000"}
      className={className || ""}
    >
      <path d="M0 0h24v24H0V0z" fill={colorFill} />
      <path d="M19.77 4.93l1.4 1.4L8.43 19.07l-5.6-5.6 1.4-1.4 4.2 4.2L19.77 4.93m0-2.83L8.43 13.44l-4.2-4.2L0 13.47l8.43 8.43L24 6.33 19.77 2.1z" />
    </svg>
  );
};
export default Done;
