import React, { useEffect, useMemo } from 'react';

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

function getWeight(label: string): number {
  if (label === 'Space') return 5;
  if (['Tab', 'Caps', 'Shift', 'Enter', 'Backspace'].includes(label)) return 1.5;
  if (label.length > 4) return 1.25;
  return 1;
}

const SCAN_DURATION = 7; // seconds for one full right -> left sweep

export const BgKeyboard: React.FC = () => {
  useEffect(() => {
    const cycle = () => {
      const chosenRows = pickUniqueRandoms(rows.length, 3);
      const chosen = new Set<string>();

      chosenRows.forEach((r) => {
        const validIndices = rows[r]
          .map((label, index) => ({ label, index }))
          .filter(({ label }) => !excludedLabels.has(label));

        if (validIndices.length === 0) return;

        const { index } =
          validIndices[Math.floor(Math.random() * validIndices.length)];
        chosen.add(`${r}-${index}`);
      });
    };

    cycle();
    const iv = setInterval(cycle, 5000);
    return () => clearInterval(iv);
  }, []);

  const keyDelays = useMemo(() => {
    return rows.map((row) => {
      const weights = row.map(getWeight);
      const total = weights.reduce((a, b) => a + b, 0);
      let cumulative = 0;
      return row.map((_, i) => {
        const w = weights[i];
        const center = cumulative + w / 2;
        cumulative += w;
        const fraction = center / total;
        return (1 - fraction) * SCAN_DURATION;
      });
    });
  }, []);

  return (
    <div className="hidden lg:block z-0 relative -top-[170px] h-fit w-full px-[7vw] mx-auto bg-bgcolor rounded-lg overflow-hidden">
      {rows.map((row, ri) => (
        <div key={ri} className="flex w-full space-x-2 mb-2">
          {row.map((label, ki) => {
            const id = `${ri}-${ki}`;
            const delay = keyDelays[ri][ki];

            const base =
              "key-scan-cell relative h-15 border-2 border-gray-200 dark:border-gray-800 text-lightgray rounded-lg flex items-center justify-center select-none";
            const size =
              label === "Space"
                ? "flex-[5]"
                : ["Tab", "Caps", "Shift", "Enter", "Backspace"].includes(label)
                  ? "flex-[1.5]"
                  : label.length > 4
                    ? "flex-[1.25]"
                    : "flex-1";

            return (
              <div
                key={id}
                className={`${base} ${size}`}
                style={
                  {
                    "--scan-delay": `${delay}s`,
                  } as React.CSSProperties
                }
              >
                {label}
              </div>
            );
          })}
        </div>
      ))}

      <style>{`
        .key-scan-cell {
          animation: key-scan-color ${SCAN_DURATION}s linear infinite;
          animation-delay: var(--scan-delay);
        }

        .key-scan-cell::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          pointer-events: none;
          border: 2px solid transparent;
          animation: key-scan-glow ${SCAN_DURATION}s linear infinite;
          animation-delay: var(--scan-delay);
        }

        @keyframes key-scan-glow {
          0% {
            border-color: transparent;
          }
          15% {
            border-color: rgba(198, 7, 243, 0.35);
          }
          100% {
            border-color: transparent;
          }
        }

        @keyframes key-scan-color {
          0% {
            color: var(--color-lightgray);
          }
          15% {
            color: rgba(198, 7, 243, 0.35);
          }
          100% {
            color: var(--color-lightgray);
          }
        }
      `}</style>
    </div>
  );
};