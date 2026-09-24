import * as React from "react";

const ServicesChecklist = () => {
  const [isSayHelloHovered, setIsSayHelloHovered] = React.useState(false);

  return (
    <section className="relative w-full bg-brand-yellow py-16 text-brand-text-dark sm:py-20 lg:py-24" aria-labelledby="section-six-title">
      <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
        <div className="max-w-[760px] pt-1 sm:pt-2 lg:pt-4">
          <h2 id="section-six-title" className="text-[clamp(2.5rem,5vw,5.2rem)] font-black leading-[0.95] tracking-[-0.06em] text-white">
            <span className="block">Services - <span className="text-brand-teal">Check <span aria-hidden="true">✓</span></span></span>
            <span className="block">Quality - <span className="text-brand-teal">Check <span aria-hidden="true">✓</span></span></span>
            <span className="block">People - <span className="text-brand-teal">Check <span aria-hidden="true">✓</span></span></span>
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 lg:mt-16 lg:gap-12">
          <article>
            <h3 className="mb-3 text-xl font-bold text-brand-text-dark">Proactive</h3>
            <p className="text-sm leading-relaxed text-brand-text-dark/90 sm:text-base">
              We pride ourselves on our quality of service above everything else. We&apos;ve taken the time to build a cracking little team at Pocket, and we make sure that you feel the benefits of working with a dedicated video production company who are there for you, and dedicated to the success of your project.
            </p>
          </article>

          <article>
            <h3 className="mb-3 text-xl font-bold text-brand-text-dark">Nerds for Visuals</h3>
            <p className="text-sm leading-relaxed text-brand-text-dark/90 sm:text-base">
              Lorem ipsum dolor sit amet consectetur. Fermentum ut laoreet nunc at amet. Pretium sed tristique eu erat dui elementum eu duis. Sem posuere congue pellentesque duis in. Nunc id ridiculus mattis ullamcorper in id accumsan eu habitant. Mollis duis eu tellus aliquam viverra. Amet feugiat et habitasse mauris massa iaculis. Id at.
            </p>
          </article>

          <article className="relative">
            <button
              type="button"
              aria-label="Say hello"
              className="group absolute -right-3 bottom-[150%] z-20 flex -translate-y-1/2 items-center justify-center sm:-right-4 lg:-right-6"
              onMouseEnter={() => setIsSayHelloHovered(true)}
              onMouseLeave={() => setIsSayHelloHovered(false)}
            >
              <img
                src={isSayHelloHovered ? "/figma/icons/say-hello-hvr.svg" : "/figma/icons/say-hello.svg"}
                alt="Say hello"
                className="h-24 w-24 object-contain drop-shadow-[0_8px_20px_rgba(24,32,52,0.18)] sm:h-28 sm:w-28 lg:h-32 lg:w-32"
              />
            </button>
            <h3 className="mb-3 text-xl font-bold text-brand-text-dark">Valuable</h3>
            <p className="text-sm leading-relaxed text-brand-text-dark/90 sm:text-base">
              Lorem ipsum dolor sit amet consectetur. Varius tempor id nulla aliquet gravida. Quis at auctor quis lectus velit id parturient bibendum. Amet a erat faucibus enim orci. Praesent magna facilisi erat eget dictumst nulla nunc. Scelerisque cras viverra ipsum at accumsan a. Sed sollicitudin lacinia amet arcu volutpat. Id.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ServicesChecklist;
