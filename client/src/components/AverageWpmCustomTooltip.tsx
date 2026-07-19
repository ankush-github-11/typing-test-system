export function AverageWpmCustomTooltip({
  active,
  payload,
}: any) {
  if (!active || !payload || !payload.length) return null;

  const point = payload[0].payload;

  return (
    <div className="rounded-lg bg-bgcolorless border border-gray-700 p-3 shadow-lg">
      <p className="text-sm font-medium text-textcolor">{point.date}</p>

      <p className="text-sm text-textcolorless mt-1">
        Average WPM:{" "}
        <span className="font-semibold text-[#C607F3]">
          {point.y}
        </span>
      </p>
    </div>
  );
}