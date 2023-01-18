import React, { useState, useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'
import { Download } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import useDeleteImage from '../hooks/useDeleteImage'
import useDeleteVideo from '../hooks/useDeleteVideo'

const VideoPage = () => {

    const [videoURL, setVideoURL] = useState(null)

    const navigate = useNavigate()

    const deleteImageMutation = useDeleteImage()
    const deleteVideoMutation = useDeleteVideo()

    const clearAll = () => {
        let slidesLocal = JSON.parse(localStorage.getItem('slides'))
        slidesLocal.forEach(slide => {
            deleteImageMutation.mutate(slide)
        });
        deleteVideoMutation.mutate()
        localStorage.removeItem('orderID')
        navigate('/')
    }

    const goToSettings = () => {
        deleteVideoMutation.mutate()
        localStorage.removeItem('orderID')
        navigate(-1)
    }

    useEffect(() => {
        let video = localStorage.getItem('videoURL')
        setVideoURL(video)
    }, [])

    return (
        <Container>
            <div className='d-flex flex-column align-items-center justify-content-center mt-3'>
                {videoURL &&
                    <>
                        <video width="75%" controls>
                            <source src={videoURL} type="video/mp4" disablePictureInPicture disableRemotePlayback onError={() => { clearAll() }} />
                        </video>

                        <p className='mt-3'>Press
                            <a href={videoURL}>
                                <Button className='videomaker-btn-blue mx-2'>
                                    <Download />
                                </Button>
                            </a>to download your video</p>
                    </>
                }
                <div>
                    <Button className='videomaker-btn-pink mx-2' onClick={() => { goToSettings() }}>Change video settings</Button>
                    <Button className='videomaker-btn-blue mx-2' onClick={() => { clearAll() }}>Create a new video!</Button>
                </div>

            </div>
        </Container>
    )
}

export default VideoPage