import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

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
  font-size: 2.2rem;
  margin: 0;
  text-shadow: 0 0 20px rgba(108, 92, 231, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
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

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
`;

const Section = styled(motion.div)`
  background: linear-gradient(145deg, #2a2d3e, #1e1e2e);
  border-radius: 20px;
  padding: 2rem;
  border: 2px solid ${props => props.color || '#6c5ce7'}44;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: ${props => props.color || '#6c5ce7'};
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 20px ${props => props.color || '#6c5ce7'}33;
  }
`;

const SectionTitle = styled.h2`
  color: ${props => props.color || '#6c5ce7'};
  margin-bottom: 1.5rem;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-shadow: 0 0 10px ${props => props.color || '#6c5ce7'}44;
`;

const SectionContent = styled.div`
  color: #ddd;
  line-height: 1.6;
  font-size: 1rem;
  
  h3 {
    color: ${props => props.color || '#6c5ce7'};
    margin: 1.5rem 0 0.8rem 0;
    font-size: 1.2rem;
  }
  
  h4 {
    color: ${props => props.color || '#6c5ce7'};
    margin: 1rem 0 0.5rem 0;
    font-size: 1.1rem;
  }
  
  p {
    margin-bottom: 1rem;
  }
  
  ul, ol {
    margin: 1rem 0;
    padding-left: 2rem;
  }
  
  li {
    margin: 0.5rem 0;
  }
  
  code {
    background: rgba(0, 0, 0, 0.5);
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    color: ${props => props.color || '#6c5ce7'};
    font-family: 'Courier New', monospace;
  }
  
  .formula {
    background: rgba(0, 0, 0, 0.3);
    padding: 1rem;
    border-radius: 8px;
    border-left: 4px solid ${props => props.color || '#6c5ce7'};
    font-family: 'Courier New', monospace;
    margin: 1rem 0;
  }
  
  .highlight {
    background: linear-gradient(90deg, transparent, ${props => props.color || '#6c5ce7'}22, transparent);
    padding: 0.8rem;
    border-radius: 8px;
    border-left: 3px solid ${props => props.color || '#6c5ce7'};
    margin: 1rem 0;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const ActionButton = styled(motion(Link))`
  padding: 1rem 2rem;
  background: linear-gradient(145deg, ${props => props.color || '#6c5ce7'}, ${props => props.color || '#6c5ce7'}cc);
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
    box-shadow: 0 10px 20px ${props => props.color || '#6c5ce7'}44;
    filter: brightness(1.1);
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 3rem;
  background: linear-gradient(145deg, #2a2d3e, #1e1e2e);
  border-radius: 20px;
  border: 2px solid #ff6b6b44;
  
  h2 {
    color: #ff6b6b;
    margin-bottom: 1rem;
  }
  
  p {
    color: #ccc;
    margin-bottom: 2rem;
  }
`;

const DetailedStudyGuide = () => {
  const { experimentId } = useParams();
  const [activeSection, setActiveSection] = useState(null);

  const experimentData = {
    1: {
      title: "Experiment 01 - Familiarization with Basic Test Equipment",
      color: "#ff6b6b",
      theory: {
        title: "📚 Theory & Background",
        content: `
          <h3>Function Generator Fundamentals</h3>
          <p>A function generator is an electronic test instrument that produces various types of electrical waveforms over a wide range of frequencies. Common waveforms include:</p>
          <ul>
            <li><strong>Sine Wave:</strong> Pure sinusoidal waveform for frequency response testing</li>
            <li><strong>Square Wave:</strong> Digital signals and timing applications</li>
            <li><strong>Triangle Wave:</strong> Linear ramp testing and integration circuits</li>
            <li><strong>Sawtooth Wave:</strong> Time-base generators and sweep circuits</li>
          </ul>
          
          <h3>Digital Storage Oscilloscope (DSO)</h3>
          <p>A digital storage oscilloscope captures and displays voltage waveforms as a function of time. Key components include:</p>
          <ul>
            <li><strong>Time Base:</strong> Controls horizontal sweep speed (seconds/division)</li>
            <li><strong>Voltage Scale:</strong> Controls vertical sensitivity (volts/division)</li>
            <li><strong>Trigger:</strong> Synchronizes waveform display</li>
            <li><strong>Sampling:</strong> Digital conversion of analog signals</li>
          </ul>
          
          <div class="formula">
            <strong>Key Measurements:</strong><br>
            Period (T) = Time for one complete cycle<br>
            Frequency (f) = 1/T<br>
            Peak-to-Peak Voltage = Vmax - Vmin<br>
            RMS Voltage = Vpeak × 0.707 (for sine waves)
          </div>
        `
      },
      procedure: {
        title: "🔬 Experimental Procedure",
        content: `
          <h3>Setup Instructions</h3>
          <ol>
            <li>Connect function generator output to DSO Channel 1 via BNC cable</li>
            <li>Turn on both instruments and allow warm-up time</li>
            <li>Set function generator to sine wave, 1kHz, 4V peak-to-peak</li>
            <li>Set DSO time base to 1ms/div (to display ~2 cycles)</li>
            <li>Set DSO voltage scale to 1V/div</li>
            <li>Configure trigger to auto mode on rising edge</li>
          </ol>
          
          <h3>Measurements to Take</h3>
          <ol>
            <li><strong>Frequency Measurement:</strong> Use cursors or automatic measurement</li>
            <li><strong>Peak-to-Peak Voltage:</strong> Measure from positive to negative peak</li>
            <li><strong>Period:</strong> Time for one complete waveform cycle</li>
            <li><strong>Rise Time:</strong> Time for signal to go from 10% to 90% of peak</li>
          </ol>
          
          <div class="highlight">
            <strong>Safety Note:</strong> Always use proper BNC cables rated for the signal levels. Ensure oscilloscope input coupling is set correctly (AC/DC).
          </div>
          
          <h3>Waveform Analysis</h3>
          <p>Observe and record:</p>
          <ul>
            <li>Waveform symmetry and distortion</li>
            <li>Noise levels and stability</li>
            <li>Trigger stability and jitter</li>
            <li>Amplitude accuracy compared to generator settings</li>
          </ul>
        `
      },
      results: {
        title: "📊 Expected Results & Analysis",
        content: `
          <h3>Typical Measurements</h3>
          <div class="formula">
            Expected Values:<br>
            Frequency: 1000 Hz ± 1%<br>
            Period: 1.000 ms ± 0.01 ms<br>
            Peak-to-Peak Voltage: 4.00 V ± 5%<br>
            RMS Voltage: 1.414 V (for sine wave)
          </div>
          
          <h3>Analysis Points</h3>
          <ul>
            <li><strong>Accuracy:</strong> Compare measured vs. set values</li>
            <li><strong>Stability:</strong> Observe measurement variations over time</li>
            <li><strong>Resolution:</strong> Determine smallest measurable change</li>
            <li><strong>Bandwidth:</strong> Test frequency response limits</li>
          </ul>
          
          <h3>Common Issues & Troubleshooting</h3>
          <ul>
            <li><strong>Unstable Display:</strong> Check trigger settings and cable connections</li>
            <li><strong>Amplitude Error:</strong> Verify probe compensation and calibration</li>
            <li><strong>Frequency Drift:</strong> Allow adequate warm-up time</li>
            <li><strong>Noise:</strong> Check grounding and shield connections</li>
          </ul>
          
          <div class="highlight">
            <strong>Learning Outcome:</strong> Students should demonstrate proficiency in basic oscilloscope operation and understand the relationship between time-domain measurements and circuit behavior.
          </div>
        `
      }
    },
    2: {
      title: "Experiment 02 - Characteristics of Common Passive Devices",
      color: "#4ecdc4",
      theory: {
        title: "📚 Theory & Background",
        content: `
          <h3>I-V Characteristics Fundamentals</h3>
          <p>Current-voltage (I-V) characteristics describe the relationship between current through and voltage across electronic components. This relationship defines the component's electrical behavior.</p>
          
          <h3>Resistor Characteristics</h3>
          <p>Resistors follow Ohm's law, showing a linear I-V relationship:</p>
          <div class="formula">
            V = I × R<br>
            Where V = voltage, I = current, R = resistance
          </div>
          
          <h3>Diode Characteristics</h3>
          <p>Diodes exhibit exponential I-V characteristics:</p>
          <ul>
            <li><strong>Forward Bias:</strong> Current increases exponentially after threshold voltage (~0.7V for silicon)</li>
            <li><strong>Reverse Bias:</strong> Minimal leakage current until breakdown voltage</li>
          </ul>
          <div class="formula">
            I = Is × (e^(qV/nkT) - 1)<br>
            Where Is = saturation current, q = electron charge, k = Boltzmann constant, T = temperature
          </div>
          
          <h3>LED Characteristics</h3>
          <p>Light-emitting diodes combine electrical and optical properties:</p>
          <ul>
            <li>Forward voltage varies by material (Red: ~2V, Blue: ~3.3V)</li>
            <li>Light output proportional to forward current</li>
            <li>Temperature-dependent characteristics</li>
          </ul>
        `
      },
      procedure: {
        title: "🔬 Experimental Procedure",
        content: `
          <h3>Circuit Setup</h3>
          <ol>
            <li>Build op-amp current-to-voltage converter circuit</li>
            <li>Connect 1kΩ input resistor to op-amp inverting input (pin 2)</li>
            <li>Connect non-inverting input (pin 3) to ground</li>
            <li>Place Device Under Test (DUT) in feedback path</li>
            <li>Connect ±12V power supply to op-amp (pins 4, 7)</li>
            <li>Set oscilloscope to X-Y mode</li>
          </ol>
          
          <h3>Measurement Procedure</h3>
          <ol>
            <li><strong>Resistor Test:</strong>
              <ul>
                <li>Insert 1kΩ resistor as DUT</li>
                <li>Apply triangular sweep voltage (±5V, 10Hz)</li>
                <li>Connect input voltage to OSC X-axis</li>
                <li>Connect output current to OSC Y-axis</li>
                <li>Observe linear I-V characteristic</li>
              </ul>
            </li>
            <li><strong>Diode Test:</strong>
              <ul>
                <li>Insert 1N4148 diode as DUT</li>
                <li>Observe exponential forward characteristics</li>
                <li>Note forward voltage threshold</li>
                <li>Record reverse leakage current</li>
              </ul>
            </li>
            <li><strong>LED Test:</strong>
              <ul>
                <li>Test different colored LEDs</li>
                <li>Record forward voltage for each color</li>
                <li>Observe light intensity vs. current</li>
              </ul>
            </li>
          </ol>
          
          <div class="highlight">
            <strong>Safety Warning:</strong> Do not exceed maximum current ratings for semiconductor devices. Use current limiting to prevent damage.
          </div>
        `
      },
      results: {
        title: "📊 Expected Results & Analysis",
        content: `
          <h3>Resistor Results</h3>
          <div class="formula">
            Expected: Linear I-V relationship<br>
            Slope = 1/R = 1/1000 = 1mS<br>
            I = V/1000 (in Amperes)
          </div>
          
          <h3>Diode Results</h3>
          <ul>
            <li><strong>Forward Threshold:</strong> ~0.7V for silicon diodes</li>
            <li><strong>Dynamic Resistance:</strong> rd = ΔV/ΔI at operating point</li>
            <li><strong>Reverse Current:</strong> Typically <1μA for small signal diodes</li>
          </ul>
          
          <h3>LED Results</h3>
          <div class="formula">
            Typical Forward Voltages:<br>
            Red LED: 1.8-2.2V<br>
            Yellow LED: 2.0-2.4V<br>
            Green LED: 2.2-2.6V<br>
            Blue LED: 3.0-3.6V<br>
            White LED: 3.0-3.6V
          </div>
          
          <h3>Analysis and Discussion</h3>
          <ul>
            <li><strong>Temperature Effects:</strong> How does heating affect characteristics?</li>
            <li><strong>Power Dissipation:</strong> Calculate P = V × I for each device</li>
            <li><strong>Applications:</strong> Where would each characteristic be useful?</li>
          </ul>
          
          <div class="highlight">
            <strong>Learning Outcome:</strong> Students understand fundamental device physics and can predict circuit behavior based on component I-V characteristics.
          </div>
        `
      }
    },
    3: {
      title: "Experiment 03 - Voltage Amplifiers using Op-Amp",
      color: "#45b7d1",
      theory: {
        title: "📚 Theory & Background",
        content: `
          <h3>Operational Amplifier Fundamentals</h3>
          <p>Operational amplifiers (op-amps) are high-gain differential amplifiers with idealized characteristics:</p>
          <ul>
            <li><strong>Infinite open-loop gain:</strong> A = ∞ (typical: 10^5 to 10^6)</li>
            <li><strong>Infinite input impedance:</strong> Zin = ∞ (no input current)</li>
            <li><strong>Zero output impedance:</strong> Zout = 0 (ideal voltage source)</li>
            <li><strong>Infinite bandwidth:</strong> (actual: limited by gain-bandwidth product)</li>
          </ul>
          
          <h3>Inverting Amplifier Configuration</h3>
          <p>In the inverting configuration, the input signal is applied to the inverting (-) input through an input resistor Rin.</p>
          <div class="formula">
            Voltage Gain: Av = -Rf/Rin<br>
            Input Impedance: Zin = Rin<br>
            Output Impedance: Zout ≈ 0<br>
            Bandwidth: BW = GBP/|Av|
          </div>
          
          <h3>Virtual Short Concept</h3>
          <p>Due to high open-loop gain and negative feedback:</p>
          <ul>
            <li>Voltage difference between inputs ≈ 0V</li>
            <li>Input current ≈ 0A</li>
            <li>All signal current flows through feedback resistor</li>
          </ul>
          
          <h3>Integrator Circuit</h3>
          <p>Replacing the feedback resistor with a capacitor creates an integrator:</p>
          <div class="formula">
            Vout = -(1/RC) ∫ Vin dt<br>
            For square wave input → triangle wave output<br>
            Phase shift: -90° at all frequencies
          </div>
        `
      },
      procedure: {
        title: "🔬 Experimental Procedure",
        content: `
          <h3>Inverting Amplifier Setup</h3>
          <ol>
            <li>Build inverting amplifier with 741 op-amp</li>
            <li>Connect Rin = 1kΩ from input to inverting input (pin 2)</li>
            <li>Connect Rf = 10kΩ from output (pin 6) to inverting input</li>
            <li>Connect non-inverting input (pin 3) directly to ground</li>
            <li>Connect ±12V power supply to pins 4 and 7</li>
            <li>Add power supply decoupling capacitors (0.1μF)</li>
          </ol>
          
          <h3>Testing Procedure</h3>
          <ol>
            <li><strong>DC Offset Test:</strong>
              <ul>
                <li>With no input signal, measure output DC voltage</li>
                <li>Should be near 0V (check for offset)</li>
              </ul>
            </li>
            <li><strong>Gain Measurement:</strong>
              <ul>
                <li>Apply 0.2V p-p sine wave at 1kHz</li>
                <li>Measure input and output voltages</li>
                <li>Calculate actual gain: Av = Vout/Vin</li>
                <li>Compare with theoretical: -10</li>
              </ul>
            </li>
            <li><strong>Frequency Response:</strong>
              <ul>
                <li>Test at frequencies: 100Hz, 1kHz, 10kHz, 100kHz</li>
                <li>Record gain and phase at each frequency</li>
                <li>Determine -3dB bandwidth</li>
              </ul>
            </li>
          </ol>
          
          <h3>Integrator Circuit</h3>
          <ol>
            <li>Replace Rf with C = 0.1μF capacitor</li>
            <li>Apply 1kHz square wave input (±1V)</li>
            <li>Observe triangle wave output</li>
            <li>Measure integration time constant τ = RC</li>
          </ol>
          
          <div class="highlight">
            <strong>Important:</strong> Ensure proper power supply decoupling and grounding to prevent oscillation and noise pickup.
          </div>
        `
      },
      results: {
        title: "📊 Expected Results & Analysis",
        content: `
          <h3>Inverting Amplifier Results</h3>
          <div class="formula">
            Theoretical Gain: Av = -Rf/Rin = -10kΩ/1kΩ = -10<br>
            Expected Output: Vout = -10 × 0.2V = -2.0V p-p<br>
            Phase Shift: 180° (inversion)
          </div>
          
          <h3>Frequency Response Analysis</h3>
          <ul>
            <li><strong>Low Frequencies:</strong> Gain remains constant at -10</li>
            <li><strong>High Frequencies:</strong> Gain rolls off due to GBP limitation</li>
            <li><strong>-3dB Frequency:</strong> f-3dB ≈ GBP/|Av| ≈ 1MHz/10 = 100kHz</li>
          </ul>
          
          <h3>Integrator Results</h3>
          <div class="formula">
            Time Constant: τ = RC = 10kΩ × 0.1μF = 1ms<br>
            For 1kHz square wave (T = 1ms):<br>
            Triangle amplitude ≈ Vsquare × T/(4×τ) = 1V × 1ms/(4×1ms) = 0.25V
          </div>
          
          <h3>Performance Metrics</h3>
          <ul>
            <li><strong>Gain Accuracy:</strong> Typically ±5% due to resistor tolerances</li>
            <li><strong>Input Bias Current:</strong> Causes DC offset (typically 80nA for 741)</li>
            <li><strong>Slew Rate:</strong> Limits high-frequency, large-signal performance (~0.5V/μs for 741)</li>
          </ul>
          
          <div class="highlight">
            <strong>Learning Outcome:</strong> Students understand op-amp circuit analysis, feedback theory, and practical limitations of real amplifiers.
          </div>
        `
      }
    },
    4: {
      title: "Experiment 04 - Multivibrator using IC555",
      color: "#96ceb4",
      theory: {
        title: "📚 Theory & Background",
        content: `
          <h3>555 Timer IC Overview</h3>
          <p>The NE555 is a versatile timer IC that can operate in three modes:</p>
          <ul>
            <li><strong>Astable:</strong> Free-running oscillator (square wave generator)</li>
            <li><strong>Monostable:</strong> One-shot pulse generator</li>
            <li><strong>Bistable:</strong> Flip-flop or Schmitt trigger</li>
          </ul>
          
          <h3>Internal Block Diagram</h3>
          <p>Key internal components:</p>
          <ul>
            <li><strong>Voltage Divider:</strong> Creates 1/3 VCC and 2/3 VCC reference levels</li>
            <li><strong>Comparators:</strong> Compare input voltages with references</li>
            <li><strong>SR Flip-Flop:</strong> Controls output state</li>
            <li><strong>Discharge Transistor:</strong> Provides timing capacitor discharge path</li>
            <li><strong>Output Buffer:</strong> Can sink/source up to 200mA</li>
          </ul>
          
          <h3>Astable Operation</h3>
          <p>In astable mode, the 555 continuously switches between high and low output states:</p>
          <div class="formula">
            Frequency: f = 1.44/((R1 + 2R2) × C)<br>
            High Time: th = 0.693 × (R1 + R2) × C<br>
            Low Time: tl = 0.693 × R2 × C<br>
            Duty Cycle: D = (R1 + R2)/(R1 + 2R2)
          </div>
          
          <h3>Timing Capacitor Behavior</h3>
          <ul>
            <li><strong>Charging:</strong> From 1/3 VCC to 2/3 VCC through R1 + R2</li>
            <li><strong>Discharging:</strong> From 2/3 VCC to 1/3 VCC through R2</li>
            <li><strong>Exponential:</strong> Follows RC charging/discharging curves</li>
          </ul>
        `
      },
      procedure: {
        title: "🔬 Experimental Procedure",
        content: `
          <h3>Circuit Construction</h3>
          <ol>
            <li>Insert NE555 IC into breadboard</li>
            <li>Connect Pin 8 (VCC) to +5V power supply</li>
            <li>Connect Pin 1 (GND) to ground</li>
            <li>Connect Pin 4 (RESET) to +5V</li>
            <li>Connect R1 = 47kΩ from VCC to Pin 7 (DISCHARGE)</li>
            <li>Connect R2 = 47kΩ from Pin 7 to Pin 2 (TRIGGER)</li>
            <li>Connect timing capacitor C = 10μF from Pin 2 to ground</li>
            <li>Connect Pin 6 (THRESHOLD) to Pin 2</li>
          </ol>
          
          <h3>Measurement Procedure</h3>
          <ol>
            <li><strong>Output Waveform:</strong>
              <ul>
                <li>Connect DSO to Pin 3 (OUTPUT)</li>
                <li>Set time base to 0.5s/div</li>
                <li>Observe square wave output</li>
                <li>Measure frequency and duty cycle</li>
              </ul>
            </li>
            <li><strong>Timing Capacitor Voltage:</strong>
              <ul>
                <li>Connect second DSO channel to Pin 2</li>
                <li>Observe exponential charging/discharging</li>
                <li>Verify 1/3 VCC and 2/3 VCC threshold levels</li>
              </ul>
            </li>
            <li><strong>Parameter Variations:</strong>
              <ul>
                <li>Replace R2 with 22kΩ, observe frequency change</li>
                <li>Replace C with 22μF, observe frequency change</li>
                <li>Calculate and verify new timing values</li>
              </ul>
            </li>
          </ol>
          
          <div class="highlight">
            <strong>Note:</strong> Use electrolytic capacitor with correct polarity. Add 0.01μF ceramic bypass capacitor across VCC and GND for noise reduction.
          </div>
          
          <h3>Advanced Measurements</h3>
          <ol>
            <li>Measure supply current during high and low output states</li>
            <li>Test output drive capability with LED load</li>
            <li>Observe temperature effects on frequency stability</li>
          </ol>
        `
      },
      results: {
        title: "📊 Expected Results & Analysis",
        content: `
          <h3>Calculated Values</h3>
          <div class="formula">
            With R1 = R2 = 47kΩ, C = 10μF:<br>
            Frequency: f = 1.44/((47k + 2×47k) × 10μ) = 1.44/1.41 = 1.02 Hz<br>
            High Time: th = 0.693 × (47k + 47k) × 10μ = 0.65s<br>
            Low Time: tl = 0.693 × 47k × 10μ = 0.33s<br>
            Duty Cycle: D = (47k + 47k)/(47k + 2×47k) = 67%
          </div>
          
          <h3>Measured vs Calculated</h3>
          <ul>
            <li><strong>Frequency Tolerance:</strong> ±10% due to component tolerances</li>
            <li><strong>Capacitor Effects:</strong> Electrolytic capacitors have ±20% tolerance</li>
            <li><strong>Temperature Drift:</strong> Approximately 50ppm/°C</li>
          </ul>
          
          <h3>Timing Capacitor Analysis</h3>
          <div class="formula">
            Threshold Levels (for VCC = 5V):<br>
            Upper Threshold (Pin 6): 2/3 × 5V = 3.33V<br>
            Lower Threshold (Pin 2): 1/3 × 5V = 1.67V<br>
            Voltage Swing: 3.33V - 1.67V = 1.66V
          </div>
          
          <h3>Applications and Variations</h3>
          <ul>
            <li><strong>LED Flasher:</strong> Connect LED and current-limiting resistor to output</li>
            <li><strong>Audio Tone Generator:</strong> Use smaller RC values for audio frequencies</li>
            <li><strong>PWM Generator:</strong> Add diode across R2 for different duty cycles</li>
            <li><strong>Voltage Controlled Oscillator:</strong> Replace R1 with current source</li>
          </ul>
          
          <div class="highlight">
            <strong>Learning Outcome:</strong> Students understand timer IC operation, RC timing circuits, and practical oscillator design considerations.
          </div>
        `
      }
    }
  };

  const experiment = experimentData[experimentId];

  if (!experiment) {
    return (
      <Container>
        <Header>
          <Title
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            ❌ Experiment Not Found
          </Title>
          <BackButton to="/study-guide">← Back to Study Guide</BackButton>
        </Header>
        <ContentContainer>
          <ErrorMessage>
            <h2>Experiment Not Found</h2>
            <p>The requested experiment (ID: {experimentId}) does not exist.</p>
            <BackButton to="/study-guide">Return to Study Guide</BackButton>
          </ErrorMessage>
        </ContentContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          📋 Experiment {experimentId} - Detailed Guide
        </Title>
        <BackButton to="/study-guide">← Back to Study Guide</BackButton>
      </Header>

       <ContentContainer>
        <h2>Detailed guide content for Experiment {experimentId}</h2>
        <p>This will contain comprehensive theory, procedures, and analysis.</p>
      </ContentContainer>
      
      <ContentContainer>
        {/* Theory Section */}
        <Section
          color={experiment.color}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <SectionTitle color={experiment.color}>
            {experiment.theory.title}
          </SectionTitle>
          <SectionContent 
            color={experiment.color}
            dangerouslySetInnerHTML={{ __html: experiment.theory.content }}
          />
        </Section>

        {/* Procedure Section */}
        <Section
          color={experiment.color}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SectionTitle color={experiment.color}>
            {experiment.procedure.title}
          </SectionTitle>
          <SectionContent 
            color={experiment.color}
            dangerouslySetInnerHTML={{ __html: experiment.procedure.content }}
          />
        </Section>

        {/* Results Section */}
        <Section
          color={experiment.color}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <SectionTitle color={experiment.color}>
            {experiment.results.title}
          </SectionTitle>
          <SectionContent 
            color={experiment.color}
            dangerouslySetInnerHTML={{ __html: experiment.results.content }}
          />
        </Section>

        {/* Action Buttons */}
        <ActionButtons>
          <ActionButton
            to={`/dso/${experimentId}`}
            color={experiment.color}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔬 Start DSO Simulation
          </ActionButton>
          <ActionButton
            to="/study-guide"
            color="#6c5ce7"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            📚 Back to All Experiments
          </ActionButton>
        </ActionButtons>
      </ContentContainer>
    </Container>
  );
};

export default DetailedStudyGuide;