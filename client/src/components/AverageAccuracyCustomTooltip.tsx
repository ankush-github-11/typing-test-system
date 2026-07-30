export function AverageAccuracyCustomTooltip({
  active,
  payload,
}: any) {
  if (!active || !payload || !payload.length) return null;

  const point = payload[0].payload;

  return (
    <div className="rounded-lg bg-bgcolorless border border-gray p-2 shadow-lg">
      <p className="text-sm font-medium text-textcolor">{point.date}</p>
      <p className="text-sm text-textcolorless flex items-center gap-x-1">
        Average Accuracy:
        <span className="font-semibold text-lg text-color1">
          {point.y}
        </span>
      </p>
    </div>
  );
}