import React from 'react';

const Publisher = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="2000"
    height="2000"
    viewBox="0 0 2000 2000"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <rect width="2000" height="2000" fill="url(#app-publisher)" />
    <defs>
      <pattern id="app-publisher" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_2_3" transform="scale(0.000666667)" />
      </pattern>
      <image
        id="image0_2_3"
        width="1500"
        height="1500"
      />
    </defs>
  </svg>
);

export default Publisher;