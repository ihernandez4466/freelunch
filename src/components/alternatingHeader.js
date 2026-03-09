import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

const FADE_DURATION_MS = 800;

export default function AlternatingHeader({
  imagePaths,
  customStyle,
  interval = 3000,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const paths = Array.isArray(imagePaths) && imagePaths.length >= 2
    ? imagePaths.slice(0, 2)
    : null;

  useEffect(() => {
    if (!paths) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i === 0 ? 1 : 0));
    }, interval);
    return () => clearInterval(id);
  }, [paths, interval]);

  if (!paths) return null;

  const containerStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...customStyle,
  };

  const imgStyle = { width: '100%', height: '100%', objectFit: 'contain' };

  return (
    <Container fluid>
      <div id="alternating-header" style={containerStyle}>
        <div style={{ position: 'relative', width: '100%', display: 'block' }}>
          {paths.map((path, i) => (
            <img
              key={path}
              src={path}
              loading="lazy"
              alt="freelunch header"
              style={{
                ...imgStyle,
                position: i === 0 ? 'relative' : 'absolute',
                top: 0,
                left: 0,
                opacity: activeIndex === i ? 1 : 0,
                transition: `opacity ${FADE_DURATION_MS}ms ease-in-out`,
                pointerEvents: activeIndex === i ? 'auto' : 'none',
              }}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
