import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const Footer = () => {
    return (
        <Navbar bg="dark" variant="dark" className='footer'>
            <Container>
                <div className='d-flex justify-content-center w-100'>
                    2023 - Videomaker - created by <a href="https://www.linkedin.com/in/glafver/" target="_blank"> @glafver</a>
                </div>
            </Container>
        </Navbar>
    )
}

export default Footer