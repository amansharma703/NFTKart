import React from "react";

function Share({ copied }) {
  return (
    <svg
      width="16"
      height="16"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.00006 6V10C2.00006 10.2652 2.10542 10.5196 2.29295 10.7071C2.48049 10.8946 2.73484 11 3.00006 11H9.00006C9.26528 11 9.51963 10.8946 9.70717 10.7071C9.8947 10.5196 10.0001 10.2652 10.0001 10V6"
        stroke="#262A37"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.99994 3L5.99994 1L3.99994 3"
        stroke="#262A37"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 1V7.5"
        stroke="#262A37"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    // <svg
    //   width="24"
    //   height="24"
    //   viewBox="0 0 24 24"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    // >
    //   <rect width="24" height="24" rx="12" fill={copied ? "green" : "white"} />
    //   <g clipPath="url(#clip0)">
    //     <path
    //       d="M10.9336 12.5333C11.1626 12.8395 11.4549 13.0929 11.7904 13.2762C12.126 13.4596 12.4971 13.5686 12.8785 13.5959C13.2599 13.6232 13.6427 13.5682 14.001 13.4345C14.3592 13.3009 14.6846 13.0918 14.9549 12.8213L16.5549 11.2213C17.0407 10.7184 17.3095 10.0448 17.3034 9.34558C17.2973 8.64639 17.0169 7.97756 16.5224 7.48314C16.028 6.98871 15.3592 6.70826 14.66 6.70219C13.9608 6.69611 13.2872 6.9649 12.7843 7.45065L11.8669 8.36265"
    //       stroke={copied ? "white" : "#262A37"}
    //       strokeWidth="1.5"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //     />
    //     <path
    //       d="M13.0667 11.4667C12.8376 11.1605 12.5454 10.9071 12.2098 10.7238C11.8743 10.5404 11.5032 10.4314 11.1218 10.4041C10.7404 10.3768 10.3576 10.4318 9.99929 10.5655C9.64102 10.6991 9.31568 10.9082 9.04534 11.1787L7.44534 12.7787C6.95959 13.2816 6.6908 13.9552 6.69688 14.6544C6.70295 15.3536 6.9834 16.0224 7.47783 16.5169C7.97225 17.0113 8.64108 17.2917 9.34027 17.2978C10.0395 17.3039 10.7131 17.0351 11.216 16.5493L12.128 15.6373"
    //       stroke={copied ? "white" : "#262A37"}
    //       strokeWidth="1.5"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //     />
    //   </g>
    //   <defs>
    //     <clipPath id="clip0">
    //       <rect
    //         width="12.8"
    //         height="12.8"
    //         fill="white"
    //         transform="translate(5.6001 5.60001)"
    //       />
    //     </clipPath>
    //   </defs>
    // </svg>
  );
}

export default Share;
