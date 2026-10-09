import * as React from "react";
import ClientLogos from "./ClientLogos";
import RichText from "./RichText";
import { chunk, mediaAlt, mediaUrl } from "../../utils/acf";

const LOGOS_PER_SLIDE = 9; // 3 x 3 grid

// Page-builder layout: "client_logos"
// fields: heading (WYSIWYG), subheading, paragraph, logos (repeater: name, logo)
const ClientLogosSection = ({ heading, subheading, paragraph, logos }) => {
  const slides = React.useMemo(() => {
    const items = (logos || [])
      .map((item) => ({
        name: item.name,
        src: mediaUrl(item.logo),
        alt: mediaAlt(item.logo, item.name ? `${item.name} logo` : ""),
      }))
      .filter((item) => item.src);
    return chunk(items, LOGOS_PER_SLIDE);
  }, [logos]);

  return (
    <div className="mx-auto max-w-layout-shell overflow-x-clip px-4 pb-10 sm:px-6 sm:pb-14 lg:px-8">
      <div className="mx-auto grid min-w-0 grid-cols-1 items-center justify-center gap-8 md:gap-12 xl:grid-cols-[1fr_1fr]">
        <div className="mx-auto max-w-copy-narrow pt-2 pr-0 xl:mx-0 xl:justify-self-center xl:pr-4">
          <RichText as="p" html={heading} weight="bold" className="text-section-kicker font-medium text-brand-slate" />
          {subheading && <p className="mt-5 text-section-accent font-black text-brand-cyan">{subheading}</p>}
          {paragraph && (
            <p className="mt-4 max-w-copy-medium whitespace-pre-line text-body-copy text-brand-body-muted">{paragraph}</p>
          )}
        </div>

        <ClientLogos slides={slides} />
      </div>
    </div>
  );
};

export default ClientLogosSection;
