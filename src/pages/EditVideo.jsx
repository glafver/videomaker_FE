import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Row, Button } from 'react-bootstrap'
import Slides from '../components/Slides'
import SlideSettings from '../components/SlideSettings'
import { useNavigate } from 'react-router-dom'

const EditVideo = () => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
    const [slides, setSlides] = useState()
    const navigate = useNavigate()

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
                        <SlideSettings slides={slides} currentSlideIndex={currentSlideIndex} />
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
                    style={{ marginLeft: '50%' }}
                    onClick={() => { console.log('create video!') }}>Create video! </Button>
            </>
        </Container>
    )
}

export default EditVideo