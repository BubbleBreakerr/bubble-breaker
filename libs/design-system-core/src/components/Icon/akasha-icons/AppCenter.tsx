import React from 'react';

const AppCenter = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3.125 0C2.2962 0 1.50134 0.32924 0.915291 0.915291C0.32924 1.50134 0 2.2962 0 3.125V14.875C0 15.7038 0.32924 16.4987 0.915291 17.0847C1.50134 17.6708 2.2962 18 3.125 18H6V16.75H3.125C2.62772 16.75 2.15081 16.5525 1.79917 16.2008C1.44754 15.8492 1.25 15.3723 1.25 14.875V5.25H16.75V6H18V3.125C18 2.2962 17.6708 1.50134 17.0847 0.915291C16.4987 0.32924 15.7038 0 14.875 0H3.125ZM16.75 4H1.25V3.125C1.25 2.62772 1.44754 2.15081 1.79917 1.79917C2.15081 1.44754 2.62772 1.25 3.125 1.25H14.875C15.3723 1.25 15.8492 1.44754 16.2008 1.79917C16.5525 2.15081 16.75 2.62772 16.75 3.125V4ZM14.75 7C14.2527 7 13.7758 7.19754 13.4242 7.54917C13.0725 7.9008 12.875 8.37772 12.875 8.875V12.875H8.875C8.37772 12.875 7.9008 13.0725 7.54917 13.4242C7.19754 13.7758 7 14.2527 7 14.75V18.125C7 18.6223 7.19754 19.0992 7.54917 19.4508C7.9008 19.8025 8.37772 20 8.875 20H16.875C17.7038 20 18.4987 19.6708 19.0847 19.0847C19.6708 18.4987 20 17.7038 20 16.875V8.875C20 8.37772 19.8025 7.9008 19.4508 7.54917C19.0992 7.19754 18.6223 7 18.125 7H14.75ZM14.125 8.875C14.125 8.53 14.405 8.25 14.75 8.25H18.125C18.47 8.25 18.75 8.53 18.75 8.875V12.875H14.125V8.875ZM18.75 14.125V16.875C18.75 17.3723 18.5525 17.8492 18.2008 18.2008C17.8492 18.5525 17.3723 18.75 16.875 18.75H14.125V14.125H18.75ZM8.875 14.125H12.875V18.75H8.875C8.53 18.75 8.25 18.47 8.25 18.125V14.75C8.25 14.405 8.53 14.125 8.875 14.125Z"
      fill="currentColor"
    />
  </svg>
);

export default AppCenter;