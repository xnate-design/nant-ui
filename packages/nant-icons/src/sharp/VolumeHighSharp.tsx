import React from 'react';
export const VolumeHighSharp = ({ width = '410', height = '404', ...other }) => {
  return (
    <svg width="1.33em" height="1.33em" fill="currentColor" viewBox="0 0 512 512" {...other}>
      <path
        d="M320 320c9.74-19.38 16-40.84 16-64 0-23.48-6-44.42-16-64m48 176c19.48-33.92 32-64.06 32-112s-12-77.74-32-112m48 272c30-46 48-91.43 48-160s-18-113-48-160"
        fill="none"
        stroke="currentColor"
        strokeLinecap="square"
        strokeMiterlimit="10"
        strokeWidth="32"
      />

      <path d="M125.65 176.1H32v159.8h93.65L256 440V72L125.65 176.1z" />
    </svg>
  );
};
