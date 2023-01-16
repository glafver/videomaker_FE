import React, { useState, useRef } from 'react'
import { Form } from 'react-bootstrap'
import { Eye } from 'react-bootstrap-icons';

const FormGroupTransitions = ({ register, watch }) => {

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
    const target = useRef(null);

    const watchTransition = watch('transition')

    return (
        <>
            <Form.Group controlId="transition">
                <div className=''>
                    <Form.Label>Transition:</Form.Label>
                    {watchTransition && <Eye ref={target} onClick={() => setShow(!show)} style={{ cursor: 'pointer', marginLeft: '15px' }}></Eye>}

                </div>

                <Form.Select
                    {...register("transition")}
                >
                    {transitions.map((transition, index) => (
                        <option key={index} value={transition.value}>{transition.label}</option>
                    ))}
                </Form.Select>
            </Form.Group >
            {watchTransition &&
                <img src={`/images/transitions/${watchTransition}.gif`} className='transition-img' style={{ display: `${show ? '' : 'none'}` }} alt="" />
            }
        </>
    )
}

export default FormGroupTransitions