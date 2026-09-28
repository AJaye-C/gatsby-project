import * as React from "react";

const milestones = [
  {
    kind: "major",
    label: "2017",
    className: "about-story-milestone-2017",
  },
  {
    kind: "dot",
    caption:
      "Steven’s professional history started in broadcasting, supporting mainstream television programmes such as BBC’s Watchdog, Crimewatch and Horizon and leading a 10-person team running 24/7 to make this happen.",
    captionPosition: "below",
    captionColor: "slate",
    className: "about-story-dot-1",
  },
  {
    kind: "dot",
    caption:
      "But photography and video production was always the passion, and he burnt all the hours in the day running a small, innovative corporate video production company alongside called Screensaver which could boast clients such as Tower Bridge, the Museum of London and the National Portrait Gallery. This paved the way to progress full time into the production world and merged into Tailwind Media into 2010.",
    captionPosition: "above",
    captionColor: "slate",
    className: "about-story-dot-2",
  },
  {
    kind: "dot",
    caption:
      "For 6 years, Steven oversaw the production team, making impressive in-roads into the UK corporate video market, working with some of the country’s biggest names. Highlights would include a huge change campaign for Arcadia; helping to update the internal communications video magazine for electronics giant Philips, working with pop star Olly Murs for the Pringles 25th birthday adverts, and overseeing a multitude of projects for Tesco, Currys PC World and Groupon to name just a few.",
    captionPosition: "below",
    captionColor: "slate",
    className: "about-story-dot-3",
  },
  {
    kind: "dot",
    caption: (
      <>
        2015 saw the creation of SMC, after Steven wanted to take a different direction, by offering both video and photography. Haider Romero Perez and Lauren Hodge were invited to join, bringing a wealth of skill, enthusiasm, and drive and within 2 years have become co-owners of the newly incorporated <span className="underline">Pocket Creatives</span>.
      </>
    ),
    captionPosition: "above",
    captionColor: "slate",
    className: "about-story-dot-4",
  },
  {
    kind: "dot",
    caption:
      "“SMC provided a wonderful opportunity to meet new business owners and establish ourselves in new markets, offering new video and photography services and building a friendly and creative business where we’re building long-term working relationships with our clients. Pocket Creatives couldn’t have been launched without the faith and trust shown in us by our clients, and we look forward to growing alongside them over the years to come.”",
    captionPosition: "below",
    captionColor: "slate",
    className: "about-story-dot-5",
  },
  {
    kind: "major",
    label: "2025",
    className: "about-story-milestone-2025",
  },
];

const StoryArrow = ({ direction, disabled, onClick }) => (
  <button
    type="button"
    aria-label={direction === "previous" ? "Previous" : "Next"}
    disabled={disabled}
    onClick={onClick}
    className={`about-story-arrow section-three-nav ${disabled ? "invisible" : "visible"}`}
  >
    <svg viewBox="0 0 32 32" aria-hidden="true" className={direction === "previous" ? "rotate-180" : ""}>
      <rect className="arrow-bg" x="0" y="0" width="32" height="32" rx="16" />
      <path d="M8 15C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17V16V15ZM24.7071 16.7071C25.0976 16.3166 25.0976 15.6835 24.7071 15.2929L18.3431 8.92893C17.9526 8.53841 17.3195 8.53841 16.9289 8.92893C16.5384 9.31946 16.5384 9.95262 16.9289 10.3431L22.5858 16L16.9289 21.6569C16.5384 22.0474 16.5384 22.6805 16.9289 23.0711C17.3195 23.4616 17.9526 23.4616 18.3431 23.0711L24.7071 16.7071ZM8 16V17H24V16V15H8V16Z" fill="black" />
    </svg>
  </button>
);

const AboutStory = () => {
  const [step, setStep] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);
  const [mobileStepCount, setMobileStepCount] = React.useState(0);
  const [mobileStepDistance, setMobileStepDistance] = React.useState(0);
  const viewportRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const touchStartX = React.useRef(null);
  const offsets = ["0vw", "-47.708vw", "-101.771vw", "-142vw"];

  React.useEffect(() => {
    const measureMobileTrack = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      if (!mobile || !viewportRef.current || !trackRef.current) {
        setMobileStepCount(0);
        setMobileStepDistance(0);
        setStep((current) => Math.min(current, offsets.length - 1));
        return;
      }

      const viewportWidth = viewportRef.current.clientWidth;
      const stepDistance = viewportWidth * 0.85;
      const maxOffset = Math.max(0, trackRef.current.scrollWidth - viewportWidth);
      const stepCount = Math.ceil(maxOffset / stepDistance);

      setMobileStepDistance(stepDistance);
      setMobileStepCount(stepCount);
      setStep((current) => Math.min(current, stepCount));
    };

    measureMobileTrack();
    window.addEventListener("resize", measureMobileTrack);

    return () => window.removeEventListener("resize", measureMobileTrack);
  }, [offsets.length]);

  const moveTrack = (direction) => {
    const finalStep = isMobile ? mobileStepCount : offsets.length - 1;
    setStep((current) => Math.min(finalStep, Math.max(0, current + direction)));
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) >= 40) {
      moveTrack(delta < 0 ? 1 : -1);
    }

    touchStartX.current = null;
  };

  const trackTransform = isMobile
    ? `translateX(-${Math.min(step * mobileStepDistance, Math.max(0, (trackRef.current?.scrollWidth || 0) - (viewportRef.current?.clientWidth || 0)))}px)`
    : `translateX(${offsets[Math.min(step, offsets.length - 1)]})`;

  return (
    <section className="about-story-section">
      <div ref={viewportRef} className="about-story-panel" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div ref={trackRef} className="about-story-track" style={{ transform: trackTransform }}>
          <div className="about-story-copy">
            <h2>Our Story</h2>
            <p>
              <strong>Pocket Creatives</strong> launched in the winter of 2017, formed as a limited company following the team working under the name of Steven Mayatt Creative since 2015. Pocket is the next step in our evolution.
            </p>
          </div>

          <div className="about-story-axis" aria-hidden="true" />

          {milestones.map((milestone) => {
            if (milestone.kind === "major") {
              return (
                <div key={milestone.label} className={`about-story-marker about-story-major ${milestone.className}`}>
                  {milestone.label}
                </div>
              );
            }

            return (
              <div key={milestone.className} className={`about-story-marker about-story-dot ${milestone.className}`}>
                <p
                  className={`about-story-caption about-story-caption-${milestone.captionPosition} about-story-caption-${milestone.captionColor}`}
                  style={{
                    top: milestone.captionPosition === "below" ? "calc(100% + var(--story-caption-gap, 32px))" : "auto",
                    bottom: milestone.captionPosition === "above" ? "calc(100% + var(--story-caption-gap, 32px))" : "auto",
                  }}
                >
                  {milestone.caption}
                </p>
              </div>
            );
          })}

          <div className="about-story-2025-copy">
            Now, embarking on our 6th year in business together, we’ve reached one milestone after the next. We boast an enviable client list, with impressive client retention numbers and have built a genuinely wonderful team around us.
          </div>
        </div>

        <div className="about-story-controls">
          <StoryArrow direction="previous" disabled={step === 0} onClick={() => moveTrack(-1)} />
          <StoryArrow direction="next" disabled={step === (isMobile ? mobileStepCount : offsets.length - 1)} onClick={() => moveTrack(1)} />
        </div>
      </div>
    </section>
  );
};

export default AboutStory;