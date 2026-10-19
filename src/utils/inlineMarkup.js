import * as React from "react";
import { Link } from "gatsby";

const isInternal = (href = "") => href.startsWith("/") && !href.startsWith("//");

// "[label](href)" -> link, "**text**" -> bold. Everything else stays plain text.
export const renderInlineMarkup = (text = "", linkClassName = "", boldClassName = "font-bold") => {
  const source = String(text || "");
  const pattern = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
  const nodes = [];
  let last = 0;
  let match;

  while ((match = pattern.exec(source)) !== null) {
    if (match.index > last) nodes.push(source.slice(last, match.index));

    if (match[1]) {
      const [, label, href] = match;
      nodes.push(
        isInternal(href) ? (
          <Link key={match.index} to={href} className={linkClassName}>{label}</Link>
        ) : (
          <a key={match.index} href={href} className={linkClassName}>{label}</a>
        )
      );
    } else {
      nodes.push(<strong key={match.index} className={boldClassName}>{match[3]}</strong>);
    }

    last = pattern.lastIndex;
  }

  if (last < source.length) nodes.push(source.slice(last));
  return nodes;
};