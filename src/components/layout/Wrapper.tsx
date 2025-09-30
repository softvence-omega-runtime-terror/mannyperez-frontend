import React, { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className="max-w-[1920px] min-h-[100vh] mx-auto px-4">
      {children}
    </div>
  );
};

export default Wrapper;
