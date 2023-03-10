import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import UploadImages from '../components/UploadImages.jsx';
import ImageGrid from '../components/ImageGrid'
import { ArrowRight } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom'
import HowTo from '../components/HowTo.jsx';
import axios from 'axios'

const HomePage = () => {
    const navigate = useNavigate()
    const [slides, setSlides] = useState()
    const [maxFiles, setMaxFiles] = useState(6)
    const [message, setMessage] = useState()

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/status/wake_up`)
        
        window.addEventListener('storage', () => {
            let slidesLocal = localStorage.getItem('slides') ? JSON.parse(localStorage.getItem('slides')) : []
            setSlides(slidesLocal)
        })
        window.dispatchEvent(new Event('storage'))
        localStorage.removeItem('videoURL')
        localStorage.removeItem('orderID')
        localStorage.removeItem('soundtrack')
    }, []);

    return (
        <>
            <Container className='text-center home-page page'>
                <div className='fs-1'>Quick start</div>
                <div className='h5'>Create a slideshow from photos</div>

                < UploadImages slides={slides} maxFiles={maxFiles} message={message} setMessage={setMessage} />

                {slides && slides.length
                    ? <div className='images-wrapper' >
                        <ImageGrid slides={slides} setMessage={setMessage} />

                        <button className='button-videomaker' onClick={() => { navigate('/edit_video') }}>Continue <ArrowRight /> </button>
                    </div>
                    : null}
                <HowTo />

            </Container>
        </>
    )
}

export default HomePage