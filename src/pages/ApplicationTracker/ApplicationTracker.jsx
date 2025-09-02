import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import BreadCrum  from "../../components/BreadCrum";

const ApplicationTracker = () => {
  return (
    <>
      <MasterLayout>
        <BreadCrum title='Application Tracker' subTitle='Track your progress, stay organised, and see where you can improve.' />
      </MasterLayout>
    </>
  );
};

export default ApplicationTracker;
