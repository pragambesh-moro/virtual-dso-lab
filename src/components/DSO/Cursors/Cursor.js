import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CursorLine = styled(motion.line)`
  stroke: #ffcc00;
  stroke-width: 2;
  cursor: ew-resize;
`;

const Cursor = ({ x, onDrag, constraintRef }) => {
  return (
    <g>
      <CursorLine
        x1={x}
        y1="0"
        x2={x}
        y2="100%"
        drag="x"
        dragConstraints={constraintRef}
        onDrag={onDrag}
      />
    </g>
  );
};

export default Cursor;
