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

    const [slideClicked, setSlideClicked] = useState(false)

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
                <Row className='edit-wrapper mb-4 g-0'>
                    <div className='col-8 edit-left'>
                        {slides && slides.length !== 0 &&
                            <div className='current-slide-wrapper'>
                                <img
                                    src={slides[currentSlideIndex].url} alt=""
                                    className='current-slide-image' />
                            </div>
                        }
                    </div>
                    <div className='col-4 edit-right'>
                        <SlideSettings slides={slides} currentSlideIndex={currentSlideIndex} slideClicked={slideClicked} setSlideClicked={setSlideClicked} />
                    </div>
                </Row>
                <Slides
                    setCurrentSlideIndex={setCurrentSlideIndex}
                    currentSlideIndex={currentSlideIndex}
                    slides={slides}
                    setSlides={setSlides}
                    setSlideClicked={setSlideClicked}
                />

                <Button
                    variant='secondary'
                    style={{ marginLeft: '50%' }}
                    onClick={() => { createVideo.create() }}>Create video! </Button>

                <StatusModal videoStatus={createVideo.videoStatus} orderId={createVideo.orderId} setVideoStatus={createVideo.setVideoStatus} />
            </>
        </Container>
    )
}

export default EditVideoPage