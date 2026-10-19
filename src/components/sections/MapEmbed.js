import * as React from "react";

// Page-builder layout: "map_embed"
// Fields: embed_url (Text: the Google Maps "Embed a map" src URL, or the whole <iframe ...> code Google gives you),
//         title (Text: accessible title of the map)
// Only Google Maps embed addresses are accepted, so editors cannot point the iframe at an arbitrary site.
const extractSrc = (value = "") => {
  const text = String(value || "").trim();
  const fromIframe = text.match(/src=["']([^"']+)["']/i);
  return (fromIframe ? fromIframe[1] : text).replace(/&amp;/g, "&").trim();
};

const isGoogleMapsEmbed = (src) =>
  /^https:\/\/(www\.google\.com\/maps\/|maps\.google\.com\/)/i.test(src);

const MapEmbed = ({ embedUrl = "", title = "" }) => {
  const src = extractSrc(embedUrl);

  if (!src) return null;

  if (!isGoogleMapsEmbed(src)) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn("[MapEmbed] embed_url must be a Google Maps embed address (https://www.google.com/maps/embed?...)");
    }
    return null;
  }

  return (
    <section className="bg-brand-bg px-6 pb-20 sm:px-10 md:pb-24 lg:px-[clamp(24px,2.5vw,48px)] lg:pb-[100px]">
      <div className="mx-auto max-w-[1443px]">
        <div className="h-[min(809px,56.18vw)] min-h-[360px] w-full overflow-hidden">
          <iframe
            title={title || "Location map"}
            src={src}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </section>
  );
};

export default MapEmbed;
