import React from 'react'
import Nav from 'react-bootstrap/Nav';
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
                {/* <Nav.Link style={{ color: 'white' }} href="">How to use videomaker</Nav.Link> */}
            </Container>
        </Navbar>
    )
}

export default Navigation