import { useEffect, useState } from 'react';

// Starts false, flips true one paint after mount — lets bar-fill widths
// animate from 0 to their real value instead of appearing already full.
export function useRevealed() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setRevealed(true)));
    return () => cancelAnimationFrame(id);
  }, []);

  return revealed;
}
