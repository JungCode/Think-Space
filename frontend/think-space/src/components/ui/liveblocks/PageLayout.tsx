import React from "react";
import LiveBlocksProvider from "./LiveBlocksProvider";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return <LiveBlocksProvider>{children}</LiveBlocksProvider>;
};

export default PageLayout;
