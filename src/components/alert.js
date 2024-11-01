import React, { useEffect, useState } from 'react';
import { Alert, Fade } from 'react-bootstrap';

function MyAlert({ success, message, showAlert}) {
  const [showAlert, setShowAlert] = useState(showAlert);
  
  useEffect(() => {
    if(showAlert){
     setShowAlert(false) 
    }
  }, [showAlert])

  function handleClose() {
    setTimeout(() => {
      setShowAlert(false);  
    }, 3000); 
  } 

  return (
    <Fade in={showAlert}>
      <Alert variant={success ? "success": "danger"} dismissible onClose={handleClose}>
        {message}
      </Alert>
    </Fade>
  );
}

export default MyAlert;