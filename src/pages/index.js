import * as React from "react";
import Layout from "../components/Layout";

const nav = ["Home", "About", "Works", "Services", "Pricing", "Contact"];

const clientLogos = [
  { name: "Argos", src: "/figma/client-1.png" },
  { name: "Soap & Glory", src: "/figma/client-2.png" },
  { name: "Macmillan Cancer Support", src: "/figma/client-3.png" },
  { name: "Kopparberg", src: "/figma/client-4.png" },
  { name: "Ladbrokes", src: "/figma/client-5.png" },
  { name: "Co-op", src: "/figma/client-6.png" },
  { name: "Business Insider", src: "/figma/client-7.png" },
  { name: "The Gym Group", src: "/figma/client-8.png" },
  { name: "The Telegraph", src: "/figma/client-9.png" },
];

const firstSlide = clientLogos.slice(0, 9);
const secondSlide = [...clientLogos, ...clientLogos].slice(9, 18);
const videoCategories = [
  { title: "Beauty", src: "/figma/beauty.mp4" },
  { title: "Food&Drink", src: "/figma/fooddrink.mp4" },
  { title: "Product", src: "/figma/product.mp4" },
];

const photographyCategories = [
  { key: "beauty", label: "Beauty" },
  { key: "food", label: "Food & Drink" },
  { key: "product", label: "Product" },
  { key: "events", label: "Events" },
  { key: "crowdfunding", label: "Crowdfunding" },
  { key: "fashion", label: "Fashion" },
  { key: "people", label: "People" },
  { key: "jewellery", label: "Jewellery" },
];

const photographyGallery = {
  beauty: "/figma/photography.png",
  food: "/figma/photography.png",
  product: "/figma/photography.png",
  events: "/figma/photography.png",
  crowdfunding: "/figma/photography.png",
  fashion: "/figma/photography.png",
  people: "/figma/photography.png",
  jewellery: "/figma/photography.png",
};

const teamRows = [
  ["Steven", "Haider", "Lauren"],
  ["Ned", "Connor", "Rauchan"],
];

const teamMembers = [
  {
    id: "steven",
    firstName: "Steven",
    lastName: "Mayatt",
    image: "/figma/team-steven.png",
    roles: ["Managing Director", "Creative Director", "Photographer", "Entrepreneur", "Marketeer", "Coffee Drinker"],
    bio: "Lorem ipsum dolor sit amet consectetur. Placerat quisque feugiat porta quam ornare. In nec lacinia consectetur placerat vestibulum sem odio. In feugiat elit fames eget lobortis turpis scelerisque tincidunt. Enim.",
  },
  {
    id: "haider",
    firstName: "Haider",
    lastName: "Khan",
    image: "/figma/team-haider.png",
    roles: ["Managing Director", "Creative Director", "Photographer", "Entrepreneur", "Marketeer", "Coffee Drinker"],
    bio: "Lorem ipsum dolor sit amet consectetur. Placerat quisque feugiat porta quam ornare. In nec lacinia consectetur placerat vestibulum sem odio. In feugiat elit fames eget lobortis turpis scelerisque tincidunt. Enim.",
  },
  {
    id: "lauren",
    firstName: "Lauren",
    lastName: "Bell",
    image: "/figma/team-lauren.png",
    roles: ["Managing Director", "Creative Director", "Photographer", "Entrepreneur", "Marketeer", "Coffee Drinker"],
    bio: "Lorem ipsum dolor sit amet consectetur. Placerat quisque feugiat porta quam ornare. In nec lacinia consectetur placerat vestibulum sem odio. In feugiat elit fames eget lobortis turpis scelerisque tincidunt. Enim.",
  },
  {
    id: "ned",
    firstName: "Ned",
    lastName: "Smith",
    image: "/figma/team-steven.png",
    roles: ["Managing Director", "Creative Director", "Photographer", "Entrepreneur", "Marketeer", "Coffee Drinker"],
    bio: "Lorem ipsum dolor sit amet consectetur. Placerat quisque feugiat porta quam ornare. In nec lacinia consectetur placerat vestibulum sem odio. In feugiat elit fames eget lobortis turpis scelerisque tincidunt. Enim.",
  },
  {
    id: "connor",
    firstName: "Connor",
    lastName: "Parker",
    image: "/figma/team-haider.png",
    roles: ["Managing Director", "Creative Director", "Photographer", "Entrepreneur", "Marketeer", "Coffee Drinker"],
    bio: "Lorem ipsum dolor sit amet consectetur. Placerat quisque feugiat porta quam ornare. In nec lacinia consectetur placerat vestibulum sem odio. In feugiat elit fames eget lobortis turpis scelerisque tincidunt. Enim.",
  },
  {
    id: "rauchan",
    firstName: "Rauchan",
    lastName: "Bose",
    image: "/figma/team-lauren.png",
    roles: ["Managing Director", "Creative Director", "Photographer", "Entrepreneur", "Marketeer", "Coffee Drinker"],
    bio: "Lorem ipsum dolor sit amet consectetur. Placerat quisque feugiat porta quam ornare. In nec lacinia consectetur placerat vestibulum sem odio. In feugiat elit fames eget lobortis turpis scelerisque tincidunt. Enim.",
  },
];

