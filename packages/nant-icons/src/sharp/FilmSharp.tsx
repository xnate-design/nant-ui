import React from 'react';
export const FilmSharp = ({ fill = 'currentColor', ...other }) => {
  return (
    <svg width="1.33em" height="1.33em" fill={fill} viewBox="0 0 512 512" {...other}>
      <path d="M480 80H32v352h448ZM112 352v48H64v-48Zm0-80v48H64v-48Zm0-80v48H64v-48Zm0-80v48H64v-48Zm256 160H144v-32h224Zm80 80v48h-48v-48Zm0-80v48h-48v-48Zm0-80v48h-48v-48Zm0-80v48h-48v-48Z" />
    </svg>
  );
};
