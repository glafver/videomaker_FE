import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const Footer = () => {
    return (
        <Navbar className='footer'>
            <Container>
                <div className='d-flex flex-column flex-md-row align-items-center justify-content-center w-100'>
                    2023 <span className='fw-bold fst-italic mx-2 vm-center'>
                        <img
                            alt=""
                            src="/images/favicon.png"
                            width="17"
                            className="d-inline-block"
                            style={{ marginRight: '-1px', marginTop: '-1px' }}
                        />Videomaker
                    </span>  for
                    <a href="https://se360.se/" target="_blank" className='fw-bold fst-italic mx-2'> SE360</a>
                    created by
                    <a href="https://www.linkedin.com/in/glafver/" target="_blank" className='fw-bold glafver'> glafver</a>
                </div>
            </Container>
        </Navbar>
    );
};

export default Footer;