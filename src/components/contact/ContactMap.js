import * as React from "react";

// TODO: Paste the key-free Google Maps "Embed a map" src supplied by the client.
const GOOGLE_MAP_EMBED_SRC = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2485.0969739769084!2d-0.14831388717101873!3d51.47473427168837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761cba927b96d3%3A0xc609e25096588735!2sPocket%20Creatives%20Video%20Production%20and%20Photography!5e0!3m2!1sen!2sph!4v1790837132373!5m2!1sen!2sph";

const details = [
  {
    icon: "/figma/icons/contact-phone.svg",
    alt: "Phone",
    content: <span>020 3633 8494</span>,
  },
  {
    icon: "/figma/icons/contact-location.svg",
    alt: "Location",
    content: (
      <>
        <span>Wow Workspaces Battersea</span>
        <span>Unit 3, 7-9 Ingate Place</span>
        <span>Battersea, London SW8 3NS</span>
      </>
    ),
  },
  {
    icon: "/figma/icons/contact-email.svg",
    alt: "Email",
    content: <span>team@pocketcreatives.co.uk</span>,
  },
];

const ContactMap = () => (
  <section className="bg-brand-bg px-6 pb-20 pt-[95px] sm:px-10 md:pb-24 lg:px-[clamp(24px,2.5vw,48px)] lg:pb-[100px]">
    <div className="mx-auto max-w-[1443px]">
      <address className="flex flex-col gap-8 not-italic md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-10 md:gap-y-8">
        {details.map(({ icon, alt, content }) => (
          <div
            key={alt}
            className="flex items-center gap-[clamp(16px,2.3vw,33px)] text-xl font-extrabold leading-[1.2] tracking-[-1px] text-brand-slate md:shrink-0"
          >
            <img src={icon} alt={alt} className="h-[clamp(72px,7.22vw,104px)] w-[clamp(72px,7.22vw,104px)] shrink-0" />
            <div className="flex flex-col">
              {content}
            </div>
          </div>
        ))}
      </address>

      <div className="mt-9 h-[min(809px,56.18vw)] min-h-[360px] w-full overflow-hidden">
        {GOOGLE_MAP_EMBED_SRC ? (
          <iframe
            title="Map showing the Pocket Creatives office in Battersea"
            src={GOOGLE_MAP_EMBED_SRC}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-brand-panel text-center text-sm font-medium text-brand-slate">
            Google Maps embed source pending.
          </div>
        )}
      </div>

      {/* TODO: Confirm whether phone, address, and email should become links. */}
    </div>
  </section>
);

export default ContactMap;