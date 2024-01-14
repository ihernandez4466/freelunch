import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { MdEmail } from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdLocationPin } from "react-icons/md";

export function ContactUsPage() {
    return (
        <div id="contact-us" style={{
            alignContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(to top, white 20%, var(--background) 40%)',
            display: 'flex',
            flexWrap:'wrap',
            height: '70vh', // Adjust the height as needed
            justifyContent: 'center',
            padding: '10px 30px 30px 30px'
        }}>
            <div style={{ padding: '20px' }}>
                <h1>Join The Movement</h1>
            </div>
            <div>
                <h2>Whether you're eager to purchase one of our customizable sweaters or explore our upholstery options, 
                    we're thrilled to assist you in creating something special. Feel free to reach out if you're interested in making a purchase or collaborating with us on a unique creation.
                </h2>
            </div>
            <Row style={{ marginTop:'20px'}}>
                <Col>
                    <Card style={{ height: '100%'}}>
                    <Card.Header>Email Us <MdEmail /></Card.Header>
                    <Card.Body>freelunch@gmail.com</Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ height: '100%'}}>
                    <Card.Header>Call Us <BiSolidPhoneCall /></Card.Header>
                    <Card.Body>7073878085</Card.Body>
                    </Card>
                </Col>
                <Col>
                <Card style={{ height: '100%'}}>               
                    <Card.Header>Location <MdLocationPin /></Card.Header>
                    <Card.Body>
                    <a href={'https://www.google.com/maps/place/Sonoma,+CA+95476/@38.2910861,-122.4902991,13z/data=!3m1!4b1!4m6!3m5!1s0x8085ac43817b9d77:0x380ed210ee6e045!8m2!3d38.291859!4d-122.4580356!16zL20vMHI3OGs?entry=ttu'} target="_blank" rel="noopener noreferrer">
                        Sonoma, California
                    </a>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </div>
    );
}

