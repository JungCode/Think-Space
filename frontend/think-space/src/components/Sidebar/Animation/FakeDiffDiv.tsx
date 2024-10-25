import React from "react";

interface myProps{
  readonly isExpanded: boolean; // Whether the sidebar is expanded or not
}
const FakeDiffDiv :React.FC<myProps> = ({isExpanded}) => {
  return (
    <div
      className={`${isExpanded ? " w-56 " : " w-0 p-0 "} transition-all`}
    ></div>
  );
};

export default FakeDiffDiv;
