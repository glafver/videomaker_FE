import React, { useState, useEffect, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import { IoCloudUploadOutline, IoTimerOutline, IoCloudDownloadOutline, IoRepeatOutline } from "react-icons/io5";
import { PiSlideshow, PiSpinnerGap } from "react-icons/pi";
import { Fade } from 'react-awesome-reveal';

const steps = [
    { icon: <IoCloudUploadOutline />, heading: 'Start with Your Photos', text: 'Upload your favorite photos to get started.' },
    { icon: <IoTimerOutline />, heading: 'Set Your Pace', text: 'Decide how long each slide should last.' },
    { icon: <IoRepeatOutline />, heading: 'Arrange Your Slides', text: 'Feel free to change the order of slides to tell your story.' },
    { icon: <PiSlideshow />, heading: 'Add Some Flair', text: 'Enhance your slideshow with transitions between slides.' },
    { icon: <PiSpinnerGap />, heading: 'Sit Back and Relax', text: 'Just hit the button and wait for your video to be crafted.' },
    { icon: <IoCloudDownloadOutline />, heading: 'Download and Enjoy', text: 'Save your video to your device and enjoy it anytime.' },
];

const HowTo = () => {
    const [activeStep, setActiveStep] = useState(0);
    const stepRefs = steps.map(() => useRef(null));

    const handleScroll = () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        const stepPositions = stepRefs.map(ref => ref.current.offsetTop);
        const newActiveStep = stepPositions.findIndex((pos, i) => stepPositions[i + 1] > scrollPosition);
        setActiveStep(newActiveStep >= 0 ? newActiveStep : steps.length);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className='how-to-section'>
            <Fade>
                <Row className='px-2'>
                    <Col md={6} style={{
                        backgroundImage: `url("https://storage.googleapis.com/gafver_videomaker/6087807-5.jpg")`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}>
                    </Col>
                    <Col md={6} className='d-flex flex-column'>
                        <div className='fs-3 fw-bold mb-4 py-4 header vm-center'>
                            How to use Videomaker?
                        </div>
                        {steps.map((step, index) => (
                            <Row className={`${activeStep === index ? 'active' : ''} flex-column flex-md-row`} ref={stepRefs[index]} key={index}>
                                <Col xs={12} md={3} className='vm-center border-right'>
                                    <div className='icon-wrapper my-4'>
                                        {step.icon}
                                    </div>
                                </Col>
                                <Col xs={12} md={9} className='text-center text-md-start my-md-4'>
                                    <div className='d-flex flex-column '>
                                        <div className='fw-bold'>Step {index + 1}: {step.heading}</div>
                                        <div>{step.text}</div>
                                    </div>
                                </Col>
                            </Row>
                        ))}
                    </Col>
                </Row>
            </Fade>
        </div >
    );
};

export default HowTo;;