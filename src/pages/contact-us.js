import { Card, Col, Row } from 'react-bootstrap';
import { MdEmail } from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdLocationPin } from "react-icons/md";


/**
 * Functional component that renders the Contact Us Page
 */
export default function ContactUs() {
    return (
        <div id="contact-us" style={{
            alignContent: 'center',
            alignItems: 'center',
            height: '80vh',
            padding: '10px 30px 30px 30px'
        }}>
            <div style={{ padding: '30px', display: 'flex', justifyContent: 'center',}}>
                <h1 style={{ color: 'var(--textPrimary)', fontSize: '30px', fontWeight: '600'}}>Join The Movement</h1>
            </div>
            <div style={{ padding: '20px', backgroundColor: 'var(--primary-transparent)', borderRadius: '20px 20px 20px 20px'}}>
                <p style={{ color: 'var(--textPrimary)',  fontSize: '20px', fontWeight: '400'}}>If you are eager to purchase one of our customizable sweaters or posters, 
                    we are thrilled to assist you in creating something special. Feel free to reach out if you're interested in making a purchase or collaborating with us on a unique creation. Purchases online will be coming soon and delivery is available.
                </p>
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
                    <Card.Body>+1 (707) 931-8265</Card.Body>
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
