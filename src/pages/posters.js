import Row from 'react-bootstrap/Row';
import { motion } from "framer-motion";
const imagePath = '/images';
const postersPath = imagePath + '/branding/posters.png';

/**
 * Functional component that renders page for posters (currently only a single image but should be broken up into widgets).
 */

export default function Posters() {
    return(
        <div id="posters">
        <motion.h1 style={{ fontSize: '30px', fontWeight: '600' }}
                    inital={{ y: 25, opacity: 0}}
                    animate={{ y: 0, opacity: 1}}
                    transition={{ duration: 1, ease: "easeInOut"}}
                    >
                        Posters Coming Soon
                    </motion.h1>
        {/* <Row id="posters" style={{ justifyContent: 'center'}}>
            <img src={postersPath} style={{
                    width: '60%', height: '60%',
                    boxShadow: '5px 5px 5px 2px rgb(190, 187, 187, 0.5)',
                    backgroundColor: 'rgb(72, 88, 14, 0.1)',
            }}/>
        </Row> */}
        </div>
    );
}