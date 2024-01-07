import Image from 'react-bootstrap/Image';

/**
 * Functional component that renders this app logo
 *    @param {ReactNode} props.Style - The logo component style
 */
export function Logo({ style }) {
    return (
        <>
            <Image 
            src={'http://localhost:3000/images/branding/logo-icon.png'}
            style={style} 
            />
        </>
    );
}