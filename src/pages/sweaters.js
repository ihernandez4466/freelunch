import { Col, Row } from 'react-bootstrap';
import Loading from '../components/loading';
import ProductDiv from '../components/product';
import DataFetcher from '../components/fetch';
/* Functional component that renders sweaters page.*/

export default function Sweaters(props) {
    
    const [data, isLoading, error] = DataFetcher({endpoint:'/api/product?category=sweaters'})
    
    function renderProductWithRows(products) {
        // calculate number of rows
        let resultOfN = [];
        const n = 3
        for (let i = 0; i < products.length; i += n) resultOfN.push(products.slice(i, i + n));
        
        const renderResult = resultOfN.map((row, rowIndex) => (
            <Row key={`productdiv-${rowIndex}`}>
                {row.map((item, idx) => (
                    <ProductDiv productInfo={item} {...props}/>
                ))}
            </Row>
        ));
    
        return <>{renderResult[0]}</>;
    }
    
    
    return (
        <div id="sweaters" style={{
            alignContent: 'center',
            alignItems: 'center',
            height: '80vh',
            padding: '10px 30px 30px 30px'
        }}>
            <Row style={{ padding: '20px' }} className="justify-content-center">
                <Col>
                    <h1 style={{ fontSize: '30px', fontWeight: '600' }}>
                        Apparel
                    </h1>
                    <p style={{ fontSize: '20px', fontWeight: '300' }}>Dive into our first collection of designs that seek to show our brand through apparel. These sweaters are completely customizable upon request</p>
                </Col>
            </Row>
            { error ? (<h1>Products to come</h1>) : (isLoading ? <Loading /> : 
            ( data && renderProductWithRows(data.rows)))}
        </div>
    );
}
