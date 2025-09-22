# Virtual DSO Laboratory - Interactive Electronics Learning Platform

![DSO Simulation](https://img.shields.io/badge/DSO-Simulation-blue?style=for-the-badge&logo=react)
![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript)

A comprehensive web-based Digital Storage Oscilloscope (DSO) simulation platform designed for electronics engineering education. This interactive tool provides students with hands-on experience using oscilloscope controls and measurements without requiring physical equipment.

## 🚀 Features

### 🔬 **Professional DSO Simulation**
- **Real-time waveform generation** with accurate mathematical models
- **Interactive oscilloscope controls** (timebase, voltage scale, trigger settings)
- **Advanced cursor measurements** with ΔX, ΔY calculations
- **Multi-channel support** with individual channel controls
- **Professional DSO interface** mimicking real equipment

### 📚 **Educational Experiments**
1. **Basic Test Equipment** - Sine wave analysis and fundamental measurements
2. **I-V Characteristics** - Device testing with triangular waveforms
3. **Op-Amp Circuits** - Signal processing with amplified waveforms
4. **555 Timer** - Square wave generation and duty cycle analysis

### 🎯 **Interactive Features**
- **Directional cursors** (X-cursor for time, Y-cursor for voltage)
- **Real-time measurements** (frequency, period, amplitude, RMS, peak, mean)
- **Stop/Run functionality** with cursor operation in both modes
- **Experiment-specific reset** buttons with optimized default settings
- **Responsive design** for various screen sizes

### 🎨 **Modern UI/UX**
- **Smooth animations** using Framer Motion
- **Professional styling** with Styled Components
- **Dark theme** optimized for laboratory environments
- **Intuitive navigation** between experiments and simulations

## 🛠️ Technology Stack

- **Frontend Framework:** React 18+
- **Routing:** React Router DOM
- **Styling:** Styled Components
- **Animations:** Framer Motion
- **Canvas Rendering:** HTML5 Canvas API
- **State Management:** React Hooks (useState, useEffect, useCallback)
- **Build Tool:** Create React App

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/pragambesh-moro/virtual-dso-lab.git
   cd virtual-dso-lab
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
virtual-dso-lab/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── pages/
│   │       ├── Home/
│   │       │   └── Home.js
│   │       ├── StudyGuide/
│   │       │   └── StudyGuide.js
│   │       ├── DetailedStudyGuide/
│   │       │   └── DetailedStudyGuide.js
│   │       └── DSO/
│   │           └── DSO.js
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## 🎯 Usage Guide

### Navigation
1. **Home Page** - Welcome screen with project introduction
2. **Study Guide** - Experiment selection and overview
3. **DSO Simulation** - Interactive oscilloscope interface

### DSO Controls

#### **Timebase Control**
- **Left click:** Increase timebase (zoom out in time)
- **Right click:** Decrease timebase (zoom in in time)
- **Range:** 0.1ms to 500ms per division

#### **Voltage Scale Control**
- **Left click:** Increase voltage scale (zoom out in voltage)
- **Right click:** Decrease voltage scale (zoom in in voltage)
- **Range:** 0.1V to 50V per division

#### **Trigger Controls**
- **Trigger Level:** Adjustable voltage level for waveform triggering
- **Trigger Mode:** Auto, Normal, Single shot options
- **Trigger Slope:** Rising/falling edge detection

#### **Cursor Measurements**
- **X Cursor (Yellow):** Vertical line for time measurements
- **Y Cursor (Magenta):** Horizontal line for voltage measurements
- **Click on screen** to position active cursor
- **Real-time calculations:** ΔX, ΔY, frequency, voltage at cursor

#### **Channel Controls**
- **CH1/CH2:** Individual channel enable/disable
- **Coupling:** DC, AC, GND options
- **Color coding** for easy identification

### Experiment Configurations

#### **Experiment 1: Basic Test Equipment**
- **Waveform:** Pure sine wave (1kHz, 2V amplitude)
- **Focus:** Fundamental oscilloscope operation
- **Default Settings:** 1ms/div, 1V/div

#### **Experiment 2: I-V Characteristics**
- **Waveform:** Triangle wave (10Hz, 3V amplitude)
- **Focus:** Device testing and characteristic curves
- **Default Settings:** 50ms/div, 2V/div

#### **Experiment 3: Op-Amp Circuits**
- **Waveform:** Amplified inverted signal (-10x gain)
- **Focus:** Signal processing and amplification
- **Default Settings:** 1ms/div, 5V/div

#### **Experiment 4: 555 Timer**
- **Waveform:** Square wave (1Hz, 67% duty cycle)
- **Focus:** Digital timing circuits
- **Default Settings:** 200ms/div, 2V/div

## 🔧 Technical Implementation

### **Waveform Generation**
```javascript
// Example: Sine wave generation
const generateSineWave = (time, frequency, amplitude, phase) => {
  return amplitude * Math.sin(2 * Math.PI * frequency * time + phase);
};
```

### **Canvas Rendering**
- **Real-time drawing** using requestAnimationFrame
- **Grid system** with 10x8 division layout
- **Anti-aliased waveforms** with smooth line rendering
- **Cursor overlay** system for interactive measurements

### **Measurement Calculations**
- **Frequency detection** using zero-crossing algorithm
- **RMS calculation** using discrete integration
- **Peak detection** with min/max analysis
- **Cursor measurements** with pixel-to-value conversion

## 🎨 Styling Architecture

### **Component Structure**
- **Styled Components** for component-scoped styling
- **Theme consistency** across all components
- **Responsive breakpoints** for mobile compatibility
- **Color coding** for different experiment types

### **Animation System**
- **Page transitions** using Framer Motion
- **Smooth hover effects** on interactive elements
- **Loading animations** for enhanced user experience
- **Cursor movement** with visual feedback

## 📊 Educational Benefits

### **Learning Objectives**
1. **Oscilloscope Operation** - Understand timebase, voltage scale, triggering
2. **Waveform Analysis** - Interpret frequency, amplitude, phase relationships
3. **Measurement Techniques** - Use cursors for precise measurements
4. **Signal Processing** - Analyze different waveform types and characteristics

### **Practical Skills**
- **Equipment Familiarization** - Prepare for real oscilloscope usage
- **Measurement Accuracy** - Develop precision in electronic measurements
- **Circuit Analysis** - Understand signal behavior in different circuits
- **Troubleshooting** - Learn systematic approach to signal analysis

## 🚀 Future Enhancements

### **Potential Features**
- [ ] **FFT Analysis** - Frequency domain analysis
- [ ] **Waveform Export** - Save measurements and screenshots
- [ ] **Math Functions** - Add, subtract, multiply waveforms
- [ ] **Protocol Analysis** - I2C, SPI, UART decoding
- [ ] **Advanced Triggering** - Pattern, pulse width, edge triggering
- [ ] **Multiple Timebase** - Zoom and pan functionality

### **Educational Extensions**
- [ ] **Guided Tutorials** - Step-by-step learning modules
- [ ] **Assessment Tools** - Quiz integration and progress tracking
- [ ] **Lab Reports** - Automated report generation
- [ ] **Collaborative Features** - Multi-user experiments

## 🐛 Troubleshooting

### **Common Issues**

#### **Canvas Not Rendering**
```javascript
// Ensure canvas ref is properly initialized
const canvasRef = useRef(null);
useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  // Canvas operations...
}, []);
```

#### **Performance Issues**
- **Reduce sample rate** for lower-end devices
- **Optimize animation frames** using proper cleanup
- **Implement canvas caching** for static elements

#### **Responsive Layout Issues**
- **Test on various screen sizes**
- **Adjust grid calculations** for different aspect ratios
- **Implement proper media queries**

## 🤝 Contributing

### **Development Setup**
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

### **Code Style**
- **ESLint configuration** for consistent formatting
- **Component naming** using PascalCase
- **Function naming** using camelCase
- **Comment documentation** for complex algorithms

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 👥 Authors

- **Your Name** - *Pragambesh Moro*
- **Contributors** - See [CONTRIBUTORS.md](CONTRIBUTORS.md) for the list of contributors

## 🙏 Acknowledgments

- **React Community** - For excellent documentation and support
- **Initial Idea** - *Ramakrishnan Venkatasubramanian*
- **Electronics Engineering** - Educational inspiration
- **Open Source Libraries** - Framer Motion, Styled Components, React Router
- **GenAI Tools** - Development assistance and optimization

## 📞 Support

For support, questions, or feature requests:
- **Email:** pragambesh1moro@gmail.com.com
- **Issues:** [GitHub Issues](https://github.com/pragambesh-moro/virtual-dso-lab/issues)
- **Discussions:** [GitHub Discussions](https://github.com/pragambesh-moro/virtual-dso-lab/discussions)

---

**Made with ❤️ for electronics education**