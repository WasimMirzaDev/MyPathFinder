import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import BreadCrum  from "../../components/BreadCrum";

const Dashboard = () => {
  return (
    <>
      <MasterLayout>
        <BreadCrum title='Welcome to MyPathfinder, Alex.' subTitle='The UK’s first all-in-one AI platform for tailored CVs, instant job matching, and interview prep.' />
      </MasterLayout>
    </>
  );
};

export default Dashboard;
