import { Col, Row, Form, Button, FloatingLabel } from 'react-bootstrap';

export default function ContactForm({handleSubmit, submitString}) {
    return (
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
                    as="textarea"
                    name="customer_comments" 
                    placeholder="Leave a comment here"
                    style={{ height: '100px' }}
                    />
                </FloatingLabel>
                <div style={{ display: 'flex', justifyContent: 'center'}}>
                    <Button type="submit">
                        {submitString ? submitString : "Contact Us"}
                    </Button>
                </div>
            </Form>
    )
}