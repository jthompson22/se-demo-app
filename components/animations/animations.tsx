import React from 'react';

interface AnimationProps {
  isActive: boolean;
}

export const MatrixRain: React.FC<AnimationProps> = ({ isActive }) => {
  if (!isActive) return null;
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute text-green-500 text-2xl animate-matrix-fall"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            top: '-20px',
          }}
        >
          {Math.random() > 0.5 ? '0' : '1'}
        </div>
      ))}
    </div>
  );
};

export const Fireworks: React.FC<AnimationProps> = ({ isActive }) => {
  if (!isActive) return null;
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-firework"
          style={{
            left: `${50 + (Math.random() - 0.5) * 60}%`,
            top: `${50 + (Math.random() - 0.5) * 60}%`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

export const Bubbles: React.FC<AnimationProps> = ({ isActive }) => {
  if (!isActive) return null;
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="absolute w-4 h-4 bg-blue-400 rounded-full animate-bubble opacity-70"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${4 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

export const Confetti: React.FC<AnimationProps> = ({ isActive }) => {
  if (!isActive) return null;
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 animate-confetti"
          style={{
            backgroundColor: [
              '#ff0000',
              '#00ff00',
              '#0000ff',
              '#ffff00',
              '#ff00ff',
            ][Math.floor(Math.random() * 5)],
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

export const Glitch: React.FC<AnimationProps> = ({ isActive }) => {
  if (!isActive) return null;
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50 flex items-center justify-center">
      <div className="text-4xl font-bold text-white animate-glitch">GLITCH</div>
    </div>
  );
};

export const Spiral: React.FC<AnimationProps> = ({ isActive }) => {
  if (!isActive) return null;
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-50 flex items-center justify-center">
      <div className="w-40 h-40 border-8 border-purple-500 rounded-full animate-spiral" />
    </div>
  );
};
