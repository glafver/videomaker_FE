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
        let slidesLocal = localStorage.getItem('slides') ? JSON.parse(localStorage.getItem('slides')) : []
        setSlides(slidesLocal)
    }, [])

    useEffect(() => {
        window.addEventListener('storage', () => {
            let slidesLocal = localStorage.getItem('slides') ? JSON.parse(localStorage.getItem('slides')) : []
            setSlides(slidesLocal)
        })
    }, []);


    return (
        <>

            <Container className='text-center'>
                <div className='fs-1'>Quick start</div>
                <div className=''>Create a slideshow from photos</div>

                <UploadImages slides={slides} setSlides={setSlides} />

                <hr className="my-4" />

                <ImageGrid slides={slides} setSlides={setSlides} />

                {slides.length ? <Button variant='secondary' onClick={() => { navigate('/edit_video') }}>Continue <ArrowRight /> </Button> : null}

            </Container>
        </>
    )
}

export default HomePage