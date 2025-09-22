import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%);
  color: #fff;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
`;

const Title = styled(motion.h1)`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient 3s ease infinite;
  
  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const ExperimentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ExperimentCard = styled(motion.div)`
  background: linear-gradient(145deg, #2a2d3e, #1e1e2e);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    padding: 2px;
    background: linear-gradient(45deg, 
      ${props => props.color || '#ff6b6b'}, 
      ${props => props.secondaryColor || '#4ecdc4'});
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
`;

const ExperimentTitle = styled.h3`
  color: ${props => props.color || '#ff6b6b'};
  margin-bottom: 1rem;
  font-size: 1.3rem;
  position: relative;
  z-index: 1;
`;

const ExperimentDescription = styled.p`
  color: #ccc;
  margin-bottom: 2rem;
  line-height: 1.6;
  position: relative;
  z-index: 1;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  position: relative;
  z-index: 1;
`;

const Button = styled(Link)`
  flex: 1;
  padding: 0.8rem 1.5rem;
  background: ${props => props.primary ? 
    `linear-gradient(45deg, ${props.color}, ${props.secondaryColor})` : 
    'transparent'};
  color: ${props => props.primary ? '#fff' : props.color};
  border: 2px solid ${props => props.color};
  border-radius: 12px;
  text-decoration: none;
  text-align: center;
  font-weight: bold;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:hover {
    background: ${props => props.primary ? 
      `linear-gradient(45deg, ${props.secondaryColor}, ${props.color})` : 
      `linear-gradient(45deg, ${props.color}, ${props.secondaryColor})`};
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

const experiments = [
  {
    id: 1,
    title: "Exp-01",
    description: "Introduction to basic oscilloscope operations and measurements.",
    color: "#ff6b6b",
    secondaryColor: "#ff8e8e"
  },
  {
    id: 2,
    title: "Characteristics of Common Passive Devices",
    description: "Study the frequency response of resistors, capacitors, and inductors.",
    color: "#4ecdc4",
    secondaryColor: "#26d0ce"
  },
  {
    id: 3,
    title: "OpAmp",
    description: "Analyze operational amplifier circuits and their characteristics.",
    color: "#45b7d1",
    secondaryColor: "#2196f3"
  },
  {
    id: 4,
    title: "Timer555",
    description: "Explore the 555 timer IC in astable and monostable modes.",
    color: "#96ceb4",
    secondaryColor: "#48cae4"
  }
];

const Home = () => {
  return (
    <Container>
      <Title
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Virtual DSO Laboratory
      </Title>
      <ExperimentGrid>
        {experiments.map((exp, index) => (
          <ExperimentCard
            key={exp.id}
            color={exp.color}
            secondaryColor={exp.secondaryColor}
            initial={{ opacity: 0, y: 50, rotateY: -10 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.2,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{ 
              scale: 1.02,
              rotateY: 5,
              transition: { duration: 0.3 }
            }}
          >
            <ExperimentTitle color={exp.color}>{exp.title}</ExperimentTitle>
            <ExperimentDescription>{exp.description}</ExperimentDescription>
            <ButtonGroup>
              <Button 
                to={`/study-guide/${exp.id}`}
                color={exp.color}
                secondaryColor={exp.secondaryColor}
              >
                Study Guide
              </Button>
              <Button 
                to={`/dso/${exp.id}`} 
                primary
                color={exp.color}
                secondaryColor={exp.secondaryColor}
              >
                DSO Sim
              </Button>
            </ButtonGroup>
          </ExperimentCard>
        ))}
      </ExperimentGrid>
    </Container>
  );
};

export default Home;
