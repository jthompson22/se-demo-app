'use client';

import { useState } from 'react';
import FunController from './FunController';
import {
  MatrixRain,
  Fireworks,
  Bubbles,
  Confetti,
  Glitch,
  Spiral,
} from './Animations';

const animations = [MatrixRain, Fireworks, Bubbles, Confetti, Glitch, Spiral];

export default function FunAnimations() {
  const [activeButtons, setActiveButtons] = useState(
    new Array(animations.length).fill(false),
  );

  const handleButtonClick = (index: number) => {
    setActiveButtons((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div>
      <FunController
        activeButtons={activeButtons}
        onButtonClick={handleButtonClick}
      />
      {animations.map((Animation, index) => (
        <Animation key={index} isActive={activeButtons[index]} />
      ))}
    </div>
  );
}
