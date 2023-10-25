import React, { FC, SVGProps } from 'react';

const SvgCaretRight: FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#464F54"
      d="M15.646 11.646 11.354 7.354a.5.5 0 0 0-.707 0l-.704.703a.5.5 0 0 0 0 .707L13.17 12l-3.227 3.236a.5.5 0 0 0 0 .707l.704.703a.5.5 0 0 0 .707 0l4.293-4.293a.5.5 0 0 0 0-.707Z"
    />
  </svg>
);

export default SvgCaretRight;
