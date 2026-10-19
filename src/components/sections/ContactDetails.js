import * as React from "react";
import { Link } from "gatsby";
import { splitParagraphs } from "../../utils/acf";

// Page-builder layout: "contact_details"
// Fields: detail_items (Repeater: icon [Select: phone / location / email], text [Text Area, one line per row],
//         link [Text, optional: tel:..., mailto:..., a path or a full URL])
// Icons are the static SVGs below (full literals so the build keeps them). Internal paths use Gatsby Link
// (gotcha 33); tel:/mailto:/URLs use a plain <a>.
const icons = {
  phone: { src: "/figma/icons/contact-phone.svg", alt: "Phone" },
  location: { src: "/figma/icons/contact-location.svg", alt: "Location" },
  // contact-email.svg is a bare envelope without the yellow circle, so it is framed here.
  // If you export the Figma email icon WITH the circle, replace the file and delete `framed: true`.
  email: { src: "/figma/icons/contact-email.svg", alt: "Email", framed: true },
};

const iconSize = "h-[clamp(72px,7.22vw,104px)] w-[clamp(72px,7.22vw,104px)] shrink-0";

const firstValue = (value) => (Array.isArray(value) ? value[0] : value);
const isInternal = (href = "") => href.startsWith("/") && !href.startsWith("//");

const textClassName = "flex min-w-0 flex-col";

const ContactDetails = ({ detailItems = [] }) => {
  const items = (detailItems || [])
    .map((item) => ({
      icon: icons[String(firstValue(item?.icon) || "").toLowerCase()],
      lines: splitParagraphs(item?.text),
      link: item?.link || "",
    }))
    .filter((item) => item.lines.length);

  if (!items.length) return null;

  return (
    <section className="bg-brand-bg px-6 pb-9 pt-[95px] sm:px-10 lg:px-[clamp(24px,2.5vw,48px)]">
      <div className="mx-auto max-w-[1443px]">
        <address className="flex flex-col gap-8 not-italic md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-10 md:gap-y-8 lg:flex-nowrap">
          {items.map(({ icon, lines, link }, index) => {
            const content = lines.map((line, lineIndex) => <span key={`${line}-${lineIndex}`}>{line}</span>);

            return (
              <div
                key={`${lines[0]}-${index}`}
                className="flex items-center gap-[clamp(16px,2.3vw,33px)] text-xl font-extrabold leading-[1.2] tracking-[-1px] text-brand-slate md:shrink-0 lg:min-w-0 lg:shrink"
              >
                {icon &&
                  (icon.framed ? (
                    <span className={`flex items-center justify-center rounded-full bg-brand-accent-yellow ${iconSize}`}>
                      <img src={icon.src} alt={icon.alt} className="h-auto w-[48%]" />
                    </span>
                  ) : (
                    <img src={icon.src} alt={icon.alt} className={iconSize} />
                  ))}
                {link ? (
                  isInternal(link) ? (
                    <Link to={link} className={`${textClassName} hover:underline`}>
                      {content}
                    </Link>
                  ) : (
                    <a href={link} className={`${textClassName} hover:underline`}>
                      {content}
                    </a>
                  )
                ) : (
                  <div className={textClassName}>{content}</div>
                )}
              </div>
            );
          })}
        </address>
      </div>
    </section>
  );
};

export default ContactDetails;