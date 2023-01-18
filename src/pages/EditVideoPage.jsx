import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Row, Button } from 'react-bootstrap'
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
                <Row className='edit-wrapper g-0'>
                    <div className='col-8 edit-left'>
                        {slides && slides.length !== 0 &&
                            <div className='current-slide-wrapper'>
                                <img
                                    src={slides[currentSlideIndex].url} alt=""
                                    className='current-slide-image' />
                            </div>
                        }
                    </div>
                    <div className='col-4 edit-right' >
                        <SlideSettings slides={slides} currentSlideIndex={currentSlideIndex}
                        />
                    </div>
                </Row>
                <Slides
                    setCurrentSlideIndex={setCurrentSlideIndex}
                    currentSlideIndex={currentSlideIndex}
                    slides={slides}
                    setSlides={setSlides}
                />

                <Button
                    variant='secondary'
                    className='create-video-btn'
                    onClick={() => { createVideo.create() }}>Create video! </Button>

                <StatusModal videoStatus={createVideo.videoStatus} orderId={createVideo.orderId} setVideoStatus={createVideo.setVideoStatus} />
            </>
        </Container>
    )
}

export default EditVideoPage