import * as React from "react";

const nav = ["Home", "About", "Works", "Services", "Pricing", "Contact"];

const Header = () => (
  <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 lg:px-8">
    <div className="mx-auto flex max-w-[720px] items-center justify-between rounded-full border border-brand-line bg-white/90 px-3 py-2 shadow-[0_6px_16px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:max-w-[780px] lg:max-w-[900px] 2xl:max-w-[980px]">
      <div className="flex items-center gap-3">
        <img src="/figma/images/logo.png" alt="Pocket Creatives" className="h-10 w-16 object-contain sm:h-12 sm:w-20 lg:h-[58px] lg:w-[96px]" />
      </div>

      <nav className="hidden items-center gap-1 lg:flex xl:gap-1.5">
        {nav.map((item) => {
          const active = item === "Home";
          const contact = item === "Contact";

          return (
            <a
              key={item}
              href="#"
              className={`rounded-full px-3 py-2 text-[0.8rem] font-medium tracking-[-0.03em] transition-all duration-200 xl:px-4 xl:text-[0.95rem] ${
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

      <div className="flex items-center gap-2">
        <a
          href="#contact"
          aria-label="WhatsApp"
          className="group hidden h-10 w-10 items-center justify-center rounded-full border border-brand-line bg-white text-[#0f172a] transition-all duration-200 hover:bg-social-whatsapp hover:text-white md:inline-flex"
        >
          <img src="/figma/icons/icon-whatsapp.svg" alt="WhatsApp" className="h-5 w-5 transition duration-200 group-hover:brightness-0 group-hover:invert" />
        </a>

        <button
          type="button"
          aria-label="Open menu"
          className="inline-flex h-8 w-8 items-center justify-center bg-transparent text-brand-yellow md:hidden"
        >
          <span className="flex flex-col items-center gap-1.5">
            <span className="block h-[3px] w-6 rounded-full bg-current" />
            <span className="block h-[3px] w-6 rounded-full bg-current" />
            <span className="block h-[3px] w-6 rounded-full bg-current" />
          </span>
        </button>
      </div>
    </div>
  </header>
);

export default Header;
