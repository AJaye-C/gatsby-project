import * as React from "react";
import { footerQuickLinks, footerSocials } from "../../data/footer";

const Footer = () => (
  <footer className="w-full bg-brand-teal pt-16 pb-8 text-white sm:pt-20 lg:pt-24">
    <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
      <h2 className="mb-12 max-w-4xl text-3xl font-medium leading-[1.05] tracking-tight text-white sm:mb-16 sm:text-5xl lg:text-6xl">
        We&apos;d love to chat about how we can help you with your next project, get in touch!
      </h2>

      <div className="relative mb-16 grid grid-cols-1 gap-8 md:grid-cols-[1.5fr_0.8fr] md:items-end">
        <div className="space-y-8">
          <div className="grid gap-10 sm:grid-cols-2">
            <div className="space-y-4">
              <a
                href="mailto:team@pocketcreatives.co.uk"
                className="block text-lg font-bold text-black underline underline-offset-4 transition-colors duration-200 hover:text-brand-yellow sm:text-2xl"
              >
                team@pocketcreatives.co.uk
              </a>
              <p className="text-lg font-extrabold text-black sm:text-2xl">020 3633 8494</p>
            </div>

            <a
              href="#"
              className="block space-y-1 text-base font-bold leading-snug text-black underline underline-offset-4 transition-colors duration-200 hover:text-brand-yellow sm:text-xl"
            >
              <div>Wow Workspaces Battersea</div>
              <div>Unit 3, 7-9 Ingate Place</div>
              <div>Battersea, London SW8 3NS</div>
            </a>
          </div>

          <div className="max-w-xs">
            <label className="mb-2 block text-xs font-semibold text-white sm:text-sm">Sign up to our Newsletter</label>
            <div className="flex items-center gap-3">
              <div className="flex-1 overflow-hidden rounded-sm bg-white">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-white px-4 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
                  aria-label="Email address"
                />
              </div>
              <button
                type="button"
                className="whitespace-nowrap text-sm font-bold text-white underline underline-offset-4 transition-colors duration-200 hover:text-brand-yellow"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-1/2 right-1/2 -mx-[50vw] flex w-screen items-end justify-end">
          <div className="pointer-events-auto mr-4 flex items-center rounded-2xl bg-white px-6 py-3 shadow-md sm:mr-6 lg:mr-8">
            <img src="/figma/images/logo.png" alt="Pocket Creatives" className="h-[42px] w-[110px] object-contain sm:h-[48px] sm:w-[130px]" />
          </div>
        </div>
      </div>
    </div>

    <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
      <div className="border-t border-white/20" />
    </div>

    <div className="mx-auto max-w-[1280px] px-6 sm:px-10 lg:px-12">
      <div className="pt-8">
        <h3 className="mb-4 text-lg font-bold text-black">QuickLinks</h3>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-wider text-white sm:text-sm">
          {footerQuickLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="cursor-pointer transition-colors duration-200 hover:text-brand-yellow"
            >
              {link}
            </a>
          ))}
        </nav>
      </div>

      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
        <div className="mt-6 border-t border-white/20" />
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-4 pt-6 md:flex-row">
        <div className="flex items-center gap-4 text-xl sm:text-2xl">
          {footerSocials.map((social) => (
            <a
              key={social.name}
              href={social.icon}
              aria-label={social.name}
              className="inline-flex h-8 w-8 items-center justify-center transition-colors duration-200 hover:text-brand-yellow"
            >
              <img src={social.icon} alt={social.name} className="h-5 w-5 object-contain" />
            </a>
          ))}
        </div>

        <p className="text-xs text-white/80">Designed &amp; Built By Seek Marketing Partners 2025</p>
      </div>
    </div>
  </footer>
);

export default Footer;