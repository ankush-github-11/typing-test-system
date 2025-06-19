import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/useTheme';

const rows: string[][] = [
  ['Esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'Home', 'End', 'Del'],
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
  ['Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'Enter'],
  ['Shift', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift'],
  ['Ctrl', 'Win', 'Alt', 'Space', 'AltGr', 'Fn', 'Ctrl', '←', '↑', '↓', '→', 'PgUp', 'PgDn']
];

const excludedLabels = new Set([
  'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11',
  '4', '5', '6', '7', '8', '9', '0',
  'T', 'Y', 'U',
  'G', 'H', 'J',
  'B', 'N',
  'Space', 'AltGr', 'Fn'
]);

function pickUniqueRandoms(max: number, n: number): number[] {
  const indices: number[] = [];
  while (indices.length < n) {
    const rand = Math.floor(Math.random() * max);
    if (!indices.includes(rand)) indices.push(rand);
  }
  return indices;
}

export const BgKeyboard: React.FC = () => {
  const { isDark } = useTheme();
  const [current, setCurrent] = useState<Set<string>>(new Set());

  useEffect(() => {
    const cycle = () => {
      const chosenRows = pickUniqueRandoms(rows.length, 3);
      const chosen = new Set<string>();

      chosenRows.forEach(r => {
        const validIndices = rows[r]
          .map((label, index) => ({ label, index }))
          .filter(({ label }) => !excludedLabels.has(label));

        if (validIndices.length === 0) return;

        const { index } = validIndices[Math.floor(Math.random() * validIndices.length)];
        chosen.add(`${r}-${index}`);
      });

      setCurrent(chosen);
    };

    cycle();
    const iv = setInterval(cycle, 5000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div
      data-theme={isDark ? 'dark' : ''}
      className="hidden lg:block z-0 relative top-[-600px] h-fit w-[90vw] mx-auto bg-bgcolor rounded-lg"
    >
      {rows.map((row, ri) => (
        <div key={ri} className="flex w-full space-x-2 mb-2">
          {row.map((label, ki) => {
            const id = `${ri}-${ki}`;
            const isCurr = current.has(id);

            const base =
              'h-15 border-2 border-gray-200 dark:border-gray-800 text-gray-200 dark:text-gray-700 rounded-lg flex items-center justify-center select-none';
            const size =
              label === 'Space'
                ? 'flex-[5]'
                : ['Tab', 'Caps', 'Shift', 'Enter', 'Backspace'].includes(label)
                ? 'flex-[1.5]'
                : label.length > 4
                ? 'flex-[1.25]'
                : 'flex-1';

            const highlightClass = 'bg-gray-400 dark:bg-gray-400 !border-0 text-white font-normal animate-glow';
            const defaultClass = 'bg-bgcolor';

            return (
              <div
                key={id}
                className={`${base} ${size} ${isCurr ? highlightClass : defaultClass}`}
              >
                {label}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
