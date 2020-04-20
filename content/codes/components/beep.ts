// ============================================================================
// Audio Utilities
// (c) Mathigon
// ============================================================================


const ctx = new AudioContext();
export type Beep = {stop: () => void; osc: OscillatorNode};

export function beep(duration = 0): Beep {
  // TODO Prevent multiple beeps from running at once.

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.05);

  osc.type = 'sine';
  osc.start(0);

  const stop = () => {
    // TODO Fix 'click' when stopping...
    gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.05);
    osc.stop(ctx.currentTime + 0.05);
  };

  if (duration) setTimeout(stop, duration - 0.1);

  return {stop, osc};
}
