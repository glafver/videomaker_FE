import React, { useState, useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'
import { ThreeDotsVertical } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'

const VideoPage = () => {

    const [videoURL, setVideoURL] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        let video = localStorage.getItem('videoURL')
        setVideoURL(video)
        if (!video) {
            navigate('/')
        }
    }, [])


    return (
        <Container>
            <div className='d-flex flex-column align-items-center justify-content-center mt-5'>
                {videoURL &&
                    <>
                        <video width="400" controls>
                            <source src={videoURL} type="video/mp4" disablePictureInPicture disableRemotePlayback />
                        </video>

                        <p className='mt-5'>Press <ThreeDotsVertical /> to download your video</p>
                    </>
                }
                <div>
                    <Button className='videomaker-btn-pink mx-2' onClick={() => { navigate(-1) }}>Change video settings</Button>
                    <Button className='videomaker-btn-blue mx-2' onClick={() => { navigate('/') }}>Create a new video!</Button>
                </div>

            </div>
        </Container>
    )
}

export default VideoPage