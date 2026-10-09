// Small helpers for reading ACF / WPGraphQL values.

// Image / File fields come back as { node: { mediaItemUrl, altText } }
export const mediaUrl = (media) => media?.node?.mediaItemUrl || media?.node?.sourceUrl || "";
export const mediaAlt = (media, fallback = "") => media?.node?.altText || fallback;

export const chunk = (list = [], size = 1) => {
  const out = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
};

export const slugify = (text = "") =>
  String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// Text Area fields: one paragraph per line (blank lines ignored).
export const splitParagraphs = (text = "") =>
  String(text || "")
    .split(/\r?\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

// Text fields holding a comma-separated list ("Prestige Flowers, The Telegraph").
export const splitList = (text = "") =>
  String(text || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
