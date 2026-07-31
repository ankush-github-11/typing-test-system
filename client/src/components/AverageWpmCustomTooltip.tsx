interface AverageWpmCustomTooltipProps {
  active?: boolean;
  payload?: any[];
  maxAverageWpmCount: number;
}

export function AverageWpmCustomTooltip({
  active,
  payload,
  maxAverageWpmCount,
}: AverageWpmCustomTooltipProps) {
  if (!active || !payload?.length) return null;

  const point = payload[0].payload;

  return (
    <div className="rounded-lg bg-bgcolorless border border-gray py-2 px-3 shadow-lg">
      <p className="text-sm font-medium text-textcolor">{point.date}</p>

      <p className="text-sm text-textcolorless flex items-center gap-x-1">
        Average WPM:
        <span
          className={`font-semibold text-lg ${
            point.y === maxAverageWpmCount
              ? "text-color2"
              : "text-color1"
          }`}
        >
          {point.y}
        </span>
      </p>
    </div>
  );
}