import * as React from "react";

const TestimonialsDetails = ({ details }) => {
  const scrollerRef = React.useRef(null);
  const scrollByColumn = (direction) => scrollerRef.current?.scrollBy({ left: direction * 626, behavior: "smooth" });
  const handleKeyDown = (event) => { if (event.key === "ArrowRight") { event.preventDefault(); scrollByColumn(1); } if (event.key === "ArrowLeft") { event.preventDefault(); scrollByColumn(-1); } };

  return <section className="overflow-hidden bg-brand-bg px-[clamp(24px,8vw,150px)] py-20 min-[1920px]:px-0 min-[1920px]:py-[105px]"><div className="mx-auto max-w-[1440px]"><h2 className="text-[clamp(3rem,4.167vw,5rem)] font-bold leading-none tracking-[-4px] text-brand-slate">{details.heading}</h2><div className="mt-10 flex flex-col gap-10 lg:flex-row lg:gap-[82px]"><div className="h-[clamp(300px,30.9375vw,594px)] w-full shrink-0 bg-[#D9D9D9] lg:w-[640px]">{details.image && <img src={details.image.src} alt={details.image.alt} className="h-full w-full object-cover" />}</div><div ref={scrollerRef} role="region" aria-label="Testimonial detail columns" tabIndex={0} onKeyDown={handleKeyDown} className="flex min-w-0 gap-[78px] overflow-x-auto overscroll-x-contain snap-x snap-proximity pb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"><style>{`.testimonial-details-scroll::-webkit-scrollbar{height:6px}.testimonial-details-scroll::-webkit-scrollbar-thumb{background:#526E87}.testimonial-details-scroll::-webkit-scrollbar-track{background:#dfe4e6}`}</style>{details.columns.map((column) => <article key={column.heading} className="w-[min(548px,85vw)] shrink-0 snap-start text-brand-slate"><h3 className="text-3xl font-bold leading-[1.2] tracking-[-2px] min-[1920px]:text-[40px]">{column.heading}</h3>{column.paragraphs.map((paragraph) => <p key={paragraph} className="mt-8 text-xl font-medium leading-[1.18] tracking-[-1px]">{paragraph}</p>)}</article>)}</div></div></div></section>;
};

export default TestimonialsDetails;