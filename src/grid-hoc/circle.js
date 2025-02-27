import React from 'react';

const Circle = ({ radius = 5, bgcolor = 'blue' }) => {
  const size = `${10 * radius}px`;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: bgcolor, // You can change the color or pass it as a prop
        margin: '5px',
      }}
    />
  );
};

export default Circle;

