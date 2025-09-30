import React, { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="max-w-[1920px] mx-auto lg:px-40">
      {children}
    </div>
  );
};

export default Wrapper;
