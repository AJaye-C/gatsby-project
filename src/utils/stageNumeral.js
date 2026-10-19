// Select value "1" | "2" | "3" (a plain string or a one-item list) -> the faint background numeral SVG.
// Empty or unknown = no watermark.
export const stageNumeralSrc = (value) => {
  const selected = String(Array.isArray(value) ? value[0] ?? "" : value ?? "");
  return ["1", "2", "3"].includes(selected) ? `/figma/icons/${selected}.svg` : "";
};
