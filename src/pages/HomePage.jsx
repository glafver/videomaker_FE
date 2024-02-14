import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import UploadImages from '../components/UploadImages.jsx';
import ImageGrid from '../components/ImageGrid';
import { useNavigate } from 'react-router-dom';
import HowTo from '../components/HowTo.jsx';
import axios from 'axios';
import BenefitsSection from '../components/Benefits.jsx';
import { IoIosArrowForward } from "react-icons/io";
import Testimonials from '../components/Testimonials.jsx';
import { Bounce } from 'react-awesome-reveal';

const HomePage = () => {
    const navigate = useNavigate();
    const [slides, setSlides] = useState();
    const [message, setMessage] = useState();

    const maxFiles = 6;

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/status/wake_up`);

        window.addEventListener('storage', () => {
            let slidesLocal = localStorage.getItem('slides') ? JSON.parse(localStorage.getItem('slides')) : [];
            setSlides(slidesLocal);
        });
        window.dispatchEvent(new Event('storage'));
        localStorage.removeItem('videoURL');
        localStorage.removeItem('orderID');
        localStorage.removeItem('soundtrack');
    }, []);

    const uploadRef = useRef();

    const handleAddClick = () => {
        uploadRef.current.openFileUpload();
    };

    return (
        <div className='text-center page'>
            <div className="hero-section mb-5">
                <video className="hero-video" src="https://storage.googleapis.com/gafver_videomaker/hero-video.mp4" autoPlay loop muted />

                <div className="hero-title">
                    <Bounce triggerOnce>
                        <div>
                            <h1>Welcome to Videomaker</h1>
                            <p className='m-0'>
                                Boost your listings with Videomaker, the essential service for turning property photos into stunning video slideshows.
                            </p>
                        </div>
                    </Bounce>
                </div>

            </div>
            <Container >
                <BenefitsSection />

                <UploadImages ref={uploadRef} slides={slides} maxFiles={maxFiles} message={message} setMessage={setMessage} setSlides={setSlides} />

                {slides && slides.length
                    ? <div className='images-wrapper' >
                        <ImageGrid slides={slides} setMessage={setMessage} onAddClick={handleAddClick} />

                        <button className='button-18 mt-5' onClick={() => { navigate('/edit_video'); }}>Continue <IoIosArrowForward className='ms-3' /> </button>

                    </div>
                    : null}

                <HowTo />

                <Testimonials />

            </Container>
        </div>
    );
};

export default HomePage;