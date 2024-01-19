import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';

/**
 * Functional component that renders this app logo
 *    @param {ReactNode} props.Style - The logo component style
 */
export function Logo({ customStyle, imgSrc }) {
    return (
        <>
            <Image 
                src={imgSrc}
                style={customStyle} 
            />
        </>
    );
}

Logo.prototype = {
    imgSrc: PropTypes.string.isRequired,
    customStyle: PropTypes.object
}