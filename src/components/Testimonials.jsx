import React from 'react';
import { Carousel, Container, Col, Image } from 'react-bootstrap';
import { FaQuoteRight } from "react-icons/fa";
import { AttentionSeeker } from 'react-awesome-reveal';

const testimonials = [
    {
        quote: "As a new real estate startup in 2018, finding a platform that could showcase our properties vividly was crucial. Videomaker became our go-to solution, enabling us to present homes in their best light, which significantly impacted our sales.",
        author: "Erik Johansson, NordHus",
        imgSrc: "https://storage.googleapis.com/gafver_videomaker/agent-1.webp"
    },
    {
        quote: "The transition to online listings was a game-changer for us, and Videomaker's tool for creating video slideshows from property photos helped us stand out. Our listings now receive more views and inquiries than ever before.",
        author: "Sofia Lundberg, BostadSelect",
        imgSrc: "https://storage.googleapis.com/gafver_videomaker/agent-2.webp"
    },
    {
        quote: "In the competitive real estate market, differentiation is key. Videomaker allowed us to provide an immersive viewing experience to our clients, making our properties memorable and increasing engagement.",
        author: "Lars Magnusson, Fastighetsbyrån",
        imgSrc: "https://storage.googleapis.com/gafver_videomaker/agent-3.webp"
    }
];


const Testimonials = () => {
    return (
        <div className="testimonials-section">
            <div className="text-center fw-bold mb-3 vm-rect fs-2">What do our clients say?</div>
            <Carousel pause='hover' indicators={false} className="carousel-dark slide mx-auto">
                {testimonials.map((testimonial, index) => (
                    <Carousel.Item key={index} className='w-100 my-5'>
                        <Container className="d-flex flex-column flex-md-row w-75 testimonial-wrapper align-items-center">
                            <Col className='my-4'>
                                <Image src={testimonial.imgSrc} alt={testimonial.author} fluid />
                            </Col>
                            <Col lg={6} className="mx-auto p-2 p-md-4 fs-6 fs-md-5 position-relative">
                                <p className="text-end">"{testimonial.quote}" </p>
                                <p className='mt-3 text-end fw-bold fst-italic'>{testimonial.author}</p>
                                <FaQuoteRight className='quote-icon' />
                            </Col>
                        </Container>
                    </Carousel.Item>
                ))}
            </Carousel>
            <AttentionSeeker effect='heartBeat'>
                <button className='button-18 mt-5' onClick={() => document.getElementById('quick-start').scrollIntoView({ behavior: 'smooth' })}>Try it now!</button>
            </AttentionSeeker>
        </div>
    );
};

export default Testimonials;
