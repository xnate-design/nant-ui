import { IconSvgProps } from '../types';
export const EllipsisVertical = (props: IconSvgProps) => {
  return (
    <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 512 512" {...props}>
      <circle cx="256" cy="256" r="48" />

      <circle cx="256" cy="416" r="48" />

      <circle cx="256" cy="96" r="48" />
    </svg>
  );
};