const sectionEightReviews = [
  {
    name: "Winnie Asawakanjanakit",
    text: "I had a such a great time working with Steven and his team! They were very professional and created a safe space for me which made my job as a model on set easier and more enjoyable. Would definitely love to work with them again. :)",
  },
  {
    name: "Crime And Comedy Theatre Co..",
    text: "Steve & Charlie at Pocket Creatives were fantastic, really first class. Our project involved an older actor and not only did they conduct the pre-shoot with personable, fact-finding efficiency, but they were very considerate, accommodating..",
  },
  {
    name: "John Bond",
    text: "Very professional company to deal with and delighted with the product videos received. Always a pleasure to deal with Steven and his team.",
  },
  {
    name: "Marcus Ramtohul",
    text: "I've shot with Pocket Creatives on a number of occasions as a model and actor. Always delivering amazing results for clients - gorgeous images and a fun and creative environment. I am constantly looking forward to the next opportunity to shoot with..",
  },
  {
    name: "Klara Niklewicz",
    text: "Really enjoyed working with Pocket Creatives on a video campaign & webinar. Delivery was quick and to high standard. Thank you!",
  },
  {
    name: "Emma Thompson",
    text: "Outstanding communication from start to finish. The crew was creative, efficient, and made the whole process feel effortless. Highly recommended.",
  },
];

const footerQuickLinks = [
  "HOME",
  "ABOUT",
  "WORKS",
  "SERVICES",
  "PRICING",
  "CONTACT",
  "BLOGS",
  "PHOTOGRAPHY TESTIMONIALS",
  "VIDEOGRAPHY TESTIMONIALS",
];

const footerSocials = [
  { name: "YouTube", icon: "▶" },
  { name: "Vimeo", icon: "◉" },
  { name: "Instagram", icon: "◎" },
  { name: "Pinterest", icon: "P" },
  { name: "LinkedIn", icon: "in" },
  { name: "Facebook", icon: "f" },
  { name: "X", icon: "X" },
  { name: "Tumblr", icon: "T" },
];

