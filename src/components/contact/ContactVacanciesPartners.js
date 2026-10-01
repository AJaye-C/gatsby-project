import * as React from "react";

const vacanciesImage = "/figma/images/contact-vacancies-2x.png";
const partnersImage = "/figma/images/contact-partners-2x.png";
const worksBadge = "/figma/icons/our-works.svg";
const worksBadgeHover = "/figma/icons/our-works-hvr.svg";

const chipClassName =
  "mt-[26px] inline-flex bg-brand-teal px-[15px] py-[8px] text-xl font-extrabold leading-[1.2] tracking-[-1px] text-white";

const ContactVacanciesPartners = () => (
  <section className="relative overflow-hidden bg-brand-accent-yellow text-black">
    <div className="mx-auto flex max-w-[1920px] flex-col gap-16 px-6 py-16 sm:px-10 md:px-16 xl:gap-0 xl:p-0 xl:pb-[4.3vw] xl:pt-[7.08vw] min-[1920px]:pb-[83px] min-[1920px]:pt-[136px]">
      {/* Vacancies */}
      <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:gap-0 xl:pl-[12.45%]">
        <img
          src={vacanciesImage}
          alt="Three people sitting on a teal sofa in front of a brick wall"
          width="731"
          height="415"
          className="h-auto w-full max-w-[731px] object-cover xl:aspect-[731/415] xl:w-[38.07vw] xl:shrink-0"
        />
        <div className="xl:ml-[5.26vw] xl:mt-[3.18vw] xl:w-[clamp(300px,22.76vw,437px)] xl:shrink-0 min-[1920px]:ml-[101px] min-[1920px]:mt-[61px]">
          <h2 className="text-4xl font-extrabold leading-none tracking-[-2px]">Vacancies</h2>
          <p className="mt-[40px] text-xl font-medium leading-[1.2] tracking-[-1px]">
            At our video and photography agency we always want to hear from great people and create regular opportunities. Feel free to send us your information to the address below:
          </p>
          <div className={chipClassName}>
            jobs@pocketcreatives.co.uk
          </div>
        </div>
      </div>

      {/* Partners */}
      <div className="flex flex-col gap-10 xl:mt-[7.2vw] xl:flex-row xl:items-start xl:gap-0 xl:pl-[19.11%] min-[1920px]:mt-[138px]">
        <div className="order-2 xl:order-1 xl:w-[clamp(336px,19.83vw,380.832px)] xl:shrink-0">
          <h2 className="text-4xl font-extrabold leading-none tracking-[-2px]">Partners</h2>
          <p className="mt-[58px] text-xl font-medium leading-[1.2] tracking-[-1px]">
            Our video and photography agency also has links to some excellent partners who work in other creative industries. If you think you&apos;d make a good Pocket Partner, mail us below:
          </p>
          <div className={chipClassName}>
            partners@pocketcreatives.co.uk
          </div>
        </div>

        <div className="relative order-1 ml-auto w-full max-w-[804.591px] xl:order-2 xl:ml-[clamp(48px,6.59vw,126.578px)] xl:w-[41.9vw] xl:shrink-0">
          <img
            src={partnersImage}
            alt="Logos of brands and partners Pocket Creatives works with"
            width="805"
            height="415"
            className="h-auto w-full object-cover xl:aspect-[805/415]"
          />
          <a
            href="/works/"
            aria-label="See our works"
            className="group absolute -right-[36px] -top-[76px] z-10 h-[125px] w-[125px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            <img src={worksBadge} alt="" className="absolute inset-0 h-full w-full group-hover:hidden" />
            <img src={worksBadgeHover} alt="" className="absolute inset-0 hidden h-full w-full group-hover:block" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default ContactVacanciesPartners;