import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const ScreenContainer = styled.div`
  background: linear-gradient(145deg, #000, #111);
  border-radius: 20px;
  padding: 2rem;
  border: 3px solid ${props => props.color};
  position: relative;
  overflow: hidden;
  height: 520px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, 
      rgba(${props => props.rgbColor}, 0.1) 0%, 
      transparent 50%);
  }
`;

const Canvas = styled.canvas`
  width: 100%;
  height: calc(100% - 60px);
  background: #0a0a0a;
  border-radius: 10px;
  cursor: crosshair;
  position: relative;
  z-index: 2;
`;

const GraphLabelsContainer = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
  right: 2rem;
  height: 60px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 8px 8px 0 0;
  border: 2px solid ${props => props.color}44;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;
  z-index: 10;
`;

const GraphLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.color};
  font-weight: bold;
  font-size: 0.9rem;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 2px solid ${props => props.color};
  box-shadow: 0 0 10px ${props => props.color}44;
`;

const GraphDescription = styled.div`
  position: absolute;
  bottom: 10px;
  left: 2rem;
  right: 2rem;
  background: rgba(0, 0, 0, 0.9);
  color: #fff;
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid ${props => props.color}44;
  font-size: 0.85rem;
  text-align: center;
  z-index: 10;
`;

const GridOverlay = styled.div`
  position: absolute;
  top: 80px;
  left: 2rem;
  right: 2rem;
  bottom: 60px;
  background-image: 
    linear-gradient(rgba(${props => props.rgbColor}, 0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(${props => props.rgbColor}, 0.3) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
  z-index: 1;
`;

const TriggerLine = styled.div`
  position: absolute;
  top: ${props => props.position + 80}px;
  left: 2rem;
  right: 2rem;
  height: 2px;
  background: ${props => props.color};
  pointer-events: none;
  z-index: 3;
  box-shadow: 0 0 10px ${props => props.color};
  
  &::before {
    content: '${props => props.label}';
    position: absolute;
    left: -50px;
    top: -10px;
    color: ${props => props.color};
    font-size: 12px;
    font-weight: bold;
    background: #0a0a0a;
    padding: 2px 6px;
    border-radius: 4px;
  }
`;

const CursorLine = styled.div`
  position: absolute;
  ${props => props.vertical ? `
    top: 80px;
    bottom: 60px;
    width: 2px;
    left: ${props.position}px;
    cursor: ew-resize;
  ` : `
    left: 2rem;
    right: 2rem;
    height: 2px;
    top: ${props.position + 80}px;
    cursor: ns-resize;
  `}
  background: ${props => props.color};
  z-index: 4;
  box-shadow: 0 0 10px ${props => props.color};
  
  &::before {
    content: '${props => props.label}';
    position: absolute;
    ${props => props.vertical ? `
      top: -25px;
      left: -10px;
    ` : `
      left: -35px;
      top: -10px;
    `}
    color: ${props => props.color};
    font-size: 12px;
    font-weight: bold;
    background: #0a0a0a;
    padding: 2px 6px;
    border-radius: 4px;
  }
`;

const TriggerHandle = styled.div`
  position: absolute;
  top: ${props => props.position + 70}px;
  left: -25px;
  width: 20px;
  height: 20px;
  background: ${props => props.color};
  border-radius: 4px;
  cursor: ns-resize;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  color: #000;
  
  &::after {
    content: 'T';
  }
`;

