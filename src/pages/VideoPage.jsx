import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Download } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import useDeleteImage from '../hooks/useDeleteImage'
import useDeleteVideo from '../hooks/useDeleteVideo'
import { WhatsappShareButton, WhatsappIcon, TelegramShareButton, TelegramIcon, FacebookMessengerShareButton, FacebookMessengerIcon, EmailShareButton, EmailIcon } from "react-share"

const VideoPage = () => {

    const [videoURL, setVideoURL] = useState(null)
    const [copied, setCopied] = useState(false)

    const navigate = useNavigate()

    const deleteImageMutation = useDeleteImage()
    const deleteVideoMutation = useDeleteVideo()

    const shareURL = `${import.meta.env.VITE_DEPLOY_URL}/share/${localStorage.getItem('userID')}/${localStorage.getItem('orderID')}`

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
        navigate(-1)
    }

    useEffect(() => {
        let video = localStorage.getItem('videoURL')
        setVideoURL(video)
    }, [])

    return (
        <Container className='page'>
            <div className='d-flex flex-column align-items-center justify-content-center mt-3'>
                {videoURL &&
                    <>
                        <video width="100%" controls disablePictureInPicture disableRemotePlayback controlsList="noplaybackrate nodownload">
                            <source src={videoURL} type="video/mp4" onError={() => { clearAll() }} />
                        </video>

                        <p className='mt-3 fw-bold'>
                            Download your video:
                            <a download href={videoURL}>
                                <Download className='download-video' />
                            </a>
                        </p>

                        <div className='w-100 d-flex align-items-center justify-content-center flex-wrap pb-4'>
                            <p className='mb-1 fw-bold'>{!copied ? 'Copy link:' : 'Link copied!'}</p>
                            <div className='share-link-wrapper'>
                                <div className='link'
                                    onClick={() => {
                                        navigator.clipboard.writeText(shareURL)
                                        setCopied(true)
                                    }}
                                >{shareURL}</div>
                            </div>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <span className='me-2 fw-bold'>Share:</span>
                            <WhatsappShareButton
                                url={shareURL}
                                quote={'Have a look at my video!'}>
                                <WhatsappIcon size={32} round={true} />
                            </WhatsappShareButton>
                            <TelegramShareButton
                                url={shareURL}
                                quote={'Have a look at my video!'}>
                                <TelegramIcon size={32} round={true} />
                            </TelegramShareButton>
                            <EmailShareButton
                                url={shareURL}
                                quote={'Have a look at my video!'}>
                                <EmailIcon size={32} round={true} />
                            </EmailShareButton>
                            <FacebookMessengerShareButton
                                url={shareURL}
                                quote={'Have a look at my video!'}>
                                <FacebookMessengerIcon size={32} round={true} />
                            </FacebookMessengerShareButton>
                        </div>
                    </>
                }
                <div className='video-page-btn-wrapper'>
                    <button className='button-videomaker-pink button-videomaker' onClick={() => { goToSettings() }}>Change video settings</button>
                    <button className='button-videomaker-blue button-videomaker' onClick={() => { clearAll() }}>Create a new video!</button>
                </div>

            </div>
        </Container >
    )
}

export default VideoPage