const ReviewCards = () => {
  const repeatedReviews = [...sectionEightReviews, ...sectionEightReviews];

  return (
    <div className="overflow-hidden">
      <div className="review-carousel-track flex gap-5 py-4">
        {repeatedReviews.map((review, index) => (
          <div key={`${review.name}-${index}`} className="review-card-wrapper flex-shrink-0">
            <div className="rounded-[22px] bg-[#e2e4e6] p-4 sm:p-5">
              <div className="mb-3 min-h-[160px] rounded-[16px] bg-white p-5 text-xs leading-relaxed text-[#2b3f4d] shadow-sm sm:text-sm">
                {review.text}
              </div>
              <div className="pl-1 text-xs font-bold text-[#2b3f4d] sm:text-sm">{review.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const IndexPage = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [mutedMap, setMutedMap] = React.useState({ 0: true, 1: true, 2: true });
  const [dragStartX, setDragStartX] = React.useState(null);
  const [activeCategory, setActiveCategory] = React.useState("beauty");
  const [activeTeamId, setActiveTeamId] = React.useState("steven");
  const [btsMuted, setBtsMuted] = React.useState(true);
  const videoRefs = React.useRef([]);

  const activeMember = React.useMemo(
    () => teamMembers.find((member) => member.id === activeTeamId) ?? teamMembers[0],
    [activeTeamId],
  );

  const goToPrevious = React.useCallback(() => {
    setActiveIndex((current) => (current === 0 ? videoCategories.length - 1 : current - 1));
  }, []);

  const goToNext = React.useCallback(() => {
    setActiveIndex((current) => (current === videoCategories.length - 1 ? 0 : current + 1));
  }, []);

  const toggleMute = React.useCallback((index) => {
    setMutedMap((current) => ({ ...current, [index]: !current[index] }));
  }, []);

  React.useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      video.muted = Boolean(mutedMap[index]);
      if (index === activeIndex) {
        video.play().catch(() => undefined);
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeIndex, mutedMap]);

  const handleDragStart = (clientX) => setDragStartX(clientX);

  const handleDragEnd = (clientX) => {
    if (dragStartX === null) return;

    const delta = clientX - dragStartX;
    if (delta < -60) {
      goToNext();
    } else if (delta > 60) {
      goToPrevious();
    }

    setDragStartX(null);
  };

  return (
    <Layout>
      <style>{`
        :root {
          --logo-gap: 12px;
        }

        @keyframes logosScroll {
          0%, 18% { transform: translateX(0); }
          30%, 48% { transform: translateX(calc(-50% - var(--logo-gap))); }
          52%, 72% { transform: translateX(calc(-50% - var(--logo-gap))); }
          100% { transform: translateX(0); }
        }

        @keyframes bounce {
          0%, 30% { transform: translateY(0); }
          50% { transform: translateY(60px); }
          100% { transform: translateY(0); }
        }

        @keyframes steppedScroll {
          0%, 12% { transform: translateX(0); }
          18%, 22% { transform: translateX(-15%); }
          28%, 40% { transform: translateX(-15%); }
          46%, 50% { transform: translateX(-32%); }
          56%, 68% { transform: translateX(-32%); }
          74%, 78% { transform: translateX(-49%); }
          84%, 96% { transform: translateX(-49%); }
          100% { transform: translateX(0); }
        }

        .carousel-viewport {
          overflow: hidden;
          width: 540px;
          max-width: 100%;
        }

        .client-marquee {
          display: flex;
          width: 200%;
          gap: var(--logo-gap);
          animation: logosScroll 9.9s ease-in-out infinite;
          will-change: transform;
        }

        .client-marquee > div {
          flex: 0 0 50%;
          width: 50%;
        }

        .logo-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
          width: 100%;
        }

        .section-two-arrow {
          animation: bounce 1.8s ease-in-out infinite;
        }

        .video-carousel-track {
          display: flex;
          gap: 1.5rem;
          width: 100%;
          transition: transform 0.5s ease;
          will-change: transform;
          padding-right: 0;
          overflow: visible;
          padding-left: 12vw;
        }

        .video-card {
          flex: 0 0 clamp(330px, 42vw, 650px);
          min-width: 0;
        }

        .video-card-video {
          border-radius: 1rem;
          overflow: hidden;
          background: #dfe4e6;
          aspect-ratio: 16 / 9;
          height: auto;
        }

        .video-card-video video {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          background: #dfe4e6;
        }

        .section-three-cta {
          transition: transform 0.25s ease;
          background: transparent;
          border: none;
          padding: 0;
        }

        .section-three-cta:hover {
          transform: translateY(-3px);
        }

        .section-three-cta-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 7.25rem;
          height: 7.25rem;
          border-radius: 9999px;
          background: #179CBD;
          box-shadow: 0 8px 20px rgba(23, 156, 189, 0.28);
          color: #ffffff;
          text-align: center;
          font-weight: 800;
          line-height: 0.9;
          letter-spacing: -0.06em;
          transition: background-color 0.25s ease, transform 0.25s ease;
        }

        .section-three-cta-pill span {
          display: block;
          font-size: clamp(1.5rem, 2vw, 2.2rem);
        }

        .section-three-cta:hover .section-three-cta-pill {
          background: #F5B800;
          transform: translateY(-3px);
        }

        @media (min-width: 768px) {
          .section-three-cta-pill {
            width: 8.6rem;
            height: 8.6rem;
          }
        }

        .photography-cta {
          right: 10%;
        }

        .photography-cta-pill {
          width: 6.875rem;
          height: 6.875rem;
          box-shadow: 0 6px 14px rgba(23, 156, 189, 0.25);
        }

        .photography-cta-pill span {
          font-size: 1.375rem;
        }

        @media (min-width: 640px) {
          .photography-cta {
            right: 12%;
          }
        }

        @media (min-width: 768px) {
          .photography-cta-pill {
            width: 8.25rem;
            height: 8.25rem;
          }

          .photography-cta-pill span {
            font-size: 1.7rem;
          }
        }

        @media (min-width: 1024px) {
          .photography-cta {
            right: 18%;
          }
        }

        .section-three-nav {
          --arrow-bg: #F5B800;
          transition: transform 0.25s ease, background-color 0.25s ease;
          background: transparent;
          border: none;
          padding: 0;
        }

        .section-three-nav:hover {
          transform: translateY(-1px);
        }

        .section-three-nav svg {
          display: block;
          width: 1.55rem;
          height: 1.55rem;
          transition: transform 0.25s ease;
        }

        .section-three-nav .arrow-bg {
          fill: var(--arrow-bg);
          transition: fill 0.25s ease;
        }

        .section-three-nav:hover {
          --arrow-bg: #179CBD;
        }

        .review-card-wrapper {
          min-width: 280px;
          max-width: 340px;
          width: min(100%, 340px);
        }

        .review-carousel-track {
          width: max-content;
          animation: steppedScroll 18s ease-in-out infinite;
          will-change: transform;
        }

        @media (min-width: 768px) {
          .section-three-nav svg {
            width: 1.85rem;
            height: 1.85rem;
          }
        }

        @media (min-width: 768px) {
          .video-card {
            flex-basis: clamp(360px, 40vw, 610px);
          }
        }

        @media (min-width: 1024px) {
          .video-card {
            flex-basis: clamp(420px, 34vw, 620px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .client-marquee {
            animation: none;
            transform: none;
          }

          .section-two-arrow {
            animation: none;
          }

          .video-carousel-track {
            transition: none;
          }
        }
      `}</style>

      <main className="min-h-screen bg-[#efefee] text-[#1d1d1d]">
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-[44%] max-w-[750px] items-center justify-between rounded-[30px] border border-[#dfe4e6] bg-white/90 px-4 py-2.5 shadow-[0_6px_16px_rgba(0,0,0,0.08)] backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <img src="/figma/logo.png" alt="Pocket Creatives" className="h-[58px] w-[96px] object-contain" />
          </div>

          <nav className="hidden items-center gap-2 md:flex">
            {nav.map((item) => {
              const active = item === "Home";
              const contact = item === "Contact";

              return (
                <a
                  key={item}
                  href="#"
                  className={`rounded-full px-4 py-2 text-[0.95rem] font-medium tracking-[-0.03em] transition-all duration-200 ${
                    active
                      ? "bg-[#F5B800] text-[#111827] shadow-[0_2px_0_rgba(0,0,0,0.12)]"
                      : contact
                        ? "bg-[#1AA7D8] text-white shadow-[0_2px_0_rgba(0,0,0,0.12)]"
                        : "text-[#1b1b1b] hover:bg-[#F5B800] hover:text-[#111827]"
                  }`}
                >
                  {item}
                </a>
              );
            })}
          </nav>

          <a
            href="#contact"
            aria-label="WhatsApp"
            className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#dfe4e6] bg-white text-[#0f172a] transition-all duration-200 hover:bg-[#25D366] hover:text-white"
          >
            <img src="/figma/icon-whatsapp.svg" alt="WhatsApp" className="h-5 w-5 transition duration-200 group-hover:brightness-0 group-hover:invert" />
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-[1280px] px-4 pb-14 pt-28 sm:px-6 lg:px-8">
        <section className="w-full pb-10 pt-6">
          <div className="flex items-end justify-between gap-6 leading-none">
            <img src="/figma/logo.png" alt="Pocket Creatives" className="h-[115px] w-[204px] object-contain" />

            <div className="hidden items-end gap-3 md:flex">
              <img
                src="/figma/hero-people-2.png"
                alt="Female photographer"
                className="h-[90px] w-[150px] rounded-[16px] object-cover"
              />
              <img
                src="/figma/hero-people-1.png"
                alt="Male videographer"
                className="h-[90px] w-[150px] rounded-[16px] object-cover object-right"
              />
            </div>
          </div>

          <hr className="mt-0 border-t border-[#d4d8db]" />

          <h1 className="mt-8 text-left text-[clamp(1.394rem,1.901vw,2.566rem)] font-medium leading-[1.05] tracking-[-0.07em] text-[#2b3f4d]">
            We’re a <span className="font-black text-[#F5B800]">fast</span> &amp; <span className="font-black text-[#F5B800]">friendly</span>{" "}
            <span className="font-black text-[#00A8CC]">Video Production</span> and <span className="font-black text-[#00A8CC]">Photography</span> company
            <br className="hidden lg:block" />
            with <span className="font-black text-[#F5B800]">bags of experience</span> &amp; who <span className="text-[#ff3b4d]">❤</span> what we do :)
          </h1>

          <div className="mt-8">
            <p className="text-[0.78rem] font-medium italic text-[#676d75]">*Click on Video to toggle sound</p>
            <div className="mt-3 overflow-hidden rounded-[18px] border border-[#dfe4e6] shadow-[0_12px_22px_rgba(0,0,0,0.08)]">
              <video
                src="/figma/hero.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-[280px] w-full object-cover sm:h-[450px] lg:h-[610px]"
              />
            </div>
          </div>

          <div className="mt-10 max-w-[1100px] mx-auto grid justify-center items-center gap-8 md:gap-12 xl:grid-cols-[1fr_1fr]">
            <div className="pt-2 pr-4 max-w-[480px] mx-auto xl:mx-0 xl:justify-self-center">
              <p className="text-[clamp(1.344rem,1.882vw,2.419rem)] font-medium leading-[1.02] tracking-[-0.07em] text-[#2c3f4d]">
                As you see, we’ve <span className="font-black text-[#F5B800]">partnered</span>
                <br />
                with a lot of amazing people
              </p>
              <p className="mt-5 text-[clamp(1.251rem,1.725vw,1.8975rem)] font-black leading-[1.1] tracking-[-0.06em] text-[#00A8CC]">
                in many different Industries:
              </p>
              <p className="mt-4 max-w-[520px] text-[1.04rem] leading-[1.7] tracking-[-0.02em] text-[#55606a]">
                Lorem ipsum dolor sit amet consectetur. Placerat quisque feugiat porta quam ornare. In nec lacinia consectetur placerat vestibulum sem odio. In feugiat elit fames eget lobortis turpis scelerisque tincidunt. Enim.
              </p>
            </div>

            <div className="carousel-viewport pb-1 pt-1 mx-auto xl:mx-0">
              <div className="client-marquee">
                {[firstSlide, secondSlide].map((slide, slideIndex) => (
                  <div key={slideIndex} className="flex-shrink-0">
                    <div className="logo-grid">
                      {slide.map((logo, logoIndex) => (
                        <div
                          key={`${slideIndex}-${logo.name}-${logoIndex}`}
                          className="flex h-[95px] items-center justify-center rounded-[18px] border border-[#e5e5e5] bg-white p-3 shadow-[0_5px_14px_rgba(0,0,0,0.06)]"
                        >
                          <img src={logo.src} alt={logo.name} className="max-h-[44px] w-auto max-w-[82%] object-contain" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="w-full bg-[#F5B800] py-28 text-white md:py-36 lg:py-44 xl:py-52">
        <div className="mx-auto max-w-[940px] px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:gap-10">
            <h2 className="max-w-[750px] text-[clamp(2.9rem,4.6vw,5.2rem)] font-black leading-[0.9] tracking-[-0.06em] text-white">
              Take a look at some of our video work...
            </h2>

            <div className="flex items-start gap-8 md:gap-12">
              <p className="max-w-[560px] text-[1.04rem] leading-[1.7] tracking-[-0.02em] text-[#1f2937]">
                Lorem ipsum dolor sit amet consectetur. Placerat quisque feugiat porta quam ornare. In nec lacinia consectetur placerat vestibulum sem odio. In feugiat elit fames eget lobortis turpis scelerisque tincidunt. Enim.
              </p>

              <div className="mt-1 flex shrink-0 items-start justify-center">
                <img
                  src="/figma/icon-down.svg"
                  alt="Scroll down"
                  className="section-two-arrow h-10 w-10 object-contain md:h-12 md:w-12 lg:h-16 lg:w-16"
                  style={{ transform: 'scale(7)', width: '112px', height: '112px', maxWidth: 'none', maxHeight: 'none' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f3f2ee] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <img src="/figma/icon-play.svg" alt="Play icon" className="h-8 w-8 md:h-10 md:w-10" />
              <span className="text-[1.7rem] font-medium tracking-[-0.06em] text-[#2c3f4d] md:text-[2.2rem]">
                Video Production
              </span>
            </div>

            <button
              type="button"
              className="section-three-cta -mb-1 flex items-center justify-center p-0"
              aria-label="Let's talk"
            >
              <span className="section-three-cta-pill" aria-label="Let's Talk">
                <span>
                  Let&apos;s
                  <br />
                  Talk
                </span>
              </span>
            </button>
          </div>

          <div className="pb-5" style={{ overflowX: 'visible' }}>
            <div
              className="video-carousel-track"
              style={{ transform: `translateX(-${activeIndex * 40 + 18}%)` }}
              onMouseDown={(event) => handleDragStart(event.clientX)}
              onMouseUp={(event) => handleDragEnd(event.clientX)}
              onMouseLeave={() => setDragStartX(null)}
              onTouchStart={(event) => handleDragStart(event.touches[0].clientX)}
              onTouchEnd={(event) => handleDragEnd(event.changedTouches[0].clientX)}
            >
              {videoCategories.map((video, index) => {
                const isMuted = Boolean(mutedMap[index]);

                return (
                  <article key={video.title} className="video-card">
                    <h3 className="mb-4 text-[2.4rem] font-bold tracking-[-0.06em] text-[#111827] md:text-[3.2rem]">
                      {video.title}
                    </h3>

                    <div
                      className="video-card-video relative w-full border border-[#e5e7eb] shadow-[0_8px_18px_rgba(0,0,0,0.06)]"
                      onClick={() => toggleMute(index)}
                    >
                      <video
                        ref={(element) => {
                          videoRefs.current[index] = element;
                        }}
                        src={video.src}
                        muted={isMuted}
                        autoPlay
                        loop
                        playsInline
                        className="h-full w-full cursor-pointer"
                        aria-label={`${video.title} preview video`}
                      />

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex flex-col items-start gap-3">
            <p className="text-[0.78rem] font-medium italic tracking-[-0.03em] text-[#4e5a68] md:text-[0.88rem]">
              *Drag to play the next Video, Click to toggle sound
            </p>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                aria-label="Previous video"
                onClick={goToPrevious}
                className="section-three-nav flex h-9 w-9 items-center justify-center md:h-11 md:w-11"
              >
                <svg viewBox="0 0 32 32" aria-hidden="true" className="rotate-180">
                  <rect className="arrow-bg" x="0" y="0" width="32" height="32" rx="16" />
                  <path d="M8 15C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17V16V15ZM24.7071 16.7071C25.0976 16.3166 25.0976 15.6834 24.7071 15.2929L18.3431 8.92893C17.9526 8.53841 17.3195 8.53841 16.9289 8.92893C16.5384 9.31946 16.5384 9.95262 16.9289 10.3431L22.5858 16L16.9289 21.6569C16.5384 22.0474 16.5384 22.6805 16.9289 23.0711C17.3195 23.4616 17.9526 23.4616 18.3431 23.0711L24.7071 16.7071ZM8 16V17H24V16V15H8V16Z" fill="black"/>
                </svg>
              </button>

              <button
                type="button"
                aria-label="Next video"
                onClick={goToNext}
                className="section-three-nav flex h-9 w-9 items-center justify-center md:h-11 md:w-11"
              >
                <svg viewBox="0 0 32 32" aria-hidden="true">
                  <rect className="arrow-bg" x="0" y="0" width="32" height="32" rx="16" />
                  <path d="M8 15C7.44772 15 7 15.4477 7 16C7 16.5523 7.44772 17 8 17V16V15ZM24.7071 16.7071C25.0976 16.3166 25.0976 15.6834 24.7071 15.2929L18.3431 8.92893C17.9526 8.53841 17.3195 8.53841 16.9289 8.92893C16.5384 9.31946 16.5384 9.95262 16.9289 10.3431L22.5858 16L16.9289 21.6569C16.5384 22.0474 16.5384 22.6805 16.9289 23.0711C17.3195 23.4616 17.9526 23.4616 18.3431 23.0711L24.7071 16.7071ZM8 16V17H24V16V15H8V16Z" fill="black"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#00A8CC] py-24 px-6 sm:px-10 lg:px-16 text-white md:py-32 lg:py-36">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="text-[clamp(2.5rem,5vw,5.5rem)] font-black leading-[1.02] tracking-[-0.05em] text-white">
            We <span className="text-[#F5B800] tracking-[-0.08em] inline-block">squeeze</span> quality into
            <br className="hidden sm:block" />
            every pixel...
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
            <p className="max-w-[480px] text-[1.04rem] leading-[1.7] tracking-[-0.02em] text-[#111827]">
              Lorem ipsum dolor sit amet consectetur. Placerat quisque feugiat porta
              quam ornare. In nec lacinia consectetur placerat vestibulum sem odio.
              In feugiat elit fames eget lobortis turpis scelerisque tincidunt. Enim.
            </p>

            <p className="max-w-[480px] text-[1.45rem] md:text-[2.15rem] font-bold leading-snug text-white tracking-[-0.03em]">
              See some of our Photography work for different industries below.
            </p>
          </div>
        </div>
      </section>

            {/* --- PHOTOGRAPHY SECTION --- */}
      <section className="relative w-full bg-[#efefee] py-16 sm:py-20 lg:py-24">
        {/* Floating CTA Button */}
        <button
          type="button"
          aria-label="Let's talk"
          className="photography-cta section-three-cta absolute top-2 z-20 sm:top-4"
        >
          <span className="section-three-cta-pill photography-cta-pill" aria-label="Let's Talk">
            <span>
              Let&apos;s
              <br />
              Talk
            </span>
          </span>
        </button>

        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
          {/* Section Title Header */}
          <div className="flex items-center gap-3">
            <img
              src="/figma/icon-shutter.svg"
              alt="Photography shutter icon"
              className="h-8 w-8 object-contain md:h-10 md:w-10"
            />
            <h2 className="text-2xl font-medium tracking-tight text-[#2b3f4d] md:text-3xl">
              Photography
            </h2>
          </div>

          {/* Content Grid */}
          <div className="mt-10 grid grid-cols-1 items-center gap-3 md:grid-cols-12 md:gap-2 lg:gap-4">
            {/* Left Menu Column */}
            <div className="md:col-span-5 lg:col-span-4">
              <div className="flex flex-col border-t border-black/10">
                {photographyCategories.map((category) => {
                  const isActive = activeCategory === category.key;
                  const label = isActive ? `View ${category.label}` : category.label;

                  return (
                    <button
                      key={category.key}
                      type="button"
                      onMouseEnter={() => setActiveCategory(category.key)}
                      onFocus={() => setActiveCategory(category.key)}
                      className={`flex w-full items-center justify-start border-b border-black/10 py-3 text-left text-[1.65rem] font-black tracking-[-0.04em] transition-all duration-150 md:text-[2rem] ${
                        isActive
                          ? "text-[#f2a900]"
                          : "text-[#2b3f4d] hover:text-[#f2a900]"
                      }`}
                    >
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Image Showcase Column */}
            <div className="w-full md:col-span-7 lg:col-span-8">
              <div className="relative ml-auto overflow-hidden md:ml-[7rem] md:w-[calc(100%+12rem)] lg:ml-[9rem] lg:w-[calc(100%+14rem)]">
                <img
                  src={photographyGallery[activeCategory]}
                  alt={`${activeCategory} photography showcase`}
                  className="block h-[360px] w-full object-cover object-center transition-all duration-300 sm:h-[420px] md:h-[560px] md:max-w-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative w-full bg-[#f2a900] py-16 text-[#111827] sm:py-20 lg:py-24" aria-labelledby="section-six-title">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
          <div className="max-w-[760px] pt-1 sm:pt-2 lg:pt-4">
            <h2 id="section-six-title" className="text-[clamp(2.5rem,5vw,5.2rem)] font-black leading-[0.95] tracking-[-0.06em] text-white">
              <span className="block">Services - <span className="text-[#179cbd]">Check <span aria-hidden="true">✓</span></span></span>
              <span className="block">Quality - <span className="text-[#179cbd]">Check <span aria-hidden="true">✓</span></span></span>
              <span className="block">People - <span className="text-[#179cbd]">Check <span aria-hidden="true">✓</span></span></span>
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 lg:mt-16 lg:gap-12">
            <article>
              <h3 className="mb-3 text-xl font-bold text-[#111827]">Proactive</h3>
              <p className="text-sm leading-relaxed text-[#111827]/90 sm:text-base">
                We pride ourselves on our quality of service above everything else. We&apos;ve taken the time to build a cracking little team at Pocket, and we make sure that you feel the benefits of working with a dedicated video production company who are there for you, and dedicated to the success of your project.
              </p>
            </article>

            <article>
              <h3 className="mb-3 text-xl font-bold text-[#111827]">Nerds for Visuals</h3>
              <p className="text-sm leading-relaxed text-[#111827]/90 sm:text-base">
                Lorem ipsum dolor sit amet consectetur. Fermentum ut laoreet nunc at amet. Pretium sed tristique eu erat dui elementum eu duis. Sem posuere congue pellentesque duis in. Nunc id ridiculus mattis ullamcorper in id accumsan eu habitant. Mollis duis eu tellus aliquam viverra. Amet feugiat et habitasse mauris massa iaculis. Id at.
              </p>
            </article>

            <article className="relative">
              <button
                type="button"
                aria-label="Say hello"
                className="group absolute -right-3 bottom-[150%] z-20 flex -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-[#179cbd] sm:-right-4 lg:-right-6"
              >
                <span className="flex h-24 w-24 flex-col items-center justify-center text-center font-black leading-[0.82] tracking-[-0.06em] text-[#179cbd] transition-colors duration-200 group-hover:text-white sm:h-28 sm:w-28 lg:h-32 lg:w-32">
                  <span className="text-[1.1rem] sm:text-[1.35rem]">Say</span>
                  <span className="text-[1.1rem] sm:text-[1.35rem]">Hello</span>
                </span>
              </button>
              <h3 className="mb-3 text-xl font-bold text-[#111827]">Valuable</h3>
              <p className="text-sm leading-relaxed text-[#111827]/90 sm:text-base">
                Lorem ipsum dolor sit amet consectetur. Varius tempor id nulla aliquet gravida. Quis at auctor quis lectus velit id parturient bibendum. Amet a erat faucibus enim orci. Praesent magna facilisi erat eget dictumst nulla nunc. Scelerisque cras viverra ipsum at accumsan a. Sed sollicitudin lacinia amet arcu volutpat. Id.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#efefee] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
          <div className="mb-12 grid grid-cols-1 items-center gap-8 lg:mb-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className="text-4xl font-black leading-[1.05] tracking-tight text-[#2b3f4d] sm:text-5xl lg:text-6xl">
                Go behind the scenes of our <span className="relative inline-block underline decoration-[#179cbd] decoration-4 underline-offset-8 text-[#179cbd]">5 Star</span> Service
              </h2>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm sm:h-12 sm:w-12">
                  <span className="bg-[conic-gradient(from_180deg_at_50%_50%,#4285F4_0deg,#34A853_120deg,#FBBC05_220deg,#EA4335_320deg,#4285F4_360deg)] bg-clip-text text-xl font-black text-transparent sm:text-2xl">
                    G
                  </span>
                </div>
                <div className="text-lg font-bold leading-tight text-[#2b3f4d] sm:text-xl">Based on 88 reviews</div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="mb-1 text-right text-xs italic text-gray-500">*Click on Video to toggle sound</div>
              <div className="overflow-hidden rounded-[20px] bg-gray-200 shadow-md">
                <video
                  src="/figma/bts.mp4"
                  autoPlay
                  loop
                  muted={btsMuted}
                  playsInline
                  onClick={() => setBtsMuted((current) => !current)}
                  className="aspect-[16/10] w-full cursor-pointer object-cover"
                  aria-label="Behind the scenes video"
                />
              </div>
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="review-carousel-track flex gap-5 py-4">
              {[...sectionEightReviews, ...sectionEightReviews].map((review, index) => (
                <div key={`${review.name}-${index}`} className="review-card-wrapper flex-shrink-0">
                  <div className="rounded-[22px] bg-[#e2e4e6] p-4 sm:p-5">
                    <div className="mb-3 min-h-[160px] rounded-[16px] bg-white p-5 text-xs leading-relaxed text-[#2b3f4d] shadow-sm sm:text-sm">
                      {review.text}
                    </div>
                    <div className="pl-1 text-xs font-bold text-[#2b3f4d] sm:text-sm">{review.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f2f2f1] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="mb-6 text-2xl font-black text-[#2b3f4d] sm:text-3xl">Meet the Team</h2>

              <div className="overflow-hidden rounded-[20px] shadow-md">
                <img
                  src={activeMember.image}
                  alt={`${activeMember.firstName} ${activeMember.lastName}`}
                  className="aspect-[4/5] w-full object-cover lg:max-h-[580px]"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="flex flex-col gap-3 sm:gap-4">
                {teamRows.map((row, rowIndex) => (
                  <div key={`team-row-${rowIndex}`} className="flex flex-wrap gap-3 sm:gap-4">
                    {row.map((memberName) => {
                      const member = teamMembers.find((item) => item.firstName === memberName);
                      const isActive = activeTeamId === member.id;

                      return (
                        <button
                          key={member.id}
                          type="button"
                          onClick={() => setActiveTeamId(member.id)}
                          className={`rounded-full px-5 py-1.5 text-sm font-semibold transition-colors duration-200 sm:text-base ${
                            isActive
                              ? "bg-[#f2a900] text-white"
                              : "text-[#4a5568] hover:bg-[#179cbd] hover:text-white"
                          }`}
                        >
                          {member.firstName}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>

              <div className="mt-8 sm:mt-10">
                <h3 className="text-4xl font-black leading-none tracking-[-0.06em] sm:text-5xl lg:text-6xl">
                  <span className="text-[#f2a900]">{activeMember.firstName}</span>
                  <span className="ml-3 inline-block text-[#179cbd]">{activeMember.lastName}</span>
                </h3>

                <div className="mt-6 flex flex-wrap gap-x-3 gap-y-2">
                  {activeMember.roles.map((role) => (
                    <span
                      key={role}
                      className="text-sm font-bold tracking-tight text-[#2b3f4d] sm:text-base"
                    >
                      {role}
                    </span>
                  ))}
                </div>

                <p className="my-6 max-w-xl text-base leading-relaxed text-[#4a5568] sm:text-lg">
                  {activeMember.bio}
                </p>

                <div className="flex items-center gap-5">
                  <button
                    type="button"
                    className="group flex h-16 w-16 transform items-center justify-center rounded-full bg-[#179cbd] text-center text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-[#f2a900] sm:h-20 sm:w-20"
                    aria-label={`Message ${activeMember.firstName}`}
                  >
                    <span className="text-[0.62rem] font-extrabold leading-tight sm:text-[0.72rem]">
                      Msg
                      <br />
                      {activeMember.firstName}
                    </span>
                  </button>

                  <button
                    type="button"
                    aria-label="LinkedIn"
                    className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-200 text-gray-400 transition-colors duration-200 hover:bg-[#1f2d3d] hover:text-white sm:h-14 sm:w-14"
                  >
                    <img src="/figma/icon-linkedin.svg" alt="LinkedIn" className="h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#f2f2f1] py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <h2 className="mb-8 text-3xl font-black leading-[1.05] tracking-tight text-[#2b3f4d] sm:text-5xl lg:text-6xl">
                <span className="text-[#f2a900]">We value</span>{" "}
                <span className="text-[#179cbd]">transparency,</span>{" "}
                <span className="text-[#2b3f4d]">so let&apos;s talk about pricing.</span>
              </h2>

              <p className="mb-6 max-w-xl text-xl font-medium leading-snug text-[#4a5568] sm:text-2xl">
                Lorem ipsum dolor sit amet consectetur. Placerat quisque feugiat porta quam ornare.
              </p>

              <p className="max-w-lg text-sm leading-relaxed text-[#4a5568] sm:text-base">
                Lorem ipsum dolor sit amet consectetur. Placerat quisque feugiat porta quam ornare. In nec lacinia consectetur placerat vestibulum sem odio. In feugiat elit fames eget lobortis turpis scelerisque tincidunt. Enim.
              </p>
            </div>

            <div className="flex h-full flex-col items-start justify-between space-y-12 lg:col-span-4 lg:items-end lg:space-y-24">
              <button
                type="button"
                className="rounded-full bg-[#f2a900] px-6 py-2.5 text-sm font-bold text-[#111827] shadow-md transition-transform duration-200 hover:scale-105 hover:bg-[#179cbd] hover:text-white sm:text-base"
              >
                View Pricing
              </button>

              <button
                type="button"
                className="flex items-center gap-3 rounded-[20px] bg-[#f2a900] px-8 py-5 shadow-xl transition-transform duration-200 hover:scale-105 hover:bg-[#e09b00] sm:rounded-[24px] sm:px-10 sm:py-6"
              >
                <span className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">Request</span>
                <span className="text-left text-lg font-extrabold leading-none text-[#111827] sm:text-xl">a<br />quote</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full bg-[#179cbd] pt-16 pb-8 text-white sm:pt-20 lg:pt-24">
        <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
          <h2 className="mb-12 max-w-4xl text-3xl font-black leading-[1.05] tracking-tight text-white sm:mb-16 sm:text-5xl lg:text-6xl">
            We&apos;d love to chat about how we can help you with your next project, get in touch!
          </h2>

          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start">
            <div className="md:col-span-3">
              <a
                href="mailto:team@pocketcreatives.co.uk"
                className="mb-4 block text-lg font-bold underline underline-offset-4 transition-colors duration-200 hover:text-[#f2a900] sm:text-2xl"
              >
                team@pocketcreatives.co.uk
              </a>
              <a
                href="tel:02036338494"
                className="block text-lg font-extrabold transition-colors duration-200 hover:text-[#f2a900] sm:text-2xl"
              >
                020 3633 8494
              </a>
            </div>

            <div className="md:col-span-3">
              <div className="space-y-1 text-base font-bold leading-snug underline underline-offset-4 transition-colors duration-200 hover:text-[#f2a900] sm:text-xl">
                <div>Wow Workspaces Battersea</div>
                <div>Unit 3, 7-9 Ingate Place</div>
                <div>Battersea, London SW8 3NS</div>
              </div>
            </div>

            <div className="md:col-span-6 md:pl-4">
              <div className="mb-8 flex justify-start md:justify-end">
                <div className="flex items-center rounded-2xl bg-white px-6 py-3 shadow-md">
                  <img src="/figma/logo.png" alt="Pocket Creatives" className="h-[42px] w-[110px] object-contain sm:h-[48px] sm:w-[130px]" />
                </div>
              </div>

              <div className="max-w-xs">
                <label className="mb-2 block text-xs font-semibold sm:text-sm">Sign up to our Newsletter</label>
                <div className="flex overflow-hidden rounded-sm bg-white">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full bg-white px-4 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
                    aria-label="Email address"
                  />
                </div>
                <button
                  type="button"
                  className="mt-3 inline-block text-sm font-bold underline underline-offset-4 transition-colors duration-200 hover:text-[#f2a900]"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 mt-8">
            <h3 className="mb-4 text-lg font-bold text-white">QuickLinks</h3>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-wider sm:text-sm">
              {footerQuickLinks.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="transition-colors duration-200 hover:text-[#f2a900] cursor-pointer"
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-6 md:flex-row">
            <div className="flex items-center gap-4 text-xl sm:text-2xl">
              {footerSocials.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  aria-label={social.name}
                  className="inline-flex h-8 w-8 items-center justify-center transition-colors duration-200 hover:text-[#f2a900] cursor-pointer"
                >
                  <span className="leading-none">{social.icon}</span>
                </a>
              ))}
            </div>

            <p className="text-xs text-white/80">Designed &amp; Built By Seek Marketing Partners 2025</p>
          </div>
        </div>
      </footer>
    </main>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <title>Pocket Creatives</title>;