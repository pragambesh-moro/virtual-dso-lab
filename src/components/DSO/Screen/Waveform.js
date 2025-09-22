import React from 'react';

const Waveform = ({ data, width, height }) => {
  if (!data || data.length === 0) {
    return null;
  }

  const path = data
    .map((y, i) => {
      const x = (i / (data.length - 1)) * width;
      const scaledY = height / 2 - (y * height) / 2;
      return `${i === 0 ? 'M' : 'L'} ${x},${scaledY}`;
    })
    .join(' ');

  return <path d={path} stroke="#00ff00" strokeWidth="2" fill="none" />;
};

export default Waveform;
