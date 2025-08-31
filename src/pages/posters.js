import { Row } from 'react-bootstrap';
import CollageCarousel from '../components/collageCarousal';

/**
 * Functional component that renders page for posters with carousel display.
 */

export default function Posters() {
    const posterImages = [
        { src: '/images/posters/brand.png', alt: 'Brand Poster' },
        { src: '/images/posters/chalupa-betty.png', alt: 'Chalupa Betty Poster' },
        { src: '/images/posters/chiquita.png', alt: 'Chiquita Poster' },
        { src: '/images/posters/dama.png', alt: 'Dama Poster' },
        { src: '/images/posters/gangster-live.png', alt: 'Gangster Live Poster' },
        { src: '/images/posters/man-gangster-live.png', alt: 'Man Gangster Live Poster' },
        { src: '/images/posters/monalisa.png', alt: 'Monalisa Poster' },
        { src: '/images/posters/selena-gangster-live.png', alt: 'Selena Gangster Live Poster' },
        { src: '/images/posters/serena-gangster-live.png', alt: 'Serena Gangster Live Poster' }
    ];

    return(
            <Row id="posters">
                <div>
                    <h2 className="posters-header" style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'var(--background)', borderRadius: '20px 20px 20px 20px', marginBottom: '20px'}}>Poster Collection Coming Soon</h2>
                    <CollageCarousel autoSlide={true} slideInterval={3000} controls={true}>
                        {posterImages.map((poster, index) => (
                            <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '500px' }}>
                                <img 
                                    src={poster.src} 
                                    alt={poster.alt}
                                    style={{ 
                                        maxHeight: '100%', 
                                        maxWidth: '100%', 
                                        objectFit: 'contain',
                                        borderRadius: '10px'
                                    }}
                                />
                            </div>
                        ))}
                    </CollageCarousel>
                </div>
            </Row>
    );
}