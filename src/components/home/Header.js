import * as React from "react";
import { footerSocials } from "../../data/footer";

const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Works", href: "/" },
  { label: "Services", href: "/" },
  { label: "Pricing", href: "/" },
  { label: "Contact", href: "/" },
];
const socialRows = [footerSocials.slice(0, 5), footerSocials.slice(5)];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState("Home");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const pathname = window.location.pathname;
      setActiveItem(pathname.startsWith("/about") ? "About" : "Home");
    }
  }, []);

  React.useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 lg:px-8">
        <div className="mx-auto flex max-w-header-shell items-center justify-between rounded-full border border-brand-line bg-white/90 px-3 py-2 shadow-[0_6px_16px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:max-w-header-shell-sm lg:max-w-header-shell-lg 2xl:max-w-header-shell-2xl">
          <div className="flex items-center gap-3">
            <img src="/figma/images/logo.png" alt="Pocket Creatives" className="h-10 w-16 object-contain sm:h-12 sm:w-20 lg:h-[58px] lg:w-[96px]" />
          </div>

          <nav className="hidden items-center gap-1 lg:flex xl:gap-1.5">
            {nav.map(({ label, href }) => {
              const active = activeItem === label;
              const contact = label === "Contact";

              return (
                <a
                  key={label}
                  href={href}
                  className={`rounded-full px-3 py-2 text-[0.8rem] font-medium tracking-[-0.03em] transition-all duration-200 xl:px-4 xl:text-[0.95rem] ${
                    active
                      ? "bg-brand-yellow text-brand-text-dark shadow-[0_2px_0_rgba(0,0,0,0.12)]"
                      : contact
                        ? "bg-brand-cyan text-white shadow-[0_2px_0_rgba(0,0,0,0.12)]"
                        : "text-brand-text-dark hover:bg-brand-yellow hover:text-brand-text-dark"
                  }`}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              aria-label="WhatsApp"
              onClick={() => setIsMenuOpen(false)}
              className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-line bg-white text-[#0f172a] transition-all duration-200 hover:bg-social-whatsapp hover:text-white"
            >
              <img src="/figma/icons/icon-whatsapp.svg" alt="WhatsApp" className="h-5 w-5 transition duration-200 group-hover:brightness-0 group-hover:invert" />
            </a>

            <button
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation-menu"
              onClick={() => setIsMenuOpen((current) => !current)}
              className="inline-flex h-8 w-8 items-center justify-center bg-transparent text-brand-slate transition-colors duration-200 hover:text-brand-yellow md:hidden"
            >
              {isMenuOpen ? (
                <span className="relative block h-5 w-5" aria-hidden="true">
                  <span className="absolute left-0 top-2 block h-[2.5px] w-5 rotate-45 rounded-full bg-current" />
                  <span className="absolute left-0 top-2 block h-[2.5px] w-5 -rotate-45 rounded-full bg-current" />
                </span>
              ) : (
                <span className="flex flex-col items-center gap-1.5" aria-hidden="true">
                  <span className="block h-[3px] w-6 rounded-full bg-current" />
                  <span className="block h-[3px] w-6 rounded-full bg-current" />
                  <span className="block h-[3px] w-6 rounded-full bg-current" />
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-navigation-menu"
        role="dialog"
        aria-modal="true"
        className="mobile-menu-panel"
        style={{
          transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
          pointerEvents: isMenuOpen ? "auto" : "none",
        }}
      >
        <div className="mobile-menu-sheet">
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {nav.map(({ label, href }, index) => {
              const isActive = activeItem === label;

              return (
                <React.Fragment key={label}>
                  <a
                    href={href}
                    className={`mobile-nav-link${isActive ? " is-active" : ""}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </a>
                  {index < nav.length - 1 && <span className="mobile-nav-divider" aria-hidden="true" />}
                </React.Fragment>
              );
            })}
          </nav>

          <div className="mobile-social-stack">
            {socialRows.map((row, rowIndex) => (
              <div key={`social-row-${rowIndex}`} className="mobile-social-row">
                {row.map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    aria-label={social.name}
                    className="mobile-social-item"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <img src={social.icon} alt={social.name} className="mobile-social-icon" />
                  </a>
                ))}
              </div>
            ))}
          </div>

          <div className="mobile-branding">
            <div className="mobile-brand-name">Pocket Creatives</div>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="mobile-brand-tagline">
              Video Production &amp; Photography
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
