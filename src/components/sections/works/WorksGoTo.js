import * as React from "react";
import { Link } from "gatsby";

const WorksGoToLink = ({ href, children, linkColorClass = "text-white" }) => {
  const className = "works-intro-link group flex w-full max-w-[410px] items-center gap-3";
  const content = <><img src="/figma/icons/arrows/icon-arrow-2.svg" alt="" aria-hidden="true" className="works-intro-arrow-icon" /><span className={`works-intro-link-label font-extrabold leading-[1.25] tracking-[-0.05em] ${linkColorClass} group-hover:underline`}>{children}</span></>;

  return href.startsWith("/") ? <Link to={href} className={className}>{content}</Link> : <a href={href} className={className}>{content}</a>;
};

const WorksGoTo = ({
  selectedCategory = "",
  headingLines = ["Category:", selectedCategory],
  paragraph = "",
  goToLabel = "",
  links = [],
  linkColorClass = "text-white",
  sectionId,
  panelClassName = "bg-brand-accent-yellow",
}) => (
  <section id={sectionId} className={`relative left-1/2 w-screen -translate-x-1/2 ${panelClassName} px-4 py-24 text-black sm:px-6 md:py-32 lg:px-8 lg:py-40`}>
    <div className="mx-auto grid max-w-layout-shell gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] lg:grid-rows-[auto_auto] lg:gap-x-24 lg:gap-y-16">
      {/* Heading spans across both grid columns */}
      <h2 className="text-[clamp(3.5rem,6vw,7.5rem)] font-extrabold leading-[0.92] tracking-[-0.06em] text-white lg:col-span-2 lg:row-start-1">
        {headingLines.map((line, index) => (
          <React.Fragment key={`${line}-${index}`}>
            {index > 0 && <br />}
            {line}
          </React.Fragment>
        ))}
      </h2>

      {paragraph && (
        <p className="text-xl font-medium leading-[2] tracking-[-0.05em] text-black lg:col-start-1 lg:row-start-2 lg:max-w-[80%] whitespace-pre-line">{paragraph}</p>
      )}

      {links.length > 0 && (
        <div className="lg:col-start-2 lg:row-start-2">
        {goToLabel && (
          <p className="text-xl font-extrabold leading-[1.25] tracking-[-0.05em] text-black">{goToLabel}</p>
        )}
        <div className="mt-8 flex flex-col gap-5">
          {links.map((link, index) => (
            <WorksGoToLink key={`${link.href}-${index}`} href={link.href} linkColorClass={linkColorClass}>
              {link.label}
            </WorksGoToLink>
          ))}
        </div>
        </div>
      )}
    </div>
  </section>
);

export default WorksGoTo;