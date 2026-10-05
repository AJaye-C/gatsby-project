import * as React from "react";
import useContactForm, { contactFieldLabels } from "../../hooks/useContactForm";

const HowWeWorkContact = () => {
  const { values, touched, errors, isSubmitting, statusMessage, honeypot, setHoneypot, fieldRefs, handleChange, handleBlur, handleSubmit } = useContactForm({ logLabel: "How We Work contact form" });
  const inputClassName = "w-full border-0 bg-white px-5 py-4 text-base sm:px-[30px] sm:py-[26px] sm:text-lg font-normal leading-none tracking-[-0.9px] text-black placeholder:text-brand-slate focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal";
  const fields = [
    { field: "name", type: "text", placeholder: "John Doe", autoComplete: "name" },
    { field: "email", type: "email", placeholder: "johndoe@example.com", autoComplete: "email" },
    { field: "phone", type: "tel", placeholder: "999-999-9999", autoComplete: "tel" },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-brand-accent-yellow px-[clamp(24px,8vw,150px)] pt-20 pb-12 lg:min-h-[957px] lg:px-[clamp(24px,8vw,150px)] lg:pt-[200px] lg:pb-20 min-[1920px]:px-0">
      <img
        src="/figma/icons/3.svg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-[5%] top-10 -z-10 h-auto w-[75%] max-w-[400px] select-none object-contain opacity-50 sm:left-[8%] sm:w-[50%] lg:left-[12%] lg:top-20 lg:w-[43%] lg:max-w-none"
      />
      <div className="mx-auto grid max-w-[1448px] grid-cols-1 gap-14 lg:items-start xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] xl:gap-[4vw] min-[1920px]:grid-cols-[minmax(0,636px)_minmax(0,738px)] min-[1920px]:gap-[45px]">
        <div className="lg:pt-[166px]">
          <h2 className="text-[clamp(4rem,6.25vw,7.5rem)] font-extrabold leading-none tracking-[-6px] text-white">
            See you<br />next time
          </h2>
          <div className="mt-[68px] max-w-[599px] space-y-5 text-[20px] font-medium leading-none tracking-[-1px] text-black">
            <p>The truth of the matter, is that we love all this. We’re here because we choose to be (and because we failed the GCHQ entry quiz). We’ve built a team who genuinely care about delivering you the best service that we’re able to.</p>
            <p>The next step in the process is seeing how we can get it even better for you next time.</p>
          </div>
        </div>

        <div>
          <h2 className="max-w-[713px] text-[clamp(2rem,2.083vw,2.5rem)] font-extrabold leading-none tracking-[-2px] text-black">
            Ready to see what we could do with your next project?
          </h2>
          <form noValidate onSubmit={handleSubmit} className="relative mt-8" aria-describedby="how-we-work-contact-status">
            <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
              <label htmlFor="how-we-work-contact-company">Company</label>
              <input id="how-we-work-contact-company" tabIndex="-1" autoComplete="off" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} />
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:items-end md:gap-[22.5px]">
              {fields.map(({ field, type, placeholder, autoComplete }) => {
                const errorId = `how-we-work-contact-${field}-error`;
                const hasError = Boolean(touched[field] && errors[field]);
                return (
                  <div key={field}>
                    <label htmlFor={`how-we-work-contact-${field}`} className="block text-base font-extrabold leading-none tracking-[-0.8px] text-black sm:text-lg xl:text-base min-[1920px]:text-xl min-[1920px]:tracking-[-1px]">
                      {contactFieldLabels[field]} <span aria-hidden="true" className="text-[#EA4335]">*</span>
                    </label>
                    <input
                      ref={(element) => { fieldRefs.current[field] = element; }}
                      id={`how-we-work-contact-${field}`}
                      name={field}
                      type={type}
                      placeholder={placeholder}
                      autoComplete={autoComplete}
                      required
                      aria-required="true"
                      aria-invalid={hasError}
                      aria-describedby={hasError ? errorId : undefined}
                      value={values[field]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${inputClassName} mt-3 h-14 sm:mt-4 sm:h-[70.408px]`}
                    />
                    {hasError && <p id={errorId} className="mt-2 text-sm font-medium text-[#EA4335]" aria-live="polite">{errors[field]}</p>}
                  </div>
                );
              })}
            </div>
            <div className="mt-5 sm:mt-6">
              <label htmlFor="how-we-work-contact-message" className="block text-base font-extrabold leading-none tracking-[-0.8px] text-black sm:text-lg xl:text-base min-[1920px]:text-xl min-[1920px]:tracking-[-1px]">
                {contactFieldLabels.message} <span aria-hidden="true" className="text-[#EA4335]">*</span>
              </label>
              <textarea
                ref={(element) => { fieldRefs.current.message = element; }}
                id="how-we-work-contact-message"
                name="message"
                required
                aria-required="true"
                aria-invalid={Boolean(touched.message && errors.message)}
                aria-describedby={touched.message && errors.message ? "how-we-work-contact-message-error" : undefined}
                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id elit a lectus dignissim porta at sit amet ipsum. Mauris euismod placerat elementum. Ut scelerisque leo mauris, a lobortis enim aliquam quis. Fusce aliquam ornare pharetra. Curabitur eros ligula, egestas at lacinia vitae, rutrum quis mauris."
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`${inputClassName} mt-3 min-h-[300px] resize-y sm:mt-4 sm:min-h-[395px]`}
              />
              {touched.message && errors.message && <p id="how-we-work-contact-message-error" className="mt-2 text-sm font-medium text-[#EA4335]" aria-live="polite">{errors.message}</p>}
            </div>
            <div className="mt-5 flex justify-end">
              <button type="submit" disabled={isSubmitting} className="w-full rounded-full bg-brand-teal px-[61px] py-4 text-lg font-extrabold leading-none tracking-[-1px] text-white transition-colors duration-200 ease-in-out hover:bg-white hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60 sm:w-auto sm:py-5 sm:text-xl">
                {isSubmitting ? "Sending..." : "Send"}
              </button>
            </div>
            <p id="how-we-work-contact-status" className="mt-5 text-sm font-medium text-black" aria-live="polite">{statusMessage}</p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkContact;