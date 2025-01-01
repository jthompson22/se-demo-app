'use client';

interface FunControllerProps {
  activeButtons: boolean[];
  onButtonClick: (index: number) => void;
}

const Button = ({ color, onClick }: { color: string; onClick: () => void }) => (
  <button
    className={`w-6 h-6 rounded-full ${color} border border-gray-800 shadow-inner shadow-black/50 active:shadow-none active:translate-y-px transition-all duration-100`}
    onClick={onClick}
  />
);

export default function FunController({
  activeButtons,
  onButtonClick,
}: FunControllerProps) {
  return (
    <div className="bg-gradient-to-r from-purple-800 to-indigo-900 p-1.5 rounded-lg shadow-xl w-60 h-20 border-t-2 border-l-2 border-purple-600 flex flex-col">
      <div className="bg-black p-1 rounded-md mb-1 text-center flex-shrink-0">
        <div className="text-green-400 font-mono text-[8px]">
          Fun Controller
        </div>
        <div className="text-red-500 font-mono text-[8px]">
          {activeButtons.includes(true)
            ? `Button ${activeButtons.indexOf(true) + 1} Active`
            : 'Ready'}
        </div>
      </div>
      <div className="flex justify-between items-center flex-grow px-2">
        {activeButtons.map((isActive, index) => (
          <Button
            key={index}
            color={isActive ? 'bg-red-500' : 'bg-gray-300'}
            onClick={() => onButtonClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
