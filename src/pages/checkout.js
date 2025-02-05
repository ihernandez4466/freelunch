import ContactForm from "../components/contact-form";
import Cart from "../components/contact-form";

export default function Checkout({userId}) {
    
    const handleSubmit = (e) => {
        console.log(e.target)
    }
    
    return (
        <div>
            <Cart userId={userId} />
            <ContactForm handleSubmit={handleSubmit}/>
        </div>
    )
}