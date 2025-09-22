import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ControlsContainer = styled.div`
  background: linear-gradient(145deg, #2a2d3e, #1e1e2e);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ControlsTitle = styled.h3`
  color: ${props => props.color};
  margin-bottom: 2rem;
  text-align: center;
  font-size: 1.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const ControlsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ControlSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1.5rem;
  border: 2px solid ${props => props.color};
  transition: all 0.3s ease;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ControlTitle = styled.h4`
  color: ${props => props.color};
  margin-bottom: 1.5rem;
  font-size: 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: bold;
`;

const ControlRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  gap: 0.8rem;
  flex-wrap: wrap;
`;

const Label = styled.label`
  color: #ccc;
  font-size: 0.85rem;
  min-width: 70px;
  font-weight: 600;
  display: block;
`;

const Slider = styled.input`
  flex: 1;
  height: 6px;
  background: linear-gradient(to right, #333 0%, ${props => props.color} 50%, #333 100%);
  border-radius: 3px;
  outline: none;
  min-width: 100px;
  
  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background: linear-gradient(145deg, ${props => props.color}, ${props => props.color}cc);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.4), 0 0 15px ${props => props.color}88;
    border: 2px solid #fff;
    transition: all 0.2s ease;
    
    &:hover {
      transform: scale(1.1);
      box-shadow: 0 0 12px rgba(0, 0, 0, 0.6), 0 0 20px ${props => props.color};
    }
  }
`;

const ValueDisplay = styled.div`
  color: ${props => props.color};
  font-weight: bold;
  min-width: 75px;
  text-align: center;
  font-family: 'Courier New', monospace;
  font-size: 0.8rem;
  background: rgba(0, 0, 0, 0.4);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  border: 1px solid ${props => props.color}44;
