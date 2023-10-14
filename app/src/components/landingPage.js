import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

const images = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Great_Wave_off_Kanagawa2.jpg/330px-Great_Wave_off_Kanagawa2.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Great_Wave_off_Kanagawa2.jpg/330px-Great_Wave_off_Kanagawa2.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Great_Wave_off_Kanagawa2.jpg/330px-Great_Wave_off_Kanagawa2.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Great_Wave_off_Kanagawa2.jpg/330px-Great_Wave_off_Kanagawa2.jpg',
]
export function LandingPage() {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center',
        position: 'relative',
        zIndex: '0',
        padding: '40px',
        marginTop: '20px'
        }}>
            <Image
              style={{ 
                width:'50%',
                boxShadow: '15px 10px 25px black, -30px 26px 2px rgb(92, 6, 6, 0.5), 30px -26px 0px rgb(92, 6, 6)' }}
              src={'http://localhost:3000/images/logoheader-background.PNG'}
            />
          <div style={{   
              position: 'absolute',
              left: '25%',
              top: '35%',
              zIndex: '1',
              width:'50%',
            }}>
           <Image
              style={{ 
                width:'100%'}}
              src={'http://localhost:3000/images/signature.PNG'}
            />
          </div>
      </div>
    );
}