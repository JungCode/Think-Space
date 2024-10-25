import React from "react";

interface myProps {
  isExpanded: boolean;
  mouseIsEnter: boolean;
  children: React.ReactNode;
}
const SlideSidebar: React.FC<myProps> = ({
  isExpanded,
  mouseIsEnter,
  children,
}) => {
  return (
    <div
      className={`${
        isExpanded
          ? " h-screen w-56 p-2 translate-x-0.5"
          : " translate-y-10 rounded-lg shadow-2xl h-5/6 "
      } 
            ${
              mouseIsEnter && !isExpanded
                ? " translate-x-0 "
                : " -translate-x-56 "
            }
            flex flex-col border-t-2 w-56 p-2 bg-stone-100 overflow-x-hidden text-sm text-stone-700 left-0 border-r-2 justify-between align-items-center transition-all duration-200`}
    >
      {children}
    </div>
  );
};

export default SlideSidebar;
