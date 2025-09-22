import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Home from './components/pages/Home/Home';
import StudyGuide from './components/pages/StudyGuide/StudyGuide';
import DetailedStudyGuide from './components/pages/DetailedStudyGuide/DetailedStudyGuide';
import DSO from './components/pages/DSO/DSO';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #0f0f23;
    color: #ffffff;
    overflow-x: hidden;
  }

  html {
    scroll-behavior: smooth;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

const Footer = styled.footer`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
  border-top: 2px solid #6c5ce744;
  padding: 1.5rem 0;
  text-align: center;
  font-family: 'Courier New', monospace;
  
  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
  
  .footer-text {
    color: #6c5ce7;
    font-size: 1rem;
    font-weight: bold;
    text-shadow: 0 0 10px rgba(108, 92, 231, 0.3);
    letter-spacing: 1px;
    
    .highlight {
      color: #a29bfe;
      text-shadow: 0 0 15px rgba(162, 155, 254, 0.5);
    }
    
    .separator {
      color: #ffffff;
      margin: 0 0.5rem;
      font-weight: normal;
    }
    
    .genai {
      color: #4ecdc4;
      text-shadow: 0 0 10px rgba(78, 205, 196, 0.3);
    }
  }
  
  @media (max-width: 768px) {
    padding: 1rem 0;
    
    .footer-text {
      font-size: 0.9rem;
      line-height: 1.4;
    }
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <AppContainer>
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/study-guide" element={<StudyGuide />} />
            <Route path="/study-guide/:experimentId" element={<DetailedStudyGuide />} />
            <Route path="/dso/:experimentId" element={<DSO />} />
            <Route path="*" element={<div>404 - Page Not Found</div>} />
          </Routes>
        </MainContent>
        
        <Footer>
          <div className="footer-content">
            <div className="footer-text">
              <span className="highlight">ECE1001</span>
              <span className="separator">•</span>
              <span className="highlight">Lab Simulation</span>
              <span className="separator">•</span>
              <span className="genai">Made with GenAI</span>
            </div>
          </div>
        </Footer>
      </AppContainer>
    </Router>
  );
}

export default App;