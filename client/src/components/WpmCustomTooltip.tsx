interface WpmCustomTooltipProps {
  active?: boolean;
  payload?: any[];
  maxWpmCount: number;
}

export const WpmCustomTooltip = ({
  active,
  payload,
  maxWpmCount,
}: WpmCustomTooltipProps) => {
  if (!active || !payload?.length) return null;

  const { range, wpmCount } = payload[0].payload;

  return (
    <div className="rounded-lg bg-bgcolorless border border-gray py-2 px-3 shadow-lg">
      <p className="text-sm font-medium text-textcolor">{range}</p>

      <p className="text-sm text-textcolorless flex items-center gap-x-1">
        Tests:
        <span
          className={`font-semibold text-lg ${
            wpmCount === maxWpmCount ? "text-color2" : "text-color1"
          }`}
        >
          {wpmCount}
        </span>
      </p>
    </div>
  );
};