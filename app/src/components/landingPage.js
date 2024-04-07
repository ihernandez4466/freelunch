import Image from 'react-bootstrap/Image';

/**
 * Functional component that renders a photo collage
 *    @param {ReactNode} props.Style - The logo component style
 */
export function LandingPage() {
    return (
      <>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center',
        position: 'relative',
        zIndex: '0',
        padding: '40px',
        marginTop: '10%'
        }}>
            <Image
              style={{ 
                width:'50%',
                boxShadow: '15px 10px 25px black, -30px 26px 2px rgb(92, 6, 6, 0.5), 30px -26px 0px rgb(92, 6, 6)' }}
              src={'/images/freeLunchLettering.png'}
            />
          <div style={{   
              position: 'absolute',
              left: '35%',
              top: '35%',
              zIndex: '1',
              width:'30%',
            }}>
           <Image
              style={{ 
                width:'100%'}}
              src={'/images/signature-transparent.PNG'}
            />
          </div>
      </div>
      </>
    );
}