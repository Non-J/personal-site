import { FC, useEffect, useRef, useState } from 'react';
import { nonNullable } from 'next/dist/lib/non-nullable';
import { Space } from '@babylonjs/core';

type ColorTriplet = [number, number, number];
const CIELAB_A = [-86.185, 98.254];
const CIELAB_B = [-107.863, 94.482];

const cielab2rgb = (lab: ColorTriplet): ColorTriplet => {
  let y = (lab[0] + 16) / 116;
  let x = lab[1] / 500 + y;
  let z = y - lab[2] / 200;

  x = 0.95047 * ((x * x * x > 0.008856) ? x * x * x : (x - 16 / 116) / 7.787);
  // noinspection PointlessArithmeticExpressionJS
  y = 1.00000 * ((y * y * y > 0.008856) ? y * y * y : (y - 16 / 116) / 7.787);
  z = 1.08883 * ((z * z * z > 0.008856) ? z * z * z : (z - 16 / 116) / 7.787);

  let r = x * 3.2406 + y * -1.5372 + z * -0.4986;
  let g = x * -0.9689 + y * 1.8758 + z * 0.0415;
  let b = x * 0.0557 + y * -0.2040 + z * 1.0570;

  r = (r > 0.0031308) ? (1.055 * Math.pow(r, 1 / 2.4) - 0.055) : 12.92 * r;
  g = (g > 0.0031308) ? (1.055 * Math.pow(g, 1 / 2.4) - 0.055) : 12.92 * g;
  b = (b > 0.0031308) ? (1.055 * Math.pow(b, 1 / 2.4) - 0.055) : 12.92 * b;

  return [Math.max(0, Math.min(1, r)) * 255,
    Math.max(0, Math.min(1, g)) * 255,
    Math.max(0, Math.min(1, b)) * 255];
};

const easeInOutExpo = (x: number): number => {
  if (x === 0) {
    return 0;
  }
  if (x === 1) {
    return 1;
  }
  if (x < 0.5) {
    return Math.pow(2, 20 * x - 10) / 2;
  } else {
    return (2 - Math.pow(2, -20 * x + 10)) / 2;
  }
};

class SpaceWalker {
  minValue: number;
  maxValue: number;
  startValue!: number;
  stopValue: number;
  duration!: number;
  current!: number;

  constructor(minValue: number, maxValue: number) {
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.stopValue = easeInOutExpo(Math.random()) * (this.maxValue - this.minValue) + this.minValue;
    this.next();
  }

  isDone(): boolean {
    return this.current >= this.duration;
  }

  step(time: number) {
    this.current = Math.min(this.current + time, this.duration);
  }

  value(): number {
    return (this.current / this.duration) * (this.stopValue - this.startValue) + this.startValue;
  }

  next() {
    this.startValue = this.stopValue;
    this.stopValue = easeInOutExpo(Math.random()) * (this.maxValue - this.minValue) + this.minValue;
    this.duration = Math.random() * 2000 + 5000;
    this.current = 0;
  }
}

const ColoredBackground: FC<any> = (props: any) => {
  const [color, setColor] = useState<string>('');

  const animationRequestRef = useRef<number>();
  const prevTimeRef = useRef<number>();
  const colorSpaceWalkerA = useRef<SpaceWalker>(new SpaceWalker(CIELAB_A[0], CIELAB_A[1]));
  const colorSpaceWalkerB = useRef<SpaceWalker>(new SpaceWalker(CIELAB_B[0], CIELAB_B[1]));

  const animateColor = (time: number) => {
    if (prevTimeRef.current !== undefined) {
      const delta = time - prevTimeRef.current;
      colorSpaceWalkerA.current.step(delta);
      colorSpaceWalkerB.current.step(delta);

      const rgb = cielab2rgb([100, colorSpaceWalkerA.current.value(), colorSpaceWalkerB.current.value()]);
      setColor(`rgb(${rgb[0].toFixed(0)}, ${rgb[1].toFixed(0)}, ${rgb[2].toFixed(0)})`);

      if (colorSpaceWalkerA.current.isDone()) {
        colorSpaceWalkerA.current.next();
      }
      if (colorSpaceWalkerB.current.isDone()) {
        colorSpaceWalkerB.current.next();
      }
    }
    prevTimeRef.current = time;
    animationRequestRef.current = requestAnimationFrame(animateColor);
  };

  useEffect(() => {
    animationRequestRef.current = requestAnimationFrame(animateColor);
    return (() => {
      if (typeof animationRequestRef.current === 'number') {
        cancelAnimationFrame(animationRequestRef.current);
      }
    });
  }, []);

  return (<>
    <div style={{ backgroundColor: color }} {...props} />
  </>);
};

export default ColoredBackground;
