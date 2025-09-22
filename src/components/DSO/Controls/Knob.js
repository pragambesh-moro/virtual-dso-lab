import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const KnobContainer = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
`;

const KnobDial = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #444;
  border: 2px solid #666;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  cursor: pointer;
`;

const KnobIndicator = styled.div`
  width: 2px;
  height: 10px;
  background: #fff;
  margin-top: 5px;
`;

const ValueDisplay = styled.div`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #fff;
`;

const Knob = ({ value, onChange, min = 0, max = 100, step = 1 }) => {
  const rotation = ((value - min) / (max - min)) * 270 - 135;

  const handleDrag = (event, info) => {
    const delta = info.offset.y;
    let newValue = value - delta * (step / 10); // Adjust sensitivity
    newValue = Math.max(min, Math.min(max, newValue));
    onChange(newValue);
  };

  return (
    <div>
      <KnobContainer>
        <KnobDial
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          onDrag={handleDrag}
          style={{ rotate: rotation }}
        >
          <KnobIndicator />
        </KnobDial>
      </KnobContainer>
      <ValueDisplay>{value.toFixed(2)}</ValueDisplay>
    </div>
  );
};

export default Knob;
