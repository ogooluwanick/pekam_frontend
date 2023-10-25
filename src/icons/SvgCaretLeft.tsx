
import React, { FC, SVGProps } from 'react';

const SvgCaretLeft: FC<SVGProps<SVGSVGElement>> = (props) => (
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
          d="m8.354 11.646 4.292-4.292a.5.5 0 0 1 .707 0l.704.703a.5.5 0 0 1 0 .707L10.83 12l3.227 3.236a.5.5 0 0 1 0 .707l-.704.703a.5.5 0 0 1-.707 0l-4.292-4.293a.5.5 0 0 1 0-.707Z"
        />
      </svg>
);

export default SvgCaretLeft;
