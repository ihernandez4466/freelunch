import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Loading from '../components/loading';
import ProductDiv from '../components/product';
import DataFetcher from '../components/fetch';
import MyAlert from '../components/alert';
import Header from '../components/header';
/* Functional component that renders sweaters page.*/

export default function Sweaters(props) {
    
    const [data, isLoading, error] = DataFetcher({ endpoint: `/api/product?category=sweaters&adult=${props.adult}` })
    const products = data?.rows ?? []
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
        if (!products?.length) return null
        const n = 3
        const resultOfN = []
        for (let i = 0; i < products.length; i += n) resultOfN.push(products.slice(i, i + n))
        return resultOfN.map((row, rowIndex) => (
            <Row
                style={{ padding: '30px' }}
                key={`productdiv-${rowIndex}`}
            >
                {row.map((item) => (
                    <ProductDiv productInfo={item} successSetter={successFromProduct} {...props} key={item.id} />
                ))}
            </Row>
        ))
    }
    
    
    return (
        <div id="sweaters" style={{
            // padding: '30px',
            alignContent: 'center',
            alignItems: 'center',
            backgroundColor: 'var(--background)',
            borderRadius: '20px 20px 20px 20px', 
        }}>
        { error ? (
            <Row>
                <div>
                    <h2 style={{ padding: '30px', display: 'flex', justifyContent: 'center', backgroundColor: 'var(--background)', borderRadius: '20px 20px 20px 20px'}}>Products Coming Soon</h2>
                </div>
            </Row>) : (isLoading ? <Loading /> : (
            <>
                {products.length > 0 && (
                    <>
                        {renderProductWithRows(products)}
                    </>
                )}
            </>
            ))}
        { showAlert && 
            <MyAlert 
                success={alertSuccess}
                message={alertMessage}
                duration={1500}
            />}
        </div>
    );
}
