import React from "react";
import Svg, { Path } from "react-native-svg";

export const OliveWalkIcon = (props: any) => {
  const color = props.color || "#FFF";
  return (
    <Svg width={props.size} height={props.size} viewBox="0 0 1024 1024">
      <Path
        d="M855.68 169.6C696 9.92 413.44 33.92 224 224S11.2 694.72 170.88 854.4s441.92 135.68 631.04-54.4 213.12-470.72 53.76-630.4z m-141.12 261.44A96 96 0 0 0 704 300.16 96 96 0 0 0 572.8 288c-20.8-48.32-20.16-96 6.72-121.6 42.56-42.56 134.4-19.52 205.44 51.2s93.76 162.88 51.2 205.44c-26.56 28.16-73.28 28.8-121.6 8z"
        fill={color}
      />
    </Svg>
  );
};
