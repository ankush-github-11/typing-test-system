export const AccuracyAndRawAccuracyCustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const { range, accuracyCount, rawAccuracyCount } = payload[0].payload;
  return (
    <div
      style={{
        minWidth: 70,
        height: 80,
        padding: "0 12px",
        background: "#454545",
        borderRadius: 10,
        boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
        display: "inline-flex",
        flexDirection: "column",
        justifyContent: "center",
        whiteSpace: "nowrap",
        fontSize: 14,
        fontWeight: 600,
        color: "#fff",
        boxSizing: "border-box",
      }}
    >
      <span style={{ fontSize: 13}}>{range}</span>
      <span style={{ fontSize: 16, fontWeight: 600 }}>Tests - {accuracyCount}</span>
      <span style={{ fontSize: 16, fontWeight: 600 }}>Tests - {rawAccuracyCount}</span>
    </div>
  );
};
