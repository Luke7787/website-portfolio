declare module "vanta/dist/vanta.birds.min" {
  interface VantaBirdsOptions {
    el: HTMLElement;
    THREE?: unknown;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    backgroundColor?: number;
    color1?: number;
    color2?: number;
    birdSize?: number;
    wingSpan?: number;
    speedLimit?: number;
    separation?: number;
    alignment?: number;
    cohesion?: number;
  }
  interface VantaEffect {
    destroy: () => void;
  }
  function BIRDS(options: VantaBirdsOptions): VantaEffect;
  export default BIRDS;
}
