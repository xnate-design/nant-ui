import React from 'react';
export const PersonAddSharp = ({ width = '410', height = '404', ...other }) => {
  return (
    <svg width="1.33em" height="1.33em" fill="currentColor" viewBox="0 0 512 512" {...other}>
      <path d="M106 304v-54h54v-36h-54v-54H70v54H16v36h54v54h36z" />

      <circle cx="288" cy="144" r="112" />

      <path d="M288 288c-69.42 0-208 42.88-208 128v64h416v-64c0-85.12-138.58-128-208-128Z" />
    </svg>
  );
};
