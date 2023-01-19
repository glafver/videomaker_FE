import React from 'react'
import { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Slides from '../components/Slides'
import SlideSettings from '../components/SlideSettings'
import { useNavigate } from 'react-router-dom'
import StatusModal from '../components/StatusModal'
import useCreateVideo from '../hooks/useCreateVideo'

const EditVideoPage = () => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const [slides, setSlides] = useState()

    const navigate = useNavigate()

    const createVideo = useCreateVideo()

    useEffect(() => {
        window.addEventListener('storage', () => {
            let slidesLocal = localStorage.getItem('slides') ? JSON.parse(localStorage.getItem('slides')) : []
            setSlides(slidesLocal)
            if (slidesLocal.length === 0) {
                navigate('/')
                return
            }
        })
        window.dispatchEvent(new Event('storage'))
    }, [])

    return (
        <Container>
            <>
                <div className='edit-wrapper'>
                    <div className='edit-left'>
                        {slides && slides.length !== 0 &&
                            <div className='current-slide-wrapper'>
                                <img
                                    src={slides[currentSlideIndex].url} alt=""
                                    className='current-slide-image' />
                            </div>
                        }
                    </div>
                    <div className='edit-right' >
                        <SlideSettings slides={slides} currentSlideIndex={currentSlideIndex}
                        />
                    </div>
                </div>
                <Slides
                    setCurrentSlideIndex={setCurrentSlideIndex}
                    currentSlideIndex={currentSlideIndex}
                    slides={slides}
                    setSlides={setSlides}
                />

                <button
                    className='create-video-btn button-52 button-52-blue'
                    onClick={() => { createVideo.create() }}>Create video! </button>

                <StatusModal videoStatus={createVideo.videoStatus} orderId={createVideo.orderId} setVideoStatus={createVideo.setVideoStatus} />
            </>
        </Container>
    )
}

export default EditVideoPage