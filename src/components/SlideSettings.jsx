import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import SlideSettingsTransitions from './SlideSettingsTransitions';
import SlideSettingsDuration from './SlideSettingsDuration';
import SlideSettingsSondtrack from './SlideSettingsSondtrack';

const SlideSettings = ({
    slides,
    currentSlideIndex
}) => {

    const [duration, setDuration] = useState(1);
    const [transition, setTransition] = useState('fade');

    useEffect(() => {
        if (!slides) {
            return;
        }

        setDuration(slides[currentSlideIndex].duration);
        setTransition(slides[currentSlideIndex].transition);

    }, [slides, currentSlideIndex]);

    return (
        <Form className='h-100 d-flex flex-column'>
            <div style={{ padding: '16px' }}>
                <div className='h4 text-center fw-bold'>Slide {currentSlideIndex + 1} Settings</div>
                <SlideSettingsDuration slides={slides} currentSlideIndex={currentSlideIndex} duration={duration} setDuration={setDuration} />
            </div>

            <hr />

            <div className='settings-wrapper'>
                <SlideSettingsTransitions slides={slides} currentSlideIndex={currentSlideIndex} transition={transition} setTransition={setTransition} />
                <SlideSettingsSondtrack />
            </div>
        </Form>
    );
};

export default SlideSettings;