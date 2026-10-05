import * as React from "react";

const paragraphs = [
  "Bucking the trend of the mass of digital courses out there, ours are all in-person, 1 on 1 and fully bespoke. We’re here to help build your perfect course, based on exactly what you’d like to know.",
  "We start off with an exploratory call to find out more about you, the skills that you’d like to learn, where you’re keen to develop. From there, we’ll build an itinerary for your days training and get it booked in.",
  "You’ll be trained by one of our team who work day in day out prepping for new projects, filming, photographing and editing for clients ranging from small businesses to some of the largest organisations in the UK. So you’re in great hands!",
];

const TrainingHowItWorks = () => (
  <section className="relative min-h-[779px] overflow-hidden bg-brand-teal text-white">
    <div className="relative mx-auto min-h-[779px] max-w-[1920px] px-[clamp(24px,8vw,150px)] pb-20 pt-24 md:grid md:grid-cols-[minmax(0,1fr)_clamp(110px,11.15vw,214px)] md:items-start md:gap-[clamp(24px,3vw,64px)] lg:pt-[205px] min-[1920px]:block min-[1920px]:px-0">
      <div className="md:min-w-0 min-[1920px]:ml-[309px] min-[1920px]:max-w-[951px]">
        <h2 className="text-[clamp(3.25rem,6.25vw,7.5rem)] font-bold leading-none tracking-[-0.05em]">
          How does it work?
        </h2>

        <div className="mt-16 max-w-[951px] space-y-5 text-base font-medium leading-none tracking-[-0.8px] sm:text-lg lg:mt-[68px] lg:text-[20px] lg:tracking-[-1px]">
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <img
        src="/figma/icons/icon-down.svg"
        alt=""
        aria-hidden="true"
        className="section-two-arrow pointer-events-none mx-auto mt-10 h-auto w-[clamp(110px,22vw,214px)] max-w-none object-contain md:mt-[clamp(150px,11vw,260px)] md:justify-self-end min-[1920px]:absolute min-[1920px]:bottom-auto min-[1920px]:left-auto min-[1920px]:right-[310px] min-[1920px]:top-[288px] min-[1920px]:mt-0"
      />
    </div>
  </section>
);

export default TrainingHowItWorks;
