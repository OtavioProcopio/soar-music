import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Play, Pause, Mic, Plus, Minus, Settings2, Music2 } from 'lucide-react';

// --- TUNER HELPER FUNCTIONS ---
const noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

function getNoteFromPitch(frequency: number) {
  const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
  return Math.round(noteNum) + 69;
}

function getFrequencyFromNoteNum(note: number) {
  return 440 * Math.pow(2, (note - 69) / 12);
}

function getCents(frequency: number, note: number) {
  return Math.floor(1200 * Math.log(frequency / getFrequencyFromNoteNum(note)) / Math.log(2));
}

// Autocorrelation algorithm for pitch detection
function autoCorrelate(buf: Float32Array, sampleRate: number) {
  const SIZE = buf.length;
  const MAX_SAMPLES = Math.floor(SIZE / 2);
  let best_offset = -1;
  let best_correlation = 0;
  let rms = 0;
  let foundGoodCorrelation = false;
  const correlations = new Array(MAX_SAMPLES);

  for (let i = 0; i < SIZE; i++) {
    const val = buf[i];
    rms += val * val;
  }
  rms = Math.sqrt(rms / SIZE);

  // Noise gate
  if (rms < 0.01) return -1;

  let lastCorrelation = 1;
  for (let offset = 0; offset < MAX_SAMPLES; offset++) {
    let correlation = 0;

    for (let i = 0; i < MAX_SAMPLES; i++) {
      correlation += Math.abs((buf[i] - buf[i + offset]));
    }
    correlation = 1 - (correlation / MAX_SAMPLES);
    correlations[offset] = correlation; 

    if ((correlation > 0.9) && (correlation > lastCorrelation)) {
      foundGoodCorrelation = true;
      if (correlation > best_correlation) {
        best_correlation = correlation;
        best_offset = offset;
      }
    } else if (foundGoodCorrelation) {
      const shift = (correlations[best_offset + 1] - correlations[best_offset - 1]) / correlations[best_offset];
      return sampleRate / (best_offset + (8 * shift));
    }
    lastCorrelation = correlation;
  }
  if (best_correlation > 0.01) {
    return sampleRate / best_offset;
  }
  return -1;
}

