import React from "react";


const FeedbackComponent = () => {
  return (
    <>
      <div className="row mt-2 gx-2 mb-4">
        <div className="col-6">
          <div className="card">
            <div className="card-header py-3">
              <div
                className="icon-item icon-item-md rounded-1 d-inline-block px-2 py-2 me-2"
                style="background-color: #ece5fc">
                <span className="fa-solid fa-code-compare fs-7" style="color: #ba67ef"></span>
              </div>
              <span className="h5"> Core Feedback</span>
            </div>
            <div className="card-body p-4">
              <div className="feedback-checklist p-0">
           
                <div className="item d-flex align-items-start gap-3">
                  <div className="icon flex-shrink-0">
                    <i className="fa-solid fa-check text-success"></i>
                  </div>
                  <div>
                    <h5 className="mb-1">Provide a Clear Situation</h5>
                    <p>
                      Describe a specific time and context where you had to perform under
                      pressure.
                    </p>
                  </div>
                </div>

        
                <div className="item d-flex align-items-start gap-3">
                  <div className="icon flex-shrink-0">
                    <i className="fa-solid fa-check text-success"></i>
                  </div>
                  <div>
                    <h5 className="mb-1">Define Your Task</h5>
                    <p>Clearly state what your responsibilities were in that situation.</p>
                  </div>
                </div>

                <div className="item d-flex align-items-start gap-3">
                  <div className="icon flex-shrink-0">
                    <i className="fa-solid fa-check text-success"></i>
                  </div>
                  <div>
                    <h5 className="mb-1">Detail Your Actions</h5>
                    <p>Explain the specific actions you took to address the pressure.</p>
                  </div>
                </div>

           
                <div className="item d-flex align-items-start gap-3">
                  <div className="icon flex-shrink-0">
                    <i className="fa-solid fa-check text-success"></i>
                  </div>
                  <div>
                    <h5 className="text-success mb-1">Share Measurable Results</h5>
                    <p>
                      Conclude with the outcomes of your actions, including reflections on
                      what you learned.
                    </p>
                  </div>
                </div>
             
                <div className="item d-flex align-items-start gap-3">
                  <div className="icon flex-shrink-0">
                    <i className="fa-solid fa-check text-success"></i>
                  </div>
                  <div>
                    <h5 className="mb-1">Provide a Clear Situation</h5>
                    <p>
                      Describe a specific time and context where you had to perform under
                      pressure.
                    </p>
                  </div>
                </div>

          
                <div className="item d-flex align-items-start gap-3">
                  <div className="icon flex-shrink-0">
                    <i className="fa-solid fa-check text-success"></i>
                  </div>
                  <div>
                    <h5 className="mb-1">Define Your Task</h5>
                    <p>Clearly state what your responsibilities were in that situation.</p>
                  </div>
                </div>

       
                <div className="item d-flex align-items-start gap-3">
                  <div className="icon flex-shrink-0">
                    <i className="fa-solid fa-check text-success"></i>
                  </div>
                  <div>
                    <h5 className="mb-1">Detail Your Actions</h5>
                    <p>Explain the specific actions you took to address the pressure.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="card">
            <div className="card-header py-3">
              <div
                className="icon-item icon-item-md rounded-1 d-inline-block px-2 py-2 me-2"
                style={{backgroundColor: '#ece5fc'}}>
                <span className="fa-solid fa-comments fs-7" style="color: #ba67ef"></span>
              </div>
              <span className="h5"> Interview Transcript</span>
            </div>
            <div className="card-body p-5">

              <section className="chat-transcript py-0">

                <div className="chat-row">
                  <div className="meta">Question asked by <strong>MyPathfinder</strong></div>
                  <div className="bubble bubble--mpf">
                    Can you think of a time when you had to perform under pressure? What
                    happened?
                  </div>
                </div>

                <div className="chat-row right">
                  <div className="meta">Your response</div>
                  <div className="bubble bubble--user">
                    
                    In a past role, we had a client presentation coming up and the team was
                    running late. I reminded everyone about the deadline and worked extra hours
                    to help get things done. In the end, we managed to finish the presentation
                    and the client seemed satisfied.
                  </div>
                </div>


                <div className="chat-row">
                  <div className="meta">Ideal Response by <strong>MyPathfinder</strong></div>
                  <div className="bubble bubble--ideal">
                    In my previous role as a project manager, I faced a tight deadline for a
                    major client presentation. The situation was stressful as the team was
                    behind schedule. My task was to ensure that we delivered a polished
                    presentation on time. I organized a series of focused meetings to prioritize
                    tasks and delegated responsibilities effectively. As a result, we completed
                    the presentation a day early, received positive feedback from the client,
                    and I learned the importance of clear communication under pressure.
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedbackComponent;
