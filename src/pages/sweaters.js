import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Loading from '../components/loading';
import ProductDiv from '../components/product';

/* Functional component that renders sweaters page.*/

export default function Sweaters(props) {
    
    const [ products, setProducts] = useState(null);
    const [ error, setError ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(false);
    
    const fetchData = async (url) => {
        setIsLoading(true);
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const jsonData = await response.json();
          setProducts(jsonData.rows);
        } catch (err) {
            console.log(err)
            setProducts(null);
            setError(err);
        } finally {
          setIsLoading(false);
        }
    }

    function renderProductWithRows(products) {
        // calculate number of rows
        let resultOfN = [];
        const n = 3
        const numOfRows = products.length/n;
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
    
    useEffect(() => {
        fetchData('/api/product?category=sweaters')
    }, [])

    
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
            { error ? (<h1>Products to come</h1>) : isLoading ? <Loading /> : 
            ( products && renderProductWithRows(products))}
        </div>
    );
}
