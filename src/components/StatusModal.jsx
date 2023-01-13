import React, { useState, useEffect } from 'react'
import { RingLoader } from 'react-spinners'
import { Button, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const StatusModal = ({ videoStatus, orderId, create }) => {

    const navigate = useNavigate()

    useEffect(() => {
        if (videoStatus === 'READY') {
            localStorage.setItem('videoURL', `${import.meta.env.VITE_SERVER_BASE_URL}/video/${orderId}`)
            navigate('/your_video')
        }
    }, [videoStatus])


    return (
        <Modal show={videoStatus} dialogClassName='waiting-loading modal-dialog modal-dialog-centered'>
            {videoStatus === 'PREPARING' &&
                <>
                    <RingLoader size={250} color={'#8491c8'} />
                    <p className='mt-5'>Please wait, we prepare your video. It may take some time. Do not close the window.</p>
                </>
            }
            {videoStatus === 'FAILED' || videoStatus === 'UNKNOWN' &&
                <>
                    <p className='mt-5'>An error has occurred, please try again.</p>
                    <Button className='videomaker-btn-pink' onClick={() => { create() }}>Try again</Button>
                </>
            }
        </Modal>
    )
}

export default StatusModal