const Screen = ({ 
  timePerDiv, 
  voltsPerDiv, 
  cursors, 
  setCursors, 
  trigger, 
  setTrigger, 
  yCursors, 
  setYCursors,
  experimentId 
}) => {
  const canvasRef = useRef(null);
  const [isDraggingCursor, setIsDraggingCursor] = useState(null);
  const [isDraggingYCursor, setIsDraggingYCursor] = useState(null);
  const [isDraggingTrigger, setIsDraggingTrigger] = useState(false);
  
  const experimentConfigs = {
    1: { 
      color: "#ff6b6b", 
      rgbColor: "255, 107, 107",
      labels: [
        { color: "#ff6b6b", text: "🟥 CH1: Input Signal (4V p-p Sine Wave)" }
      ],
      description: "Single channel sine wave from function generator - 1kHz frequency, 4V peak-to-peak amplitude"
    },
    2: { 
      color: "#4ecdc4", 
      rgbColor: "78, 205, 196",
      labels: [
        { color: "#4ecdc4", text: "🟦 I-V Characteristics of Different Components" }
      ],
      description: "X-Y plot showing current vs voltage for Resistor, Diode, Capacitor, and LED characteristics"
    },
    3: { 
      color: "#45b7d1", 
      rgbColor: "69, 183, 209",
      labels: [
        { color: "#ff6b6b", text: "🟥 CH1: Input Signal (0.2V p-p)" },
        { color: "#4ecdc4", text: "🟦 CH2: Output (Amplified/Integrated)" }
      ],
      description: "Op-amp circuit analysis: CH1 shows input signal, CH2 shows amplified output or integrated waveform"
    },
    4: { 
      color: "#96ceb4", 
      rgbColor: "150, 206, 180",
      labels: [
        { color: "#ff6b6b", text: "🟥 CH1: 555 Output (Square Wave 0-5V)" },
        { color: "#45b7d1", text: "🟦 CH2: Capacitor Voltage (Charging/Discharging)" }
      ],
      description: "555 Timer waveforms: CH1 shows digital output, CH2 shows timing capacitor voltage with exponential curves"
    }
  };
  
  const config = experimentConfigs[experimentId] || experimentConfigs[1];
  
  // Generate experiment-specific waveforms
  const generateWaveform = (width, height) => {
    const data = [];
    const centerY = height / 2;
    
    switch(experimentId) {
      case "1": // Basic sine wave
        for (let x = 0; x < width; x++) {
          const cycles = 4;
          const angle = (x / width) * cycles * 2 * Math.PI;
          const amplitude = (height / 6) / voltsPerDiv;
          const y = centerY - Math.sin(angle) * amplitude * 4; // 4V p-p
          data.push({ x, y: Math.max(10, Math.min(height - 10, y)) });
        }
        break;
        
      case "2": // I-V characteristics
        const curves = [];
        // Resistor curve (linear)
        for (let x = 0; x < width/4; x++) {
          const voltage = ((x - width/8) / (width/8)) * 2;
          const current = voltage / 1000; // 1kΩ
          const plotX = x + 50;
          const plotY = centerY - (current * height * 100);
          curves.push({ x: plotX, y: Math.max(10, Math.min(height - 10, plotY)), type: 'resistor' });
        }
        // Diode curve (exponential)
        for (let x = width/4; x < width/2; x++) {
          const voltage = ((x - 3*width/8) / (width/8)) * 3;
          const current = voltage > 0.7 ? Math.exp((voltage - 0.7) * 5) * 0.001 : 0;
          const plotX = x + 50;
          const plotY = centerY - (current * height * 50);
          curves.push({ x: plotX, y: Math.max(10, Math.min(height - 10, plotY)), type: 'diode' });
        }
        return curves;
        
      case "3": // Op-amp circuits
        const inputData = [];
        const outputData = [];
        
        for (let x = 0; x < width; x++) {
          const cycles = 3;
          const angle = (x / width) * cycles * 2 * Math.PI;
          
          // Input: 0.2V p-p sine
          const inputAmplitude = (height / 8) / voltsPerDiv;
          const inputY = centerY - Math.sin(angle) * inputAmplitude * 0.2;
          inputData.push({ x, y: Math.max(10, Math.min(height - 10, inputY)) });
          
          // Output based on position (inverting vs integrator)
          let outputY;
          if (x < width / 2) {
            // Inverting amplifier: -10x gain
            outputY = centerY + Math.sin(angle) * inputAmplitude * 2;
          } else {
            // Integrator: triangular from square input
            const triangular = Math.asin(Math.sin(angle)) / Math.PI * 2;
            outputY = centerY - triangular * inputAmplitude * 1.5;
          }
          outputData.push({ x, y: Math.max(10, Math.min(height - 10, outputY)) });
        }
        return { input: inputData, output: outputData };
        
      case "4": // 555 Timer
        const output555 = [];
        const capacitor = [];
        
        for (let x = 0; x < width; x++) {
          const cycles = 2.5;
          const progress = (x / width) * cycles;
          const phaseInCycle = (progress % 1);
          
          // Square wave output
          const outputAmplitude = (height / 8) / voltsPerDiv;
          const outputY = centerY - (phaseInCycle < 0.5 ? 5 : 0) * outputAmplitude;
          output555.push({ x, y: Math.max(10, Math.min(height - 10, outputY)) });
          
          // Capacitor charging/discharging
          let capVoltage;
          if (phaseInCycle < 0.5) {
            capVoltage = 3.3 * (1 - Math.exp(-phaseInCycle * 8));
          } else {
            capVoltage = 3.3 * Math.exp(-(phaseInCycle - 0.5) * 6);
          }
          const capY = centerY - capVoltage * outputAmplitude * 0.6;
          capacitor.push({ x, y: Math.max(10, Math.min(height - 10, capY)) });
        }
        return { output: output555, capacitor };
        
      default:
        for (let x = 0; x < width; x++) {
          data.push({ x, y: centerY });
        }
    }
    
    return data;
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    const drawWaveform = () => {
      // Clear canvas
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, width, height);
      
      // Generate waveform
      const waveformData = generateWaveform(width - 40, height - 40);
      
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      // Draw based on experiment type
      if (experimentId === "2") {
        // I-V characteristics
        ctx.strokeStyle = config.color;
        ctx.beginPath();
        if (Array.isArray(waveformData)) {
          waveformData.forEach((point, index) => {
            const adjustedX = point.x + 20;
            const adjustedY = point.y + 20;
            if (index === 0) {
              ctx.moveTo(adjustedX, adjustedY);
            } else {
              ctx.lineTo(adjustedX, adjustedY);
            }
          });
        }
        ctx.stroke();
        
        // Axes labels
        ctx.fillStyle = '#888';
        ctx.font = 'bold 14px Arial';
        ctx.fillText('Voltage (V) →', width - 120, height - 15);
        ctx.save();
        ctx.translate(15, height / 2 + 40);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText('Current (mA) ↑', 0, 0);
        ctx.restore();
        
      } else if (experimentId === "3") {
        // Two channels for op-amp
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#ff6b6b';
        ctx.beginPath();
        waveformData.input?.forEach((point, index) => {
          const adjustedX = point.x + 20;
          const adjustedY = point.y + 20;
          if (index === 0) {
            ctx.moveTo(adjustedX, adjustedY);
          } else {
            ctx.lineTo(adjustedX, adjustedY);
          }
        });
        ctx.stroke();
        
        ctx.strokeStyle = '#4ecdc4';
        ctx.beginPath();
        waveformData.output?.forEach((point, index) => {
          const adjustedX = point.x + 20;
          const adjustedY = point.y + 20;
          if (index === 0) {
            ctx.moveTo(adjustedX, adjustedY);
          } else {
            ctx.lineTo(adjustedX, adjustedY);
          }
        });
        ctx.stroke();
        
      } else if (experimentId === "4") {
        // 555 Timer - two channels
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#ff6b6b';
        ctx.beginPath();
        waveformData.output?.forEach((point, index) => {
          const adjustedX = point.x + 20;
          const adjustedY = point.y + 20;
          if (index === 0) {
            ctx.moveTo(adjustedX, adjustedY);
          } else {
            ctx.lineTo(adjustedX, adjustedY);
          }
        });
        ctx.stroke();
        
        ctx.strokeStyle = '#45b7d1';
        ctx.beginPath();
        waveformData.capacitor?.forEach((point, index) => {
          const adjustedX = point.x + 20;
          const adjustedY = point.y + 20;
          if (index === 0) {
            ctx.moveTo(adjustedX, adjustedY);
          } else {
            ctx.lineTo(adjustedX, adjustedY);
          }
        });
        ctx.stroke();
        
      } else {
        // Single channel
        ctx.strokeStyle = config.color;
        ctx.beginPath();
        if (Array.isArray(waveformData)) {
          waveformData.forEach((point, index) => {
            const adjustedX = point.x + 20;
            const adjustedY = point.y + 20;
            if (index === 0) {
              ctx.moveTo(adjustedX, adjustedY);
            } else {
              ctx.lineTo(adjustedX, adjustedY);
            }
          });
        }
        ctx.stroke();
      }
      
      // Draw center reference lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      
      ctx.beginPath();
      ctx.moveTo(20, height / 2);
      ctx.lineTo(width - 20, height / 2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(width / 2, 20);
      ctx.lineTo(width / 2, height - 20);
      ctx.stroke();
      
      ctx.setLineDash([]);
    };
    
    drawWaveform();
  }, [timePerDiv, voltsPerDiv, experimentId, trigger]);
  
  const triggerPosition = 200 - (trigger * 30);
  
  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    
    if (isDraggingCursor) {
      const x = Math.max(20, Math.min(rect.width - 20, e.clientX - rect.left));
      setCursors(prev => ({
        ...prev,
        [isDraggingCursor]: x
      }));
    }
    
    if (isDraggingYCursor) {
      const y = Math.max(20, Math.min(rect.height - 20, e.clientY - rect.top));
      setYCursors(prev => ({
        ...prev,
        [isDraggingYCursor]: y
      }));
    }
    
    if (isDraggingTrigger) {
      const y = Math.max(20, Math.min(rect.height - 20, e.clientY - rect.top));
      const triggerVoltage = (200 - y) / 30;
      setTrigger(Math.max(-5, Math.min(5, triggerVoltage)));
    }
  };
  
  const handleMouseUp = () => {
    setIsDraggingCursor(null);
    setIsDraggingYCursor(null);
    setIsDraggingTrigger(false);
  };
  
  return (
    <ScreenContainer color={config.color} rgbColor={config.rgbColor}>
      {/* Graph Labels */}
      <GraphLabelsContainer color={config.color}>
        {config.labels.map((label, index) => (
          <GraphLabel key={index} color={label.color}>
            {label.text}
          </GraphLabel>
        ))}
      </GraphLabelsContainer>
      
      <GridOverlay rgbColor={config.rgbColor} />
      <Canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      
      {/* Graph Description */}
      <GraphDescription color={config.color}>
        📊 {config.description}
      </GraphDescription>
      
      {/* Trigger line and handle */}
      <TriggerLine
        position={triggerPosition}
        color="#ffff00"
        label="TRIGGER"
      />
      <TriggerHandle
        position={triggerPosition}
        color="#ffff00"
        onMouseDown={(e) => {
          e.stopPropagation();
          setIsDraggingTrigger(true);
        }}
      />
      
      {/* X-axis cursors */}
      <CursorLine
        vertical={true}
        position={cursors.cursor1}
        color="#00ff00"
        label="C1"
        onMouseDown={(e) => {
          e.stopPropagation();
          setIsDraggingCursor('cursor1');
        }}
      />
      <CursorLine
        vertical={true}
        position={cursors.cursor2}
        color="#ff0000"
        label="C2"
        onMouseDown={(e) => {
          e.stopPropagation();
          setIsDraggingCursor('cursor2');
        }}
      />
      
      {/* Y-axis cursors */}
      <CursorLine
        vertical={false}
        position={yCursors.yCursor1 - 80}
        color="#00ffff"
        label="Y1"
        onMouseDown={(e) => {
          e.stopPropagation();
          setIsDraggingYCursor('yCursor1');
        }}
      />
      <CursorLine
        vertical={false}
        position={yCursors.yCursor2 - 80}
        color="#ff00ff"
        label="Y2"
        onMouseDown={(e) => {
          e.stopPropagation();
          setIsDraggingYCursor('yCursor2');
        }}
      />
    </ScreenContainer>
  );
};

export default Screen;
