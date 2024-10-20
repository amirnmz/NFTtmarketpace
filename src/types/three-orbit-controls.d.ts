declare module 'three/examples/jsm/controls/OrbitControls' {
    import { Camera, EventDispatcher, MOUSE, Object3D, TOUCH } from 'three';
  
    export interface OrbitControlsOptions {
      enabled?: boolean;
      target?: THREE.Vector3;
      minDistance?: number;
      maxDistance?: number;
      minPolarAngle?: number;
      maxPolarAngle?: number;
      minAzimuthAngle?: number;
      maxAzimuthAngle?: number;
      mouseButtons?: {
        LEFT: MOUSE;
        MIDDLE: MOUSE;
        RIGHT: MOUSE;
      };
      touches?: {
        ONE: TOUCH;
        TWO: TOUCH;
      };
    }
  
    export class OrbitControls extends EventDispatcher {
      constructor(object: Camera, domElement: HTMLElement);
      object: Camera;
      domElement: HTMLElement;
      enabled: boolean;
      target: THREE.Vector3;
      minDistance: number;
      maxDistance: number;
      minPolarAngle: number;
      maxPolarAngle: number;
      minAzimuthAngle: number;
      maxAzimuthAngle: number;
      mouseButtons: {
        LEFT: MOUSE;
        MIDDLE: MOUSE;
        RIGHT: MOUSE;
      };
      touches: {
        ONE: TOUCH;
        TWO: TOUCH;
      };
      update(): void;
      dispose(): void;
    }
  }
  