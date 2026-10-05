import * as React from "react";
import { Link } from "gatsby";

const HowWeWorkIntro = () => (
  <section className="bg-brand-bg px-[clamp(24px,8vw,150px)] pb-20 pt-[128px] lg:min-h-[826px] lg:pb-[clamp(72px,8vw,120px)] lg:pt-[172px] min-[1920px]:px-0 min-[1920px]:pb-0">
    <div className="mx-auto grid max-w-[1510px] grid-cols-1 gap-14 lg:items-center xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] xl:gap-[5vw] min-[1920px]:grid-cols-[minmax(0,598px)_minmax(0,794px)] min-[1920px]:gap-[70px]">
      <div className="lg:pt-[123px]">
        <h1 className="max-w-[598px] text-[clamp(2.5rem,2.083vw,2.5rem)] font-extrabold leading-[1.24] tracking-[-2px] text-brand-slate">
          <span className="font-normal">Looking for a </span>
          <span className="font-extrabold text-brand-teal">team with a proven approach</span>
          <span className="font-normal"> to creating great video and photography? </span>
          <span className="font-extrabold">Then this is for you.</span>
        </h1>

        <p className="mt-[68px] max-w-[598px] text-[20px] font-medium leading-[1.3] tracking-[-1px] text-brand-slate">
          Why deliver boring and uninspiring content when visuals can be exciting, engaging and can work harder to really impact your audience.
        </p>

        <Link
          to="/training/"
          className="group mx-auto mt-[68px] flex h-[48px] w-[199px] items-center gap-[7px] rounded-[16px] bg-brand-accent-yellow px-[13px] py-3 text-[18px] font-medium leading-none tracking-[-0.36px] text-black shadow-talk transition-colors duration-200 hover:bg-brand-teal hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 lg:mx-0"
        >
          <img
            src="/figma/icons/contact-email.svg"
            alt=""
            aria-hidden="true"
            className="h-6 w-6 transition duration-200 group-hover:brightness-0 group-hover:invert"
          />
          <span>Have questions?</span>
        </Link>
      </div>

      <div className="flex flex-col gap-[27px]">
        <article className="relative min-h-[266px] bg-brand-teal px-[75px] pb-8 pt-[25px] text-white">
          <div className="flex items-center gap-[12px]">
            <img src="/figma/icons/stairs.svg" alt="" aria-hidden="true" className="h-[77px] w-[87px] shrink-0" />
            <h2 className="text-[clamp(3.5rem,4.167vw,5rem)] font-bold leading-[1.26] tracking-[-4px]">How we work</h2>
          </div>
          <p className="mt-[27px] max-w-[647px] text-[20px] font-medium leading-[1.26] tracking-[-1px]">
            It’s as important to understand how a company works, as it is to see the quality of their end results. The way that we go about running our projects and constructing our service plays a big part in deciding whether we get to work together.
          </p>
        </article>

        <article className="relative min-h-[278px] bg-brand-accent-yellow px-[75px] pb-8 pt-[37px] text-black">
          <div className="flex items-center gap-[16px]">
            <img src="/figma/icons/flag.svg" alt="" aria-hidden="true" className="h-[79px] w-[69px] shrink-0" />
            <h2 className="max-w-[500px] text-[clamp(2rem,2.083vw,2.5rem)] font-bold leading-[1.26] tracking-[-2px]">
              A successful project starts<br />with great service
            </h2>
          </div>
          <p className="mt-[25px] max-w-[647px] text-[20px] font-medium leading-[1.26] tracking-[-1px]">
            Our current process is based on years of experience and learning: reflecting on the times that we got it wrong, doing more of what we get right and constantly reviewing and refining. Every decision that’s formed our creative approach is based on one of these factors.
          </p>
        </article>
      </div>
    </div>
  </section>
);

export default HowWeWorkIntro;
