import React from 'react';
import Toast from 'react-bootstrap/Toast';

function LoginSuccess({ show, onClose }) {
  return (
    <Toast
      onClose={onClose}
      show={show}
      delay={3000}
      autohide
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        minWidth: '250px',
        zIndex: 9999,
      }}
    >
      <Toast.Body className="d-flex align-items-center">
        <img
          src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
          alt="success"
          style={{ width: 24, height: 24, marginRight: 10 }}
        />
        <span>Login Successful!</span>
      </Toast.Body>
    </Toast>
  );
}

export default LoginSuccess;
