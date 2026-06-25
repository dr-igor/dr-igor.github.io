<div>
  <h3 class="mb-4 text-2xl font-semibold text-blue-300">Computational Methods</h3>

  <div class="space-y-6">
    <div class="rounded bg-gray-800 p-4">
      <h4 class="mb-3 text-xl font-semibold text-purple-400">
        Localization (Where is it?)
      </h4>
      <div class="space-y-3">
        <div class="rounded bg-gray-700 p-3">
          <div class="mb-2 font-semibold text-blue-300">
            Method: Analyze ITD and ILD
          </div>
          <p class="mb-2 text-sm text-gray-300">
            Calculate timing and volume differences between stereo channels across
            frequency bands.
          </p>
          <div class="rounded bg-gray-800 p-2 font-mono text-xs">
            <div>1. Split audio into frequency bands (64-128 channels)</div>
            <div>2. For each band, measure time delay between L/R peaks</div>
            <div>3. Measure volume difference between L/R</div>
            <div>4. Low frequencies (ITD) → azimuth angle</div>
            <div>5. High frequencies (ILD) → azimuth angle</div>
            <div>6. Spectral notches → elevation angle</div>
          </div>
        </div>

        <div class="rounded bg-gray-700 p-3">
          <div class="mb-2 font-semibold text-blue-300">Method: HRTF Matching</div>
          <p class="text-sm text-gray-300">
            Compare the spectral pattern to a database of known direction "fingerprints"
            to find elevation and resolve front-back confusion.
          </p>
        </div>
      </div>
    </div>

    <div class="rounded bg-gray-800 p-4">
      <h4 class="mb-3 text-xl font-semibold text-purple-400">
        Fusion (One source or many?)
      </h4>
      <div class="space-y-3">
        <div class="rounded bg-gray-700 p-3">
          <div class="mb-2 font-semibold text-blue-300">
            Method: Harmonicity Detection
          </div>
          <p class="mb-2 text-sm text-gray-300">
            Check if frequencies are mathematically related (2×, 3×, 4× a fundamental
            frequency).
          </p>
          <div class="rounded bg-gray-800 p-2 font-mono text-xs">
            <div>1. Apply autocorrelation to find repeating patterns</div>
            <div>2. Identify fundamental frequency and harmonics</div>
            <div>3. Group channels showing harmonic relationships</div>
            <div>Result: Harmonic = single source (fusion)</div>
          </div>
        </div>

        <div class="rounded bg-gray-700 p-3">
          <div class="mb-2 font-semibold text-blue-300">
            Method: Onset/Offset Alignment
          </div>
          <p class="text-sm text-gray-300">
            Detect when sounds start/stop. Events within 30ms of each other likely share
            a source.
          </p>
        </div>

        <div class="rounded bg-gray-700 p-3">
          <div class="mb-2 font-semibold text-blue-300">
            Method: Temporal Coherence Analysis
          </div>
          <p class="mb-2 text-sm text-gray-300">
            Track how different frequency bands modulate over time (2-40 Hz envelope
            patterns).
          </p>
          <div class="rounded bg-gray-800 p-2 font-mono text-xs">
            <div>1. Extract amplitude envelopes from frequency bands</div>
            <div>2. Compute cross-correlation between band modulations</div>
            <div>3. Correlation &gt; 0.7 → likely same source</div>
            <div>4. Correlation &lt; 0.5 → likely different sources</div>
          </div>
        </div>
      </div>
    </div>

    <div class="rounded bg-gray-800 p-4">
      <h4 class="mb-3 text-xl font-semibold text-purple-400">
        Separation (Isolate individual sources)
      </h4>
      <div class="space-y-3">
        <div class="rounded bg-gray-700 p-3">
          <div class="mb-2 font-semibold text-blue-300">Method: Spatial Clustering</div>
          <p class="mb-2 text-sm text-gray-300">
            Group time-frequency regions with similar ITD/ILD into separate sources.
          </p>
          <div class="rounded bg-gray-800 p-2 font-mono text-xs">
            <div>1. Create time-frequency representation (spectrogram)</div>
            <div>2. Calculate ITD/ILD for each time-freq bin</div>
            <div>3. Cluster bins with similar spatial properties</div>
            <div>4. Each cluster = one source</div>
          </div>
        </div>

        <div class="rounded bg-gray-700 p-3">
          <div class="mb-2 font-semibold text-blue-300">Method: Ideal Binary Mask</div>
          <p class="text-sm text-gray-300">
            For each time-frequency point, assign it to whichever source is loudest
            there. Creates a 0/1 mask for each source.
          </p>
        </div>

        <div class="rounded bg-gray-700 p-3">
          <div class="mb-2 font-semibold text-blue-300">Method: Deep Learning</div>
          <p class="text-sm text-gray-300">
            Neural networks trained on mixed/separated audio pairs learn to predict
            masks or directly output separated waveforms.
          </p>
        </div>
      </div>
    </div>

    <div class="rounded bg-gray-800 p-4">
      <h4 class="mb-3 text-xl font-semibold text-green-400">
        Key Computational Metrics
      </h4>
      <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div class="rounded bg-gray-700 p-3">
          <div class="mb-1 font-semibold">IACC (Correlation)</div>
          <div class="text-sm text-gray-300">
            Measures L/R similarity<br />
            &gt;0.7: narrow source<br />
            0.3-0.7: normal stereo<br />
            &lt;0.3: wide/decorrelated
          </div>
        </div>
        <div class="rounded bg-gray-700 p-3">
          <div class="mb-1 font-semibold">Phase Coherence</div>
          <div class="text-sm text-gray-300">
            Tracks timing alignment<br />
            &gt;0.6: unified source<br />
            &lt;0.3: segregated sources
          </div>
        </div>
        <div class="rounded bg-gray-700 p-3">
          <div class="mb-1 font-semibold">Spectrotemporal Correlation</div>
          <div class="text-sm text-gray-300">
            Pattern matching across frequencies<br />
            High = coherent modulation = fusion
          </div>
        </div>
        <div class="rounded bg-gray-700 p-3">
          <div class="mb-1 font-semibold">Onset Synchrony</div>
          <div class="text-sm text-gray-300">
            Time alignment of starts<br />
            Within 30ms = grouped<br />
            &gt;30ms = separate events
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
