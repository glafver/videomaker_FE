import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { IoRocketOutline, IoBulbOutline, IoColorWandOutline } from "react-icons/io5";
import { Fade, Zoom } from "react-awesome-reveal";

const BenefitCard = ({ IconComponent, title, text, index, image }) => (
    <Row className={`mb-4 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`} key={index}>
        <Col md={8} className={`d-flex align-items-stretch ${index % 2 === 0 ? '' : ''}`} style={{
            backgroundImage: `url("${image}")`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
        }}>
        </Col>
        <Col md={4} className={`px-md-4 ${index % 2 === 0 ? 'pe-md-0' : 'ps-md-0'}`}>
            <Card className="text-center h-100">
                <Card.Body className="d-flex flex-column p-3">
                    <Zoom>
                        <div>
                            <div className="d-flex justify-content-center align-items-center mb-3">
                                <IconComponent size={50} />
                            </div>
                            <Card.Title className='fw-bold'>{title}</Card.Title>
                            <Card.Text className="flex-grow-1">{text}</Card.Text>
                        </div>
                    </Zoom>
                </Card.Body>
            </Card>
        </Col>
    </Row>
);

const BenefitsSection = () => {
    const benefits = [
        {
            IconComponent: IoBulbOutline,
            title: "Engaging Visual Stories",
            text: "Transform property photos into captivating video slideshows that highlight each property's uniqueness.",
            image: "https://storage.googleapis.com/gafver_videomaker/6087807-21.jpg"
        },
        {
            IconComponent: IoColorWandOutline,
            title: "Easy Customization",
            text: "Utilize user-friendly customization options to create narratives that resonate with your audience.",
            image: "https://storage.googleapis.com/gafver_videomaker/6085643-1%20SJ.jpg"
        },
        {
            IconComponent: IoRocketOutline,
            title: "Market Edge",
            text: "Set your listings apart in the competitive market and attract more potential buyers.",
            image: "https://storage.googleapis.com/gafver_videomaker/6090335-25.jpg"
        }
    ];

    return (
        <Container className="benefits-section" >
            <div className="text-center fw-bold mb-5 vm-rect fs-2">Why to choose Videomaker?</div>
            <Fade>
                {benefits.map((benefit, index) => (
                    <BenefitCard
                        IconComponent={benefit.IconComponent}
                        title={benefit.title}
                        text={benefit.text}
                        index={index}
                        image={benefit.image}
                        key={index}
                    />
                ))}
            </Fade>
        </Container>
    );
};

export default BenefitsSection;