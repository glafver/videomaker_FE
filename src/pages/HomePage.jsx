import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import UploadImages from '../components/UploadImages.jsx';
import ImageGrid from '../components/ImageGrid'
import Button from 'react-bootstrap/esm/Button';
import { ArrowRight } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom'
import HowTo from '../components/HowTo.jsx';

const HomePage = () => {
    const navigate = useNavigate()
    const [slides, setSlides] = useState([])

    useEffect(() => {
        window.addEventListener('storage', () => {
            let slidesLocal = localStorage.getItem('slides') ? JSON.parse(localStorage.getItem('slides')) : []
            setSlides(slidesLocal)
        })
        window.dispatchEvent(new Event('storage'))
    }, []);


    return (
        <>

            <Container className='text-center home-page'>
                <div className='fs-1'>Quick start</div>
                <div className='h5'>Create a slideshow from photos</div>

                <UploadImages />

                {slides.length
                    ? <div className='images-wrapper' >
                        <ImageGrid slides={slides} />

                        <Button variant='secondary' onClick={() => { navigate('/edit_video') }}>Continue <ArrowRight /> </Button>
                    </div>
                    : null}
                <HowTo />

            </Container>
        </>
    )
}

export default HomePage