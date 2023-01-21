import React, { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap'
import SlideSettingsTransitions from './SlideSettingsTransitions'
import SlideSettingsDuration from './SlideSettingsDuration'
import SlideSettingsSondtrack from './SlideSettingsSondtrack'

const SlideSettings = ({
    slides,
    currentSlideIndex
}) => {

    const [duration, setDuration] = useState(1);
    const [transition, setTransition] = useState('fade')

    useEffect(() => {
        if (!slides) {
            return
        }

        setDuration(slides[currentSlideIndex].duration)
        setTransition(slides[currentSlideIndex].transition)

    }, [slides, currentSlideIndex])

    return (
        <div>
            <div className='h4'>Slide {currentSlideIndex + 1} Settings</div>
            <Form >
                <SlideSettingsDuration slides={slides} currentSlideIndex={currentSlideIndex} duration={duration} setDuration={setDuration} />
                <hr />
                <div className='settings-wrapper'>
                    <SlideSettingsTransitions slides={slides} currentSlideIndex={currentSlideIndex} transition={transition} setTransition={setTransition} />
                    <SlideSettingsSondtrack />
                </div>
            </Form>
        </div>
    )
}

export default SlideSettings