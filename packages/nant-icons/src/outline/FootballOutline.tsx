import { IconSvgProps } from '../types';
export const FootballOutline = (props: IconSvgProps) => {
  return (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 512 512" {...props}>
      <circle
        cx="256"
        cy="256"
        r="192"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="32"
      />

      <path
        d="m256 175.15-76.09 63.83L200 320h112l20.09-81.02L256 175.15zm76.09 63.83 52.87-22.4 25.78-73.26M447 269.97l-62.04-53.39m-205.05 22.4-52.87-22.4-25.78-73.26M65 269.97l62.04-53.39M256 175.15v-57.57l64-42.64m-128-.01 64 42.65M312 320l28 48-28 71m98.74-71H342m-142-48-28 48 28.37 71.5M101.63 368H172"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </svg>
  );
};
