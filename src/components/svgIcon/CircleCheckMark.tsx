import { FC } from "react";

const Part: FC = () => {
  return (
    <svg
      className="h-6 w-6 flex-none fill-sky-100 stroke-sky-500 stroke-2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="11" />
      <path d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9" fill="none" />
    </svg>
  );
};

export default Part;