import React, { useEffect, useState } from 'react';
import { Alert, Fade } from 'react-bootstrap';
import { IoMdCheckmarkCircleOutline } from "react-icons/io";


function MyAlert({ success, message, duration }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, duration);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Fade in={show}>
      <div style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1050, // higher than most components
        maxWidth: "90%",
        minWidth: "300px"
      }}>
      <Alert variant={success ? "success": "danger"} style={{ 
        color: 'var(--textSecondary)', 
        textAlign: 'center',
        backgroundColor: 'var(--secondary)', 
        border: 'none'
        }}>
        {message}
        <IoMdCheckmarkCircleOutline style={{ color: 'var(--textSecondary)'}}/>
      </Alert>
      </div>
    </Fade>
  );
}

export default MyAlert;