import * as React from "react";

const placeholderCopy = "Lorem ipsum dolor sit amet consectetur. Nulla purus rhoncus at mattis. Et ac vitae ornare volutpat. Mollis sem scelerisque dictum nunc iaculis vivamus donec. Molestie sed mattis aenean sit arcu ipsum amet vulputate tellus. Blandit pellentesque magna egestas eget rhoncus tincidunt. In ultrices velit et velit morbi vitae dolor fames. Rhoncus.";

const WorksGoToLink = ({ href, children, linkColorClass = "text-white" }) => (
  <a href={href} className="works-intro-link group flex w-full max-w-[410px] items-center gap-3">
    <img src="/figma/icons/icon-arrow-2.svg" alt="" aria-hidden="true" className="works-intro-arrow-icon" />
    <span className={`works-intro-link-label font-extrabold leading-[1.25] tracking-[-0.05em] ${linkColorClass} group-hover:underline`}>
      {children}
    </span>
  </a>
);

const WorksGoTo = ({
  selectedCategory = "Beauty",
  headingLines = ["Category:", selectedCategory],
  paragraph = placeholderCopy,
  links = [
    { label: `More ${selectedCategory} Videography`, href: "/works/#works-videography" },
    { label: `More ${selectedCategory} Photography`, href: "/works/#works-photography" },
  ],
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

      {/* Paragraph stays in the left column (row 2)[cite: 1] */}
      <p className="text-xl font-medium leading-[2] tracking-[-0.05em] text-black lg:col-start-1 lg:row-start-2 lg:max-w-[80%]">
        {paragraph}
      </p>

      {/* Go to links stay in the right column (row 2)[cite: 1] */}
      <div className="lg:col-start-2 lg:row-start-2">
        <p className="text-xl font-extrabold leading-[1.25] tracking-[-0.05em] text-black">Go to...</p>
        <div className="mt-8 flex flex-col gap-5">
          {links.map((link) => (
            <WorksGoToLink key={link.href} href={link.href} linkColorClass={linkColorClass}>
              {link.label}
            </WorksGoToLink>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default WorksGoTo;