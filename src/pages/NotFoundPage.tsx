import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        fontSize: '20px',
        background: 'transparent',
      }}
    >
      <p>Page not found</p>
      <button style={{ cursor: 'pointer' }} type="button" onClick={() => navigate('/')}>Click here to get back</button>
    </div>
  );
};

export default NotFoundPage;
