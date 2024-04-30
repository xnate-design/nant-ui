import React from 'react';
export const InvertModeSharp = ({ fill = 'currentColor', ...other }) => {
  return (
    <svg width="1.33em" height="1.33em" fill={fill} viewBox="0 0 512 512" {...other}>
      <path d="M414.39 97.61A224 224 0 1 0 97.61 414.39 224 224 0 1 0 414.39 97.61ZM256 432v-96a80 80 0 0 1 0-160V80c97.05 0 176 79 176 176s-78.95 176-176 176Z" />

      <path d="M336 256a80 80 0 0 0-80-80v160a80 80 0 0 0 80-80Z" />
    </svg>
  );
};
