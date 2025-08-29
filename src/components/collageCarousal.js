'use client';

import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CollageCarousel = ({ children, autoSlide = true, slideInterval = 2000, controls = false, indicators = true }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Don't render anything until mounted
  }

  return (
    <Carousel 
      variant="dark"
      interval={autoSlide ? slideInterval : null}
      controls={controls}
      indicators={indicators}
      touch={true}
    >
      {React.Children.map(children, (child, index) => (
        <Carousel.Item key={index}>
          {child}
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

CollageCarousel.propTypes = {
  children: PropTypes.node.isRequired,
  autoSlide: PropTypes.bool,
  slideInterval: PropTypes.number,
  controls: PropTypes.bool,
  indicators: PropTypes.bool
};

export default CollageCarousel;
