import * as React from "react";

const reasons = [
  {
    title: "We care about how it feels",
    body: "Good content matters—but so does the experience. From first chat to final edit, we keep things easy, honest, and collaborative. We listen, we guide, and we make sure the process feels smooth from start to finish.",
  },
  {
    title: "We work around you",
    body: "Every client's different, so we don't approach projects the same way. We're flexible with pricing, clear about costs, and always happy to find smart ways to make your budget go further.",
  },
  {
    title: "We make visuals that speak",
    body: "We don't just shoot pretty pictures. We tell stories. We use styling, locations, and talent to help your brand stand out and feel real. We want to help you surpass expectations and achieve more than simply keeping up with your competition.",
  },
  {
    title: "It's all about service",
    body: "This is a hard industry to develop USPs in – established video and photography companies deliver content to a professional standard these days, and in all shapes and sizes. We take the above as a given and know that we have to deliver quality that goes beyond your budget, but more importantly, we know that you're more likely to come back if we provide a great service and if you've enjoyed the experience.",
  },
  {
    title: "At the right price",
    body: "Every client has different spending power. Every business has a need for video and photography, and living in an increasingly visual world there's a greater reliance than ever on communicating through visual media. We'll give you a budget breakdown and will work with you to manage your budget in an honest and transparent way. Very often we can make a modest pot go further than you'd think!",
  },
  {
    title: "For everybody",
    body: "We're privileged to have built this company through providing video and photography for both small businesses and startups through to some of the largest companies in the UK, it's our goal to stay competitive and offer a service that's tailored to fit YOU.\n\nQuality content creation shouldn't just be for those with the greatest spending power – and our modular pricing model means that we can cater for everybody.",
  },
];

const Arrow = ({ direction }) => (
  <svg viewBox="0 0 32 32" aria-hidden="true" className={direction === "previous" ? "rotate-180" : ""}>
    <rect className="arrow-bg" x="0" y="0" width="32" height="32" rx="16" />
    <path d="M8 15C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17V16V15ZM24.7071 16.7071C25.0976 16.3166 25.0976 15.6835 24.7071 15.2929L18.3431 8.92893C17.9526 8.53841 17.3195 8.53841 16.9289 8.92893C16.5384 9.31946 16.5384 9.95262 16.9289 10.3431L22.5858 16L16.9289 21.6569C16.5384 22.0474 16.5384 22.6805 16.9289 23.0711C17.3195 23.4616 17.9526 23.4616 18.3431 23.0711L24.7071 16.7071ZM8 16V17H24V16V15H8V16Z" fill="black" />
  </svg>
);

const WhyUs = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(3);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const total = reasons.length;

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  return (
    <section className="w-full overflow-hidden bg-brand-accent-yellow pb-16 md:pb-24 lg:pb-[146px]">
      <div className="mx-auto max-w-[1488px] px-4 pt-16 sm:px-6 md:pt-20 lg:px-8 lg:pt-[101px]">
        <h2 className="text-[clamp(3.2rem,6.25vw,7.5rem)] font-extrabold leading-[0.98] tracking-[-0.05em] text-white">
          Why work with us?
        </h2>

        <p className="mt-8 max-w-[880px] text-base leading-[1.55] tracking-[-0.02em] text-black sm:text-lg xl:max-w-[960px]">
          We make content that feels real and works hard. You get a team that listens, adapts, and delivers with care, creativity, and no fuss. We&apos;re here to help you stand out without making things complicated.
        </p>

        {/* Teal Panel Container */}
        <div className="relative mt-12 md:mt-16 lg:mt-[90px]">
          <div className="w-[200vw] -mr-[100vw] bg-brand-teal px-4 pt-10 pb-12 sm:px-8 md:pt-12 md:pb-16 lg:px-12 lg:pt-14 lg:pb-20 xl:px-16">
            <div className="w-full max-w-[1420px] overflow-hidden">
              
              {/* Sliding Track */}
              <div
                className="flex min-h-[380px] sm:min-h-[340px] lg:min-h-[320px] transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${activeIndex * (100 / itemsPerPage)}%)`,
                }}
              >
                {reasons.map((reason) => (
                  <article
                    key={reason.title}
                    className="flex-shrink-0 min-w-0 pr-6 sm:pr-10 md:pr-12"
                    style={{
                      width: `${100 / itemsPerPage}%`,
                    }}
                  >
                    {/* Inner content box bounded on mobile to prevent edge clipping */}
                    <div className="w-full max-w-[calc(100vw-56px)] sm:max-w-none">
                      <h3 className="text-[1.5rem] font-bold leading-[1.1] tracking-[-0.04em] text-white md:text-[1.7rem] xl:text-[1.85rem]">
                        {reason.title}
                      </h3>
                      <div className="mt-4 text-[0.98rem] font-medium leading-[1.35] tracking-[-0.03em] text-[#E6E6E6] sm:text-[1.05rem] xl:text-[1.125rem] whitespace-pre-line">
                        {reason.body}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Navigation Controls */}
              <div className="mt-6 flex items-center gap-3">
                <button
                  type="button"
                  aria-label="Previous Reason"
                  onClick={goToPrevious}
                  className="section-three-nav flex h-9 w-9 items-center justify-center md:h-11 md:w-11"
                >
                  <Arrow direction="previous" />
                </button>
                <button
                  type="button"
                  aria-label="Next Reason"
                  onClick={goToNext}
                  className="section-three-nav flex h-9 w-9 items-center justify-center md:h-11 md:w-11"
                >
                  <Arrow direction="next" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;