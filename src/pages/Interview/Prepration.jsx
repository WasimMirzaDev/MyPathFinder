import React, { useEffect, useState ,useRef } from 'react'
import MasterLayout from "../../masterLayout/MasterLayout";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import {fetchInterviewQuestionById , setParsedFeedback } from "../../features/interview/interviewSlice"
import { baseUrl } from '../../api/axios';
import { Spinner } from "react-bootstrap";
import { motion } from "framer-motion";
import { Dropdown } from 'bootstrap';
import Swal from "sweetalert2";
import axios from '../../utils/axios';
import "./practiceQuestion.css";

export default function Prepration() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const [parsedFeedback,setParsedFeedback] = useState(null);
    const { interviewQuestions, currentQuestion , loading , errro , parsedFeedback } = useSelector((state) => state.interview);
    const { data } = useSelector((state) => state.user);
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [question, setQuestion] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [hasMicAccess, setHasMicAccess] = useState(false);
    const videoRef = useRef(null);
    const boxRef = useRef(null);
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const [industry, setIndustry] = useState(null);
    const [businessSector, setBusinessSector] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [audioLevel, setAudioLevel] = useState(0);
    const [isVideoLoading, setIsVideoLoading] = useState(true);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const dataArrayRef = useRef(null);
    const animationFrameRef = useRef(null);


    

    useEffect(() => {
        const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
        dropdownElementList.map(function (dropdownToggleEl) {
            return new Dropdown(dropdownToggleEl);
        });
    }, []);
    

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            // Set up audio context and analyzer
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const audioContext = new AudioContext();
            audioContextRef.current = audioContext;
            
            const analyser = audioContext.createAnalyser();
            analyser.fftSize = 32; // Reduced for better performance
            analyserRef.current = analyser;
            
            const source = audioContext.createMediaStreamSource(stream);
            source.connect(analyser);
            
            const bufferLength = analyser.frequencyBinCount;
            dataArrayRef.current = new Uint8Array(bufferLength);
            
            const recorder = new MediaRecorder(stream);
            let chunks = [];
            
            // Animation loop for audio level
            const updateAudioLevel = () => {
                if (!analyserRef.current) return;
                
                analyserRef.current.getByteFrequencyData(dataArrayRef.current);
                let sum = 0;
                for (let i = 0; i < bufferLength; i++) {
                    sum += dataArrayRef.current[i];
                }
                const average = sum / bufferLength;
                // Better normalization - adjust these values based on testing
                const normalizedLevel = Math.min(Math.max((average - 20) / 50, 0), 1);
                setAudioLevel(normalizedLevel);
                
                animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
            };
            
            // Start the animation loop immediately
            animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
    
            recorder.ondataavailable = (e) => {
                chunks.push(e.data);
            };
    
            recorder.onstop = async () => {


                const blob = new Blob(chunks, { type: 'audio/webm' });
                const formData = new FormData();
                formData.append('audio', blob, 'answer.webm');
                formData.append('question_id', id);
    
                try {
                    setIsSubmitting(true);
                    const response = await axios.post('/api/interview/submit-audio', formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                        onUploadProgress: (progressEvent) => {
                            // Optional: You can add upload progress here if needed
                            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            console.log(`Upload progress: ${progress}%`);
                        }
                    });
                    dispatch(setParsedFeedback(response.data));
                    navigate('/question-feedback');
                } catch (error) {
                    console.error('Upload failed:', error);
                }
    

            };
    
            recorder.start();
            setMediaRecorder(recorder);
            setAudioChunks(chunks);
            setIsRecording(true);
        } catch (error) {
            console.error("Microphone error:", error);
        }
    };
    
    const stopRecording = () => {
        if (mediaRecorder && isRecording) {
            try {
                // Stop the media recorder
                mediaRecorder.stop();
                
                // Stop all tracks in the stream
                if (mediaRecorder.stream) {
                    mediaRecorder.stream.getTracks().forEach(track => {
                        track.stop();
                    });
                }
                
                // Clean up audio context and animation frame
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                    animationFrameRef.current = null;
                }
                
                // Close audio context if it exists
                if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                    audioContextRef.current.close();
                    audioContextRef.current = null;
                }
                
                // Reset analyzer reference
                if (analyserRef.current) {
                    analyserRef.current.disconnect();
                    analyserRef.current = null;
                }
                
                // Reset state
                setIsRecording(false);
                setAudioLevel(0);
                setAudioChunks([]);
                
                console.log('Microphone access has been stopped');
            } catch (error) {
                console.error('Error stopping recording:', error);
            }
        }
    };
    
    // Clean up on unmount
    useEffect(() => {
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close();
            }
        };
    }, []);


    useEffect(() => {
        let isActive = true;
        const run = async () => {
            try {
                const ReturnAction = await dispatch(fetchInterviewQuestionById(id)).unwrap();
                if (!isActive) return;
                console.log(ReturnAction?.business_sector);
                setIndustry(ReturnAction.industry);
                setBusinessSector(ReturnAction.business_sector);
            } catch (e) {
                // noop
            }
        };
        run();
        return () => { isActive = false; };
    }, [id, dispatch]);


    // useEffect(() => {
    //     const fetchQuestion = async () => {
    //         try {
    //             const res = await axios.get(`/api/questions/${id}`);
    //             setQuestion(res.data.question);
    //             setIndustry(res.data.industry);
    //             setBusinessSector(res.data.business_sector);
    //         } catch (error) {
    //             console.error("Error fetching question:", error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };
    //     fetchQuestion();
        
    //     // Disable scrolling on mount
    //     document.body.style.overflow = 'hidden';
        
    //     // Re-enable scrolling on unmount
    //     return () => {
    //         document.body.style.overflow = 'visible';
    //     };
    // }, [id]);

    useEffect(()=>{
        requestMicrophonePermission();
    },[])

    useEffect(() => {
        if (isReady && countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (isReady && countdown === 0) {
            requestMicrophonePermission();
        }
    }, [isReady, countdown]);

    const requestMicrophonePermission = async () => {
        console.log("Requesting mic access");
    
        // Skip if already have microphone access
        if (hasMicAccess) {
            console.log("Microphone access already granted, skipping re-request");
            if (videoRef.current) {
                try {
                    await videoRef.current.requestFullscreen();
                    videoRef.current.play();
                } catch (error) {
                    console.error("Error with fullscreen or video playback:", error);
                }
            }
            return;
        }
    
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            setHasMicAccess(true);
    
            // Do not stop the stream here; let startRecording handle it
            // stream.getTracks().forEach(track => track.stop()); // Commented out
    
            if (videoRef.current) {
                await videoRef.current.requestFullscreen();
                videoRef.current.play();
            }
        } catch (error) {
            console.error("Error accessing microphone:", error);
            setIsReady(false);
            setCountdown(5);
            // Optionally reset hasMicAccess if permission was revoked
            if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
                setHasMicAccess(false);
            }
        }
    };

    const handleStartInterview = () => {
        setIsReady(true);
    };
    const [nextQuestion, setNextQuestion] = useState(null);

    useEffect(() => {
        const index = interviewQuestions.findIndex(q => q.id == id);
        const nextQuestion = interviewQuestions[index + 1] || null;        
        if (nextQuestion) {
            setNextQuestion(nextQuestion);
        }
    }, [interviewQuestions]);

    const handleSkipQuestion = () => {
        if (nextQuestion) {
            window.location.href = `/prepration/${nextQuestion.id}`;
        }
    };

    const handleExitInterview = () => {
        if (mediaRecorder && isRecording) {
            try {
                mediaRecorder.stop();
                
                if (mediaRecorder.stream) {
                    mediaRecorder.stream.getTracks().forEach(track => {
                        track.stop();
                    });
                }
                
                if (animationFrameRef.current) {
                    cancelAnimationFrame(animationFrameRef.current);
                    animationFrameRef.current = null;
                }
                
                // Close audio context if it exists
                if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                    audioContextRef.current.close();
                    audioContextRef.current = null;
                }
                
                // Reset analyzer reference
                if (analyserRef.current) {
                    analyserRef.current.disconnect();
                    analyserRef.current = null;
                }
                
                // Reset state
                setIsRecording(false);
                setAudioLevel(0);
                setAudioChunks([]);
                
                console.log('Microphone access has been stopped');
            } catch (error) {
                console.error('Error stopping recording:', error);
            }
        }
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        navigate('/');
    };

    const handleDragEnd = (event, info) => {
        const boxWidth = boxRef.current?.offsetWidth || 280;
        const boxHeight = boxRef.current?.offsetHeight || 200;
        
        let newX = info.point.x;
        let newY = info.point.y;
        
        // Constrain to viewport boundaries
        newX = Math.max(0, Math.min(newX, window.innerWidth - boxWidth));
        newY = Math.max(0, Math.min(newY, window.innerHeight - boxHeight));
        
        setPosition({ x: newX, y: newY });
    };

    if (isLoading) {
        return (
            <MasterLayout>
            <div className="loading-container">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
            </MasterLayout>
        );
    }
            // <motion.div 
            //     className="interview-intro-container"
            //     initial={{ opacity: 0 }}
            //     animate={{ opacity: 1 }}
            //     transition={{ duration: 0.5 }}
            // >
            //     <div className="intro-header">
            //         {/* {currentQuestion?.map((question) => (
            //             <>
            //             <h1>New Question</h1>
            //             </>
            //         ))} */}
            //         <h1>Prepare for your interview</h1>
            //         <p>{industry?.name} 😊 {businessSector?.name}</p>
            //     </div>
                
            //     {/* <div className="navigation-section">
            //         <motion.div 
            //             className="nav-item"
            //             whileHover={{ scale: 1.05 }}
            //             whileTap={{ scale: 0.95 }}
            //         >
            //             <h3>Question Overview</h3>
            //         </motion.div>
            //         <motion.div 
            //             className="nav-item"
            //             whileHover={{ scale: 1.05 }}
            //             whileTap={{ scale: 0.95 }}
            //         >
            //             <h3>View Feedback History</h3>
            //         </motion.div>
            //     </div> */}
            //     <motion.div style={{display: 'flex', justifyContent: 'center'}}>
            //     <motion.button 
            //         onClick={()=> navigate('/')}
            //         className="start-button bg-warning"
            //         whileHover={{ scale: 1.05 }}
            //         whileTap={{ scale: 0.95 }}
            //         style={{marginRight: '10px'}}
            //     >
            //         <h4>Back to Main Menu</h4>
            //     </motion.button>
                
            //     <motion.button 
            //         className="start-button"
            //         onClick={handleStartInterview}
            //         whileHover={{ scale: 1.05 }}
            //         whileTap={{ scale: 0.95 }}
            //     >
            //         I'm ready, start this interview
            //     </motion.button>
            //     </motion.div>
            // </motion.div>

    if (!isReady && !hasMicAccess || countdown > 0) {
        return (
            <MasterLayout>
                <>
            <div className="content" data-bs-theme="light">
                <div className="row mb-3 g-3 feature-cards align-items-center justify-content-center">
                    <div className="col-12 col-xl-5 d-flex justify-content-center">
                        <div className="card border w-100 overflow-hidden position-relative">
                            <div className="card-body p-4 d-flex flex-column text-center">
                                <div className="d-flex justify-content-center mb-3">
                                    <div className="position-relative" style={{ width: '120px', height: '120px' }}>
                                        <svg viewBox="0 0 60 60" className="countdown-ring" style={{ width: '100%', height: '100%' }}>
                                            <circle 
                                                className="countdown-bg" 
                                                cx="30" 
                                                cy="30" 
                                                r="26" 
                                                fill="none" 
                                                stroke="#e9ecef" 
                                                strokeWidth="4"
                                            />
                                            <circle 
                                                className="countdown-progress" 
                                                cx="30" 
                                                cy="30" 
                                                r="26" 
                                                fill="none" 
                                                stroke="#4e73df" 
                                                strokeWidth="4"
                                                strokeLinecap="round"
                                                strokeDasharray="163.36"
                                                strokeDashoffset={163.36 - (countdown * 27.23)} // 163.36 = 2 * π * 26
                                                style={{
                                                    transition: 'stroke-dashoffset 1s linear',
                                                    transform: 'rotate(-90deg)',
                                                    transformOrigin: '50% 50%'
                                                }}
                                            />
                                        </svg>
                                        <div className="position-absolute top-50 start-50 translate-middle text-primary fw-bold" style={{ fontSize: '2rem' }}>
                                            {countdown}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <div className="fw-bold">{data?.name}</div>
                                    <div className="text-secondary small">Candidate</div>
                                </div>

                                <div className="mb-3">
                                    <div className="fw-semibold mb-1">Answer the question</div>
                                    <div className="mic-meter" aria-label="Microphone level" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={audioLevel * 100} style={{height: '10px', background: '#e9ecef', borderRadius: '9999px', overflow: 'hidden'}}>
                                        <div id="micMeterFill" style={{height: '100%', width: `${audioLevel * 100}%`, background: 'linear-gradient(90deg, #20c997, #198754)', transition: 'width 100ms linear'}} />
                                    </div>
                                    <div id="micStatus" className={`text-secondary mt-2 ${audioLevel < 0.2 ? 'text-danger' : ''}`} style={{fontSize: '0.85rem'}}>
                                        <i className="fas fa-microphone-alt me-2" /> {audioLevel < 0.2 ? 'Too quiet' : 'Loud and clear'}
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <div className="fw-semibold text-dark small mb-1">Current Question</div>
                                    <div className="p-2 bg-light rounded border small">
                                        <span className="fw-bold">#{currentQuestion?.question?.id}: {currentQuestion?.question?.title}</span><br />
                                        <span className="text-secondary">{currentQuestion?.question?.speech}</span>
                                    </div>
                                </div>

                                <div className="d-grid"  onClick={handleStartInterview} >
                                    <button className="btn btn-primary btn-sm" id="finaliseBtn" disabled={isReady || !hasMicAccess}>I'm ready</button>
                                </div>

                                <div className="d-flex gap-2 mt-3">
                                    <button id="skipBtn" className="btn btn-outline-secondary btn-sm w-100" onClick={handleSkipQuestion} disabled={isReady}>
                                        Skip question
                                    </button>
                                    <button id="exitBtn" className="btn btn-outline-secondary btn-sm w-100" onClick={handleExitInterview} disabled={isReady}>
                                        Exit interview
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            </>
             </MasterLayout>
        );
    }

    // if (isReady && !hasMicAccess) {
    //     return (
    //         <MasterLayout>
    //         <motion.div 
    //             className="countdown-container"
    //             initial={{ opacity: 0 }}
    //             animate={{ opacity: 1 }}
    //         >
    //             <h2>Starting interview in {countdown} seconds...</h2>
    //             <p>Please allow microphone access when prompted</p>
    //         </motion.div>
    //         </MasterLayout>
    //     );
    // }

    return (
        <MasterLayout>

<div className="content" data-bs-theme="light">
        <div className="row mb-4">
          <div className="col-12 col-xl-12 p-0">
            <div className="card h-100 p-0">
              <div className="card-body p-0">
                {/* Video area with overlay */}
                <div className="ratio ratio-16x9 interview-overlay-wrap">
                   {isVideoLoading && (
                        <div className="d-flex justify-content-center align-items-center" style={{height: '100%'}}>
                            <Spinner animation="border" role="status" variant="primary">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    )}
                    <video 
                        ref={videoRef}
                        src={`${baseUrl}/videos/MPF Interview Questions/${currentQuestion?.question?.title.replace(/\?+$/, '_')}.mp4`} 
                        autoPlay 
                        controls={false}
                        onEnded={startRecording}
                        onLoadedData={() => setIsVideoLoading(false)}
                        onError={() => setIsVideoLoading(false)}
                        className={`fullscreen-video ${isRecording || isVideoLoading ? 'd-none' : ''}`}
                    />
                   
                    <video 
                        ref={videoRef}
                        src={`${baseUrl}/videos/MPF Interview Filler/Avatar ${currentQuestion?.question?.avatar} FILLER.mp4`} 
                        autoPlay
                        controls={false}
                        loop
                        onLoadedData={() => setIsVideoLoading(false)}
                        onError={() => setIsVideoLoading(false)}
                        className={`fullscreen-video ${!isRecording || isVideoLoading ? 'd-none' : ''}`}
                    />
                  {/* Overlay Card (light theme, auto-height, top-right) */}
                  <div className="card bg-white text-dark border shadow-sm" style={{position: 'absolute', top: '1rem', left: '1rem', width: '320px', zIndex: 10, borderRadius: '1rem', height: 'auto'}}>
                    <div className="card-body p-4 d-flex flex-column text-center">
                      <div className="mb-2">
                        <div className="fw-bold">{data?.name}</div>
                        <div className="text-secondary small">Candidate</div>
                      </div>
                      <div className="mb-3">
                        <div className="fw-semibold mb-1">Answer the question</div>
                        {/* Mic meter (green) */}
                        <div className="mic-meter" aria-label="Microphone level" role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={audioLevel * 100} style={{height: '10px', background: '#e9ecef', borderRadius: '9999px', overflow: 'hidden'}}>
                          <div id="micMeterFill" style={{height: '100%', width: `${audioLevel * 100}%`, background: 'linear-gradient(90deg, #20c997, #198754)', transition: 'width 100ms linear'}} />
                        </div>
                        <div id="micStatus" className={`text-secondary mt-2 ${audioLevel < 0.2 ? 'text-danger' : ''}`} style={{fontSize: '0.85rem'}}>
                          <i className="fas fa-microphone-alt me-2" /> {audioLevel < 0.2 ? 'Too quiet' : 'Loud and clear'}
                        </div>
                      </div>
                      {/* Question Section */}
                      <div className="mb-3">
                        <div className="fw-semibold text-dark small mb-1">Current Question</div>
                        <div className="p-2 bg-light rounded border small">
                          <span className="fw-bold">#{currentQuestion?.question?.id}: {currentQuestion?.question?.title}</span> <br />
                          <span className="text-secondary">{currentQuestion?.question?.description}</span>
                        </div>
                      </div>
                      <div className="d-grid">
                        <button id="finaliseBtn" className="btn btn-primary btn-sm"   onClick={stopRecording} disabled={isSubmitting || !isRecording} >Finalise answer</button>
                      </div>
                      <div className="d-flex gap-2 mt-3">
                        <button id="skipBtn" className="btn btn-outline-secondary btn-sm w-100"  onClick={handleSkipQuestion} disabled={isSubmitting } >Skip question</button>
                        <button id="exitBtn" className="btn btn-outline-secondary btn-sm w-100"  onClick={handleExitInterview} disabled={isSubmitting } >Exit interview</button>
                      </div>
                    </div>
                  </div>
                  {/* /Overlay Card */}
                </div>
                {isSubmitting && (
        <div className="position-fixed top-50 start-50 translate-middle text-center" style={{ zIndex: 1050, backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '2rem', borderRadius: '10px', boxShadow: '0 0 20px rgba(0,0,0,0.2)' }}>
            <div className="mb-3">
                <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
            </div>
            <h4>Finalizing Your Report</h4>
            <p className="text-muted">Please wait while we analyze your response...</p>
            <div className="progress mt-3" style={{ height: '10px' }}>
                <div 
                    className="progress-bar progress-bar-striped progress-bar-animated" 
                    role="progressbar" 
                    style={{ width: '100%' }}
                ></div>
            </div>
        </div>
    )}
                {/* /Video area */}
              </div>
            </div>
          </div>
        </div>
      </div>
        </MasterLayout>
    );



    
    // return (
    //     <MasterLayout>
    //         <div className="row mb-4">
    //             <div className="col-12 col-xl-12 p-0">
    //                 <div className="card h-100 p-0">
    //                     <div className="card-body p-0">
    //                         <div className="ratio ratio-16x9">
    //                         <video 
    //             // ref={videoRef}
    //             src={`${baseUrl}/videos/MPF Interview Questions/${currentQuestion?.question?.title?.replace(/\?+$/, '_')}.mp4`} 
    //             autoPlay 
    //             // muted={!hasMicAccess}
    //             controls={false}
    //             // onEnded={startRecording}
    //             // className={`fullscreen-video ${isRecording ? 'd-none' : ''}`}
    //         />
    //                             {/* <iframe id="introVideo"
    //                                 src={`${baseUrl}/videos/MPF Interview Questions/${currentQuestion?.title.replace(/\?+$/, '_')}.mp4`} 
    //                                 title="Job Interview Simulation and Training"
    //                                 allow="autoplay; encrypted-media; clipboard-write; picture-in-picture; web-share"
    //                                 allowFullScreen loading="eager" referrerPolicy="origin-when-cross-origin">
    //                             </iframe> */}
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </MasterLayout>
    // )
}
