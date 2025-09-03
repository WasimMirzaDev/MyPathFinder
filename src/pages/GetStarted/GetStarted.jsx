import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import BreadCrum  from "../../components/BreadCrum";

const GetStarted = () => {
  return (
    <>
      <MasterLayout>
        <BreadCrum title='Getting Started.' subTitle='The UK’s first all-in-one AI platform for tailored CVs, instant job matching, and interview prep.' />
      </MasterLayout>
    </>
  );
};

export default GetStarted;
