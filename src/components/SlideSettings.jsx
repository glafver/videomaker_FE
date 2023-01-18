import React, { useState, useEffect } from 'react'
import { Form, Row, Col } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import SlideSettingsTransitions from './SlideSettingsTransitions'

const SlideSettings = ({
    slides,
    currentSlideIndex
}) => {

    const [duration, setDuration] = useState(1);

    const {
        register,
        reset,
        watch
    } = useForm();

    const watchForm = watch()

    const mouseLeftSettings = () => {
        slides[currentSlideIndex].duration = duration
        slides[currentSlideIndex].transition = watchForm.transition
        slides[currentSlideIndex].caption = watchForm.caption
        localStorage.setItem('slides', JSON.stringify(slides))
        window.dispatchEvent(new Event('storage'))
    }

    useEffect(() => {
        if (!slides) {
            return
        }

        setDuration(slides[currentSlideIndex].duration)
        reset({
            transition: slides[currentSlideIndex].transition,
            caption: slides[currentSlideIndex].caption
        })
    }, [slides, currentSlideIndex])

    return (
        <div onMouseOut={() => { mouseLeftSettings() }}>
            <div className='h3'>Slide {currentSlideIndex + 1} Settings</div>
            <Form >
                <Form.Group as={Row} controlId="duration">
                    <Form.Label>Duration:</Form.Label>
                    <Col xs="9">
                        <Form.Range
                            value={duration}
                            onChange={e => setDuration(e.target.value)}
                            min='1'
                            max='5'
                            name='duration'
                        />
                    </Col>
                    <Col xs="3 d-flex align-items-center">
                        <Form.Control
                            value={duration}
                            onChange={e => setDuration(e.target.value)}
                        /> <span className='ms-2'> sec</span>

                    </Col>
                </Form.Group>
                <hr />
                <SlideSettingsTransitions register={register} watch={watch} />
            </Form>
        </div>
    )
}

export default SlideSettings