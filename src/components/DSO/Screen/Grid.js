import React from 'react';

const Grid = ({ width, height }) => {
  const gridColor = '#333';
  const numXLines = 10;
  const numYLines = 8;

  const verticalLines = [];
  for (let i = 1; i < numXLines; i++) {
    const x = (i / numXLines) * width;
    verticalLines.push(<line key={`v${i}`} x1={x} y1="0" x2={x} y2={height} stroke={gridColor} strokeWidth="1" />);
  }

  const horizontalLines = [];
  for (let i = 1; i < numYLines; i++) {
    const y = (i / numYLines) * height;
    horizontalLines.push(<line key={`h${i}`} x1="0" y1={y} x2={width} y2={y} stroke={gridColor} strokeWidth="1" />);
  }

  return (
    <g>
      {verticalLines}
      {horizontalLines}
      <line x1={width / 2} y1="0" x2={width / 2} y2={height} stroke={gridColor} strokeWidth="1" strokeDasharray="4 4" />
      <line x1="0" y1={height / 2} x2={width} y2={height / 2} stroke={gridColor} strokeWidth="1" strokeDasharray="4 4" />
    </g>
  );
};

export default Grid;
