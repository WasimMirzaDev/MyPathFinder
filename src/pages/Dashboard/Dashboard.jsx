import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import BreadCrum from "../../components/BreadCrum";

import DashboardComponents from '../../components/Dashboard/ControlComponents';
import InterviewHistory from '../../components/Dashboard/InterviewHistoryComponent';
import Activity from '../../components/Dashboard/Activity';
import ApplicationHistory from '../../components/Dashboard/ApplicationHistoryComponent';



const Dashboard = () => {
  return (
    <>
      <MasterLayout>
        <BreadCrum title='Welcome to MyPathfinder, Alex.' subTitle='The UK’s first all-in-one AI platform for tailored CVs, instant job matching, and interview prep.' />
        <DashboardComponents />
        <div className=" my-4" style={{ translate: 'none', rotate: 'none', scale: 'none', transform: 'translate(0px, 0px)', opacity: 1 }}>
          <div className="row g-3">
            <div className="col-12 col-xl-6 col-xxl-7">
              <InterviewHistory />
            </div>
            <div className="col-12 col-xl-6 col-xxl-5">
              <Activity />
            </div>
          </div>
        </div>

        <ApplicationHistory />

      </MasterLayout>
    </>
  );
};

export default Dashboard;
