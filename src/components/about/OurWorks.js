import * as React from "react";

const workCards = [
  {
    id: "soap-glory",
    type: "image",
    image: "/figma/images/rec-1.png",
    label: "Soap And Glory",
    title: "People & Portrait Photography",
    body:
      "Expertly delivered product photography and product videos. From simple pack shots to creative product photography and engaging product video, high quality imagery is designed to entice the viewer and convert to a customer.",
  },
  {
    id: "hairo-brand",
    type: "video",
    image: "/figma/videos/rec-2.mp4",
    label: "HairO Brand Advert",
    title: "Beauty Video Production",
    body:
      "Expertly crafted cosmetics, personal care and beauty video and beauty photography. Creating both usage and creative product content, high quality photography shows your beauty brand in its best light.",
  },
  {
    id: "smiles-alliance",
    type: "image",
    image: "/figma/images/rec-3.png",
    label: "Smiles Alliance",
    title: "People & Portrait Photography",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida metus eget orci iaculis, eu ornare augue auctor. Donec at sagittis magna.",
  },
];

const CARD_WIDTH = 400;
const CARD_HEIGHT = 700;
const GAP = 16;
const SIDE_SCALE = 0.9; // side cards are a scaled-down copy of the same card, not a separately-sized box
const VIEWPORT_WIDTH = CARD_WIDTH * 3 + GAP * 2; // exactly 3 card-widths wide, so exactly 3 cards can ever be visible

const OurWorks = () => {
  const total = workCards.length;

  // extendedTrack = [clone of last, ...all real cards, clone of first]
  // The clones are what let the strip slide seamlessly past the ends and
  // loop, instead of jumping or running out of neighbors.
  const extendedTrack = [workCards[total - 1], ...workCards, workCards[0]];

  // trackIndex 1..total maps 1:1 to a real card (trackIndex - 1 = real index).
  // trackIndex 0 and total+1 are the clones, used only mid-transition.
  const [trackIndex, setTrackIndex] = React.useState(2); // starts on workCards[1]
  const [snapping, setSnapping] = React.useState(false);
  const [mutedMap, setMutedMap] = React.useState({
    "product-photography": true,
    "product-photography-repeat": true,
  });

  const handleVideoMute = (event, cardId) => {
    event.stopPropagation();
    setMutedMap((current) => ({ ...current, [cardId]: !current[cardId] }));
  };

  const goTo = (extendedIdx) => {
    setSnapping(false);
    setTrackIndex(extendedIdx);
  };

  // After sliding onto a clone at either end, silently (no transition) snap
  // back to the real card in the same visual position — this is what makes
  // the loop back to the start feel seamless instead of jumping across.
  const handleTransitionEnd = (event) => {
    if (event.target !== event.currentTarget) return;
    if (trackIndex === 0) {
      setSnapping(true);
      setTrackIndex(total);
    } else if (trackIndex === extendedTrack.length - 1) {
      setSnapping(true);
      setTrackIndex(1);
    }
  };

  const translateX = (CARD_WIDTH + GAP) * (1 - trackIndex);

  return (
    <section className="w-full overflow-hidden bg-brand-bg py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-layout-shell px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-[clamp(3.25rem,7vw,7.5rem)] font-bold leading-[0.92] tracking-[-0.06em] text-brand-teal">
          Our Works
        </h2>

        <div
          className="mx-auto mt-10 overflow-hidden"
          style={{ width: `${VIEWPORT_WIDTH}px` }}
        >
          <div
            className={snapping ? "flex items-center" : "flex items-center transition-transform duration-500 ease-in-out"}
            style={{ transform: `translateX(${translateX}px)` }}
            onTransitionEnd={handleTransitionEnd}
          >
            {extendedTrack.map((card, i) => {
              const isCenter = i === trackIndex;
              const isMuted = Boolean(mutedMap[card.id]);
              const labelText = isCenter ? "text-[17px]" : "text-[13px]";
              const captionPad = isCenter ? "px-6 py-8" : "px-4 py-6";

              return (
                <article
                  key={`${card.id}-${i}`}
                  className="works-card group relative flex-shrink-0 cursor-pointer overflow-hidden rounded-none transition-transform duration-500 ease-in-out"
                  style={{
                    width: `${CARD_WIDTH}px`,
                    height: `${CARD_HEIGHT}px`,
                    marginRight: i === extendedTrack.length - 1 ? 0 : `${GAP}px`,
                    transform: isCenter ? "scale(1)" : `scale(${SIDE_SCALE})`,
                    zIndex: isCenter ? 10 : 0,
                    boxShadow: isCenter
                      ? "0 12px 24px rgba(0,0,0,0.14)"
                      : "0 4px 12px rgba(0,0,0,0.06)",
                  }}
                  onClick={() => goTo(i)}
                >
                  {card.type === "video" ? (
                    <video
                      src={card.image}
                      muted={isMuted}
                      autoPlay={isCenter}
                      loop
                      playsInline
                      className="absolute inset-0 h-full w-full cursor-pointer object-cover"
                      aria-label={`${card.title} preview video`}
                      onClick={(event) => handleVideoMute(event, card.id)}
                    />
                  ) : (
                    <img
                      src={card.image}
                      alt={card.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}

                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%]"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(252,190,23,0) 0%, rgba(252,190,23,0.85) 42%, #FCBE17 100%)",
                    }}
                  />

                  {/* Side cards are washed out white so focus stays on the center card */}
                  <div
                    className="pointer-events-none absolute inset-0 bg-white transition-opacity duration-500"
                    style={{ opacity: isCenter ? 0 : 0.55 }}
                  />

                  <div
                    className={`absolute inset-x-0 bottom-0 flex flex-col gap-2 transition-all duration-500 ${captionPad}`}
                  >
                    <span
                      className={`inline-flex w-fit items-center bg-brand-teal px-3 py-1 font-medium leading-none text-white transition-all duration-500 ${labelText}`}
                    >
                      {card.label}
                    </span>

                    <h3
                      className={`font-bold leading-[1.15] tracking-[-0.02em] text-brand-text-dark transition-all duration-500 ${labelText}`}
                    >
                      {card.title}
                    </h3>

                    <p
                      className={`leading-[1.3] text-brand-text-dark transition-all duration-500 ${labelText}`}
                    >
                      {card.body}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <p className="mt-6 text-center text-[0.9rem] font-medium italic text-brand-text-muted md:text-[1rem]">
          *Click on Video to toggle sound
        </p>
      </div>
    </section>
  );
};

export default OurWorks;