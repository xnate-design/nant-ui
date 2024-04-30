import React from 'react';
export const MedkitSharp = ({ width = '410', height = '404', ...other }) => {
  return (
    <svg width="1.33em" height="1.33em" fill="currentColor" viewBox="0 0 512 512" {...other}>
      <path d="M168 72h176v24H168z" fill="none" />

      <path d="M484 96H384V40a8 8 0 0 0-8-8H136a8 8 0 0 0-8 8v56H28a12 12 0 0 0-12 12v360a12 12 0 0 0 12 12h456a12 12 0 0 0 12-12V108a12 12 0 0 0-12-12ZM168 72h176v24H168Zm184 238h-74v74h-44v-74h-74v-44h74v-74h44v74h74Z" />
    </svg>
  );
};
