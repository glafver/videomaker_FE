import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import UploadImages from '../components/UploadImages.jsx';
import ImageGrid from '../components/ImageGrid'
import Button from 'react-bootstrap/esm/Button';
import { ArrowRight } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom'

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

            <Container className='text-center'>
                <div className='fs-1'>Quick start</div>
                <div className=''>Create a slideshow from photos</div>

                <UploadImages />

                <hr className="my-4" />

                <ImageGrid slides={slides} />

                {slides.length ? <Button variant='secondary' onClick={() => { navigate('/edit_video') }}>Continue <ArrowRight /> </Button> : null}

            </Container>
        </>
    )
}

export default HomePage