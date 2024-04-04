import React, { useState } from 'react';
import { Form, Col } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { transitions } from '../helpers/data.js';

const SlideSettingsTransitions = ({ slides, currentSlideIndex, transition, setTransition }) => {

    const [show, setShow] = useState(false);
    const [transitionToAll, setTransitionToAll] = useState(false);

    return (
        <div className='transition-wrapper'>
            <Form.Group controlId="transition">
                <div className=''>
                    <Form.Label>Transition:</Form.Label>
                    {!show
                        ? <FaEyeSlash onClick={() => setShow(!show)} style={{ cursor: 'pointer', marginLeft: '15px', color: '#374048' }} />
                        : <FaEye onClick={() => setShow(!show)} style={{ cursor: 'pointer', marginLeft: '15px', color: '#374048' }} />}
                </div>

                <Form.Select
                    disabled={transitionToAll}
                    onChange={e => {
                        setTransition(e.target.value);
                        slides[currentSlideIndex].transition = e.target.value;
                        localStorage.setItem('slides', JSON.stringify(slides));
                        window.dispatchEvent(new Event('storage'));
                    }}
                    value={transition}
                >
                    {transitions.map((transition, index) => (
                        <option
                            key={index} value={transition.value}>{transition.label}</option>
                    ))}
                </Form.Select>
            </Form.Group >
            <Col className='mt-2'>
                <Form.Check
                    label={`Apply to all`}
                    onChange={() => {
                        setTransitionToAll(!transitionToAll);
                        slides.forEach(slide => {
                            slide.transition = slides[currentSlideIndex].transition;
                        });
                        localStorage.setItem('slides', JSON.stringify(slides));
                        window.dispatchEvent(new Event('storage'));
                    }}
                />
            </Col>
            <img src={`/images/transitions/${transition}.gif`}
                className='transition-img'
                style={{ display: `${show ? '' : 'none'}` }} alt=""
            />
        </div>
    );
};

export default SlideSettingsTransitions;