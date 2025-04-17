import { useState } from "react";
import { Container }from "react-bootstrap"
import CheckoutComplete from "./complete"
import CheckoutSummary from "./summary"

export default function CheckoutProcess({ userId }) {
    const [orderComplete, setOrderComplete] = useState(false);
    const [recipient, setRecipient] = useState(null);

    return (
        <Container fluid className="d-flex flex-column align-items-center py-5">
            {
                (orderComplete && recipient) ? 
                <CheckoutComplete /> : 
                <CheckoutSummary 
                    user={userId}
                    setOrderCompleteCallback={setOrderComplete} 
                    setRecipientCallback={setRecipient}
                />
            }
            </Container>
        )
}