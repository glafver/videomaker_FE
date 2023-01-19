import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Download } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import useDeleteImage from '../hooks/useDeleteImage'
import useDeleteVideo from '../hooks/useDeleteVideo'

const VideoPage = () => {

    const [videoURL, setVideoURL] = useState(null)

    const navigate = useNavigate()

    const deleteImageMutation = useDeleteImage()
    const deleteVideoMutation = useDeleteVideo()

    const clearAll = async () => {
        let slidesLocal = JSON.parse(localStorage.getItem('slides'))
        slidesLocal.forEach(slide => {
            deleteImageMutation.mutate(slide)
        });
        deleteVideoMutation.mutate()
        localStorage.removeItem('orderID')
        localStorage.removeItem('soundtrack')
        navigate('/')
    }

    const goToSettings = () => {
        deleteVideoMutation.mutate()
        localStorage.removeItem('orderID')
        localStorage.removeItem('soundtrack')
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
                        <video width="75%" controls disablePictureInPicture disableRemotePlayback controlsList="noplaybackrate nodownload">
                            <source src={videoURL} type="video/mp4" onError={() => { clearAll() }} />
                        </video>

                        <p className='mt-3'>Press
                            <a download href={videoURL}>
                                <button className='download-btn button-52'>
                                    <Download />
                                </button>
                            </a>to download your video</p>
                    </>
                }
                <div className='video-page-btn-wrapper'>
                    <button className='button-52-pink button-52' onClick={() => { goToSettings() }}>Change video settings</button>
                    <button className='button-52-blue button-52' onClick={() => { clearAll() }}>Create a new video!</button>
                </div>

            </div>
        </Container>
    )
}

export default VideoPage