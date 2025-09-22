import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  color: #fff;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
`;

const Header = styled.div`
  max-width: 1200px;
  margin: 0 auto 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled(motion.h1)`
  color: #6c5ce7;
  font-size: 2.5rem;
  margin: 0;
  text-shadow: 0 0 20px rgba(108, 92, 231, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const BackButton = styled(Link)`
  padding: 0.8rem 1.5rem;
  background: linear-gradient(45deg, #6c5ce7, #a29bfe);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: bold;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(108, 92, 231, 0.3);
  }
`;

const ExperimentsGrid = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ExperimentCard = styled(motion.div)`
  background: linear-gradient(145deg, #2a2d3e, #1e1e2e);
  border-radius: 20px;
  padding: 2rem;
  border: 2px solid ${props => props.color}44;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.color};
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px ${props => props.color}33;
  }
`;

const ExperimentHeader = styled.div`
  margin-bottom: 2rem;
`;

const ExperimentTitle = styled.h2`
  color: ${props => props.color};
  margin-bottom: 1rem;
  font-size: 1.4rem;
  text-shadow: 0 0 10px ${props => props.color}44;
`;

const ExperimentDescription = styled.p`
  color: #ccc;
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.9;
`;

const ObjectivesList = styled.div`
  margin-bottom: 2rem;
`;

const ObjectivesTitle = styled.h3`
  color: ${props => props.color};
  margin-bottom: 1rem;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ObjectiveItem = styled.div`
  margin: 0.5rem 0;
  padding-left: 1rem;
  color: #ddd;
  font-size: 0.95rem;
  line-height: 1.4;
  
  .bullet {
    color: ${props => props.color || '#6c5ce7'};
    font-weight: bold;
    margin-right: 0.5rem;
  }
`;

const ComponentGraphContainer = styled.div`
  background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
  border-radius: 15px;
  padding: 1.5rem;
  border: 2px solid ${props => props.color}44;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.color}88;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const ComponentGraphTitle = styled.h4`
  color: ${props => props.color};
  margin-bottom: 1rem;
  font-size: 1.1rem;
  text-align: center;
  text-shadow: 0 0 5px ${props => props.color}44;
`;

const GraphCanvas = styled.canvas`
  width: 100%;
  height: 180px;
  background: #000;
  border-radius: 8px;
  border: 1px solid ${props => props.color}44;
  cursor: crosshair;
`;

const GraphDescription = styled.p`
  color: #ccc;
  font-size: 0.85rem;
  margin-top: 0.5rem;
  text-align: center;
  opacity: 0.8;
  line-height: 1.4;
`;

const CircuitSection = styled.div`
  margin: 2rem 0;
`;

const SectionTitle = styled.h3`
  color: ${props => props.color};
  margin-bottom: 1rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CircuitDiagram = styled.div`
  position: relative;
  background: linear-gradient(145deg, #f8f9fa, #e9ecef);
  border-radius: 20px;
  padding: 2rem;
  border: 3px solid ${props => props.color};
  height: 400px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, 
      rgba(${props => props.rgbColor}, 0.05) 0%, 
      transparent 70%);
    z-index: 0;
  }
`;

const CircuitCanvas = styled.canvas`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  z-index: 1;
  position: relative;
`;

const CircuitDescription = styled.p`
  color: #888;
  font-size: 0.9rem;
  margin-top: 1rem;
  text-align: center;
  line-height: 1.4;
  background: rgba(0, 0, 0, 0.8);
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid ${props => props.color}44;
`;

const ConnectionsList = styled.div`
  background: linear-gradient(145deg, #1a1a1a, #2a2a2a);
  border-radius: 15px;
  padding: 1.5rem;
  border: 2px solid ${props => props.color}44;
  margin-bottom: 1.5rem;
`;

const ConnectionItem = styled.div`
  margin: 0.8rem 0;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  border-left: 4px solid ${props => props.color};
  color: #ddd;
  font-size: 0.95rem;
  line-height: 1.4;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
`;

const ActionButton = styled(motion(Link))`
  padding: 1rem 2rem;
  background: linear-gradient(145deg, ${props => props.color}, ${props => props.color}cc);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: bold;
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px ${props => props.color}44;
    filter: brightness(1.1);
  }
`;

