import { IconSvgProps } from '../types';
export const SkullOutline = (props: IconSvgProps) => {
  return (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 512 512" {...props}>
      <path
        d="M448 225.64v99a64 64 0 0 1-40.23 59.42l-23.68 9.47A32 32 0 0 0 364.6 417l-10 50.14A16 16 0 0 1 338.88 480H173.12a16 16 0 0 1-15.69-12.86L147.4 417a32 32 0 0 0-19.49-23.44l-23.68-9.47A64 64 0 0 1 64 324.67V224c0-105.92 85.77-191.81 191.65-192S448 119.85 448 225.64Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="32"
      />

      <circle
        cx="168"
        cy="280"
        r="40"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="32"
      />

      <circle
        cx="344"
        cy="280"
        r="40"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="32"
      />

      <path
        d="m256 336-16 48h32l-16-48zm0 112v32m-48-32v32m96-32v32"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </svg>
  );
};
