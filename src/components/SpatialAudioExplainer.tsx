import { useState } from 'react';

const SpatialAudioExplainer = () => {
  const [activeSection, setActiveSection] = useState('hierarchy');
  const [expandedTerms, setExpandedTerms] = useState(new Set());

  const toggleTerm = (term: string) => {
    const newExpanded = new Set(expandedTerms);
    if (newExpanded.has(term)) {
      newExpanded.delete(term);
    } else {
      newExpanded.add(term);
    }
    setExpandedTerms(newExpanded);
  };

  const terms = {
    'Fusing': 'The brain combining separate audio signals into a single perceived sound source. Like seeing two slightly different images from each eye as one 3D object.',
    'Azimuth': 'Horizontal angle around you (left-right direction). 0° is straight ahead, 90° is directly to your right, 180° is behind you.',
    'Elevation': 'Vertical angle (up-down direction). 0° is ear level, 90° is directly overhead, -90° is directly below.',
    'ITD': 'Interaural Time Difference - the microseconds of delay between when sound reaches your left vs. right ear. Your brain uses this to locate sounds.',
    'ILD': 'Interaural Level Difference - the volume difference between your ears. Your head blocks high frequencies, making sounds louder in the nearer ear.',
    'Harmonicity': 'When sound frequencies are mathematically related (like musical notes). Harmonic sounds are perceived as coming from one source.',
    'Temporal Coherence': 'When sounds change together in synchronized patterns over time. Like instruments playing in rhythm together.',
    'Binaural': 'Relating to both ears. Binaural audio uses the differences between what each ear hears.',
    'Localization': 'The brain\'s process of determining where a sound is coming from in 3D space.',
    'Decorrelation': 'When the left and right audio channels become increasingly different/independent from each other.',
    'HRTF': 'Head-Related Transfer Function - the unique way your head and ears filter sound from different directions, creating spectral "fingerprints" for locations.'
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-gray-900 text-gray-100 rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">Spatial Audio: Cues, Computation, and Concepts</h1>
      
      {/* Navigation */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['hierarchy', 'computational', 'terms'].map(section => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-4 py-2 rounded ${
              activeSection === section 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {section === 'hierarchy' ? 'Cue Hierarchy' : 
             section === 'computational' ? 'Computational Methods' : 'Key Terms'}
          </button>
        ))}
      </div>

      {/* Hierarchy Section */}
      {activeSection === 'hierarchy' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">The Hierarchy: Which Cues Win?</h2>
          <p className="mb-4 text-gray-300">
            When your brain receives conflicting spatial information, it follows this priority order 
            (strongest to weakest):
          </p>
          
          <div className="space-y-3 mb-6">
            {[
              {rank: '1', name: 'Harmonicity', strength: 100, 
               desc: 'Sounds with mathematically related frequencies always fuse. Even if spatial cues conflict, harmonic sounds group together.'},
              {rank: '2', name: 'Common Onset/Offset', strength: 85,
               desc: 'Sounds starting or stopping together (within ~30ms) are perceived as one source.'},
              {rank: '3', name: 'Temporal Coherence', strength: 75,
               desc: 'Sounds modulating together in synchronized patterns group together.'},
              {rank: '4', name: 'Spectrotemporal Continuity', strength: 60,
               desc: 'Smooth frequency changes and continuous patterns maintain source unity.'},
              {rank: '5', name: 'Spatial Consistency', strength: 45,
               desc: 'Sounds from the same location tend to group, but this can be overridden by stronger cues.'},
              {rank: '6', name: 'Binaural Coherence', strength: 30,
               desc: 'Correlation between left/right channels. Alone, this is the weakest grouping cue.'}
            ].map(cue => (
              <div key={cue.rank} className="bg-gray-800 p-4 rounded">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {cue.rank}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{cue.name}</div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        style={{width: `${cue.strength}%`}}
                      />
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-400 ml-11">{cue.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-800 p-4 rounded mb-6">
            <h3 className="font-semibold mb-3 text-blue-300">Fundamental Localization Cues (for position, not grouping)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700 p-3 rounded">
                <div className="font-semibold text-green-400 mb-2">ITD (Timing)</div>
                <ul className="text-sm space-y-1 text-gray-300">
                  <li>• Dominant below 1500 Hz</li>
                  <li>• Detects 10 microsecond differences</li>
                  <li>• Max delay: ~650 microseconds</li>
                  <li>• Used for horizontal positioning</li>
                </ul>
              </div>
              <div className="bg-gray-700 p-3 rounded">
                <div className="font-semibold text-green-400 mb-2">ILD (Volume)</div>
                <ul className="text-sm space-y-1 text-gray-300">
                  <li>• Dominant above 1500 Hz</li>
                  <li>• Up to 20 dB difference at extreme angles</li>
                  <li>• Detects 0.5-1 dB changes</li>
                  <li>• Head shadow creates volume difference</li>
                </ul>
              </div>
            </div>
          </div>

          <svg viewBox="0 0 600 400" className="w-full bg-gray-800 rounded p-4">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa" />
              </marker>
            </defs>
            
            {/* Head circle */}
            <circle cx="300" cy="200" r="60" fill="#374151" stroke="#60a5fa" strokeWidth="2"/>
            
            {/* Ears */}
            <ellipse cx="250" cy="200" rx="15" ry="25" fill="#4b5563" stroke="#60a5fa" strokeWidth="1"/>
            <ellipse cx="350" cy="200" rx="15" ry="25" fill="#4b5563" stroke="#60a5fa" strokeWidth="1"/>
            <text x="250" y="205" textAnchor="middle" fill="#93c5fd" fontSize="12">L</text>
            <text x="350" y="205" textAnchor="middle" fill="#93c5fd" fontSize="12">R</text>
            
            {/* Sound source */}
            <circle cx="150" cy="150" r="20" fill="#3b82f6" opacity="0.8"/>
            <text x="150" y="155" textAnchor="middle" fill="white" fontSize="14">🔊</text>
            
            {/* Sound waves */}
            <path d="M 170 150 Q 210 170 250 190" stroke="#60a5fa" strokeWidth="2" fill="none" 
                  strokeDasharray="5,5" markerEnd="url(#arrowhead)"/>
            <path d="M 170 150 Q 240 140 340 185" stroke="#a78bfa" strokeWidth="2" fill="none" 
                  strokeDasharray="5,5" markerEnd="url(#arrowhead)"/>
            
            {/* Labels */}
            <text x="200" y="170" fill="#60a5fa" fontSize="12">Shorter path</text>
            <text x="240" y="125" fill="#a78bfa" fontSize="12">Longer path</text>
            <text x="380" y="180" fill="#a78bfa" fontSize="11">(arrives later,</text>
            <text x="380" y="195" fill="#a78bfa" fontSize="11">quieter)</text>
            
            {/* Azimuth angle */}
            <path d="M 300 200 L 300 120" stroke="#86efac" strokeWidth="1" strokeDasharray="3,3"/>
            <path d="M 300 200 L 150 150" stroke="#86efac" strokeWidth="1" strokeDasharray="3,3"/>
            <path d="M 300 160 A 40 40 0 0 1 265 135" stroke="#86efac" strokeWidth="2" fill="none"/>
            <text x="270" y="150" fill="#86efac" fontSize="12">azimuth</text>
            
            {/* Elevation indicator */}
            <text x="450" y="120" fill="#fbbf24" fontSize="12">Elevation (up/down)</text>
            <line x1="460" y1="130" x2="460" y2="270" stroke="#fbbf24" strokeWidth="2" 
                  markerEnd="url(#arrowhead)"/>
            <text x="470" y="150" fill="#fbbf24" fontSize="11">+90°</text>
            <text x="470" y="200" fill="#fbbf24" fontSize="11">0°</text>
            <text x="470" y="265" fill="#fbbf24" fontSize="11">-90°</text>
            
            {/* Title */}
            <text x="300" y="30" textAnchor="middle" fill="#93c5fd" fontSize="18" fontWeight="bold">
              ITD and ILD from Sound Source Position
            </text>
          </svg>
        </div>
      )}

      {/* Computational Methods Section */}
      {activeSection === 'computational' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">Computational Methods</h2>
          
          <div className="space-y-6">
            <div className="bg-gray-800 p-4 rounded">
              <h3 className="text-xl font-semibold mb-3 text-purple-400">Localization (Where is it?)</h3>
              <div className="space-y-3">
                <div className="bg-gray-700 p-3 rounded">
                  <div className="font-semibold text-blue-300 mb-2">Method: Analyze ITD and ILD</div>
                  <p className="text-sm text-gray-300 mb-2">
                    Calculate timing and volume differences between stereo channels across frequency bands.
                  </p>
                  <div className="bg-gray-800 p-2 rounded text-xs font-mono">
                    <div>1. Split audio into frequency bands (64-128 channels)</div>
                    <div>2. For each band, measure time delay between L/R peaks</div>
                    <div>3. Measure volume difference between L/R</div>
                    <div>4. Low frequencies (ITD) → azimuth angle</div>
                    <div>5. High frequencies (ILD) → azimuth angle</div>
                    <div>6. Spectral notches → elevation angle</div>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-3 rounded">
                  <div className="font-semibold text-blue-300 mb-2">Method: HRTF Matching</div>
                  <p className="text-sm text-gray-300">
                    Compare the spectral pattern to a database of known direction "fingerprints" to find 
                    elevation and resolve front-back confusion.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded">
              <h3 className="text-xl font-semibold mb-3 text-purple-400">Fusion (One source or many?)</h3>
              <div className="space-y-3">
                <div className="bg-gray-700 p-3 rounded">
                  <div className="font-semibold text-blue-300 mb-2">Method: Harmonicity Detection</div>
                  <p className="text-sm text-gray-300 mb-2">
                    Check if frequencies are mathematically related (2×, 3×, 4× a fundamental frequency).
                  </p>
                  <div className="bg-gray-800 p-2 rounded text-xs font-mono">
                    <div>1. Apply autocorrelation to find repeating patterns</div>
                    <div>2. Identify fundamental frequency and harmonics</div>
                    <div>3. Group channels showing harmonic relationships</div>
                    <div>Result: Harmonic = single source (fusion)</div>
                  </div>
                </div>

                <div className="bg-gray-700 p-3 rounded">
                  <div className="font-semibold text-blue-300 mb-2">Method: Onset/Offset Alignment</div>
                  <p className="text-sm text-gray-300">
                    Detect when sounds start/stop. Events within 30ms of each other likely share a source.
                  </p>
                </div>

                <div className="bg-gray-700 p-3 rounded">
                  <div className="font-semibold text-blue-300 mb-2">Method: Temporal Coherence Analysis</div>
                  <p className="text-sm text-gray-300 mb-2">
                    Track how different frequency bands modulate over time (2-40 Hz envelope patterns).
                  </p>
                  <div className="bg-gray-800 p-2 rounded text-xs font-mono">
                    <div>1. Extract amplitude envelopes from frequency bands</div>
                    <div>2. Compute cross-correlation between band modulations</div>
                    <div>3. Correlation &gt; 0.7 → likely same source</div>
                    <div>4. Correlation &lt; 0.5 → likely different sources</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded">
              <h3 className="text-xl font-semibold mb-3 text-purple-400">Separation (Isolate individual sources)</h3>
              <div className="space-y-3">
                <div className="bg-gray-700 p-3 rounded">
                  <div className="font-semibold text-blue-300 mb-2">Method: Spatial Clustering</div>
                  <p className="text-sm text-gray-300 mb-2">
                    Group time-frequency regions with similar ITD/ILD into separate sources.
                  </p>
                  <div className="bg-gray-800 p-2 rounded text-xs font-mono">
                    <div>1. Create time-frequency representation (spectrogram)</div>
                    <div>2. Calculate ITD/ILD for each time-freq bin</div>
                    <div>3. Cluster bins with similar spatial properties</div>
                    <div>4. Each cluster = one source</div>
                  </div>
                </div>

                <div className="bg-gray-700 p-3 rounded">
                  <div className="font-semibold text-blue-300 mb-2">Method: Ideal Binary Mask</div>
                  <p className="text-sm text-gray-300">
                    For each time-frequency point, assign it to whichever source is loudest there. 
                    Creates a 0/1 mask for each source.
                  </p>
                </div>

                <div className="bg-gray-700 p-3 rounded">
                  <div className="font-semibold text-blue-300 mb-2">Method: Deep Learning</div>
                  <p className="text-sm text-gray-300">
                    Neural networks trained on mixed/separated audio pairs learn to predict masks or 
                    directly output separated waveforms.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded">
              <h3 className="text-xl font-semibold mb-3 text-green-400">Key Computational Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-gray-700 p-3 rounded">
                  <div className="font-semibold mb-1">IACC (Correlation)</div>
                  <div className="text-sm text-gray-300">
                    Measures L/R similarity<br/>
                    &gt;0.7: narrow source<br/>
                    0.3-0.7: normal stereo<br/>
                    &lt;0.3: wide/decorrelated
                  </div>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <div className="font-semibold mb-1">Phase Coherence</div>
                  <div className="text-sm text-gray-300">
                    Tracks timing alignment<br/>
                    &gt;0.6: unified source<br/>
                    &lt;0.3: segregated sources
                  </div>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <div className="font-semibold mb-1">Spectrotemporal Correlation</div>
                  <div className="text-sm text-gray-300">
                    Pattern matching across frequencies<br/>
                    High = coherent modulation = fusion
                  </div>
                </div>
                <div className="bg-gray-700 p-3 rounded">
                  <div className="font-semibold mb-1">Onset Synchrony</div>
                  <div className="text-sm text-gray-300">
                    Time alignment of starts<br/>
                    Within 30ms = grouped<br/>
                    &gt;30ms = separate events
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Terms Section */}
      {activeSection === 'terms' && (
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">Key Terms Explained</h2>
          <p className="mb-4 text-gray-300">Click any term to expand its definition:</p>
          <div className="space-y-2">
            {Object.entries(terms).map(([term, definition]) => (
              <div key={term} className="bg-gray-800 rounded overflow-hidden">
                <button
                  onClick={() => toggleTerm(term)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-700 transition-colors"
                >
                  <span className="font-semibold text-blue-300 text-left">{term}</span>
                  {expandedTerms.has(term) ? (
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
                {expandedTerms.has(term) && (
                  <div className="px-4 pb-4 text-gray-300">
                    {definition}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpatialAudioExplainer;