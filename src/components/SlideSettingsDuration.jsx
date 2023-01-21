import React, { useState } from 'react'
import { Form, Row, Col } from 'react-bootstrap'

const SlideSettingsDuration = ({ slides, currentSlideIndex, setDuration, duration }) => {

    const [durationToAll, setDurationToAll] = useState(false)

    return (
        <Form.Group as={Row} controlId="duration" >
            <Form.Label className='m-0'>Duration:</Form.Label>
            <Col xs="9">
                <Form.Range
                    disabled={durationToAll}
                    value={duration}
                    onChange={e => {
                        setDuration(e.target.value)
                        slides[currentSlideIndex].duration = e.target.value
                        localStorage.setItem('slides', JSON.stringify(slides))
                        window.dispatchEvent(new Event('storage'))
                    }}
                    min='1'
                    max='5'
                    name='duration'
                />
            </Col>
            <Col xs="3 d-flex align-items-center">
                <Form.Control
                    style={{ width: '35px' }}
                    disabled={durationToAll}
                    value={duration}
                    onChange={e => {
                        setDuration(e.target.value)
                        slides[currentSlideIndex].duration = e.target.value
                        localStorage.setItem('slides', JSON.stringify(slides))
                        window.dispatchEvent(new Event('storage'))
                    }}
                /> <span className='ms-2'> sec</span>
            </Col>
            <Col>
                <Form.Check
                    label={`Apply to all`}
                    onChange={() => {
                        setDurationToAll(!durationToAll)
                        slides.forEach(slide => {
                            slide.duration = slides[currentSlideIndex].duration
                        });
                        localStorage.setItem('slides', JSON.stringify(slides))
                        window.dispatchEvent(new Event('storage'))
                    }}
                />
            </Col>
        </Form.Group>
    )
}

export default SlideSettingsDuration