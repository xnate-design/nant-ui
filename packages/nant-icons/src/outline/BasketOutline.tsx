import { IconSvgProps } from '../types';
export const BasketOutline = (props: IconSvgProps) => {
  return (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 512 512" {...props}>
      <path
        d="M68.4 192A20.38 20.38 0 0 0 48 212.2a17.87 17.87 0 0 0 .8 5.5L100.5 400a40.46 40.46 0 0 0 39.1 29.5h232.8a40.88 40.88 0 0 0 39.3-29.5l51.7-182.3.6-5.5a20.38 20.38 0 0 0-20.4-20.2H68.4Zm193.32 160.07A42.07 42.07 0 1 1 304 310a42.27 42.27 0 0 1-42.28 42.07Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <path d="m160 192 96-128 96 128" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="32" />
    </svg>
  );
};
