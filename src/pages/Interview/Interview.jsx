import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import BreadCrum  from "../../components/BreadCrum";

const Interview = () => {
  return (
    <>
      <MasterLayout>
        <BreadCrum title='Interview Simulator' subTitle='Practise with industry specific questions and real-time feedback.' />
      </MasterLayout>
    </>
  );
};

export default Interview;
