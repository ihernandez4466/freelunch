import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Loading from '../components/loading';
import ProductDiv from '../components/product';
import DataFetcher from '../components/fetch';
import MyAlert from '../components/alert';
/* Functional component that renders sweaters page.*/

export default function Sweaters(props) {
    
    const [data, isLoading, error] = DataFetcher({endpoint:'/api/product?category=sweaters'})
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(null);
    const successFromChild = (success, message) => {
        setAlertMessage(message);
        setIsSuccess(success);
        setShowAlert(true);
    }

    const handleCloseAlert = () => {
        setShowAlert(false);
    };
    
    function renderProductWithRows(products) {
        // calculate number of rows
        let resultOfN = [];
        const n = 3
        for (let i = 0; i < products.length; i += n) resultOfN.push(products.slice(i, i + n));
        
        const renderResult = resultOfN.map((row, rowIndex) => (
            <Row key={`productdiv-${rowIndex}`}>
                {row.map((item, idx) => (
                    <ProductDiv productInfo={item} successSetter={successFromChild} {...props}/>
                ))}
            </Row>
        ));
    
        return <>{renderResult[0]}</>;
    }
    
    
    return (
        <div id="sweaters" style={{
            alignContent: 'center',
            alignItems: 'center'
        }}>
            <Row>
                    <h1>
                        Apparel
                    </h1>
                    <p>Dive into our first collection of designs that seek to show our brand through apparel. These sweaters are completely customizable upon request</p>
            </Row>
        { error ? (<Row><div><h2 style={{ padding: '30px', backgroundColor: 'var(--primary-transparent)', borderRadius: '20px 20px 20px 20px', display: 'flex', justifyContent: 'center'}}>Products Coming Soon</h2></div></Row>) : (isLoading ? <Loading /> : 
            ( data && renderProductWithRows(data.rows)))}
             {/* { showAlert &&
             <MyAlert 
                success={isSuccess} 
                message={alertMessage} 
                showAlert={showAlert} 
                onClose={handleCloseAlert}
            />
            } */}
        </div>
    );
}
