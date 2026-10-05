import * as React from "react";

const accordionItems = [
  {
    title: "It starts by understanding",
    paragraphs: [
      "You’ll have to forgive us, but we ask a lot of questions at the start. There’s a good reason for this, stay with me…",
      "Our initial consultation is designed to get what’s in your head into ours. The more that we understand your brand and the context around your project, the better we can offer our expertise and tailor it to your needs. There are no templates here or off the shelf packages that 396 clients have bought before you, we’re responding to your individual requirements.",
    ],
  },
  {
    title: "It's not all about the money",
    paragraphs: [
      "Crazily, we still hear stories about clients being banned from attending shoots when working with some other agencies or production companies. It just doesn’t make sense to us. We love having clients with us on set, and here’s why… If the shot isn’t as you like, you can tell us and we can change it. As simple as it is brilliant! We can avoid all of those difficult conversations in the edit about “wishing that cup was placed just a bit more to the left…” and just fix it there and then.",
      "The beauty of anything creative is that there’s no right and wrong, just loads of grey between the black and white. Whether something looks right is often perception, and as you’re the client, we’re here to make sure that the work we produce looks right to you.",
      "And who doesn’t like those orgasmic sounds of pleasure when that shot is EXACTLY as you like it? Believe it or not, most creatives suffer with imposter syndrome – we question every one of our own decisions, but take tremendous pride in delivering high quality work. That little noise you make when you like what you see on the screen means the world.",
    ],
  },
  {
    title: "Planning is the most important stage",
    paragraphs: [
      "With a million and one ways to edit a video or a still image, the distance between right and wrong gets further apart. One great aspect of working digitally is that you get to move things, delete things, put things back as they were four versions ago, all with relative ease.",
      "We don’t expect you to know whether you’re happy until you’ve seen it, and if you don’t love it, we can change it. Your budget will have included time for review, feedback and for us to deliver updated versions back to you, so the pressure’s off. Unless you’re on a particularly tight deadline, in which case, scrap all of the above, WE NEED TO KNOW NOW :)",
    ],
  },
];

const ALLOW_ZERO_OPEN = true;

const HowWeWorkAccordion = () => {
  const [openIndex, setOpenIndex] = React.useState(0);

  return (
    <section className="relative isolate overflow-hidden bg-brand-teal px-[clamp(24px,5vw,96px)] py-24 text-white lg:min-h-[929px] lg:py-[265px]">
      <img src="/figma/icons/1.svg" alt="" aria-hidden="true" className="pointer-events-none absolute left-[clamp(24px,11vw,213px)] top-1/2 -z-10 h-[85%] max-w-[30%] -translate-y-1/2 object-contain opacity-50" />

      <div className="relative mx-auto max-w-[1100px]">
        {accordionItems.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `how-we-work-panel-${index}`;
          const headingId = `how-we-work-heading-${index}`;

          return (
            <div key={item.title} className={`${index ? "mt-8 lg:mt-[43px]" : ""}`}>
              <h2 className="m-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  id={headingId}
                  onClick={() => setOpenIndex((current) => (current === index && ALLOW_ZERO_OPEN ? null : index))}
                  className={`group flex w-full items-center justify-between gap-6 text-left text-[clamp(2.5rem,4.167vw,5rem)] font-bold leading-none tracking-[-1.6px] transition-colors duration-300 ease-in-out motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent-yellow focus-visible:ring-offset-4 focus-visible:ring-offset-brand-teal ${isOpen ? "bg-brand-accent-yellow px-8 py-[18px] text-black" : "px-0 py-0 text-white"}`}
                >
                  <span>{item.title}</span>
                  <img
                    src={isOpen ? "/figma/icons/icon-arrow-up.svg" : "/figma/icons/icon-down.svg"}
                    alt=""
                    aria-hidden="true"
                    className="h-auto w-[30px] shrink-0"
                  />
                </button>
              </h2>

              <div
                id={panelId}
                role="region"
                aria-labelledby={headingId}
                inert={isOpen ? undefined : ""}
                className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="min-h-0">
                  <div className="space-y-5 pt-7 text-[20px] font-medium leading-[1.2] tracking-[-0.4px] text-white">
                    {item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowWeWorkAccordion;
