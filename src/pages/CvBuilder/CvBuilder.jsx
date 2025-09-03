import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import BreadCrum  from "../../components/BreadCrum";

const CvBuilder = () => {
  return (
    <>
      <MasterLayout>
        <BreadCrum title='Upload existing CV or build a new one with Mypathfinder.' subTitle='Every role deserves a tailored application. We make it effortless.' />
      </MasterLayout>
    </>
  );
};

export default CvBuilder;
