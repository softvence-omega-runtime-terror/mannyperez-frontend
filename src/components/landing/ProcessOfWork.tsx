import React from "react";
import Wrapper from "../layout/Wrapper";
import WorkSteps from "./SectionComponents/WorkSteps";

const ProcessOfWork = () => {
  return (
    <div className="py-20">
      <Wrapper>
        <div className="space-y-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <h2>Process
                <span className="text-accent">Of Works</span>
              </h2>
            </div>
            <p className="py-4">
              Get started in just a few simple steps.
            </p>
          </div>

          <div className="">
            <WorkSteps/>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default ProcessOfWork;
