import * as React from "react";

const firstParagraphs = [
  "To give you some context, we aim to be in the middle band in terms of our pricing structure, which means that our typical daily rates for photography and video production will sit in between those agencies who work at the very upper end of our industry, with individual freelancers at the lower end of the pricing range.",
  "It's important to note that we're not talking about quality here, just price. We're often chosen ahead of the largest of our competitors as we can deliver great quality photography and video production services for a lower price. This is because we run an efficient setup, with less overheads and no bloat.",
];

const secondParagraphs = [
  "Our setup also makes us attractive to start-ups, those who are crowdfunding, and businesses who still need great photography and video production, but are working within tighter budgets.",
  "We do this by using modular pricing – knowing that each photography and video production project is different, you pay for just what you need.",
  "While some clients may need just an hour of photography to capture some simple pack shots for a new addition to their range, others may need a multiple camera setup for a TV advert to showcase their brand to the world. We have the ability to quote easily for both ends of that spectrum.",
  "If you already have a total budget available, share that with us and we can work out how to deliver as much as possible for what you have to spend.",
];

const ExplainerCopy = ({ paragraphs }) => (
  <div className="space-y-5 text-lg font-medium leading-snug tracking-[-0.5px] text-white sm:text-xl sm:tracking-[-1px] xl:space-y-6 xl:text-[20px] xl:leading-[1.23]">
    {paragraphs.map((paragraph) => (
      <p key={paragraph}>{paragraph}</p>
    ))}
  </div>
);

const headingClass =
  "flex w-full items-center justify-center bg-brand-accent-yellow px-4 py-4 text-center text-[clamp(1.875rem,8.5vw,4rem)] font-bold leading-[1.15] tracking-[-0.04em] text-black sm:px-6 xl:h-[128px] xl:px-[23px] xl:py-0 xl:text-[80px] xl:leading-[1.23] xl:tracking-[-4px]";

/* The staggered layout needs ~1290px, so it starts at xl; below that the blocks stack. */
const PricingExplainer = () => (
  <section className="overflow-hidden bg-brand-teal text-white">
    <div className="mx-auto max-w-[1290px] px-6 py-14 sm:px-10 md:py-20 xl:min-h-[1052px] xl:px-0 xl:py-[105px]">
      <div>
        <h2 className={`${headingClass} max-w-[849px]`}>Cheap or Expensive?</h2>
        <div className="mt-6 max-w-[1234px] sm:mt-8 xl:mt-10">
          <ExplainerCopy paragraphs={firstParagraphs} />
        </div>
      </div>

      <div className="mt-12 md:mt-14 xl:ml-[387px] xl:mt-[39px]">
        <h2 className={`${headingClass} max-w-[847px]`}>So how does it work?</h2>
        <div className="mt-6 max-w-[1205px] sm:mt-8 xl:ml-[-358px] xl:mt-10">
          <ExplainerCopy paragraphs={secondParagraphs} />
        </div>
      </div>
    </div>
  </section>
);

export default PricingExplainer;
