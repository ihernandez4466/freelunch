import React, { useEffect, useState } from 'react';
import { Alert, Fade } from 'react-bootstrap';

function MyAlert({ success, message, showAlert}) {
  const [show, setShow] = useState(showAlert);
  
  useEffect(() => {
    if(show){
     handleClose()
    }
  }, [showAlert])

  function handleClose() {
    setTimeout(() => {
      setShow(false);  
    }, 3000); 
  } 

  return (
    <Fade in={show}>
      <Alert variant={success ? "success": "danger"} dismissible onClose={handleClose}>
        {message}
      </Alert>
    </Fade>
  );
}

export default MyAlert;