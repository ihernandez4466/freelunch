import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';

/**
 * Functional component that renders this app logo
 *    @param {ReactNode} props.logoSrc - The logo path in src
 *    @param {ReactNode} props.customStyle - Custom style for the logo
 */
export default function Logo({ logoSrc, customStyle }) {

    const logoPath = '/images/brand/logo-icon.png';
    return (
        <>
            <Image 
                src={logoSrc ? logoSrc : logoPath}
                style={customStyle ? customStyle : {height:"50px"}}
            />
        </>
    );
}

Logo.prototype = {
    logoSrc: PropTypes.string.isRequired,
    customStyle: PropTypes.object
}