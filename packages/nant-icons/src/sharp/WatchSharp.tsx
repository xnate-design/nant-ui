import React from 'react';
export const WatchSharp = ({ width = '410', height = '404', ...other }) => {
  return (
    <svg width="1.33em" height="1.33em" fill="currentColor" viewBox="0 0 512 512" {...other}>
      <rect x="136" y="136" width="240" height="240" rx="8" ry="8" />

      <path d="M384 96h-48V16H176v80h-48a32 32 0 0 0-32 32v256a32 32 0 0 0 32 32h48v80h160v-80h48a32 32 0 0 0 32-32V128a32 32 0 0 0-32-32Zm8 272a24 24 0 0 1-24 24H144a24 24 0 0 1-24-24V144a24 24 0 0 1 24-24h224a24 24 0 0 1 24 24Z" />
    </svg>
  );
};
