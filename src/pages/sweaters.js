import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Loading from '../components/loading';
import ProductDiv from '../components/product';
import DataFetcher from '../components/fetch';
import MyAlert from '../components/alert';
/* Functional component that renders sweaters page.*/

export default function Sweaters(props) {
    
    const [data, isLoading, error] = DataFetcher({endpoint:'/api/product?category=sweaters'})
    const [showAlert, setShowAlert] = useState(false);
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAlert(false);
            setAlertSuccess(false);
            setAlertMessage(null);    
        }, 1500);
        return () => clearTimeout(timer);
    }, [showAlert])
    const successFromProduct = (success, message) => {
        setAlertSuccess(success);
        setAlertMessage(message);
        setShowAlert(true);
    }
    
    function renderProductWithRows(products) {
        // calculate number of rows
        let resultOfN = [];
        const n = 3
        for (let i = 0; i < products.length; i += n) resultOfN.push(products.slice(i, i + n));
        
        const renderResult = resultOfN.map((row, rowIndex) => (
            <Row key={`productdiv-${rowIndex}`}>
                {row.map((item, idx) => (
                    <ProductDiv productInfo={item} successSetter={successFromProduct} {...props}/>
                ))}
            </Row>
        ));
    
    return <>{renderResult}</>;
}
    
    
    return (
        <div id="sweaters" style={{
            padding: '30px',
            alignContent: 'center',
            alignItems: 'center',
            backgroundColor: 'var(--background)',
            borderRadius: '20px 20px 20px 20px', 
        }}>
            <Row>
                    <h1>
                        Apparel
                    </h1>
                    <h3>Dive into our first collection of designs that seek to show our brand through apparel. These sweaters are completely customizable upon request</h3>
            </Row>
        { error ? (
            <Row>
                <div>
                    <h2 style={{ padding: '30px', display: 'flex', justifyContent: 'center', backgroundColor: 'var(--background)', borderRadius: '20px 20px 20px 20px'}}>Products Coming Soon</h2>
                </div>
            </Row>) : (isLoading ? <Loading /> : 
            ( data && renderProductWithRows(data.rows)))}
        { showAlert && 
            <MyAlert 
                success={alertSuccess}
                message={alertMessage}
                duration={1500}
            />}
        </div>
    );
}
