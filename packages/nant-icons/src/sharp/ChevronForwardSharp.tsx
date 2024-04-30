import React from 'react';
export const ChevronForwardSharp = ({ fill = 'currentColor', ...other }) => {
  return (
    <svg width="1.33em" height="1.33em" fill={fill} viewBox="0 0 512 512" {...other}>
      <path
        d="m184 112 144 144-144 144"
        fill="none"
        stroke={fill}
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="48"
      />
    </svg>
  );
};
