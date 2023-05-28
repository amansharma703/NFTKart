import React from "react";

function OptionButton({ ratio = "34" }) {
  return (
    <svg
      width={ratio}
      height={ratio}
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 34 34`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="34" height="34" rx="17" fill="#F2F2F2" />
      <path
        d="M11.8571 17.8462C12.3305 17.8462 12.7143 17.4329 12.7143 16.9231C12.7143 16.4133 12.3305 16 11.8571 16C11.3838 16 11 16.4133 11 16.9231C11 17.4329 11.3838 17.8462 11.8571 17.8462Z"
        fill="#1F2023"
        stroke="#1F2023"
        strokeWidth="1.71429"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 17.8462C17.4734 17.8462 17.8571 17.4329 17.8571 16.9231C17.8571 16.4133 17.4734 16 17 16C16.5266 16 16.1428 16.4133 16.1428 16.9231C16.1428 17.4329 16.5266 17.8462 17 17.8462Z"
        fill="#1F2023"
        stroke="#1F2023"
        strokeWidth="1.71429"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.1428 17.8462C22.6162 17.8462 22.9999 17.4329 22.9999 16.9231C22.9999 16.4133 22.6162 16 22.1428 16C21.6694 16 21.2856 16.4133 21.2856 16.9231C21.2856 17.4329 21.6694 17.8462 22.1428 17.8462Z"
        fill="#1F2023"
        stroke="#1F2023"
        strokeWidth="1.71429"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default OptionButton;
