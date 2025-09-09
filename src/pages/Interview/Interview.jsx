import React , {useEffect, useState} from "react";
import MasterLayout from "../../masterLayout/MasterLayout";
import BreadCrum from "../../components/BreadCrum";
import InterviewPractice from "../../components/Interview/InterviewPractice";
import PracticeHistory from "../../components/Interview/PracticeHistory";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../features/interview/interviewSlice";
import { fetchInterviewHistory } from "../../features/interview/interviewSlice";

const Interview = () => {
  const dispatch = useDispatch();
  
  
  const { data } = useSelector((state) => state.user);
  const { history } = useSelector((state) => state.interview);

  useEffect(()=>{
    if(data?.preferred_industry && data?.preferred_industry_type){
      dispatch(setFilters({
        subcategory: data?.preferred_industry,
        questionType: data?.preferred_industry_type,
        difficulty: {
          id: 1,
          name: "Easy",
          slug: "E"
        }
      }));
      dispatch(fetchInterviewHistory());
    }else{

    }
  },[data]);

  return (
    <>
      <MasterLayout>
        <BreadCrum title='Interview Simulator' subTitle='Practise with industry specific questions and real-time feedback.' />
        <InterviewPractice />
        <PracticeHistory history={history} />
      </MasterLayout>
    </>
  );
};

export default Interview;
