import * as React from "react";

const rows = [
  {
    heading: "Yes, you can join us for the shoot!",
    paragraphs: [
      "Crazily, we still hear stories about clients being banned from attending shoots when working with some other agencies or production companies. It just doesn’t make sense to us. We love having clients with us on set, and here’s why… If the shot isn’t as you like, you can tell us and we can change it. As simple as it is brilliant! We can avoid all of those difficult conversations in the edit about “wishing that cup was placed just a bit more to the left…” and just fix it there and then.",
      "The beauty of anything creative is that there’s no right and wrong, just loads of grey between the black and white. Whether something looks right is often perception, and as you’re the client, we’re here to make sure that the work we produce looks right to you.",
      "And who doesn’t like those orgasmic sounds of pleasure when that shot is EXACTLY as you like it? Believe it or not, most creatives suffer with imposter syndrome – we question every one of our own decisions, but take tremendous pride in delivering high quality work. That little noise you make when you like what you see on the screen means the world.",
    ],
    image: "/figma/images/howwork-1.png",
    imageAlt: "Man filming a production shoot with a professional camera",
    reverse: false,
  },
  {
    heading: "If it's right first time, something's wrong",
    paragraphs: [
      "With a million and one ways to edit a video or a still image, the distance between right and wrong gets further apart. One great aspect of working digitally is that you get to move things, delete things, put things back as they were four versions ago, all with relative ease.",
      "We don’t expect you to know whether you’re happy until you’ve seen it, and if you don’t love it, we can change it. Your budget will have included time for review, feedback and for us to deliver updated versions back to you, so the pressure’s off. Unless you’re on a particularly tight deadline, in which case, scrap all of the above, WE NEED TO KNOW NOW :)",
    ],
    image: "/figma/images/howwork-2.png",
    imageAlt: "Two people reviewing creative work together on a laptop",
    reverse: true,
  },
];

/*
 * Images bleed to the viewport edge; text always keeps the shared gutter.
 * lg+: proportional version of the 1920 Figma layout (percentages of a container capped at 1920):
 *   Row 1: 755 image | 136 gap | 741 text | 288 right margin
 *   Row 2: 191 left margin | 816 text | 195 gap | 718 image
 * Below lg: image above its text, edge to edge, text inside the gutter.
 */
const TEXT_GUTTER = "px-[clamp(24px,8vw,150px)] lg:px-0";

const HowWeWorkShoot = () => (
  <section className="relative isolate overflow-hidden bg-brand-bg py-20 text-brand-slate lg:min-h-[1618px] lg:py-[223px]">
    <img src="/figma/icons/2.svg" alt="" aria-hidden="true" className="pointer-events-none absolute left-[35%] top-[2%] -z-10 h-[86%] max-w-[53%] object-contain" />

    <div className="relative mx-auto max-w-[1920px]">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[755fr_741fr] lg:gap-x-[8.333%] lg:pr-[15%]">
        <img
          src={rows[0].image}
          alt={rows[0].imageAlt}
          width="755"
          height="529"
          className="aspect-[755/529] h-auto w-full object-cover"
        />
        <div className={`max-w-[741px] ${TEXT_GUTTER} lg:py-6`}>
          <h2 className="text-[clamp(2rem,2.083vw,2.5rem)] font-extrabold leading-none tracking-[-2px]">{rows[0].heading}</h2>
          <div className="mt-8 space-y-5 text-[20px] font-medium leading-[1.2] tracking-[-1px]">
            {rows[0].paragraphs.map((paragraph) => <p className="text-justify [hyphens:auto]" key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 items-center gap-10 lg:mt-[118px] lg:grid-cols-[816fr_718fr] lg:gap-x-[11.28%] lg:pl-[9.948%]">
        <div className={`order-2 max-w-[816px] ${TEXT_GUTTER} lg:order-1`}>
          <h2 className="text-[clamp(2rem,2.083vw,2.5rem)] font-extrabold leading-none tracking-[-2px]">{rows[1].heading}</h2>
          <div className="mt-8 space-y-5 text-[20px] font-medium leading-[1.2] tracking-[-1px]">
            {rows[1].paragraphs.map((paragraph) => <p className="text-justify [hyphens:auto]" key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
        <img
          src={rows[1].image}
          alt={rows[1].imageAlt}
          width="718"
          height="529"
          className="order-1 aspect-[718/529] h-auto w-full object-cover lg:order-2"
        />
      </div>
    </div>
  </section>
);

export default HowWeWorkShoot;
