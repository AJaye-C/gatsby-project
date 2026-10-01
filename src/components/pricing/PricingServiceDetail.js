import * as React from "react";

const pricingCopy = [
  {
    lead: "Video production",
    leadHref: "/services/",
    text: " is a more complex process compared with photography, both in planning, production and the fact that the edit time will span days rather than hours, as it does it photography.",
  },
  {
    text: "Similarly to a photo shoot, you'll need to think about the location: from studio spaces to Airbnbs for lifestyle work, and the consideration for sound as well.",
  },
  {
    text: "We may need a bigger team, if lighting, sound, or set requirements are needed. Additional equipment such as autocues, specialist lighting and microphones, cameras dedicated to slow motion may also be considered for more creative briefs.",
  },
  {
    text: "Actors and presenters, hair and makeup, set elements, props and materials, even fashion stylists, food stylists may required too.",
  },
  {
    text: "Editing often needs multiple days to complete, and we'll best estimate this for you, allowing for time to feed back and make changes. We can also include music, sound effects and voiceover.",
  },
  {
    lead: "Pocket Creatives",
    leadHref: "/",
    text: " team will always provide a full breakdown when we quote for you, which then makes it easier to see what resources your project needs to get made.",
  },
  {
    text: "To give you a general idea, a full day of filming with us starts at ",
    emphasis: "£940+VAT.",
  },
];

const arrowClassName = "h-4 w-4 object-contain";

const DetailCopy = ({ textColor }) => (
  <div className={`w-full max-w-[646.235px] text-xl font-medium leading-none tracking-[-1px] ${textColor}`}>
    {pricingCopy.map(({ lead, leadHref, text, emphasis }, index) => (
      <p key={`${text}-${index}`} className="mb-5 last:mb-0">
        {lead && (
          <a href={leadHref} className="font-bold underline decoration-solid underline-offset-2">
            {lead}
          </a>
        )}
        {text}
        {emphasis && <strong className="font-bold">{emphasis}</strong>}
      </p>
    ))}
  </div>
);

const ToggleButton = ({ variant, onClick, controls, children, label, arrow, flip = false }) => {
  const isPhotography = variant === "photography";

  return (
    <button
      type="button"
      aria-label={label}
      aria-controls={controls}
      onClick={onClick}
      className={`group relative z-10 flex size-[clamp(130px,9.21875vw,177px)] shrink-0 flex-col items-center justify-center rounded-full text-center text-xl font-bold leading-none tracking-[-1px] shadow-[0_4px_10px_rgba(0,0,0,0.2)] transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 motion-reduce:transition-none ${
        isPhotography
          ? "bg-brand-accent-yellow text-black hover:bg-brand-teal hover:text-white"
          : "bg-brand-teal text-white hover:bg-brand-accent-yellow hover:text-black"
      }`}
    >
      <span>{children}</span>
      <img
        src={arrow}
        alt=""
        aria-hidden="true"
        className={`${arrowClassName} mt-3 transition-[filter] duration-200 group-hover:brightness-0 group-hover:invert ${
          flip ? "scale-x-[-1]" : ""
        }`}
      />
    </button>
  );
};

const PricingPanel = ({ panelId, variant, onToggle, headingRef, isActive }) => {
  const isPhotography = variant === "photography";
  const textColor = isPhotography ? "text-white" : "text-black";

  return (
    <article
      id={panelId}
      aria-hidden={!isActive}
      inert={!isActive ? "" : undefined}
      tabIndex={isActive ? 0 : -1}
      className={`flex min-h-[976px] w-1/2 min-w-0 basis-1/2 shrink-0 items-stretch overflow-hidden ${
        isPhotography ? "bg-brand-teal" : "bg-brand-accent-yellow"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1444px] flex-col px-6 pb-16 pt-24 sm:px-10 md:px-14 xl:px-[clamp(24px,2.5vw,48px)] xl:pt-[142px]">
        <h2
          ref={headingRef}
          tabIndex={-1}
          className={`w-full whitespace-normal text-[clamp(3.25rem,6.25vw,7.5rem)] font-bold leading-none tracking-[-0.05em] outline-none xl:whitespace-nowrap xl:text-[120px] xl:tracking-[-6px] ${textColor} ${
            isPhotography ? "xl:pl-[calc(clamp(130px,9.21875vw,177px)_+_46px)]" : ""
          }`}
        >
          {isPhotography ? "Photography..." : "Video Production..."}
        </h2>

        <div className={`mt-10 flex flex-1 flex-col items-start xl:mt-[53px] xl:flex-row`}>
          {isPhotography && (
            <div className="order-3 mt-10 xl:order-1 xl:mr-[45.99px] xl:mt-[138px]">
              <ToggleButton
                variant="photography"
                onClick={onToggle}
                controls="pricing-video-panel"
                label="Show video production details"
                arrow="/figma/icons/pricing-arrow-left.svg"
                flip={true}
              >
                <span className="block">Video</span>
                <span className="block">Production</span>
              </ToggleButton>
            </div>
          )}

          <div className="order-1 flex w-full flex-col items-start xl:order-2 xl:w-auto xl:min-w-0 xl:shrink xl:flex-row">
            <img
              src={
                isPhotography
                  ? "/figma/images/pricing-photography-2x.png"
                  : "/figma/images/pricing-video-production-2x.png"
              }
              alt={
                isPhotography
                  ? "Photographer adjusting a camera in front of a seated model in a yellow-backdrop studio"
                  : "Camera monitor showing a video shoot in progress"
              }
              width="490"
              height="490"
              loading="eager"
              className="aspect-square h-auto w-full max-w-[490px] object-cover xl:w-[min(490px,34vw)] xl:shrink-0"
            />
            <div className="mt-8 w-full xl:ml-[23.77px] xl:mt-0 xl:w-[646px] xl:min-w-0 xl:shrink">
              <DetailCopy textColor={textColor} />
            </div>
          </div>

          {!isPhotography && (
            <div className="order-3 mt-10 xl:ml-[41px] xl:mt-[137px]">
              <ToggleButton
                variant="video"
                onClick={onToggle}
                controls="pricing-photography-panel"
                label="Show photography details"
                arrow="/figma/icons/pricing-arrow-left.svg"
                flip={false}
              >
                Photography
              </ToggleButton>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

const PricingServiceDetail = () => {
  const [isPhotography, setIsPhotography] = React.useState(false);
  const videoHeadingRef = React.useRef(null);
  const photographyHeadingRef = React.useRef(null);
  const hasMounted = React.useRef(false);

  React.useEffect(() => {
    if (hasMounted.current) {
      (isPhotography ? photographyHeadingRef : videoHeadingRef).current?.focus({
        preventScroll: true,
      });
    }
    hasMounted.current = true;
  }, [isPhotography]);

  return (
    <section aria-label="Video production and photography pricing details" className="w-full overflow-x-clip">
      <div
        className="flex w-[200%] items-stretch transition-transform duration-500 ease-in-out motion-reduce:transition-none"
        style={{ transform: isPhotography ? "translateX(-50%)" : "translateX(0)" }}
      >
        <PricingPanel
          panelId="pricing-video-panel"
          variant="video"
          isActive={!isPhotography}
          onToggle={() => setIsPhotography(true)}
          headingRef={videoHeadingRef}
        />
        <PricingPanel
          panelId="pricing-photography-panel"
          variant="photography"
          isActive={isPhotography}
          onToggle={() => setIsPhotography(false)}
          headingRef={photographyHeadingRef}
        />
      </div>
    </section>
  );
};

export default PricingServiceDetail;