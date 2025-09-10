import { SVGProps } from "react";
const IcoClear = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <circle cx={12} cy={12} r={12} fill="#E84141" />
    <path
      d="M7.80078 17.325L15.6008 8.55005"
      stroke="white"
      strokeWidth={1.44}
      strokeLinecap="round"
    />
    <path
      d="M7.80078 8.55005L15.6008 17.325"
      stroke="white"
      strokeWidth={1.44}
      strokeLinecap="round"
    />
  </svg>
);
export default IcoClear;
