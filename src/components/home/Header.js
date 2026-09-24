import * as React from "react";

const nav = ["Home", "About", "Works", "Services", "Pricing", "Contact"];

const Header = () => (
  <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 lg:px-8">
    <div className="mx-auto flex w-[44%] max-w-[750px] items-center justify-between rounded-[30px] border border-brand-line bg-white/90 px-4 py-2.5 shadow-[0_6px_16px_rgba(0,0,0,0.08)] backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <img src="/figma/images/logo.png" alt="Pocket Creatives" className="h-[58px] w-[96px] object-contain" />
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
                  ? "bg-brand-yellow text-brand-text-dark shadow-[0_2px_0_rgba(0,0,0,0.12)]"
                  : contact
                    ? "bg-brand-cyan text-white shadow-[0_2px_0_rgba(0,0,0,0.12)]"
                    : "text-brand-text-dark hover:bg-brand-yellow hover:text-brand-text-dark"
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
        className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-line bg-white text-[#0f172a] transition-all duration-200 hover:bg-social-whatsapp hover:text-white"
      >
        <img src="/figma/icons/icon-whatsapp.svg" alt="WhatsApp" className="h-5 w-5 transition duration-200 group-hover:brightness-0 group-hover:invert" />
      </a>
    </div>
  </header>
);

export default Header;
