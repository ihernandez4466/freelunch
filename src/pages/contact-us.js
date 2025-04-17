import { Card, Col, Row, Form, Button, FloatingLabel } from 'react-bootstrap';
import { MdEmail } from "react-icons/md";
import { BiSolidPhoneCall } from "react-icons/bi";
import { MdLocationPin } from "react-icons/md";


/**
 * Functional component that renders the Contact Us Page
 */
export default function ContactUs() {
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            customer_first: e.target.customer_first.value, 
            customer_last: e.target.customer_last.value, 
            customer_email: e.target.customer_email.value,
            customer_phone: e.target.customer_phone.value,
            customer_comments: e.target.customer_comments.value
        }
        
        try {
            console.log(data);
            const response = await fetch('/api/contact-us', {
                method: 'POST',
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to submit form")             
            }

            const result = await response.json();
            console.log(`Form submitted successfully: ${result}`);
            e.target.reset();

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    }
    
    
    return (
        <Row id="contact-us" style={{
            //alignContent: 'center',
            padding: '30px',
            backgroundColor: 'var(--background)',
            borderRadius: '15px',
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
            <div style={{ display: 'flex', alignItems: 'center'}}><MdEmail /><p style={{ margin: '0px 0px 0px 10px'}}>freelunch707@gmail.com</p></div>
            <div style={{ display: 'flex', alignItems: 'center'}}><BiSolidPhoneCall /><p style={{ margin: '0px 0px 0px 10px'}}>+1 (707) 931-8265</p></div>
            <div style={{ display: 'flex', alignItems: 'center'}}><MdLocationPin /><p style={{ margin: '0px 0px 0px 10px'}}><a href={'https://www.google.com/maps/place/Sonoma,+CA+95476/@38.2910861,-122.4902991,13z/data=!3m1!4b1!4m6!3m5!1s0x8085ac43817b9d77:0x380ed210ee6e045!8m2!3d38.291859!4d-122.4580356!16zL20vMHI3OGs?entry=ttu'} target="_blank" rel="noopener noreferrer">
                        Sonoma, California
                    </a></p></div>
            </Col>
            <Col>
            <Card style={{ height: '100%' }}>
                <Card.Body>
            <Form id="contact-form" onSubmit={handleSubmit}>
            <Row className="mb-3">
                    <Col md>
                        <FloatingLabel label="First Name">
                        <Form.Control type="text" name="customer_first" placeholder="Enter First Name" required/>
                        </FloatingLabel>
                    </Col>
                    <Col md>
                    <FloatingLabel label="Last Name">
                        <Form.Control type="text" name="customer_last" placeholder="Enter Last Name" required/>
                        </FloatingLabel>
                    </Col>
                </Row>
                
                <Row className="mb-3">
                    <Col md>
                        <FloatingLabel label="Email address">
                        <Form.Control type="email" name="customer_email" placeholder="name@example.com" required/>
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel label="Phone Number">
                        <Form.Control name="customer_phone" placeholder="Mobile or Home Phone" />
                        </FloatingLabel>
                    </Col>
                </Row>

                <FloatingLabel label="Comments">
                    <Form.Control
                    required
                    as="textarea"
                    name="customer_comments" 
                    placeholder="Leave a comment here"
                    style={{ height: '100px' }}
                    />
                </FloatingLabel>
                <div style={{ padding: '20px', display: 'flex', justifyContent: 'center'}}>
                    <Button type="submit">
                        Contact Us
                    </Button>
                </div>
            </Form>
            </Card.Body>
            </Card>
            </Col>
        </Row>
    );
}