const ToolsPage = () => {
    // --- METRONOME STATE ---
    const [bpm, setBpm] = useState(100);
    const [isPlaying, setIsPlaying] = useState(false);
    const [beatsPerMeasure] = useState(2); // Metrônomo simples (2 tempos para alternar visual)
    const [currentBeat, setCurrentBeat] = useState(0);
    
    // Metronome Refs
    const audioContextRef = useRef<AudioContext | null>(null);
    const nextNoteTimeRef = useRef<number>(0);
    const timerIDRef = useRef<number | null>(null);
    const beatQueueRef = useRef<{ note: number; time: number }[]>([]);

    // --- TUNER STATE ---
    const [isTunerActive, setIsTunerActive] = useState(false);
    const [noteName, setNoteName] = useState("--");
    const [pitchFreq, setPitchFreq] = useState(0);
    const [detuneCents, setDetuneCents] = useState(0);
    
    // Tuner Refs
    const tunerAudioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const rafIDRef = useRef<number | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const audioStreamRef = useRef<MediaStream | null>(null);

    // --- METRONOME AUDIO ENGINE ---
    const scheduleNote = (beatNumber: number, time: number) => {
        beatQueueRef.current.push({ note: beatNumber, time });

        if (!audioContextRef.current) return;

        const osc = audioContextRef.current.createOscillator();
        const envelope = audioContextRef.current.createGain();

        // Configuração de som estilo "Digital Woodblock"
        const frequency = 1000; 
        
        osc.frequency.value = frequency;
        osc.type = 'sine'; // Sine é mais limpo, mas vamos moldar com o envelope

        osc.connect(envelope);
        envelope.connect(audioContextRef.current.destination);

        // Envelope curto e percussivo
        envelope.gain.setValueAtTime(0, time);
        envelope.gain.linearRampToValueAtTime(1, time + 0.001); // Ataque instantâneo
        envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.05); // Decay rápido

        osc.start(time);
        osc.stop(time + 0.06);
    };

    const nextNote = () => {
        const secondsPerBeat = 60.0 / bpm;
        nextNoteTimeRef.current += secondsPerBeat;
        setCurrentBeat((prev) => (prev + 1) % beatsPerMeasure); // Update state for visual
    };

    const scheduler = useCallback(() => {
        if (!audioContextRef.current) return;
        
        // Schedule notes ahead
        while (nextNoteTimeRef.current < audioContextRef.current.currentTime + 0.1) {
            scheduleNote(currentBeat, nextNoteTimeRef.current);
            nextNote();
        }
        timerIDRef.current = window.setTimeout(scheduler, 25);
    }, [bpm, beatsPerMeasure, currentBeat]);

    // Effect to sync visual beat indicator with audio queue
    useEffect(() => {
        let animationFrameId: number;
        
        const draw = () => {
            const currentTime = audioContextRef.current?.currentTime || 0;
            
            while (beatQueueRef.current.length && beatQueueRef.current[0].time < currentTime) {
                // Remove played notes
                beatQueueRef.current.shift();
            }
            animationFrameId = requestAnimationFrame(draw);
        };

        if (isPlaying) {
            draw();
        }

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPlaying]);

    useEffect(() => {
        if (isPlaying) {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            // Reset timing
            nextNoteTimeRef.current = audioContextRef.current.currentTime + 0.05;
            setCurrentBeat(0);
            scheduler();
        } else {
            if (timerIDRef.current) window.clearTimeout(timerIDRef.current);
        }
        return () => { if (timerIDRef.current) window.clearTimeout(timerIDRef.current); };
    }, [isPlaying, scheduler]);

    const handleBpmChange = (change: number) => {
        setBpm((prev) => Math.max(40, Math.min(240, prev + change)));
    };

    // --- TUNER LOGIC ---
    const updatePitch = () => {
        if (!analyserRef.current) return;
        
        const bufferLength = 2048;
        const buffer = new Float32Array(bufferLength);
        analyserRef.current.getFloatTimeDomainData(buffer);
        
        const ac = autoCorrelate(buffer, tunerAudioContextRef.current!.sampleRate);

        if (ac === -1) {
            // No strong signal
        } else {
            const pitch = ac;
            setPitchFreq(Math.round(pitch));
            const note = getNoteFromPitch(pitch);
            setNoteName(noteStrings[note % 12]);
            const cents = getCents(pitch, note);
            setDetuneCents(cents);
        }

        rafIDRef.current = requestAnimationFrame(updatePitch);
    };

    const toggleTuner = async () => {
        if (isTunerActive) {
            // Stop Tuner
            if (rafIDRef.current) cancelAnimationFrame(rafIDRef.current);
            if (sourceRef.current) sourceRef.current.disconnect();
            if (audioStreamRef.current) {
                audioStreamRef.current.getTracks().forEach(track => track.stop());
            }
            if (tunerAudioContextRef.current) tunerAudioContextRef.current.suspend();
            
            setIsTunerActive(false);
            setNoteName("--");
            setPitchFreq(0);
            setDetuneCents(0);
        } else {
            // Start Tuner
            try {
                tunerAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
                audioStreamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
                
                analyserRef.current = tunerAudioContextRef.current.createAnalyser();
                analyserRef.current.fftSize = 2048;
                
                sourceRef.current = tunerAudioContextRef.current.createMediaStreamSource(audioStreamRef.current);
                sourceRef.current.connect(analyserRef.current);
                
                setIsTunerActive(true);
                updatePitch();
            } catch (err) {
                console.error("Microphone access denied", err);
                alert("Precisamos de acesso ao microfone para o afinador funcionar.");
            }
        }
    };

    useEffect(() => {
        return () => {
             if (rafIDRef.current) cancelAnimationFrame(rafIDRef.current);
             if (audioStreamRef.current) audioStreamRef.current.getTracks().forEach(track => track.stop());
             if (tunerAudioContextRef.current) tunerAudioContextRef.current.close();
        };
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
             <div className="text-center mb-12">
                <h2 className="text-3xl font-display font-bold text-brand-soar">Ferramentas do Músico</h2>
                <p className="text-slate-500 mt-2">Tecnologia para auxiliar sua prática diária.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* --- METRONOME UI --- */}
                <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 flex flex-col h-full relative overflow-hidden">
                     {/* Header */}
                     <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
                         <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                             <Settings2 size={24} />
                         </div>
                         <div>
                             <h3 className="font-display font-bold text-slate-800 text-lg leading-tight">Metrônomo</h3>
                             <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Precisão Rítmica</p>
                         </div>
                     </div>

                     <div className="flex flex-col items-center justify-center flex-grow py-4">
                        {/* Visual Beat Indicator */}
                        <div className="flex gap-3 mb-8 h-16 items-center justify-center">
                            <div 
                                className={`
                                    rounded-full transition-all duration-100
                                    ${isPlaying && currentBeat === 0
                                        ? 'w-12 h-12 bg-brand-primary shadow-[0_0_30px_rgba(21,148,199,0.8)] scale-110' 
                                        : 'w-8 h-8 bg-slate-200'}
                                `}
                            ></div>
                        </div>

                        {/* BPM Display */}
                        <div className="text-center mb-8 w-full">
                            <div className="text-8xl font-display font-black text-slate-800 tracking-tighter tabular-nums leading-none">
                                {bpm}
                            </div>
                            <div className="text-brand-primary font-bold uppercase tracking-[0.3em] text-sm mt-2">Batidas por Minuto</div>
                        </div>
                        
                        {/* Slider Control */}
                        <div className="flex items-center gap-4 w-full mb-8 px-4">
                            <button onClick={() => handleBpmChange(-1)} className="w-14 h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors active:scale-95">
                                <Minus size={28} />
                            </button>
                            <div className="flex-grow relative h-12 flex items-center">
                                <div className="absolute w-full h-4 bg-slate-100 rounded-full overflow-hidden">
                                     <div 
                                        className="h-full bg-brand-primary opacity-30" 
                                        style={{ width: `${((bpm - 40) / (240 - 40)) * 100}%` }}
                                     ></div>
                                </div>
                                <input 
                                    type="range" 
                                    min="40" 
                                    max="240" 
                                    value={bpm} 
                                    onChange={(e) => setBpm(parseInt(e.target.value))} 
                                    className="w-full h-12 opacity-0 cursor-pointer absolute z-10" 
                                />
                                <div 
                                    className="w-8 h-8 bg-white border-4 border-brand-primary rounded-full shadow-md absolute pointer-events-none transition-all"
                                    style={{ left: `calc(${((bpm - 40) / (240 - 40)) * 100}% - 16px)` }}
                                ></div>
                            </div>
                            <button onClick={() => handleBpmChange(1)} className="w-14 h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors active:scale-95">
                                <Plus size={28} />
                            </button>
                        </div>
                     </div>

                     <div className="mt-auto">
                        <button 
                            onClick={() => setIsPlaying(!isPlaying)}
                            className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-black text-xl uppercase tracking-wider transition-all shadow-xl transform hover:-translate-y-1 active:translate-y-0 ${
                                isPlaying 
                                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/30' 
                                : 'bg-green-500 hover:bg-green-600 text-white shadow-green-500/30'
                            }`}
                        >
                            {isPlaying ? <><Pause size={28} fill="currentColor" /> Parar</> : <><Play size={28} fill="currentColor" /> Iniciar</>}
                        </button>
                     </div>
                </div>

                {/* --- TUNER UI --- */}
                <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl shadow-slate-900/20 flex flex-col relative overflow-hidden min-h-[500px]">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                         <div className="flex items-center gap-3 mb-12">
                             <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-brand-primary border border-slate-700">
                                 <Mic size={24} />
                             </div>
                             <div>
                                 <h3 className="font-display font-bold text-white text-lg leading-tight">Afinador Cromático</h3>
                                 <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">DSP / Alta Precisão</p>
                             </div>
                         </div>

                        <div className="flex-grow flex flex-col items-center justify-center">
                            
                            {/* Frequency Display */}
                            <div className="text-slate-400 font-mono text-sm mb-4 h-6 flex items-center gap-2 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700">
                                <Music2 size={12} />
                                {pitchFreq > 0 ? `${pitchFreq} Hz` : 'Aguardando som...'}
                            </div>

                            {/* Note Display */}
                            <div className={`text-9xl font-display font-black mb-8 transition-all duration-200 ${
                                Math.abs(detuneCents) < 5 && pitchFreq > 0 
                                ? 'text-green-400 drop-shadow-[0_0_25px_rgba(74,222,128,0.6)] scale-110' 
                                : 'text-white'
                            }`}>
                                {noteName}
                            </div>
                            
                            {/* Gauge / Needle */}
                            <div className="w-full relative mb-12 px-4">
                                {/* Tick Marks */}
                                <div className="flex justify-between text-[10px] text-slate-600 font-bold mb-2 px-1">
                                    <span>-50</span>
                                    <span>0</span>
                                    <span>+50</span>
                                </div>
                                <div className="w-full h-4 bg-slate-800 rounded-full relative overflow-hidden border border-slate-700">
                                    {/* Center Safe Zone */}
                                    <div className="absolute left-1/2 top-0 bottom-0 w-6 bg-green-500/20 -translate-x-1/2 z-0 border-x border-green-500/30"></div>
                                    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-green-500/50 -translate-x-1/2 z-0"></div>
                                    
                                    {/* Needle */}
                                    <div 
                                        className={`absolute top-0 bottom-0 w-4 h-4 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] transition-all duration-100 ease-out z-10 -mt-[1px] border-2 border-slate-900 ${Math.abs(detuneCents) < 5 ? 'bg-green-400 scale-125' : 'bg-red-500'}`}
                                        style={{ 
                                            left: '50%', 
                                            transform: `translateX(calc(-50% + ${Math.max(-140, Math.min(140, detuneCents * 3))}px))` 
                                        }}
                                    ></div>
                                </div>
                            </div>
                            
                            {/* Feedback Text */}
                            <div className="h-8 flex items-center justify-center">
                                {pitchFreq > 0 && (
                                    Math.abs(detuneCents) < 5 ? 
                                    <span className="text-green-400 font-black uppercase tracking-widest text-lg animate-pulse">Perfeitamente Afinado</span> :
                                    detuneCents < 0 ? 
                                    <div className="flex items-center gap-2 text-red-400 font-bold uppercase"><Minus size={16} /> Muito Grave (Flat)</div> :
                                    <div className="flex items-center gap-2 text-red-400 font-bold uppercase">Muito Agudo (Sharp) <Plus size={16} /></div>
                                )}
                            </div>
                        </div>

                        <div className="mt-auto">
                            <button 
                                onClick={toggleTuner}
                                className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-bold text-lg uppercase tracking-wide transition-all shadow-lg transform hover:-translate-y-0.5 ${isTunerActive ? 'bg-slate-800 hover:bg-slate-700 text-red-400 border border-red-500/20' : 'bg-brand-primary hover:bg-brand-secondary text-white shadow-brand-primary/30'}`}
                            >
                                {isTunerActive ? <><Pause fill="currentColor" /> Desligar Microfone</> : <><Mic fill="currentColor" /> Ativar Afinador</>}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToolsPage;