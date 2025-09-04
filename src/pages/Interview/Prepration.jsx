import React from 'react'
import MasterLayout from "../../masterLayout/MasterLayout";

export default function Prepration() {
    return (
        <MasterLayout>
            <div className="row mb-4">
                <div className="col-12 col-xl-12 p-0">
                    <div className="card h-100 p-0">
                        <div className="card-body p-0">
                            <div className="ratio ratio-16x9">
                                <iframe id="introVideo"
                                    src="https://www.youtube.com/embed/2zKsBfsrxrs?autoplay=1&mute=1&playsinline=1&rel=0"
                                    title="Job Interview Simulation and Training"
                                    allow="autoplay; encrypted-media; clipboard-write; picture-in-picture; web-share"
                                    allowFullScreen loading="eager" referrerPolicy="origin-when-cross-origin">
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MasterLayout>
    )
}