// Circuit Diagram Component with simplified 555 timer
const CircuitDiagramComponent = ({ type, color, rgbColor, title, description }) => {
  const canvasRef = React.useRef(null);
  
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    // Clear canvas with white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
    
    // Set default drawing styles
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.font = '12px Arial';
    ctx.fillStyle = '#333';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    const centerX = width / 2;
    const centerY = height / 2;
    
    switch(type) {
      case 'basic-setup':
        drawBasicSetup(ctx, width, height, centerX, centerY, color);
        break;
      case 'iv-characteristics':
        drawIVCharacteristics(ctx, width, height, centerX, centerY, color);
        break;
      case 'opamp-inverting':
        drawInvertingAmplifier(ctx, width, height, centerX, centerY, color);
        break;
      case 'opamp-integrator':
        drawIntegrator(ctx, width, height, centerX, centerY, color);
        break;
      case '555-astable':
        draw555TimerSimple(ctx, width, height, centerX, centerY, color);
        break;
      default:
        ctx.fillText('Circuit Diagram', centerX - 50, centerY);
    }
    
  }, [type, color]);
  
  // Simplified 555 Timer drawing
  const draw555TimerSimple = (ctx, width, height, centerX, centerY, color) => {
    // 555 Timer IC - simplified rectangular IC
    const icWidth = 100;
    const icHeight = 60;
    
    // IC body
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(centerX - icWidth/2, centerY - icHeight/2, icWidth, icHeight);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(centerX - icWidth/2, centerY - icHeight/2, icWidth, icHeight);
    
    // IC label
    ctx.fillStyle = '#333';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('NE555', centerX - 25, centerY - 5);
    ctx.font = '12px Arial';
    ctx.fillText('Timer', centerX - 15, centerY + 12);
    
    // Simple pin labels on IC
    ctx.font = '10px Arial';
    // Left side pins
    ctx.fillText('1(GND)', centerX - 80, centerY + 25);
    ctx.fillText('2(TRIG)', centerX - 80, centerY);
    ctx.fillText('6(THRES)', centerX - 80, centerY - 25);
    
    // Right side pins
    ctx.fillText('3(OUT)', centerX + 45, centerY);
    ctx.fillText('8(VCC)', centerX + 45, centerY - 25);
    
    // Power connections
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    
    // VCC connection (Pin 8)
    ctx.beginPath();
    ctx.moveTo(centerX + 50, centerY - 25);
    ctx.lineTo(centerX + 100, centerY - 25);
    ctx.lineTo(centerX + 100, centerY - 80);
    ctx.stroke();
    ctx.fillText('+5V', centerX + 105, centerY - 75);
    
    // Ground connection (Pin 1)
    ctx.beginPath();
    ctx.moveTo(centerX - 50, centerY + 25);
    ctx.lineTo(centerX - 100, centerY + 25);
    ctx.lineTo(centerX - 100, centerY + 80);
    ctx.stroke();
    drawGround(ctx, centerX - 100, centerY + 80);
    
    // Timing components - R1
    const timingX = centerX - 120;
    drawResistor(ctx, timingX, centerY - 60, timingX, centerY - 10);
    ctx.fillText('R1=47kΩ', timingX - 40, centerY - 35);
    
    // R2
    drawResistor(ctx, timingX, centerY - 10, timingX, centerY + 40);
    ctx.fillText('R2=47kΩ', timingX - 40, centerY + 15);
    
    // Timing capacitor
    drawCapacitor(ctx, timingX, centerY + 40, timingX, centerY + 70);
    ctx.fillText('C=10μF', timingX - 30, centerY + 55);
    
    // Connect timing components to power
    ctx.beginPath();
    ctx.moveTo(timingX, centerY - 60);
    ctx.lineTo(timingX, centerY - 80);
    ctx.lineTo(centerX + 100, centerY - 80);
    ctx.stroke();
    
    // Connect capacitor to ground
    ctx.beginPath();
    ctx.moveTo(timingX, centerY + 70);
    ctx.lineTo(timingX, centerY + 100);
    ctx.lineTo(centerX - 100, centerY + 100);
    ctx.lineTo(centerX - 100, centerY + 80);
    ctx.stroke();
    
    // Connect timing network to 555 pins
    // To threshold (pin 6) and trigger (pin 2)
    ctx.beginPath();
    ctx.moveTo(timingX, centerY + 40);
    ctx.lineTo(centerX - 80, centerY + 40);
    ctx.lineTo(centerX - 80, centerY - 25);
    ctx.lineTo(centerX - 50, centerY - 25);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(centerX - 80, centerY + 40);
    ctx.lineTo(centerX - 80, centerY);
    ctx.lineTo(centerX - 50, centerY);
    ctx.stroke();
    
    // Output connection
    ctx.beginPath();
    ctx.moveTo(centerX + 50, centerY);
    ctx.lineTo(centerX + 150, centerY);
    ctx.stroke();
    ctx.fillText('Square Wave', centerX + 155, centerY + 5);
    ctx.fillText('Output', centerX + 170, centerY + 18);
    
    // Formulas
    ctx.font = '11px Arial';
    ctx.fillStyle = color;
    ctx.fillText('f = 1.44/((R1+2R2)×C) ≈ 1.0 Hz', centerX - 80, centerY + 130);
    ctx.fillText('Duty Cycle = (R1+R2)/(R1+2R2) ≈ 67%', centerX - 90, centerY + 150);
  };
  
  // Helper function to draw basic setup
  const drawBasicSetup = (ctx, width, height, centerX, centerY, color) => {
    // Function Generator
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(50, centerY - 50, 120, 100);
    ctx.strokeStyle = '#333';
    ctx.strokeRect(50, centerY - 50, 120, 100);
    
    // Function generator label
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('Function Generator', 60, centerY - 30);
    ctx.font = '12px Arial';
    ctx.fillText('1kHz Sine Wave', 70, centerY - 10);
    ctx.fillText('4V p-p', 85, centerY + 10);
    
    // Output terminal
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(165, centerY - 8, 15, 16);
    ctx.fillStyle = '#333';
    ctx.fillText('OUT', 140, centerY + 25);
    
    // BNC Cable
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(180, centerY);
    ctx.lineTo(width - 180, centerY);
    ctx.stroke();
    
    ctx.fillStyle = '#333';
    ctx.font = '10px Arial';
    ctx.fillText('BNC Cable (50Ω)', centerX - 30, centerY - 15);
    
    // DSO
    ctx.fillStyle = '#e0e0e0';
    ctx.fillRect(width - 170, centerY - 80, 140, 160);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(width - 170, centerY - 80, 140, 160);
    
    // DSO Screen
    ctx.fillStyle = '#000';
    ctx.fillRect(width - 160, centerY - 65, 120, 80);
    
    // DSO Screen Grid
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(width - 160 + i * 20, centerY - 65);
      ctx.lineTo(width - 160 + i * 20, centerY + 15);
      ctx.stroke();
    }
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(width - 160, centerY - 65 + i * 20);
      ctx.lineTo(width - 40, centerY - 65 + i * 20);
      ctx.stroke();
    }
    
    // Sine wave on screen
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 0; x < 120; x++) {
      const y = centerY - 25 + Math.sin(x * 0.1) * 20;
      if (x === 0) ctx.moveTo(width - 160 + x, y);
      else ctx.lineTo(width - 160 + x, y);
    }
    ctx.stroke();
    
    // DSO Input
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(width - 185, centerY - 8, 15, 16);
    ctx.fillStyle = '#333';
    ctx.font = '12px Arial';
    ctx.fillText('CH1', width - 210, centerY + 5);
    
    // DSO Label
    ctx.font = 'bold 14px Arial';
    ctx.fillText('Digital Storage', width - 155, centerY + 40);
    ctx.fillText('Oscilloscope', width - 150, centerY + 55);
  };
  
  // Helper function to draw IV characteristics circuit
  const drawIVCharacteristics = (ctx, width, height, centerX, centerY, color) => {
    // Op-amp (741)
    drawOpAmp(ctx, centerX, centerY, '741');
    
    // Input resistor Rin
    drawResistor(ctx, centerX - 120, centerY - 15, centerX - 70, centerY - 15);
    ctx.fillText('Rin=1kΩ', centerX - 120, centerY - 25);
    
    // Connection to inverting input
    ctx.beginPath();
    ctx.moveTo(centerX - 70, centerY - 15);
    ctx.lineTo(centerX - 30, centerY - 15);
    ctx.stroke();
    
    // Non-inverting input to ground
    ctx.beginPath();
    ctx.moveTo(centerX - 30, centerY + 15);
    ctx.lineTo(centerX - 60, centerY + 15);
    ctx.lineTo(centerX - 60, centerY + 45);
    ctx.stroke();
    drawGround(ctx, centerX - 60, centerY + 45);
    
    // Feedback path with DUT
    ctx.beginPath();
    ctx.moveTo(centerX + 30, centerY);
    ctx.lineTo(centerX + 60, centerY);
    ctx.lineTo(centerX + 60, centerY - 60);
    ctx.lineTo(centerX - 10, centerY - 60);
    ctx.lineTo(centerX - 10, centerY - 15);
    ctx.stroke();
    
    // DUT (Device Under Test)
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(centerX + 10, centerY - 75, 80, 30);
    ctx.strokeRect(centerX + 10, centerY - 75, 80, 30);
    ctx.fillStyle = '#333';
    ctx.font = 'bold 12px Arial';
    ctx.fillText('DUT', centerX + 35, centerY - 55);
    
    // Labels
    ctx.fillText('Sweep Input', centerX - 150, centerY - 5);
    ctx.fillText('Current Output', centerX + 70, centerY + 10);
  };
  
  // Helper function to draw inverting amplifier
  const drawInvertingAmplifier = (ctx, width, height, centerX, centerY, color) => {
    // Op-amp
    drawOpAmp(ctx, centerX, centerY, '741');
    
    // Input resistor
    drawResistor(ctx, centerX - 120, centerY - 15, centerX - 70, centerY - 15);
    ctx.fillText('Rin=1kΩ', centerX - 125, centerY - 25);
    
    // Connection to inverting input
    ctx.beginPath();
    ctx.moveTo(centerX - 70, centerY - 15);
    ctx.lineTo(centerX - 30, centerY - 15);
    ctx.stroke();
    
    // Non-inverting input to ground
    ctx.beginPath();
    ctx.moveTo(centerX - 30, centerY + 15);
    ctx.lineTo(centerX - 60, centerY + 15);
    ctx.lineTo(centerX - 60, centerY + 45);
    ctx.stroke();
    drawGround(ctx, centerX - 60, centerY + 45);
    
    // Feedback resistor
    ctx.beginPath();
    ctx.moveTo(centerX + 30, centerY);
    ctx.lineTo(centerX + 60, centerY);
    ctx.lineTo(centerX + 60, centerY - 60);
    ctx.lineTo(centerX - 10, centerY - 60);
    ctx.lineTo(centerX - 10, centerY - 15);
    ctx.stroke();
    
    drawResistor(ctx, centerX + 10, centerY - 60, centerX + 50, centerY - 60);
    ctx.fillText('Rf=10kΩ', centerX + 15, centerY - 75);
    
    // Labels
    ctx.fillText('Vin (0.2V)', centerX - 150, centerY - 5);
    ctx.fillText('Vout', centerX + 70, centerY + 10);
    ctx.fillText('Gain = -10', centerX - 20, centerY + 80);
  };
  
  // Helper function to draw integrator
  const drawIntegrator = (ctx, width, height, centerX, centerY, color) => {
    // Op-amp
    drawOpAmp(ctx, centerX, centerY, '741');
    
    // Input resistor
    drawResistor(ctx, centerX - 120, centerY - 15, centerX - 70, centerY - 15);
    ctx.fillText('R=10kΩ', centerX - 125, centerY - 25);
    
    // Connection to inverting input
    ctx.beginPath();
    ctx.moveTo(centerX - 70, centerY - 15);
    ctx.lineTo(centerX - 30, centerY - 15);
    ctx.stroke();
    
    // Non-inverting input to ground
    ctx.beginPath();
    ctx.moveTo(centerX - 30, centerY + 15);
    ctx.lineTo(centerX - 60, centerY + 15);
    ctx.lineTo(centerX - 60, centerY + 45);
    ctx.stroke();
    drawGround(ctx, centerX - 60, centerY + 45);
    
    // Feedback path
    ctx.beginPath();
    ctx.moveTo(centerX + 30, centerY);
    ctx.lineTo(centerX + 60, centerY);
    ctx.lineTo(centerX + 60, centerY - 60);
    ctx.lineTo(centerX - 10, centerY - 60);
    ctx.lineTo(centerX - 10, centerY - 15);
    ctx.stroke();
    
    // Feedback capacitor
    drawCapacitor(ctx, centerX + 15, centerY - 60, centerX + 45, centerY - 60);
    ctx.fillText('C=0.1μF', centerX + 15, centerY - 75);
    
    // Labels
    ctx.fillText('Square Wave', centerX - 150, centerY - 5);
    ctx.fillText('Triangle Out', centerX + 50, centerY + 10);
  };
  
  // Helper function to draw op-amp symbol
  const drawOpAmp = (ctx, x, y, label) => {
    // Triangle body
    ctx.beginPath();
    ctx.moveTo(x - 30, y - 25);
    ctx.lineTo(x - 30, y + 25);
    ctx.lineTo(x + 30, y);
    ctx.closePath();
    ctx.fillStyle = '#f8f8f8';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.stroke();
    
    // Input symbols
    ctx.fillStyle = '#333';
    ctx.font = 'bold 16px Arial';
    ctx.fillText('-', x - 25, y - 10);
    ctx.fillText('+', x - 26, y + 20);
    
    // IC label
    ctx.font = 'bold 10px Arial';
    ctx.fillText(label, x - 12, y + 3);
  };
  
  // Helper function to draw resistor
  const drawResistor = (ctx, x1, y1, x2, y2) => {
    const isVertical = Math.abs(y2 - y1) > Math.abs(x2 - x1);
    const length = Math.sqrt((x2-x1)**2 + (y2-y1)**2);
    const segments = 6;
    
    ctx.save();
    ctx.translate(x1, y1);
    ctx.rotate(Math.atan2(y2-y1, x2-x1));
    
    // Draw zigzag pattern
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(length * 0.2, 0);
    
    for (let i = 0; i < segments; i++) {
      const x = length * 0.2 + (i * length * 0.6 / segments);
      const y = (i % 2 === 0 ? -8 : 8);
      ctx.lineTo(x, y);
    }
    
    ctx.lineTo(length * 0.8, 0);
    ctx.lineTo(length, 0);
    ctx.stroke();
    
    ctx.restore();
  };
  
  // Helper function to draw capacitor
  const drawCapacitor = (ctx, x1, y1, x2, y2) => {
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const isVertical = Math.abs(y2 - y1) > Math.abs(x2 - x1);
    
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    
    if (isVertical) {
      ctx.lineTo(midX, midY - 8);
      ctx.moveTo(midX - 10, midY - 8);
      ctx.lineTo(midX + 10, midY - 8);
      ctx.moveTo(midX - 10, midY + 8);
      ctx.lineTo(midX + 10, midY + 8);
      ctx.moveTo(midX, midY + 8);
    } else {
      ctx.lineTo(midX - 8, midY);
      ctx.moveTo(midX - 8, midY - 10);
      ctx.lineTo(midX - 8, midY + 10);
      ctx.moveTo(midX + 8, midY - 10);
      ctx.lineTo(midX + 8, midY + 10);
      ctx.moveTo(midX + 8, midY);
    }
    
    ctx.lineTo(x2, y2);
    ctx.stroke();
  };
  
  // Helper function to draw ground symbol
  const drawGround = (ctx, x, y) => {
    ctx.beginPath();
    ctx.moveTo(x - 15, y);
    ctx.lineTo(x + 15, y);
    ctx.moveTo(x - 10, y + 6);
    ctx.lineTo(x + 10, y + 6);
    ctx.moveTo(x - 5, y + 12);
    ctx.lineTo(x + 5, y + 12);
    ctx.stroke();
  };
  
  return (
    <div>
      <ComponentGraphTitle color={color}>{title}</ComponentGraphTitle>
      <CircuitDiagram color={color} rgbColor={rgbColor}>
        <CircuitCanvas ref={canvasRef} />
      </CircuitDiagram>
      <CircuitDescription color={color}>{description}</CircuitDescription>
    </div>
  );
};

