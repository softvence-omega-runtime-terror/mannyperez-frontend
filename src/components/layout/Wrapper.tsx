import React, { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="max-w-[1920px] mx-auto md:px-5 lg:-px-10 xl:px-20 2xl:px-40">
      {children}
    </div>
  );
};

export default Wrapper;
