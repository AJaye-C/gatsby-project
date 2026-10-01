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
  <div className="space-y-6 text-xl font-medium leading-[1.23] tracking-[-1px] text-white lg:text-[20px]">
    {paragraphs.map((paragraph) => (
      <p key={paragraph}>{paragraph}</p>
    ))}
  </div>
);

const PricingExplainer = () => (
  <section className="overflow-hidden bg-brand-teal text-white">
    <div className="mx-auto min-h-[1052px] max-w-[1290px] px-6 py-16 sm:px-10 md:py-20 lg:px-0 lg:py-[105px]">
      <div>
        <h2 className="flex h-auto min-h-[128px] w-full max-w-[849px] items-center justify-center bg-brand-accent-yellow px-6 py-4 text-center text-5xl font-bold leading-[1.23] tracking-[-2px] text-black sm:text-6xl lg:h-[128px] lg:px-[23px] lg:py-0 lg:text-[80px] lg:tracking-[-4px]">
          Cheap or Expensive?
        </h2>
        <div className="mt-8 max-w-[1234px] lg:mt-10">
          <ExplainerCopy paragraphs={firstParagraphs} />
        </div>
      </div>

      <div className="mt-14 lg:ml-[387px] lg:mt-[39px]">
        <h2 className="flex h-auto min-h-[128px] w-full max-w-[847px] items-center justify-center bg-brand-accent-yellow px-6 py-4 text-center text-5xl font-bold leading-[1.23] tracking-[-2px] text-black sm:text-6xl lg:h-[128px] lg:px-[23px] lg:py-0 lg:text-[80px] lg:tracking-[-4px]">
          So how does it work?
        </h2>
        <div className="mt-8 max-w-[1205px] lg:ml-[-358px] lg:mt-10">
          <ExplainerCopy paragraphs={secondParagraphs} />
        </div>
      </div>
    </div>
  </section>
);

export default PricingExplainer;