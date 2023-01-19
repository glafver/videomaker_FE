import React from 'react'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const Navigation = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src="/images/favicon.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    Videomaker
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Navigation