// Component Graph Component (keeping existing waveform graphs)
const ComponentGraph = ({ type, color, title, description }) => {
  const canvasRef = React.useRef(null);
  
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    // Clear canvas
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
    
    // Draw grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let i = 0; i < height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }
    
    // Draw axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, height/2);
    ctx.lineTo(width, height/2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(width/2, 0);
    ctx.lineTo(width/2, height);
    ctx.stroke();
    
    // Draw component-specific graphs
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    
    switch(type) {
      case 'sine':
        for (let x = 0; x < width; x++) {
          const cycles = 4;
          const y = height/2 - Math.sin((x / width) * cycles * 2 * Math.PI) * height/4;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        break;
        
      case 'resistor-iv':
        ctx.moveTo(50, height - 50);
        ctx.lineTo(width - 50, 50);
        // Add axis labels
        ctx.fillStyle = '#888';
        ctx.font = '12px Arial';
        ctx.fillText('V →', width - 40, height - 10);
        ctx.save();
        ctx.translate(10, height/2 + 20);
        ctx.rotate(-Math.PI/2);
        ctx.fillText('I ↑', 0, 0);
        ctx.restore();
        break;
        
      case 'diode-iv':
        // Forward bias curve
        for (let x = width/2; x < width - 20; x++) {
          const voltage = ((x - width/2) / (width/4)) * 2;
          const current = voltage > 0.7 ? Math.exp((voltage - 0.7) * 3) * 0.02 : 0.001;
          const y = height - (current * height/3 + height/10);
          if (x === width/2) ctx.moveTo(x, height/2);
          else ctx.lineTo(x, Math.max(10, Math.min(height-10, y)));
        }
        // Reverse bias (flat line)
        ctx.moveTo(20, height/2);
        ctx.lineTo(width/2, height/2);
        break;
        
      case 'opamp-inverting':
        // Input signal (small amplitude)
        ctx.strokeStyle = '#ff6b6b';
        ctx.lineWidth = 2;
        for (let x = 0; x < width; x++) {
          const y = height/2 - Math.sin(x * 0.03) * height/8;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        
        // Output signal (inverted and amplified)
        ctx.strokeStyle = '#4ecdc4';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
          const y = height/2 + Math.sin(x * 0.03) * height/3;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        break;
        
      case 'opamp-integrator':
        // Square wave input
        ctx.strokeStyle = '#ff6b6b';
        ctx.lineWidth = 2;
        for (let x = 0; x < width; x++) {
          const cycle = Math.floor(x / (width/6)) % 2;
          const y = height/2 + (cycle ? -height/8 : height/8);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        
        // Triangular wave output (integrated)
        ctx.strokeStyle = '#4ecdc4';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
          const cyclePos = (x % (width/3)) / (width/3);
          const triangular = cyclePos < 0.5 ? 
            (cyclePos * 4 - 1) : 
            (3 - cyclePos * 4);
          const y = height/2 - triangular * height/6;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        break;
        
      case '555-output':
        // Digital square wave output
        for (let x = 0; x < width; x++) {
          const cycle = Math.floor(x / (width/8)) % 2;
          const y = height - (cycle ? height/4 : height*3/4);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        // Add voltage labels
        ctx.fillStyle = color;
        ctx.font = '10px Arial';
        ctx.fillText('5V', 5, height/4);
        ctx.fillText('0V', 5, height*3/4);
        break;
        
      case '555-capacitor':
        // Exponential charging and discharging
        for (let x = 0; x < width; x++) {
          const cyclePos = (x % (width/6)) / (width/6);
          const charging = Math.floor(x / (width/6)) % 2;
          let voltage;
          
          if (charging) {
            // Charging: exponential rise to 2/3 VCC
            voltage = 3.3 * (1 - Math.exp(-cyclePos * 4));
          } else {
            // Discharging: exponential decay from 2/3 to 1/3 VCC
            voltage = 2.2 + 1.1 * Math.exp(-cyclePos * 4);
          }
          
          const y = height - (voltage / 5 * height * 0.8 + height * 0.1);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, Math.max(10, Math.min(height-10, y)));
        }
        
        // Add threshold lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        // 2/3 VCC line
        ctx.beginPath();
        ctx.moveTo(0, height - (2/3 * height * 0.8 + height * 0.1));
        ctx.lineTo(width, height - (2/3 * height * 0.8 + height * 0.1));
        ctx.stroke();
        // 1/3 VCC line  
        ctx.beginPath();
        ctx.moveTo(0, height - (1/3 * height * 0.8 + height * 0.1));
        ctx.lineTo(width, height - (1/3 * height * 0.8 + height * 0.1));
        ctx.stroke();
        ctx.setLineDash([]);
        break;
        
      default:
        ctx.moveTo(width/4, height/2);
        ctx.lineTo(width*3/4, height/2);
    }
    
    ctx.stroke();
    
  }, [type, color]);
  
  return (
    <ComponentGraphContainer color={color}>
      <ComponentGraphTitle color={color}>{title}</ComponentGraphTitle>
      <GraphCanvas ref={canvasRef} color={color} />
      <GraphDescription>{description}</GraphDescription>
    </ComponentGraphContainer>
  );
};

// Render component graphs for each experiment
const renderComponentGraphs = (experimentId, color) => {
  switch(experimentId) {
    case "1":
      return (
        <div>
          <ComponentGraph
            type="sine"
            color={color}
            title="🌊 Sine Wave Generator Output"
            description="Pure sine wave at 1kHz frequency, 4V peak-to-peak amplitude from function generator"
          />
        </div>
      );
      
    case "2":
      return (
        <div>
          <ComponentGraph
            type="resistor-iv"
            color={color}
            title="📊 Resistor I-V Characteristic (Linear)"
            description="Linear relationship following Ohm's law: V = IR, slope = resistance value"
          />
          <ComponentGraph
            type="diode-iv"
            color={color}
            title="📊 Diode I-V Characteristic (Exponential)"
            description="Exponential current increase after forward voltage threshold (~0.7V for silicon)"
          />
        </div>
      );
      
    case "3":
      return (
        <div>
          <ComponentGraph
            type="opamp-inverting"
            color={color}
            title="🔄 Inverting Amplifier Response"
            description="Red: Input signal (0.2V), Blue: Inverted and amplified output (-10x gain)"
          />
          <ComponentGraph
            type="opamp-integrator"
            color={color}
            title="∫ Integrator Circuit Response"
            description="Red: Square wave input, Blue: Triangular wave output (mathematical integration)"
          />
        </div>
      );
      
    case "4":
      return (
        <div>
          <ComponentGraph
            type="555-output"
            color={color}
            title="📱 555 Timer Digital Output"
            description="Square wave output switching between 0V and VCC (5V), duty cycle determined by RC values"
          />
          <ComponentGraph
            type="555-capacitor"
            color={color}
            title="🔋 Timing Capacitor Voltage"
            description="Exponential charging to 2/3 VCC, then discharging to 1/3 VCC, sets timing period"
          />
        </div>
      );
      
    default:
      return null;
  }
};

// Render circuit diagrams for each experiment
const renderCircuitDiagram = (experimentId, color, rgbColor) => {
  const circuitConfigs = {
    1: {
      type: 'basic-setup',
      title: '🔧 Function Generator & DSO Setup',
      description: 'Function generator output connected to DSO Channel 1 input via 50Ω BNC cable. Generator produces 1kHz sine wave at 4V peak-to-peak amplitude for measurement and display analysis.'
    },
    2: {
      type: 'iv-characteristics',
      title: '📊 I-V Characteristic Measurement Circuit',
      description: 'Op-amp 741 configured as current-to-voltage converter with 1kΩ input resistor. Device Under Test (DUT) placed in feedback path. Oscilloscope in X-Y mode displays voltage vs current characteristics.'
    },
    3: {
      type: 'opamp-inverting',
      title: '🔄 Inverting Amplifier Configuration',
      description: 'Op-amp 741 in inverting configuration: Rin=1kΩ, Rf=10kΩ providing voltage gain of -10. Input signal inverted and amplified by factor of 10.'
    },
    4: {
      type: '555-astable',
      title: '⏱️ 555 Timer Astable Multivibrator',
      description: 'NE555 timer IC in astable mode with R1=R2=47kΩ and C=10μF. Simple rectangular IC representation with clear pin connections and timing formulas.'
    }
  };
  
  const config = circuitConfigs[experimentId];
  
  return (
    <CircuitDiagramComponent
      type={config.type}
      color={color}
      rgbColor={rgbColor}
      title={config.title}
      description={config.description}
    />
  );
};

// Render connections list for each experiment
const renderConnectionsList = (experimentId, color) => {
  const connectionsData = {
    1: [
      "Connect function generator output to BNC cable",
      "Connect other end of BNC cable to DSO Channel 1 input",
      "Set function generator to sine wave, 1kHz, 4V p-p",
      "Set DSO time base to 1ms/div",
      "Set DSO voltage scale to 1V/div",
      "Use auto-trigger on rising edge"
    ],
    2: [
      "Build op-amp current-to-voltage converter circuit",
      "Connect 1kΩ input resistor to op-amp inverting input",
      "Place DUT (resistor/diode/LED) in feedback path",
      "Connect non-inverting input to ground",
      "Apply triangular sweep voltage to input",
      "Connect DSO in X-Y mode: X=input voltage, Y=output current"
    ],
    3: [
      "Connect Rin (1kΩ) from input signal to op-amp inverting input",
      "Connect Rf (10kΩ) from op-amp output to inverting input",
      "Connect non-inverting input directly to ground",
      "Apply ±12V power supply to op-amp power pins",
      "Connect 0.2V p-p sine wave to circuit input",
      "Observe inverted and amplified output on DSO"
    ],
    4: [
      "Connect Pin 8 (VCC) to +5V power supply",
      "Connect Pin 1 (GND) to ground",
      "Connect Pin 4 (RESET) to +5V",
      "Connect R1 (47kΩ) from VCC to Pin 7 (DISCHARGE)",
      "Connect R2 (47kΩ) from Pin 7 to Pin 2 (TRIGGER)",
      "Connect timing capacitor C (10μF) from Pin 2 to ground",
      "Connect Pin 6 (THRESHOLD) to junction of R2 and C",
      "Observe square wave output at Pin 3 (OUTPUT)"
    ]
  };

  const connections = connectionsData[experimentId] || [];

  return (
    <ConnectionsList color={color}>
      <ComponentGraphTitle color={color}>🔗 Circuit Connections:</ComponentGraphTitle>
      {connections.map((connection, index) => (
        <ConnectionItem key={index} color={color}>
          <strong>Step {index + 1}:</strong> {connection}
        </ConnectionItem>
      ))}
    </ConnectionsList>
  );
};

// Main StudyGuide Component
const StudyGuide = () => {
  const [activeExperiment, setActiveExperiment] = useState(null);

  const experiments = [
    {
      id: "1",
      title: "Experiment 01 - Familiarization with Basic Test Equipment",
      color: "#ff6b6b",
      rgbColor: "255, 107, 107",
      description: "Learn to use function generators and digital storage oscilloscopes",
      objectives: [
        "Understanding function generator controls and waveform types",
        "Learning DSO time base and voltage scale settings", 
        "Measuring frequency, amplitude, and phase relationships",
        "Using cursors for precise measurements"
      ]
    },
    {
      id: "2", 
      title: "Experiment 02 - Characteristics of Common Passive Devices",
      color: "#4ecdc4",
      rgbColor: "78, 205, 196",
      description: "Study I-V characteristics of resistors, diodes, capacitors, and LEDs",
      objectives: [
        "Understanding Ohm's law through resistor I-V curves",
        "Analyzing diode forward and reverse bias characteristics",
        "Measuring capacitor charging and discharging behavior",
        "Comparing LED forward voltage drops"
      ]
    },
    {
      id: "3",
      title: "Experiment 03 - Voltage Amplifiers using Op-Amp",
      color: "#45b7d1", 
      rgbColor: "69, 183, 209",
      description: "Design and analyze operational amplifier circuits",
      objectives: [
        "Building inverting and non-inverting amplifier circuits",
        "Calculating and measuring voltage gain",
        "Understanding op-amp input and output characteristics",
        "Analyzing frequency response and bandwidth limitations"
      ]
    },
    {
      id: "4",
      title: "Experiment 04 - Multivibrator using IC555",
      color: "#96ceb4",
      rgbColor: "150, 206, 180", 
      description: "Generate timing signals using the versatile 555 timer IC",
      objectives: [
        "Understanding astable multivibrator operation",
        "Calculating timing periods using RC components",
        "Measuring duty cycle and frequency",
        "Applications in pulse generation and timing circuits"
      ]
    }
  ];

  return (
    <Container>
      <Header>
        <Title
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          📚 Laboratory Study Guide
        </Title>
        <BackButton to="/">← Back to Home</BackButton>
      </Header>

      <ExperimentsGrid>
        {experiments.map((exp) => (
          <ExperimentCard
            key={exp.id}
            color={exp.color}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: parseInt(exp.id) * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <ExperimentHeader>
              <ExperimentTitle color={exp.color}>
                {exp.title}
              </ExperimentTitle>
              <ExperimentDescription>
                {exp.description}
              </ExperimentDescription>
            </ExperimentHeader>

            <ObjectivesList>
              <ObjectivesTitle color={exp.color}>🎯 Learning Objectives:</ObjectivesTitle>
              {exp.objectives.map((objective, index) => (
                <ObjectiveItem key={index} color={exp.color}>
                  <span className="bullet">•</span>
                  {objective}
                </ObjectiveItem>
              ))}
            </ObjectivesList>

            {/* Component Graphs Section */}
            <div style={{marginTop: '2rem'}}>
              <ObjectivesTitle color={exp.color}>📈 Expected Waveforms & Characteristics:</ObjectivesTitle>
              {renderComponentGraphs(exp.id, exp.color)}
            </div>

            {/* Circuit Diagram Section */}
            <CircuitSection>
              <SectionTitle color={exp.color}>🔌 Circuit Diagram:</SectionTitle>
              {renderCircuitDiagram(exp.id, exp.color, exp.rgbColor)}
            </CircuitSection>

            {/* Connections List Section */}
            {renderConnectionsList(exp.id, exp.color)}

            <ActionButtons>
              <ActionButton
                to={`/dso/${exp.id}`}
                color={exp.color}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔬 Start DSO Simulation
              </ActionButton>
              <ActionButton
                to={`/study-guide/${exp.id}`}
                color="#6c5ce7"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📋 View Detailed Guide
              </ActionButton>
            </ActionButtons>
          </ExperimentCard>
        ))}
      </ExperimentsGrid>
    </Container>
  );
};

export default StudyGuide;
