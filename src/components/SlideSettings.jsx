import React, { useState, useEffect } from 'react'
import { Form, Row, Col, FormGroup } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import FormGroupTransitions from './FormGroupTransitions'

const SlideSettings = ({
    slides,
    currentSlideIndex,
    slideClicked,
    setSlideClicked
}) => {

    const [duration, setDuration] = useState(1);

    const [previousSlideIndex, setPreviousSlideIndex] = useState(0)

    const {
        register,
        reset,
        watch,
        formState: { errors },
    } = useForm();

    const watchForm = watch()

    useEffect(() => {
        if (!slides) {
            return
        }
        setDuration(slides[currentSlideIndex].duration)
        reset({
            transition: slides[currentSlideIndex].transition,
            caption: slides[currentSlideIndex].caption
        })
    }, [slides])

    useEffect(() => {
        if (!slides) {
            return
        }
        slides[previousSlideIndex].duration = duration
        slides[previousSlideIndex].transition = watchForm.transition
        slides[previousSlideIndex].caption = watchForm.caption
        localStorage.setItem('slides', JSON.stringify(slides))
        window.dispatchEvent(new Event('storage'))

        setPreviousSlideIndex(currentSlideIndex)
        setSlideClicked(false)
        setDuration(slides[currentSlideIndex].duration)
        reset({
            transition: slides[currentSlideIndex].transition,
            caption: slides[currentSlideIndex].caption
        })
    }, [slideClicked])

    return (
        <>
            <div className='h3'>{currentSlideIndex + 1} Slide Settings</div>
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
                <FormGroup>
                    <Form.Label>Caption (15 letters max.):</Form.Label>
                    <Form.Control
                        type="text"
                        name='caption'
                        {...register("caption", { maxLength: 15 })}
                    />
                </FormGroup>

                <hr />
                <FormGroupTransitions register={register} watch={watch} />
            </Form>
        </>
    )
}

export default SlideSettings