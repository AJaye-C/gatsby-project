import * as React from "react";
import { Link } from "gatsby";
import { splitParagraphs } from "../../utils/acf";

// Page-builder layout: "course_cards"
// Fields: heading (Text), course_items (Repeater: title [Text], bullets [Text Area, one bullet per line]),
//         link_label (Text), link_href (Text: a path such as /pricing/, or a full URL)
// Yellow cards that slide open sideways to show a teal list. Designed for three cards; two to four work
// (the row is centred from 2xl up through the --course-row-width variable). The "How Much?" link shows only
// when both link fields are filled. Internal paths use Gatsby Link (gotcha 24).
const CARD_WIDTH = 418;
const CARD_GAP = 72;
const OPEN_WIDTH = 960;
const YELLOW_WIDTH = 398;

const isInternal = (href = "") => href.startsWith("/") && !href.startsWith("//");

const linkClassName =
  "group mx-auto mt-9 flex h-[83px] w-[237px] md:ml-auto md:mr-0 items-center gap-5 bg-brand-accent-yellow px-5 text-black shadow-talk focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-teal focus-visible:ring-offset-2";

const CourseCards = ({ heading = "", courseItems = [], linkLabel = "", linkHref = "" }) => {
  const courses = React.useMemo(
    () =>
      (courseItems || [])
        .map((item) => ({ title: item?.title || "", bullets: splitParagraphs(item?.bullets) }))
        .filter((course) => course.title),
    [courseItems]
  );
  const count = courses.length;
  const rowWidth = CARD_WIDTH * count + CARD_GAP * Math.max(count - 1, 0);

  const [openIndex, setOpenIndex] = React.useState(null);
  const [isMobile, setIsMobile] = React.useState(false);
  const [mobileCardWidth, setMobileCardWidth] = React.useState(382);
  const cardRefs = React.useRef([]);

  React.useEffect(() => {
    const measure = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setMobileCardWidth(Math.max(window.innerWidth - 2 * Math.min(24, window.innerWidth * 0.05), 280));
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // When an opened card would run past the right edge of the screen, slide the whole row left.
  const rowShift = React.useMemo(() => {
    if (isMobile || openIndex === null) return 0;

    const viewportWidth = typeof window === "undefined" ? 1920 : window.innerWidth;
    const initialLeft = Math.max((viewportWidth - rowWidth) / 2, 0);
    const openedRight = initialLeft + (CARD_WIDTH + CARD_GAP) * openIndex + OPEN_WIDTH;
    return Math.max(0, openedRight - viewportWidth + CARD_GAP / 2);
  }, [isMobile, openIndex, rowWidth]);

  const closeCourse = (index) => {
    setOpenIndex(null);
    window.requestAnimationFrame(() => cardRefs.current[index]?.focus());
  };

  if (!count) return null;

  return (
    <section className="overflow-x-clip bg-brand-bg py-20 text-brand-slate lg:min-h-[1056px] lg:py-[116px]">
      <div className="mx-auto max-w-[1920px]">
        {heading && (
          <h2 className="text-center text-[clamp(3.5rem,6.77vw,8.125rem)] font-extrabold leading-none tracking-[-0.05em]">
            {heading}
          </h2>
        )}

        <div className="mt-16 overflow-hidden lg:mt-[84px]">
          <div
            className={`training-course-transition flex w-max pl-[clamp(24px,5vw,96px)] lg:gap-[72px] 2xl:ml-[calc((100vw_-_var(--course-row-width))/2)] 2xl:pl-0 ${isMobile ? "flex-col gap-6" : "gap-[72px]"}`}
            style={{ transform: `translateX(-${rowShift}px)`, "--course-row-width": `${rowWidth}px` }}
          >
            {courses.map((course, index) => {
              const isOpen = openIndex === index;
              const panelId = `course-panel-${index}`;

              return (
                <article
                  key={`${course.title}-${index}`}
                  className="training-course-transition relative h-[min(418px,calc(100vw-3rem))] shrink-0 overflow-hidden lg:flex"
                  style={{ width: isMobile ? `${mobileCardWidth}px` : isOpen ? `${OPEN_WIDTH}px` : `${CARD_WIDTH}px` }}
                >
                  <div
                    className="training-course-transition flex h-full w-max"
                    style={{ transform: isMobile && isOpen ? `translateX(-${mobileCardWidth}px)` : "translateX(0)" }}
                  >
                    <button
                      ref={(node) => {
                        cardRefs.current[index] = node;
                      }}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => {
                        if (!isOpen) {
                          setOpenIndex(index);
                        }
                      }}
                      className="training-course-transition relative flex h-full shrink-0 flex-col justify-center overflow-hidden bg-brand-accent-yellow px-[29px] text-left text-black focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-teal focus-visible:ring-inset"
                      style={{ width: isMobile ? `${mobileCardWidth}px` : isOpen ? `${YELLOW_WIDTH}px` : `${CARD_WIDTH}px` }}
                    >
                      <span id={`course-title-${index}`} className="block w-[calc(100%-58px)] max-w-[310px] shrink-0 text-[clamp(1.8rem,2.08vw,2.5rem)] font-extrabold leading-none tracking-[-0.05em] lg:w-[360px]">
                        {course.title}
                      </span>
                      <img
                        src="/figma/icons/arrows/icon-arrow-2.svg"
                        alt=""
                        aria-hidden="true"
                        className="absolute bottom-[104px] right-[79px] h-auto w-[34px]"
                      />
                    </button>

                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={`course-title-${index}`}
                      inert={isOpen ? undefined : ""}
                      className="training-course-transition relative h-full shrink-0 overflow-hidden bg-brand-teal"
                      style={{ width: isMobile ? `${mobileCardWidth}px` : isOpen ? `${OPEN_WIDTH - YELLOW_WIDTH}px` : "0px" }}
                    >
                      <ul className="flex h-full w-[calc(100%-104px)] list-disc flex-col justify-center gap-3 px-10 text-[clamp(1.5rem,2.08vw,2.5rem)] font-bold leading-none tracking-[-0.05em] text-white marker:text-white lg:w-[458px]">
                        {course.bullets.map((bullet, bulletIndex) => (
                          <li key={`${bullet}-${bulletIndex}`}>{bullet}</li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        aria-label={`Close ${course.title}`}
                        onClick={() => closeCourse(index)}
                        className="absolute bottom-[67px] right-[110px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-teal"
                      >
                        <img src="/figma/icons/arrows/pricing-arrow-right.svg" alt="" aria-hidden="true" className="h-auto w-[34px] -scale-x-100" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {linkLabel && linkHref && (
          <div className="mx-auto px-[clamp(24px,5vw,96px)] 2xl:px-0" style={{ maxWidth: `${rowWidth}px` }}>
            {(() => {
              const content = (
                <>
                  <span className="flex h-12 w-12 shrink-0 rotate-[-16deg] items-center justify-center rounded-full bg-brand-teal text-[35px] font-bold leading-none text-white">£</span>
                  <span className="text-[20px] font-medium tracking-[-1px]">{linkLabel}</span>
                </>
              );
              return isInternal(linkHref) ? (
                <Link to={linkHref} className={linkClassName}>
                  {content}
                </Link>
              ) : (
                <a href={linkHref} className={linkClassName}>
                  {content}
                </a>
              );
            })()}
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseCards;
