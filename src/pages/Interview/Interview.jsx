import React from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import BreadCrum from "../../components/BreadCrum";
import InterviewPractice from "../../components/Interview/InterviewPractice";
import PracticeHistory from "../../components/Interview/PracticeHistory";

const Interview = () => {
  return (
    <>
      <MasterLayout>
        <BreadCrum title='Interview Simulator' subTitle='Practise with industry specific questions and real-time feedback.' />
        <InterviewPractice />
        <PracticeHistory />
      </MasterLayout>
    </>
  );
};

export default Interview;
