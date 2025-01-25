import { Card, Col, Row, Form, Button, FloatingLabel } from 'react-bootstrap';
import { MdEmail } from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdLocationPin } from "react-icons/md";


/**
 * Functional component that renders the Contact Us Page
 */
export default function ContactUs() {
    return (
        <Row id="contact-us" style={{
            //alignContent: 'center',
            backgroundColor: 'var(--background)',
            marginBottom: '40vh' // need this for link scroll to work :()
        }}>
            <Col style={{ paddingTop: '15px', paddingBottom: '15px'}}>
            {/* <div style={{ padding: '30px', display: 'flex', justifyContent: 'center'}}> */}
                <h1 style={{ color: 'var(--textPrimary)', fontSize: '30px'}}>Join The Movement</h1>
            {/* </div> */}
            {/* <div style={{ padding: '20px', backgroundColor: 'var(--primary-transparent)', borderRadius: '20px 20px 20px 20px'}}> */}
                <p style={{ color: 'var(--textPrimary)', fontWeight: '400'}}>If you are eager to purchase one of our customizable sweaters or posters, 
                    we are thrilled to assist you in creating something special. Feel free to reach out if you're interested in making a purchase or collaborating with us on a unique creation. Purchases online will be coming soon and delivery is available.
                </p>
            {/* </div> */}
            <div style={{ display: 'flex', alignItems: 'center'}}><MdEmail /><p>freelunch@gmail.com</p></div>
            <div style={{ display: 'flex', alignItems: 'center'}}><BiSolidPhoneCall /><p>+1 (707) 931-8265</p></div>
            <div style={{ display: 'flex', alignItems: 'center'}}><MdLocationPin /><p><a href={'https://www.google.com/maps/place/Sonoma,+CA+95476/@38.2910861,-122.4902991,13z/data=!3m1!4b1!4m6!3m5!1s0x8085ac43817b9d77:0x380ed210ee6e045!8m2!3d38.291859!4d-122.4580356!16zL20vMHI3OGs?entry=ttu'} target="_blank" rel="noopener noreferrer">
                        Sonoma, California
                    </a></p></div>
            </Col>
            <Col>
            <Card style={{ marginTop:'20px', height: '100%' }}>
                <Card.Body>
            <Form id="contact-form">
            <Row className="mb-3">
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid" label="First Name">
                        <Form.Control type="text" placeholder="Enter First Name" />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                    <FloatingLabel controlId="floatingInputGrid" label="Last Name">
                        <Form.Control type="text" placeholder="Enter Last Name" />
                        </FloatingLabel>
                    </Col>
                </Row>
                
                <Row className="mb-3">
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid" label="Email address">
                        <Form.Control type="email" placeholder="name@example.com" />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingInputGrid" label="Phone Number">
                        <Form.Control placeholder="Mobile or Home Phone" />
                        </FloatingLabel>
                    </Col>
                </Row>

                <FloatingLabel controlId="floatingTextarea2" label="Comments">
                    <Form.Control
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '100px' }}
                    />
                </FloatingLabel>
                <div style={{ padding: '20px', display: 'flex', justifyContent: 'center'}}>
                    <Button type="submit">
                        Get Support
                    </Button>
                </div>
            </Form>
            </Card.Body>
            </Card>
            </Col>
        </Row>
    );
}
