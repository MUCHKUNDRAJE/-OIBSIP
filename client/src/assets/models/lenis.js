import Lenis from '@studio-freight/lenis';

export const initializeLenis = () => {
  const lenis = new Lenis({
    duration: 1.2, 
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical', 
    smooth: true, 
    smoothTouch: false, 
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return lenis;
};
