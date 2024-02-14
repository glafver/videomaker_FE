import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

const Navigation = () => {
    return (
        <Navbar >
            <Container>
                <Navbar.Brand href="/" className='fs-2'>
                    <Image
                        alt=""
                        src="/images/logo.png"
                        height={70}
                    />
                </Navbar.Brand>
            </Container>
        </Navbar >
    );
};

export default Navigation;