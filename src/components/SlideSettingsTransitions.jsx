import React, { useState } from 'react'
import { Form, Col } from 'react-bootstrap'
import { Eye } from 'react-bootstrap-icons';

const SlideSettingsTransitions = ({ slides, currentSlideIndex, transition, setTransition }) => {

    const transitions = [
        {
            label: "Fade",
            value: 'fade'
        },
        {
            label: 'Circle close',
            value: 'circleclose'
        },
        {
            label: 'Circle open',
            value: 'circleopen'
        },
        {
            label: 'Diagonal bottom left',
            value: 'diagbl'
        },
        {
            label: 'Diagonal bottom right',
            value: 'diagbr'
        },
        {
            label: 'Diagonal top left',
            value: 'diagtl'
        },
        {
            label: 'Diagonal top right',
            value: 'diagtr'
        },
        {
            label: 'Horizontal close',
            value: 'horzclose'
        },
        {
            label: 'Horizontal open',
            value: 'horzopen'
        },
        {
            label: 'Smooth right',
            value: 'smoothright'
        },
        {
            label: 'Smooth left',
            value: 'smoothleft'
        },
        {
            label: 'Smooth up',
            value: 'smoothup'
        },
        {
            label: 'Smooth down',
            value: 'smoothdown'
        },
        {
            label: 'Vertical open',
            value: 'vertopen'
        },
        {
            label: 'Vertical close',
            value: 'vertclose'
        },
    ]

    const [show, setShow] = useState(false);
    const [transitionToAll, setTransitionToAll] = useState(false)

    return (
        <div className='transition-wrapper'>
            <Form.Group controlId="transition">
                <div className=''>
                    <Form.Label>Transition:</Form.Label>
                    <Eye onClick={() => setShow(!show)} style={{ cursor: 'pointer', marginLeft: '15px' }}></Eye>
                </div>

                <Form.Select
                    disabled={transitionToAll}
                    onChange={e => {
                        setTransition(e.target.value)
                        slides[currentSlideIndex].transition = e.target.value
                        localStorage.setItem('slides', JSON.stringify(slides))
                        window.dispatchEvent(new Event('storage'))
                    }}
                    value={transition}
                >
                    {transitions.map((transition, index) => (
                        <option key={index} value={transition.value}>{transition.label}</option>
                    ))}
                </Form.Select>
            </Form.Group >
            <Col className='mt-2'>
                <Form.Check
                    label={`Apply to all`}
                    onChange={() => {
                        setTransitionToAll(!transitionToAll)
                        slides.forEach(slide => {
                            slide.transition = slides[currentSlideIndex].transition
                        });
                        localStorage.setItem('slides', JSON.stringify(slides))
                        window.dispatchEvent(new Event('storage'))
                    }}
                />
            </Col>
            <img src={`/images/transitions/${transition}.gif`} className='transition-img' style={{ display: `${show ? '' : 'none'}` }} alt="" />
        </div>
    )
}

export default SlideSettingsTransitions