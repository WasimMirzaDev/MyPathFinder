import React, { useEffect } from 'react'
import MasterLayout from "../../masterLayout/MasterLayout";
import { useParams } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import {fetchInterviewQuestionById } from "../../features/interview/interviewSlice"
import { baseUrl } from '../../api/axios';

export default function Prepration() {
    const {id} = useParams();
    const dispatch = useDispatch();

    const { currentQuestion , loading , errro } = useSelector((state) => state.interview);

    useEffect(()=>{ 
        dispatch(fetchInterviewQuestionById(id))
    },[]);
    return (
        <MasterLayout>
            <div className="row mb-4">
                <div className="col-12 col-xl-12 p-0">
                    <div className="card h-100 p-0">
                        <div className="card-body p-0">
                            <div className="ratio ratio-16x9">
                            <video 
                // ref={videoRef}
                src={`${baseUrl}/videos/MPF Interview Questions/${currentQuestion?.question?.title?.replace(/\?+$/, '_')}.mp4`} 
                autoPlay 
                // muted={!hasMicAccess}
                controls={false}
                // onEnded={startRecording}
                // className={`fullscreen-video ${isRecording ? 'd-none' : ''}`}
            />
                                {/* <iframe id="introVideo"
                                    src={`${baseUrl}/videos/MPF Interview Questions/${currentQuestion?.title.replace(/\?+$/, '_')}.mp4`} 
                                    title="Job Interview Simulation and Training"
                                    allow="autoplay; encrypted-media; clipboard-write; picture-in-picture; web-share"
                                    allowFullScreen loading="eager" referrerPolicy="origin-when-cross-origin">
                                </iframe> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    )
}
