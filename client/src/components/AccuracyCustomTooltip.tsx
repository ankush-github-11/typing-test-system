export const AccuracyCustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const { range, accuracyCount } = payload[0].payload;
  return (
    <div className="rounded-lg bg-bgcolorless border border-gray py-2 px-3 shadow-lg">
      <p className="text-sm font-medium text-textcolor">{range}</p>
      <p className="text-sm text-textcolorless flex items-center gap-x-1">
        Tests:
        <span className="font-semibold text-lg text-color1">
          {accuracyCount}
        </span>
      </p>
    </div>
  );
};
