import React, { useState, useEffect } from 'react'
import { Form, Row, Col, Button, FormGroup } from 'react-bootstrap'
import { useForm } from 'react-hook-form'

const SlideSettings = ({
    slides,
    currentSlideIndex
}) => {

    const [duration, setDuration] = useState(0);
    const [slideUpdated, setSlideUpdated] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        slides[currentSlideIndex].transition = data.transition
        slides[currentSlideIndex].duration = duration
        slides[currentSlideIndex].caption = data.caption
        localStorage.setItem('slides', JSON.stringify(slides))
        setSlideUpdated(true)
    };

    useEffect(() => {
        if (!slides) {
            return
        }
        setSlideUpdated(false)
        setDuration(slides[currentSlideIndex].duration)
        reset({
            transition: slides[currentSlideIndex].transition,
            caption: slides[currentSlideIndex].caption
        })
    }, [slides, currentSlideIndex])

    return (
        <>
            <div className='h3'>{currentSlideIndex + 1} Slide Settings</div>
            <Form onSubmit={handleSubmit(onSubmit)}>
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
                <Form.Group controlId="transition">
                    <Form.Label>Transition:</Form.Label>
                    <Row>
                        <Col xs='4'>
                            <Form.Check
                                type='radio'
                                label={`Fade-in`}
                                name='transition'
                                value={'fade-in'}
                                {...register("transition")}
                            />
                        </Col>
                        <Col xs='4'>
                            <Form.Check
                                type='radio'
                                label={`Fade-out`}
                                name='transition'
                                value={'fade-out'}
                                {...register("transition")}
                            />
                        </Col>
                        <Col xs='4'>
                            <Form.Check
                                type='radio'
                                label={`Dissolve`}
                                name='transition'
                                value={'dissolve'}
                                {...register("transition")}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <hr />
                <FormGroup>
                    <Form.Label>Caption (5 letters max.):</Form.Label>
                    <Form.Control
                        type="text"
                        name='caption'
                        {...register("caption", { maxLength: 5 })}
                    />
                    {errors.caption && <p role="alert" style={{ color: '#b02a37' }}>Too long caption!</p>}
                </FormGroup>
                <hr />
                <Button variant="primary" type="submit" className='my-2'>
                    Submit
                </Button>
                {slideUpdated && <p>Slide settings updated!</p>}
            </Form>
        </>
    )
}

export default SlideSettings