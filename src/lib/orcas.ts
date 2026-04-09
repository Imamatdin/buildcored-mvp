export interface OrcasProject {
  day: number;
  title: string;
  tag: string;
  description: string;
  difficulty: "EASY" | "MODERATE" | "ADVANCED" | "EXPERT";
  hwConcept: string;
}

export interface OrcasWeek {
  week: number;
  title: string;
  subtitle: string;
  description: string;
  projects: OrcasProject[];
}

export const ORCAS_WEEKS: OrcasWeek[] = [
  {
    week: 1,
    title: "Body as Input",
    subtitle: "SENSING & INPUT",
    description:
      "Use your body as the primary input device. Eyes, fingers, head, and breath become sensors. Every project maps a physical signal to a digital action.",
    projects: [
      {
        day: 1,
        title: "RockLook",
        tag: "CV + AUDIO",
        description: "Detect downward gaze via webcam. Trigger rock music playback the instant your gaze drops.",
        difficulty: "EASY",
        hwConcept: "Sensor threshold → interrupt → actuator",
      },
      {
        day: 2,
        title: "AirCanvas",
        tag: "CV + DRAWING",
        description: "Track thumb-to-index distance. When pinched, fingertip becomes a stylus drawing on a canvas.",
        difficulty: "EASY",
        hwConcept: "Coordinate mapping & input sampling",
      },
      {
        day: 3,
        title: "VolumeKnuckle",
        tag: "CV + SYSTEM",
        description: "Map closed fist height to system volume. No buttons, no keyboard — only position.",
        difficulty: "EASY",
        hwConcept: "Analog-to-digital conversion (ADC)",
      },
      {
        day: 4,
        title: "BlinkLock",
        tag: "CV + SECURITY",
        description: "Three rapid blinks lock the screen. A deliberate wink with correct timing unlocks.",
        difficulty: "MODERATE",
        hwConcept: "Debounce logic & state machines",
      },
      {
        day: 5,
        title: "FaceEQ",
        tag: "CV + AUDIO",
        description: "Head yaw scrubs through an audio track. Head pitch shifts playback pitch in real time.",
        difficulty: "MODERATE",
        hwConcept: "Rotary encoder → angular displacement",
      },
      {
        day: 6,
        title: "BreathClock",
        tag: "AUDIO SIGNAL",
        description: "Apply Butterworth low-pass filter to detect breath amplitude. Compute breaths-per-minute live.",
        difficulty: "MODERATE",
        hwConcept: "Envelope detection & DSP",
      },
      {
        day: 7,
        title: "KeyboardOscilloscope",
        tag: "SIGNAL SYNTH",
        description: "Each keypress generates a sine wave. Visualize all active waveforms and their superposition.",
        difficulty: "EASY",
        hwConcept: "Signal synthesis & superposition",
      },
    ],
  },
  {
    week: 2,
    title: "Local AI Core",
    subtitle: "EDGE INFERENCE",
    description:
      "Run intelligence entirely on-device. No cloud, no API keys, no latency tax. Think about compute budgets, quantization, and edge inference.",
    projects: [
      {
        day: 8,
        title: "PocketAgent",
        tag: "LOCAL AI",
        description: "Run a 3B-parameter LLM on-device. Build a CLI agent with tools: read files, list dirs, run commands.",
        difficulty: "MODERATE",
        hwConcept: "Edge inference with fixed memory budget",
      },
      {
        day: 9,
        title: "WhisperDesk",
        tag: "LOCAL SPEECH",
        description: "Transcribe microphone input in real time using Whisper. Auto-type into the active window.",
        difficulty: "MODERATE",
        hwConcept: "On-device DSP & latency budgeting",
      },
      {
        day: 10,
        title: "TerminalBrain",
        tag: "LOCAL AI + TERMINAL",
        description: "Capture live stdout/stderr. Feed error patterns to local LLM. Display inline fix suggestions.",
        difficulty: "ADVANCED",
        hwConcept: "Interrupt-driven feedback loops",
      },
      {
        day: 11,
        title: "MoodSynth",
        tag: "LOCAL AI + AUDIO",
        description: "Type a mood. LLM translates to synthesis parameters. A synthesis engine generates matching ambient sound.",
        difficulty: "MODERATE",
        hwConcept: "Digital-to-analog conversion (DAC)",
      },
      {
        day: 12,
        title: "SnapAnnotator",
        tag: "LOCAL VISION",
        description: "Capture webcam frame. Run a local vision model to label objects. Click labels for specs/info.",
        difficulty: "MODERATE",
        hwConcept: "Vision inference pipeline & frame latency",
      },
      {
        day: 13,
        title: "DailyDebrief",
        tag: "LOCAL AI + DATA",
        description: "Collect git commits, shell history, file changes. LLM outputs a structured 5-line debrief.",
        difficulty: "MODERATE",
        hwConcept: "Data aggregation & flight recorder",
      },
      {
        day: 14,
        title: "RegisterBot",
        tag: "CPU SIM",
        description: "Build a tiny CPU simulator: 8 registers, ALU, minimal instruction set. LLM narrates each step.",
        difficulty: "ADVANCED",
        hwConcept: "Fetch-decode-execute cycle & ALU",
      },
    ],
  },
  {
    week: 3,
    title: "Signals & Systems",
    subtitle: "DSP & PROTOCOLS",
    description:
      "Software implementations of hardware fundamentals: FFT, filters, PWM, I2C, DAQ. The math you build here maps 1:1 to real oscilloscopes and microcontroller firmware.",
    projects: [
      {
        day: 15,
        title: "AudioScope",
        tag: "FFT / SPECTRUM",
        description: "Apply FFT to live mic input. Display a frequency spectrum with labeled bands. Click to isolate a range.",
        difficulty: "MODERATE",
        hwConcept: "Spectrum analysis & filter banks",
      },
      {
        day: 16,
        title: "EchoKiller",
        tag: "SIGNAL PROC",
        description: "Record a voice sample with echo. Apply adaptive FIR filter. Compare original vs filtered side-by-side.",
        difficulty: "ADVANCED",
        hwConcept: "Acoustic Echo Cancellation (AEC)",
      },
      {
        day: 17,
        title: "PWMSimulator",
        tag: "EMBEDDED SIM",
        description: "Interactive PWM simulator. Slider controls duty cycle. Live square wave + average voltage visualization.",
        difficulty: "EASY",
        hwConcept: "PWM duty cycle & analog output",
      },
      {
        day: 18,
        title: "DepthMapper",
        tag: "DEPTH + 3D",
        description: "Monocular depth estimation generates a live depth heatmap. Export point cloud CSV.",
        difficulty: "ADVANCED",
        hwConcept: "Depth sensing & LiDAR data structures",
      },
      {
        day: 19,
        title: "I2CPlayground",
        tag: "PROTOCOL SIM",
        description: "Simulate I2C protocol. Encode sensor data as I2C packets. Animate SDA/SCL signal lines.",
        difficulty: "ADVANCED",
        hwConcept: "I2C bus: address, ACK/NACK, clock",
      },
      {
        day: 20,
        title: "SensorLogger",
        tag: "MULTI-SENSOR",
        description: "Log mic RMS, camera motion, keystroke cadence, CPU metrics every 100ms. Live dashboard with ring buffer.",
        difficulty: "MODERATE",
        hwConcept: "Multi-channel DAQ & ring buffer",
      },
      {
        day: 21,
        title: "UDPOscilloscope",
        tag: "NETWORK",
        description: "Transmit simulated sensor data over localhost UDP. Separate receiver renders a live oscilloscope.",
        difficulty: "MODERATE",
        hwConcept: "UART/UDP streaming & packet framing",
      },
    ],
  },
  {
    week: 4,
    title: "Full Systems",
    subtitle: "INTEGRATION",
    description:
      "Combine everything. Real pipelines: sensor in, model processes, actuator out. By Day 30, you ship a system that thinks the way embedded hardware does.",
    projects: [
      {
        day: 22,
        title: "CircuitWhisperer",
        tag: "VISION AI + HW",
        description: "Photograph a hand-drawn circuit. Vision model identifies components and flags wiring errors.",
        difficulty: "MODERATE",
        hwConcept: "Schematic reading & component recognition",
      },
      {
        day: 23,
        title: "ObjectFollower",
        tag: "CV + CONTROL",
        description: "Select a target object from camera feed. Compute offset, apply PID controller for servo-style tracking.",
        difficulty: "MODERATE",
        hwConcept: "PID control & closed-loop feedback",
      },
      {
        day: 24,
        title: "HardwareTA",
        tag: "RAG AGENT",
        description: "Build a local RAG agent that answers hardware engineering questions from indexed datasheets.",
        difficulty: "ADVANCED",
        hwConcept: "Datasheet parsing & RAG pipeline",
      },
      {
        day: 25,
        title: "FirmwarePatcher",
        tag: "FIRMWARE",
        description: "Load a simulated firmware hex blob. LLM scans for byte patterns: magic numbers, jump tables, strings.",
        difficulty: "ADVANCED",
        hwConcept: "Firmware analysis & memory maps",
      },
      {
        day: 26,
        title: "CacheSim",
        tag: "COMP ARCH",
        description: "Simulate a two-level CPU cache (L1 + L2). Visualize each access as hit/miss with eviction policy.",
        difficulty: "ADVANCED",
        hwConcept: "Cache hierarchy & eviction policies",
      },
      {
        day: 27,
        title: "SignalFlags",
        tag: "GESTURE ML",
        description: "Collect hand poses as semaphore letters. Train a lightweight sklearn classifier on custom gestures.",
        difficulty: "MODERATE",
        hwConcept: "Custom gesture model & signal encoding",
      },
      {
        day: 28,
        title: "MorseDecoder",
        tag: "SERIAL ENCODING",
        description: "Tap spacebar in Morse code. Measure inter-tap timing for dots vs dashes. Decode and execute commands.",
        difficulty: "MODERATE",
        hwConcept: "Serial encoding & pulse-width timing",
      },
      {
        day: 29,
        title: "SilentAssistant",
        tag: "FULL PIPELINE",
        description: "Webcam captures mouth region → vision model → LLM reasoning → text-to-speech output. End-to-end.",
        difficulty: "EXPERT",
        hwConcept: "Sensor fusion & end-to-end latency",
      },
      {
        day: 30,
        title: "OrcaOS",
        tag: "CAPSTONE",
        description: "Integrate the best components from 30 days into a unified TUI dashboard. Your personal embedded OS.",
        difficulty: "EXPERT",
        hwConcept: "Full-stack embedded thinking",
      },
    ],
  },
];

export const DIFFICULTY_COLORS: Record<string, string> = {
  EASY: "text-green-400 bg-green-400/10 border-green-400/20",
  MODERATE: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  ADVANCED: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  EXPERT: "text-red-400 bg-red-400/10 border-red-400/20",
};
