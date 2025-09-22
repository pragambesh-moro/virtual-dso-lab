import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  color: #fff;
  padding: 1rem;
  font-family: 'Arial', sans-serif;
`;

const Header = styled.div`
  max-width: 1400px;
  margin: 0 auto 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled(motion.h1)`
  color: #6c5ce7;
  font-size: 1.8rem;
  margin: 0;
  text-shadow: 0 0 15px rgba(108, 92, 231, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

const BackButton = styled(Link)`
  padding: 0.6rem 1.2rem;
  background: linear-gradient(45deg, #6c5ce7, #a29bfe);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(108, 92, 231, 0.3);
  }
`;

const DSOContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 1.5rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const DSOMain = styled.div`
  background: linear-gradient(145deg, #2a2d3e, #1e1e2e);
  border-radius: 20px;
  padding: 1.5rem;
  border: 3px solid ${props => props.color || '#6c5ce7'};
  display: flex;
  flex-direction: column;
  position: relative;
  
  &::before {
    content: 'DIGITAL STORAGE OSCILLOSCOPE';
    position: absolute;
    top: 0.5rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.7rem;
    font-weight: bold;
    color: #888;
    letter-spacing: 2px;
  }
`;

const DSOScreen = styled.div`
  background: #000;
  border: 4px solid #333;
  border-radius: 12px;
  height: 400px;
  position: relative;
  margin: 2rem 0 1rem 0;
  overflow: hidden;
  
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const ScreenCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  display: block;
  cursor: crosshair;
`;

const CursorDisplay = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.9);
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid ${props => props.color || '#6c5ce7'};
  font-family: monospace;
  font-size: 0.75rem;
  color: ${props => props.color || '#6c5ce7'};
  min-width: 140px;
  
  .cursor-info {
    margin-bottom: 0.2rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .cursor-line {
    display: flex;
    justify-content: space-between;
    
    .label {
      color: #ccc;
      min-width: 50px;
    }
    
    .value {
      font-weight: bold;
      text-align: right;
    }
  }
  
  .delta-section {
    border-top: 1px solid #333;
    padding-top: 0.5rem;
    margin-top: 0.5rem;
  }
`;

const ControlPanel = styled.div`
  background: linear-gradient(145deg, #2a2d3e, #1e1e2e);
  border-radius: 20px;
  padding: 1.5rem;
  border: 2px solid ${props => props.color || '#6c5ce7'}44;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ExperimentTitle = styled.h2`
  color: ${props => props.color || '#6c5ce7'};
  font-size: 1.2rem;
  margin: 0 0 1rem 0;
  text-shadow: 0 0 10px ${props => props.color || '#6c5ce7'}44;
  text-align: center;
`;

const ControlGroup = styled.div`
  background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
  border-radius: 12px;
  padding: 1rem;
  border: 2px solid ${props => props.color || '#666'}44;
`;

const ControlTitle = styled.h3`
  color: ${props => props.color || '#6c5ce7'};
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const KnobContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

const Knob = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(145deg, #4a4a4a, #2a2a2a);
  border: 3px solid ${props => props.color || '#666'};
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease;
  transform: rotate(${props => props.rotation || 0}deg);
  
  &:hover {
    transform: rotate(${props => props.rotation || 0}deg) scale(1.05);
    box-shadow: 0 0 15px ${props => props.color}44;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 5px;
    left: 50%;
    width: 3px;
    height: 20px;
    background: ${props => props.color || '#666'};
    transform: translateX(-50%);
    border-radius: 2px;
  }
`;

const KnobLabel = styled.div`
  color: #ccc;
  font-size: 0.75rem;
  text-align: center;
`;

const KnobValue = styled.div`
  color: ${props => props.color || '#6c5ce7'};
  font-size: 0.8rem;
  font-weight: bold;
  text-align: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.active ? 
    `linear-gradient(145deg, ${props.color}, ${props.color}cc)` : 
    'linear-gradient(145deg, #4a4a4a, #2a2a2a)'
  };
  color: ${props => props.active ? 'white' : '#ccc'};
  border: 2px solid ${props => props.active ? props.color : '#666'};
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ResetButton = styled(Button)`
  background: linear-gradient(145deg, #ff4757, #ff3742);
  border: 2px solid #ff4757;
  color: white;
  font-weight: bold;
  
  &:hover:not(:disabled) {
    background: linear-gradient(145deg, #ff3742, #ff2f3a);
    box-shadow: 0 4px 12px rgba(255, 71, 87, 0.4);
  }
`;

const MeasurementDisplay = styled.div`
  background: #000;
  border: 2px solid ${props => props.color}44;
  border-radius: 8px;
  padding: 1rem;
`;

const MeasurementGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`;

const MeasurementItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.3rem 0;
  font-size: 0.85rem;
  
  .label {
    color: #ccc;
  }
  
  .value {
    color: ${props => props.color};
    font-weight: bold;
  }
`;

const StatusBar = styled.div`
  background: linear-gradient(145deg, #1a1a1a, #0a0a0a);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  
  .status {
    color: #4ecdc4;
    font-weight: bold;
  }
  
  .info {
    color: #888;
  }
`;

const CursorControlGroup = styled(ControlGroup)`
  .cursor-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  
  .cursor-info-display {
    background: #000;
    padding: 0.5rem;
    border-radius: 4px;
    margin-top: 0.5rem;
    font-family: monospace;
    font-size: 0.75rem;
    
    .measurement-line {
      display: flex;
      justify-content: space-between;
      margin: 0.2rem 0;
      
      .label {
        color: #ccc;
        min-width: 60px;
      }
      
      .value {
        color: ${props => props.color};
        font-weight: bold;
      }
    }
    
    .cursor-section {
      margin-bottom: 0.5rem;
      border-bottom: 1px solid #333;
      padding-bottom: 0.5rem;
      
      &:last-child {
        margin-bottom: 0;
        border-bottom: none;
        padding-bottom: 0;
      }
    }
  }
`;

const DSO = () => {
  const { experimentId } = useParams();
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const lastWaveformData = useRef(null);

  // Experiment configurations
  const experimentConfigs = {
    1: {
      title: "Basic Test Equipment - Sine Wave Analysis",
      color: "#ff6b6b",
      waveform: "sine",
      frequency: 1000,
      amplitude: 2,
      offset: 0,
      phase: 0,
      defaultTimeBase: 1,
      defaultVoltageScale: 1
    },
    2: {
      title: "I-V Characteristics - Device Testing",
      color: "#4ecdc4",
      waveform: "triangle",
      frequency: 10,
      amplitude: 3,
      offset: 0,
      phase: 0,
      defaultTimeBase: 50,
      defaultVoltageScale: 2
    },
    3: {
      title: "Op-Amp Circuits - Signal Processing",
      color: "#45b7d1",
      waveform: "amplified",
      frequency: 1000,
      amplitude: 0.2,
      offset: 0,
      phase: 180,
      defaultTimeBase: 1,
      defaultVoltageScale: 5
    },
    4: {
      title: "555 Timer - Square Wave Generation",
      color: "#96ceb4",
      waveform: "square",
      frequency: 1,
      amplitude: 5,
      offset: 2.5,
      phase: 0,
      dutyCycle: 67,
      defaultTimeBase: 200,
      defaultVoltageScale: 2
    }
  };

  const config = experimentConfigs[experimentId] || experimentConfigs[1];

  // DSO State
  const [timeBase, setTimeBase] = useState(config.defaultTimeBase || 5);
  const [voltageScale, setVoltageScale] = useState(config.defaultVoltageScale || 2);
  const [triggerLevel, setTriggerLevel] = useState(0);
  const [triggerMode, setTriggerMode] = useState('auto');
  const [triggerSlope, setTriggerSlope] = useState('rising');
  const [coupling, setCoupling] = useState('DC');
  const [channel1, setChannel1] = useState(true);
  const [channel2, setChannel2] = useState(false);
  const [isRunning, setIsRunning] = useState(true);

  // Cursor State - X cursor (vertical line), Y cursor (horizontal line)
  const [cursorsEnabled, setCursorsEnabled] = useState(false);
  const [xCursorPosition, setXCursorPosition] = useState(0.25); // X position only (0-1)
  const [yCursorPosition, setYCursorPosition] = useState(0.5);  // Y position only (0-1)
  const [activeCursor, setActiveCursor] = useState('X'); // 'X' or 'Y'
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Measurements State
  const [measurements, setMeasurements] = useState({
    frequency: 0,
    period: 0,
    amplitude: 0,
    peak: 0,
    rms: 0,
    mean: 0,
    dutyCycle: 50
  });

  // Cursor measurements
  const [cursorMeasurements, setCursorMeasurements] = useState({
    xCursorTime: 0,
    yCursorVoltage: 0,
    xCursorVoltage: 0, // Voltage at X cursor position
    yCursorTime: 0,    // Time at Y cursor position
    deltaX: 0,         // Time difference
    deltaY: 0,         // Voltage difference
  });

  // Knob rotations for visual feedback
  const [knobRotations, setKnobRotations] = useState({
    timeBase: 0,
    voltageScale: 0,
    triggerLevel: 0
  });

  // Time base and voltage scale options
  const timeBaseOptions = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500];
  const voltageOptions = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50];

  // Reset function for experiment
  const resetExperiment = useCallback(() => {
    setTimeBase(config.defaultTimeBase || 5);
    setVoltageScale(config.defaultVoltageScale || 2);
    setTriggerLevel(0);
    setTriggerMode('auto');
    setTriggerSlope('rising');
    setCoupling('DC');
    setChannel1(true);
    setChannel2(false);
    setCursorsEnabled(false);
    setXCursorPosition(0.25);
    setYCursorPosition(0.5);
    setActiveCursor('X');
    setIsRunning(true);
    setKnobRotations({
      timeBase: timeBaseOptions.indexOf(config.defaultTimeBase || 5) * 30,
      voltageScale: voltageOptions.indexOf(config.defaultVoltageScale || 2) * 40,
      triggerLevel: 0
    });
  }, [config]);

  // Generate waveform data
  const generateWaveform = useCallback((time, samples = 1000) => {
    const data = [];
    const timeStep = (timeBase * 10) / samples; // 10 divisions across screen
    
    for (let i = 0; i < samples; i++) {
      const t = time + i * timeStep / 1000; // Convert to seconds
      let voltage = 0;
      
      switch (config.waveform) {
        case 'sine':
          voltage = config.amplitude * Math.sin(2 * Math.PI * config.frequency * t + config.phase * Math.PI / 180);
          break;
          
        case 'square':
          const period = 1 / config.frequency;
          const dutyCycleFraction = (config.dutyCycle || 50) / 100;
          const timeInPeriod = t % period;
          voltage = timeInPeriod < (period * dutyCycleFraction) ? config.amplitude : 0;
          break;
          
        case 'triangle':
          const triPeriod = 1 / config.frequency;
          const triTime = (t % triPeriod) / triPeriod;
          voltage = config.amplitude * (triTime < 0.5 ? 4 * triTime - 1 : 3 - 4 * triTime);
          break;
          
        case 'amplified':
          // Simulating inverting amplifier with gain of -10
          const inputSignal = 0.2 * Math.sin(2 * Math.PI * config.frequency * t);
          voltage = -10 * inputSignal; // Inverted and amplified
          break;
          
        default:
          voltage = config.amplitude * Math.sin(2 * Math.PI * config.frequency * t);
      }
      
      voltage += config.offset || 0;
      data.push(voltage);
    }
    
    return data;
  }, [config, timeBase]);

  // Calculate measurements from waveform data
  const calculateMeasurements = useCallback((data) => {
    if (data.length === 0) return measurements;
    
    const max = Math.max(...data);
    const min = Math.min(...data);
    const peak = Math.max(Math.abs(max), Math.abs(min));
    const amplitude = max - min;
    const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
    const rms = Math.sqrt(data.reduce((sum, val) => sum + val * val, 0) / data.length);
    
    // Simple frequency detection (zero crossings)
    let crossings = 0;
    for (let i = 1; i < data.length; i++) {
      if ((data[i] >= mean && data[i-1] < mean)) {
        crossings++;
      }
    }
    
    const timeSpan = timeBase * 10 / 1000; // Total time span in seconds
    const frequency = crossings / timeSpan;
    const period = frequency > 0 ? 1 / frequency : 0;
    
    return {
      frequency: Math.abs(frequency).toFixed(1),
      period: (period * 1000).toFixed(2), // Convert to ms
      amplitude: Math.abs(amplitude).toFixed(2),
      peak: Math.abs(peak).toFixed(2),
      rms: Math.abs(rms).toFixed(2),
      mean: mean.toFixed(2),
      dutyCycle: config.dutyCycle || 50
    };
  }, [timeBase, config, measurements]);

  // Calculate cursor measurements
  const calculateCursorMeasurements = useCallback(() => {
    const timeSpan = timeBase * 10; // Total time span in ms
    const voltageSpan = voltageScale * 8; // Total voltage span
    
    const xCursorTime = xCursorPosition * timeSpan;
    const yCursorVoltage = (0.5 - yCursorPosition) * voltageSpan;
    
    // Get voltage at X cursor position from waveform data
    let xCursorVoltage = 0;
    let yCursorTime = 0; // Time corresponding to center horizontal position
    
    if (lastWaveformData.current && lastWaveformData.current.length > 0) {
      const dataIndex = Math.floor(xCursorPosition * (lastWaveformData.current.length - 1));
      xCursorVoltage = lastWaveformData.current[dataIndex] || 0;
      yCursorTime = timeSpan * 0.5; // Center position for Y cursor
    }
    
    // Calculate reference deltas (from screen center)
    const centerTime = timeSpan * 0.5;
    const centerVoltage = 0;
    
    const deltaX = Math.abs(xCursorTime - centerTime);
    const deltaY = Math.abs(yCursorVoltage - centerVoltage);
    
    setCursorMeasurements({
      xCursorTime: xCursorTime.toFixed(2),
      yCursorVoltage: yCursorVoltage.toFixed(2),
      xCursorVoltage: xCursorVoltage.toFixed(2),
      yCursorTime: yCursorTime.toFixed(2),
      deltaX: deltaX.toFixed(2),
      deltaY: deltaY.toFixed(2),
    });
  }, [xCursorPosition, yCursorPosition, timeBase, voltageScale]);

  // Update cursor measurements when cursors move or waveform updates
  useEffect(() => {
    if (cursorsEnabled) {
      calculateCursorMeasurements();
    }
  }, [cursorsEnabled, calculateCursorMeasurements, lastWaveformData.current]);

  // Handle canvas mouse events for cursor control (works in both running and stopped modes)
  const handleCanvasMouseMove = useCallback((event) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    
    setMousePosition({ x, y });
  }, []);

  const handleCanvasClick = useCallback((event) => {
    if (!cursorsEnabled) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    
    if (activeCursor === 'X') {
      // X cursor only moves horizontally
      setXCursorPosition(Math.max(0, Math.min(1, x)));
    } else if (activeCursor === 'Y') {
      // Y cursor only moves vertically
      setYCursorPosition(Math.max(0, Math.min(1, y)));
    }
  }, [cursorsEnabled, activeCursor]);

  // Draw oscilloscope screen
  const drawScreen = useCallback((canvas, data) => {
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    // Store waveform data for cursor calculations
    lastWaveformData.current = data;
    
    // Clear screen
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.2)';
    ctx.lineWidth = 1;
    
    const gridX = width / 10; // 10 horizontal divisions
    const gridY = height / 8;  // 8 vertical divisions
    
    // Vertical grid lines
    for (let i = 0; i <= 10; i++) {
      ctx.beginPath();
      ctx.moveTo(i * gridX, 0);
      ctx.lineTo(i * gridX, height);
      ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let i = 0; i <= 8; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * gridY);
      ctx.lineTo(width, i * gridY);
      ctx.stroke();
    }
    
    // Center lines (brighter)
    ctx.strokeStyle = 'rgba(0, 255, 0, 0.5)';
    ctx.lineWidth = 1;
    // Center vertical
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
    
    // Center horizontal
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    
    // Draw trigger level line
    const triggerY = height / 2 - (triggerLevel / voltageScale) * gridY;
    if (triggerY >= 0 && triggerY <= height) {
      ctx.strokeStyle = 'rgba(255, 255, 0, 0.8)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(0, triggerY);
      ctx.lineTo(width, triggerY);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    
    // Draw waveform
    if (data && data.length > 1 && channel1) {
      ctx.strokeStyle = config.color;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      ctx.beginPath();
      
      for (let i = 0; i < data.length; i++) {
        const x = (i / (data.length - 1)) * width;
        const y = height / 2 - (data[i] / voltageScale) * gridY;
        const clampedY = Math.max(0, Math.min(height, y));
        
        if (i === 0) {
          ctx.moveTo(x, clampedY);
        } else {
          ctx.lineTo(x, clampedY);
        }
      }
      
      ctx.stroke();
    }
    
    // Draw cursors
    if (cursorsEnabled) {
      // X Cursor (vertical line) - moves only horizontally
      const xCursorX = xCursorPosition * width;
      
      ctx.strokeStyle = activeCursor === 'X' ? '#ffff00' : '#ffff0088';
      ctx.lineWidth = activeCursor === 'X' ? 3 : 2;
      ctx.setLineDash([]);
      
      // Vertical line
      ctx.beginPath();
      ctx.moveTo(xCursorX, 0);
      ctx.lineTo(xCursorX, height);
      ctx.stroke();
      
      // X cursor marker at bottom
      ctx.fillStyle = activeCursor === 'X' ? '#ffff00' : '#ffff0088';
      const markerSize = activeCursor === 'X' ? 8 : 6;
      ctx.fillRect(xCursorX - markerSize/2, height - 15, markerSize, 10);
      
      // X cursor label
      ctx.fillStyle = '#ffff00';
      ctx.font = 'bold 12px monospace';
      ctx.fillText('X', xCursorX - 6, height - 20);
      
      // Y Cursor (horizontal line) - moves only vertically
      const yCursorY = yCursorPosition * height;
      
      ctx.strokeStyle = activeCursor === 'Y' ? '#ff00ff' : '#ff00ff88';
      ctx.lineWidth = activeCursor === 'Y' ? 3 : 2;
      
      // Horizontal line
      ctx.beginPath();
      ctx.moveTo(0, yCursorY);
      ctx.lineTo(width, yCursorY);
      ctx.stroke();
      
      // Y cursor marker at left
      ctx.fillStyle = activeCursor === 'Y' ? '#ff00ff' : '#ff00ff88';
      ctx.fillRect(5, yCursorY - markerSize/2, 10, markerSize);
      
      // Y cursor label
      ctx.fillStyle = '#ff00ff';
      ctx.fillText('Y', 20, yCursorY + 4);
    }
    
    // Draw scale labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '12px monospace';
    
    // Time base label
    ctx.fillText(`${timeBase}ms/div`, 10, height - 10);
    
    // Voltage scale label
    ctx.fillText(`${voltageScale}V/div`, 10, 20);
    
    // Trigger info
    ctx.fillText(`Trig: ${triggerMode.toUpperCase()} ${triggerLevel.toFixed(1)}V`, width - 150, 20);
    
  }, [config.color, timeBase, voltageScale, triggerLevel, triggerMode, channel1, cursorsEnabled, xCursorPosition, yCursorPosition, activeCursor]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    if (isRunning) {
      let startTime = Date.now();
      
      const animate = () => {
        const currentTime = (Date.now() - startTime) / 1000; // Time in seconds
        
        if (canvas) {
          const data = generateWaveform(currentTime);
          drawScreen(canvas, data);
          setMeasurements(calculateMeasurements(data));
        }
        
        if (isRunning) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };
      
      animate();
    } else {
      // In stop mode, draw static waveform
      const data = generateWaveform(0); // Static waveform at time 0
      drawScreen(canvas, data);
      setMeasurements(calculateMeasurements(data));
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, generateWaveform, drawScreen, calculateMeasurements]);

  // Control handlers
  const handleTimeBaseChange = (direction) => {
    const currentIndex = timeBaseOptions.indexOf(timeBase);
    const newIndex = Math.max(0, Math.min(timeBaseOptions.length - 1, currentIndex + direction));
    setTimeBase(timeBaseOptions[newIndex]);
    setKnobRotations(prev => ({ ...prev, timeBase: newIndex * 30 }));
  };

  const handleVoltageScaleChange = (direction) => {
    const currentIndex = voltageOptions.indexOf(voltageScale);
    const newIndex = Math.max(0, Math.min(voltageOptions.length - 1, currentIndex + direction));
    setVoltageScale(voltageOptions[newIndex]);
    setKnobRotations(prev => ({ ...prev, voltageScale: newIndex * 40 }));
  };

  const handleTriggerLevelChange = (direction) => {
    const newLevel = Math.max(-5, Math.min(5, triggerLevel + direction * 0.1));
    setTriggerLevel(newLevel);
    setKnobRotations(prev => ({ ...prev, triggerLevel: newLevel * 36 }));
  };

  return (
    <Container>
      <Header>
        <Title
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          🔬 DSO Simulation
        </Title>
        <BackButton to="/study-guide">← Back to Study Guide</BackButton>
      </Header>

      <DSOContainer>
        <DSOMain color={config.color}>
          <DSOScreen>
            <ScreenCanvas 
              ref={canvasRef}
              onMouseMove={handleCanvasMouseMove}
              onClick={handleCanvasClick}
            />
            
            {cursorsEnabled && (
              <CursorDisplay color={config.color}>
                <div className="cursor-info">
                  <div className="cursor-line">
                    <span className="label">X:</span>
                    <span className="value" style={{color: '#ffff00'}}>{cursorMeasurements.xCursorTime} ms</span>
                  </div>
                </div>
                <div className="cursor-info">
                  <div className="cursor-line">
                    <span className="label">Y:</span>
                    <span className="value" style={{color: '#ff00ff'}}>{cursorMeasurements.yCursorVoltage} V</span>
                  </div>
                </div>
                <div className="cursor-info delta-section">
                  <div className="cursor-line">
                    <span className="label">ΔX:</span>
                    <span className="value">{cursorMeasurements.deltaX} ms</span>
                  </div>
                </div>
                <div className="cursor-info">
                  <div className="cursor-line">
                    <span className="label">ΔY:</span>
                    <span className="value">{cursorMeasurements.deltaY} V</span>
                  </div>
                </div>
                <div className="cursor-info">
                  <div className="cursor-line">
                    <span className="label">V@X:</span>
                    <span className="value">{cursorMeasurements.xCursorVoltage} V</span>
                  </div>
                </div>
              </CursorDisplay>
            )}
          </DSOScreen>

          <MeasurementDisplay color={config.color}>
            <MeasurementGrid>
              <MeasurementItem color={config.color}>
                <span className="label">Frequency:</span>
                <span className="value">{measurements.frequency} Hz</span>
              </MeasurementItem>
              <MeasurementItem color={config.color}>
                <span className="label">Period:</span>
                <span className="value">{measurements.period} ms</span>
              </MeasurementItem>
              <MeasurementItem color={config.color}>
                <span className="label">Amplitude:</span>
                <span className="value">{measurements.amplitude} V</span>
              </MeasurementItem>
              <MeasurementItem color={config.color}>
                <span className="label">RMS:</span>
                <span className="value">{measurements.rms} V</span>
              </MeasurementItem>
              <MeasurementItem color={config.color}>
                <span className="label">Peak:</span>
                <span className="value">{measurements.peak} V</span>
              </MeasurementItem>
              <MeasurementItem color={config.color}>
                <span className="label">Mean:</span>
                <span className="value">{measurements.mean} V</span>
              </MeasurementItem>
            </MeasurementGrid>
          </MeasurementDisplay>
        </DSOMain>

        <ControlPanel color={config.color}>
          <ExperimentTitle color={config.color}>
            Experiment {experimentId}
          </ExperimentTitle>
          
          {/* Reset Button */}
          <ControlGroup color="#ff4757">
            <ControlTitle color="#ff4757">Reset</ControlTitle>
            <ResetButton onClick={resetExperiment}>
              🔄 Reset Experiment
            </ResetButton>
          </ControlGroup>
          
          <ControlGroup color={config.color}>
            <ControlTitle color={config.color}>Time Base</ControlTitle>
            <KnobContainer>
              <Knob 
                color={config.color}
                rotation={knobRotations.timeBase}
                onClick={() => handleTimeBaseChange(1)}
                onContextMenu={(e) => { e.preventDefault(); handleTimeBaseChange(-1); }}
              />
              <KnobLabel>ms/div</KnobLabel>
              <KnobValue color={config.color}>{timeBase}</KnobValue>
            </KnobContainer>
          </ControlGroup>

          <ControlGroup color={config.color}>
            <ControlTitle color={config.color}>Voltage Scale</ControlTitle>
            <KnobContainer>
              <Knob 
                color={config.color}
                rotation={knobRotations.voltageScale}
                onClick={() => handleVoltageScaleChange(1)}
                onContextMenu={(e) => { e.preventDefault(); handleVoltageScaleChange(-1); }}
              />
              <KnobLabel>V/div</KnobLabel>
              <KnobValue color={config.color}>{voltageScale}</KnobValue>
            </KnobContainer>
          </ControlGroup>

          <ControlGroup color={config.color}>
            <ControlTitle color={config.color}>Trigger Level</ControlTitle>
            <KnobContainer>
              <Knob 
                color={config.color}
                rotation={knobRotations.triggerLevel}
                onClick={() => handleTriggerLevelChange(1)}
                onContextMenu={(e) => { e.preventDefault(); handleTriggerLevelChange(-1); }}
              />
              <KnobLabel>Volts</KnobLabel>
              <KnobValue color={config.color}>{triggerLevel.toFixed(1)}</KnobValue>
            </KnobContainer>
          </ControlGroup>

          {/* Cursor Controls */}
          <CursorControlGroup color={config.color}>
            <ControlTitle color={config.color}>Cursors</ControlTitle>
            <ButtonGroup>
              <Button
                active={cursorsEnabled}
                color={config.color}
                onClick={() => setCursorsEnabled(!cursorsEnabled)}
              >
                {cursorsEnabled ? 'ON' : 'OFF'}
              </Button>
              <Button
                active={activeCursor === 'X'}
                color="#ffff00"
                onClick={() => setActiveCursor('X')}
                disabled={!cursorsEnabled}
              >
                X (Time)
              </Button>
              <Button
                active={activeCursor === 'Y'}
                color="#ff00ff"
                onClick={() => setActiveCursor('Y')}
                disabled={!cursorsEnabled}
              >
                Y (Volt)
              </Button>
            </ButtonGroup>
            
            {cursorsEnabled && (
              <div className="cursor-info-display">
                <div className="cursor-section">
                  <div className="measurement-line">
                    <span className="label">X Time:</span>
                    <span className="value" style={{color: '#ffff00'}}>{cursorMeasurements.xCursorTime} ms</span>
                  </div>
                  <div className="measurement-line">
                    <span className="label">V @ X:</span>
                    <span className="value" style={{color: '#ffff00'}}>{cursorMeasurements.xCursorVoltage} V</span>
                  </div>
                </div>
                <div className="cursor-section">
                  <div className="measurement-line">
                    <span className="label">Y Volt:</span>
                    <span className="value" style={{color: '#ff00ff'}}>{cursorMeasurements.yCursorVoltage} V</span>
                  </div>
                </div>
                <div className="cursor-section">
                  <div className="measurement-line">
                    <span className="label">ΔX:</span>
                    <span className="value">{cursorMeasurements.deltaX} ms</span>
                  </div>
                  <div className="measurement-line">
                    <span className="label">ΔY:</span>
                    <span className="value">{cursorMeasurements.deltaY} V</span>
                  </div>
                </div>
              </div>
            )}
          </CursorControlGroup>

          <ControlGroup color={config.color}>
            <ControlTitle color={config.color}>Trigger Mode</ControlTitle>
            <ButtonGroup>
              <Button
                active={triggerMode === 'auto'}
                color={config.color}
                onClick={() => setTriggerMode('auto')}
              >
                Auto
              </Button>
              <Button
                active={triggerMode === 'normal'}
                color={config.color}
                onClick={() => setTriggerMode('normal')}
              >
                Normal
              </Button>
              <Button
                active={triggerMode === 'single'}
                color={config.color}
                onClick={() => setTriggerMode('single')}
              >
                Single
              </Button>
            </ButtonGroup>
          </ControlGroup>

          <ControlGroup color={config.color}>
            <ControlTitle color={config.color}>Channel</ControlTitle>
            <ButtonGroup>
              <Button
                active={channel1}
                color={config.color}
                onClick={() => setChannel1(!channel1)}
              >
                CH1 {channel1 ? 'ON' : 'OFF'}
              </Button>
              <Button
                active={channel2}
                color="#ff4757"
                onClick={() => setChannel2(!channel2)}
              >
                CH2 {channel2 ? 'ON' : 'OFF'}
              </Button>
            </ButtonGroup>
          </ControlGroup>

          <ControlGroup color={config.color}>
            <ControlTitle color={config.color}>Coupling</ControlTitle>
            <ButtonGroup>
              <Button
                active={coupling === 'DC'}
                color={config.color}
                onClick={() => setCoupling('DC')}
              >
                DC
              </Button>
              <Button
                active={coupling === 'AC'}
                color={config.color}
                onClick={() => setCoupling('AC')}
              >
                AC
              </Button>
              <Button
                active={coupling === 'GND'}
                color={config.color}
                onClick={() => setCoupling('GND')}
              >
                GND
              </Button>
            </ButtonGroup>
          </ControlGroup>

          <ControlGroup color={config.color}>
            <ControlTitle color={config.color}>Control</ControlTitle>
            <ButtonGroup>
              <Button
                active={isRunning}
                color="#4ecdc4"
                onClick={() => setIsRunning(!isRunning)}
              >
                {isRunning ? 'STOP' : 'RUN'}
              </Button>
            </ButtonGroup>
          </ControlGroup>

          <StatusBar>
            <span className="status">
              {isRunning ? 'RUNNING' : 'STOPPED'}
            </span>
            <span className="info">
              {config.title}
            </span>
          </StatusBar>
        </ControlPanel>
      </DSOContainer>
    </Container>
  );
};

export default DSO;
