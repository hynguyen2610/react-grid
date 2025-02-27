import React from 'react';

const Square = (props) => {
  return (
    <div
      style={{
        width: '50px',
        height: '50px',
        backgroundColor: 'red', // You can change the color or pass it as a prop
        margin: '5px',
      }}
    />
  );
};

export default Square;