`;

const Button = styled(motion.button)`
  padding: 0.4rem 0.8rem;
  background: ${props => props.active ? 
    `linear-gradient(145deg, ${props.color}, ${props.color}dd)` : 
    'rgba(255, 255, 255, 0.05)'
  };
  color: ${props => props.active ? '#fff' : props.color};
  border: 1.5px solid ${props => props.color};
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 0.75rem;
  min-width: 65px;
  text-align: center;
  white-space: nowrap;
  
  &:hover {
    background: linear-gradient(145deg, ${props => props.color}, ${props => props.color}dd);
    color: #fff;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem;
  margin-top: 0.8rem;
  flex: 1;
  align-content: start;
`;

const ButtonRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.4rem;
  margin-bottom: 0.5rem;
`;

const Controls = ({ 
  timePerDiv, 
  setTimePerDiv, 
  voltsPerDiv, 
  setVoltsPerDiv, 
  trigger, 
  setTrigger,
  experimentId 
}) => {
  const experimentConfigs = {
    1: {
      color: "#ff6b6b",
      title: "🔧 Waveform Generator & DSO Controls",
      timeScales: [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50],
      voltageScales: [0.5, 1, 2, 5, 10, 20],
      defaultTime: 1,
      defaultVolt: 2,
      channels: { ch1: true, ch2: false },
      triggerRange: [-5, 5]
    },
    2: {
      color: "#4ecdc4", 
      title: "🔧 I-V Characteristic Analysis Controls",
      timeScales: [0.1, 0.2, 0.5, 1, 2, 5],
      voltageScales: [0.1, 0.2, 0.5, 1, 2, 5, 10],
      defaultTime: 0.5,
      defaultVolt: 1,
      channels: { ch1: true, ch2: true },
      triggerRange: [-2, 2],
      xyMode: true
    },
    3: {
      color: "#45b7d1",
      title: "🔧 Op-Amp Circuit Analysis Controls", 
      timeScales: [0.2, 0.5, 1, 2, 5, 10, 20],
      voltageScales: [0.1, 0.2, 0.5, 1, 2, 5, 10, 20],
      defaultTime: 1,
      defaultVolt: 2,
      channels: { ch1: true, ch2: true },
      triggerRange: [-10, 10]
    },
    4: {
      color: "#96ceb4",
      title: "🔧 555 Timer Waveform Controls",
      timeScales: [1, 2, 5, 10, 20, 50, 100, 200, 500],
      voltageScales: [1, 2, 5, 10],
      defaultTime: 10,
      defaultVolt: 2,
      channels: { ch1: true, ch2: true },
      triggerRange: [0, 6]
    }
  };
  
  const config = experimentConfigs[experimentId] || experimentConfigs[1];
  
  const formatTimeScale = (value) => {
    if (value < 1) return `${Math.round(value * 1000)}μs/div`;
    if (value < 1000) return `${value}ms/div`;
    return `${(value / 1000).toFixed(1)}s/div`;
  };
  
  const formatVoltageScale = (value) => {
    if (value < 1) return `${Math.round(value * 1000)}mV/div`;
    return `${value}V/div`;
  };
  
  return (
    <ControlsContainer>
      <ControlsTitle color={config.color}>{config.title}</ControlsTitle>
      
      <ControlsGrid>
        {/* Horizontal Controls */}
        <ControlSection color={config.color}>
          <ControlTitle color={config.color}>⏱️ Horizontal (Time Base)</ControlTitle>
          
          <ControlRow>
            <Label>Time/Div:</Label>
            <Slider
              type="range"
              min="0"
              max={config.timeScales.length - 1}
              value={config.timeScales.indexOf(timePerDiv)}
              onChange={(e) => setTimePerDiv(config.timeScales[parseInt(e.target.value)])}
              color={config.color}
            />
            <ValueDisplay color={config.color}>
              {formatTimeScale(timePerDiv)}
            </ValueDisplay>
          </ControlRow>
          
          <ButtonGrid>
            {config.timeScales.slice(0, 6).map((scale) => (
              <Button
                key={scale}
                color={config.color}
                active={timePerDiv === scale}
                onClick={() => setTimePerDiv(scale)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {formatTimeScale(scale)}
              </Button>
            ))}
          </ButtonGrid>
        </ControlSection>
        
        {/* Vertical Controls */}
        <ControlSection color={config.color}>
          <ControlTitle color={config.color}>📊 Vertical (Voltage)</ControlTitle>
          
          <ControlRow>
            <Label>Volts/Div:</Label>
            <Slider
              type="range"
              min="0"
              max={config.voltageScales.length - 1}
              value={config.voltageScales.indexOf(voltsPerDiv)}
              onChange={(e) => setVoltsPerDiv(config.voltageScales[parseInt(e.target.value)])}
              color={config.color}
            />
            <ValueDisplay color={config.color}>
              {formatVoltageScale(voltsPerDiv)}
            </ValueDisplay>
          </ControlRow>
          
          <ButtonGrid>
            {config.voltageScales.slice(0, 6).map((scale) => (
              <Button
                key={scale}
                color={config.color}
                active={voltsPerDiv === scale}
                onClick={() => setVoltsPerDiv(scale)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {formatVoltageScale(scale)}
              </Button>
            ))}
          </ButtonGrid>
        </ControlSection>
        
        {/* Trigger Controls */}
        <ControlSection color={config.color}>
          <ControlTitle color={config.color}>🎯 Trigger Controls</ControlTitle>
          
          <ControlRow>
            <Label>Level:</Label>
            <Slider
              type="range"
              min={config.triggerRange[0]}
              max={config.triggerRange[1]}
              step="0.1"
              value={trigger}
              onChange={(e) => setTrigger(parseFloat(e.target.value))}
              color={config.color}
            />
            <ValueDisplay color={config.color}>
              {trigger.toFixed(1)}V
            </ValueDisplay>
          </ControlRow>
          
          <div>
            <ButtonRow>
              <Button
                color={config.color}
                active={true}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Auto
              </Button>
              <Button
                color={config.color}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Normal
              </Button>
            </ButtonRow>
            
            {experimentId === "2" && (
              <ButtonRow>
                <Button
                  color={config.color}
                  active={config.xyMode}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{gridColumn: '1 / -1'}}
                >
                  X-Y Mode
                </Button>
              </ButtonRow>
            )}
          </div>
        </ControlSection>
        
        {/* Channel Setup */}
        <ControlSection color={config.color}>
          <ControlTitle color={config.color}>📺 Channel Setup</ControlTitle>
          
          <div>
            <ButtonRow>
              <Button
                color="#ff6b6b"
                active={config.channels.ch1}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                CH1 {config.channels.ch1 ? "ON" : "OFF"}
              </Button>
              <Button
                color="#4ecdc4"
                active={config.channels.ch2}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                CH2 {config.channels.ch2 ? "ON" : "OFF"}
              </Button>
            </ButtonRow>
            
            <ButtonRow>
              <Button
                color={config.color}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                AC Coupling
              </Button>
              <Button
                color={config.color}
                active={true}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                DC Coupling
              </Button>
            </ButtonRow>
            
            {experimentId === "3" && (
              <ButtonRow>
                <Button
                  color={config.color}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Invert CH2
                </Button>
                <Button
                  color={config.color}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Math CH1-CH2
                </Button>
              </ButtonRow>
            )}
          </div>
        </ControlSection>
      </ControlsGrid>
    </ControlsContainer>
  );
};

export default Controls;
