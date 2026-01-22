import CollageCarousel from './collageCarousal';

export default function PhotoCollage({ imagePath }) {
    const headerPath1 = imagePath + '/branding/photo-collage-1.png';
    const headerPath2 = imagePath + '/branding/photo-collage-2.png';

    return (
        <CollageCarousel>
          <img src={headerPath1} className="page-header" loading="lazy" alt="freelunch header" style={{ objectFit: 'cover', width: '100%', display: 'block' }} />
          <img src={headerPath2} className="page-header" loading="lazy" alt="freelunch header" style={{ objectFit: 'cover', width: '100%', display: 'block' }} />
        </CollageCarousel>
    );
}
