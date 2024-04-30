import React from 'react';
export const LayersSharp = ({ fill = 'currentColor', ...other }) => {
  return (
    <svg width="1.33em" height="1.33em" fill={fill} viewBox="0 0 512 512" {...other}>
      <path d="M480 150 256 48 32 150l224 104 224-104zM255.71 392.95l-144.81-66.2L32 362l224 102 224-102-78.69-35.3-145.6 66.25z" />

      <path d="m480 256-75.53-33.53L256.1 290.6l-148.77-68.17L32 256l224 102 224-102Z" />
    </svg>
  );
};
