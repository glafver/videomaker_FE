import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Download } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import useDeleteImage from '../hooks/useDeleteImage'
import { WhatsappShareButton, WhatsappIcon, TelegramShareButton, TelegramIcon, FacebookMessengerShareButton, FacebookMessengerIcon, EmailShareButton, EmailIcon } from "react-share"

const VideoPage = () => {

    const [videoURL, setVideoURL] = useState(null)
    const [copied, setCopied] = useState(false)

    const navigate = useNavigate()

    const deleteImageMutation = useDeleteImage()

    const shareURL = `${import.meta.env.VITE_DEPLOY_URL}/share/${localStorage.getItem('userID')}/${localStorage.getItem('orderID')}`
    const quote = 'Have a look at my video!'

    const clearAll = async () => {
        let slidesLocal = JSON.parse(localStorage.getItem('slides'))
        localStorage.removeItem('slides')
        slidesLocal.forEach(slide => {
            deleteImageMutation.mutate(slide)
        });
        navigate('/')
    }

    const goToSettings = () => {
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
                        <video className='video' controls disablePictureInPicture disableRemotePlayback controlsList="noplaybackrate nodownload">
                            <source src={videoURL} type="video/mp4" onError={() => { clearAll() }} />
                        </video>

                        <p className='mt-3 fw-bold'>
                            Download your video:
                            <a download href={videoURL}>
                                <Download className='download-video' />
                            </a>
                        </p>

                        <div className='share-link-wrapper pb-4'>
                            <p className='mb-1 fw-bold'>{!copied ? 'Copy link:' : 'Link copied!'}</p>
                            <div className='link'
                                onClick={() => {
                                    navigator.clipboard.writeText(shareURL)
                                    setCopied(true)
                                }}
                            >{shareURL}</div>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <span className='me-2 fw-bold'>Share:</span>
                            <WhatsappShareButton
                                url={shareURL}
                                quote={quote}>
                                <WhatsappIcon size={32} round={true} />
                            </WhatsappShareButton>
                            <TelegramShareButton
                                url={shareURL}
                                quote={quote}>
                                <TelegramIcon size={32} round={true} />
                            </TelegramShareButton>
                            <EmailShareButton
                                url={shareURL}
                                quote={quote}>
                                <EmailIcon size={32} round={true} />
                            </EmailShareButton>
                            <FacebookMessengerShareButton
                                url={shareURL}
                                quote={quote}>
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