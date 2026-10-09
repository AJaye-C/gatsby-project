import * as React from "react";

// Emoji / glyphs WordPress (or an editor) may swap in for typed characters.
const SMILEY_GLYPHS = /(?:🙂|😊|😀|😃|😄|☺️?|🙂️)/g;
const HEART_GLYPHS = /(?:&#(?:10084|x2764);(?:&#xfe0f;|&#65039;)?|&hearts;|❤️?|♥️?)/gi;

// WordPress turns ":)" into <img class="wp-smiley" alt=":)"> and unicode emoji
// into <img class="emoji" alt="😊">. Put the alt text back so we control rendering.
const unwrapEmojiImages = (html) =>
  html.replace(/<img\b[^>]*>/gi, (tag) => {
    if (!/class=["'][^"']*(wp-smiley|emoji)[^"']*["']/i.test(tag)) return tag;
    const alt = tag.match(/\balt=["']([^"']*)["']/i);
    return alt ? alt[1] : "";
  });

// WordPress wraps WYSIWYG output in <p> tags, which are invalid inside headings.
// Strip the outer <p>, turn paragraph breaks into line breaks, and normalise
// the heart (always red) and smiley (always plain text ":)").
export const cleanWpHtml = (html = "") =>
  unwrapEmojiImages(html || "")
    .trim()
    .replace(/^<p>/i, "")
    .replace(/<\/p>$/i, "")
    .replace(/<\/p>\s*<p>/gi, "<br /><br />")
    .replace(SMILEY_GLYPHS, ":)")
    // \uFE0E forces the text glyph so the red colour is applied, not the system emoji colour
    .replace(HEART_GLYPHS, '<span class="text-red-500">&#10084;&#xFE0E;</span>');


// For fields that should be PLAIN text but may arrive as WordPress HTML
// (e.g. a WYSIWYG editor saved "<p>Services &#8211; <strong>Check</strong></p>").
// Strips tags and decodes entities (works during SSR, no DOM needed).
export const wpPlainText = (html = "") =>
  (html || "")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]*>/g, "")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

// Splits "Services - Check ✓" (hyphen, en dash or em dash) into label + teal part.
export const splitChecklistLine = (html = "") => {
  const text = wpPlainText(html);
  const match = text.match(/^(.*?)\s+[-\u2013\u2014]\s+(.*)$/);
  return match ? { label: match[1], accent: match[2] } : { label: text, accent: "" };
};

// Editor convention: Bold = teal, Italic = yellow (italic is not shown slanted).
// Weight of the highlighted words differs per section, so it is a prop:
//   weight="black" (default) -> Quality, Pricing, Behind the Scenes, etc.
//   weight="bold"            -> Hero and Client Logos
// (full class strings so Tailwind can see them)
const accentClasses = {
  black:
    "[&_strong]:font-black [&_strong]:text-brand-teal [&_em]:font-black [&_em]:not-italic [&_em]:text-brand-yellow",
  bold:
    "[&_strong]:font-bold [&_strong]:text-brand-teal [&_em]:font-bold [&_em]:not-italic [&_em]:text-brand-yellow",
};

const RichText = ({ as: Tag = "span", html, className = "", weight = "black" }) => (
  <Tag
    className={`${accentClasses[weight] || accentClasses.black} ${className}`}
    dangerouslySetInnerHTML={{ __html: cleanWpHtml(html) }}
  />
);

export default RichText;