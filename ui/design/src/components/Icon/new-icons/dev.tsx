import React from 'react';

const Dev = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="2000"
    height="2000"
    viewBox="0 0 2000 2000"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <rect width="2000" height="2000" fill="url(#code-dev)" />
    <defs>
      <pattern id="code-dev" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_2_2" transform="scale(0.0005)" />
      </pattern>
      <image
        id="image0_2_2"
        width="2000"
        height="2000"
      />
    </defs>
  </svg>
);

export default Dev;