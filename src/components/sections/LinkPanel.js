import * as React from "react";
import { Link } from "gatsby";
import { splitParagraphs } from "../../utils/acf";

// Full class strings so Tailwind can see them.
const panelColors = {
  yellow: "bg-brand-accent-yellow",
  teal: "bg-brand-teal",
};

const PanelLink = ({ href, children }) => {
  const className = "works-intro-link group flex w-full max-w-[410px] items-center gap-3";
  const content = (
    <>
      <img src="/figma/icons/icon-arrow-2.svg" alt="" aria-hidden="true" className="works-intro-arrow-icon" />
      <span className="works-intro-link-label font-extrabold leading-[1.25] tracking-[-0.05em] text-white group-hover:underline">
        {children}
      </span>
    </>
  );

  return href.startsWith("/") ? (
    <Link to={href} className={className}>{content}</Link>
  ) : (
    <a href={href} className={className}>{content}</a>
  );
};

// Page-builder layout: "link_panel"
// Fields: anchor_id, heading (Text Area, one line per row), text (Text Area), panel_color (Select: yellow | teal),
//         go_to_label, panel_links (Repeater: label, href)  -> queried as `links`
const LinkPanel = ({ anchorId, heading, text, panelColor, goToLabel, links = [] }) => {
  const color = Array.isArray(panelColor) ? panelColor[0] : panelColor;
  const panelClass = panelColors[color] || panelColors.yellow;
  const headingLines = splitParagraphs(heading);
  const paragraphs = splitParagraphs(text);
  const linkRows = (links || []).filter((link) => link?.label && link?.href);

  return (
    <section
      id={anchorId || undefined}
      className={`relative left-1/2 w-screen -translate-x-1/2 ${panelClass} px-4 py-24 text-black sm:px-6 md:py-32 lg:px-8 lg:py-40`}
    >
      <div className="mx-auto grid max-w-layout-shell gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] lg:grid-rows-[auto_auto] lg:gap-x-24 lg:gap-y-16">
        {headingLines.length > 0 && (
          <h2 className="text-[clamp(3.5rem,6vw,7.5rem)] font-extrabold leading-[0.92] tracking-[-0.06em] text-white lg:col-span-2 lg:row-start-1">
            {headingLines.map((line, index) => (
              <React.Fragment key={`${line}-${index}`}>
                {index > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
          </h2>
        )}

        {paragraphs.length > 0 && (
          <div className="space-y-6 text-xl font-medium leading-[2] tracking-[-0.05em] text-black lg:col-start-1 lg:row-start-2 lg:max-w-[80%]">
            {paragraphs.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        )}

        {linkRows.length > 0 && (
          <div className="lg:col-start-2 lg:row-start-2">
            <p className="text-xl font-extrabold leading-[1.25] tracking-[-0.05em] text-black">
              {goToLabel || "Go to..."}
            </p>
            <div className="mt-8 flex flex-col gap-5">
              {linkRows.map((link, index) => (
                <PanelLink key={`${link.href}-${index}`} href={link.href}>
                  {link.label}
                </PanelLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LinkPanel;
