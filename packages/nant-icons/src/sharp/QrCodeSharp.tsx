import React from 'react';
export const QrCodeSharp = ({ width = '410', height = '404', ...other }) => {
  return (
    <svg width="1.33em" height="1.33em" fill="currentColor" viewBox="0 0 512 512" {...other}>
      <path d="M336 336h80v80h-80zm-64-64h64v64h-64zm144 144h64v64h-64zm16-144h48v48h-48zM272 432h48v48h-48zm64-336h80v80h-80z" />

      <path d="M480 240H272V32h208Zm-164-44h120V76H316ZM96 96h80v80H96z" />

      <path d="M240 240H32V32h208ZM76 196h120V76H76Zm20 140h80v80H96z" />

      <path d="M240 480H32V272h208ZM76 436h120V316H76Z" />
    </svg>
  );
};
