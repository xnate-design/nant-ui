import { IconSvgProps } from '../types';
export const Toggle = (props: IconSvgProps) => {
  return (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 512 512" {...props}>
      <path d="M368 112H144C64.6 112 0 176.6 0 256s64.6 144 144 144h224c79.4 0 144-64.6 144-144s-64.6-144-144-144Zm0 256a112 112 0 1 1 112-112 112.12 112.12 0 0 1-112 112Z" />
    </svg>
  );
};
