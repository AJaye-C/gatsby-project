import * as React from "react";
import useContactForm from "../../hooks/useContactForm";

const labels = {
  name: "What's your name?",
  email: "Your email address?",
  phone: "Your contact number?",
  message: "How can we help?",
};

const fields = [
  { field: "name", type: "text", placeholder: "John Doe", autoComplete: "name" },
  { field: "email", type: "email", placeholder: "johndoe@example.com", autoComplete: "email" },
  { field: "phone", type: "tel", placeholder: "", autoComplete: "tel" },
];

const inputClassName =
  "w-full border-0 bg-white px-5 py-4 text-base font-normal leading-none tracking-[-0.9px] text-black placeholder:text-brand-slate focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-brand-accent-yellow sm:px-[30px] sm:py-[26px] sm:text-lg";

const labelClassName =
  "block text-base font-extrabold leading-none tracking-[-0.8px] text-black sm:text-lg min-[1440px]:text-xl min-[1440px]:tracking-[-1px]";

const PhotographyContact = () => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    statusMessage,
    honeypot,
    setHoneypot,
    fieldRefs,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useContactForm({ logLabel: "Photography contact form" });

  const messageHasError = Boolean(touched.message && errors.message);

  return (
    <section className="bg-brand-accent-yellow px-8 py-14 sm:px-12 sm:py-20 md:px-16 lg:px-[clamp(64px,4.5vw,150px)] lg:py-24 min-[1440px]:min-h-[606px] min-[1440px]:py-[141px] min-[1920px]:px-0">
      <div className="mx-auto grid max-w-[1316px] grid-cols-1 items-start gap-10 sm:gap-12 min-[1440px]:grid-cols-[minmax(0,583fr)_minmax(0,738fr)] min-[1440px]:gap-[46px]">
        <h2 className="max-w-[583px] break-words text-4xl font-extrabold leading-none tracking-[-2px] text-black sm:text-5xl md:max-w-[720px] md:text-6xl lg:tracking-[-4px] min-[1440px]:max-w-[583px] min-[1440px]:text-[80px]">
          Ready to see what we could do with your next project?
        </h2>

        <form
          noValidate
          onSubmit={handleSubmit}
          className="w-full"
          aria-describedby="photography-contact-status"
        >
          {/* Honeypot */}
          <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="photography-contact-company">Company</label>
            <input
              id="photography-contact-company"
              tabIndex="-1"
              autoComplete="off"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3 lg:gap-[22.5px]">
            {fields.map(({ field, type, placeholder, autoComplete }) => {
              const errorId = `photography-contact-${field}-error`;
              const hasError = Boolean(touched[field] && errors[field]);

              return (
                <div key={field} className="min-w-0">
                  <label htmlFor={`photography-contact-${field}`} className={labelClassName}>
                    {labels[field]}{" "}
                    <span aria-hidden="true" className="text-[#EA4335]">
                      *
                    </span>
                  </label>
                  <input
                    ref={(element) => {
                      fieldRefs.current[field] = element;
                    }}
                    id={`photography-contact-${field}`}
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
                  {hasError && (
                    <p
                      id={errorId}
                      className="mt-2 text-sm font-medium text-[#EA4335]"
                      aria-live="polite"
                    >
                      {errors[field]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-5 sm:mt-6">
            <label htmlFor="photography-contact-message" className={labelClassName}>
              {labels.message}{" "}
              <span aria-hidden="true" className="text-[#EA4335]">
                *
              </span>
            </label>
            <textarea
              ref={(element) => {
                fieldRefs.current.message = element;
              }}
              id="photography-contact-message"
              name="message"
              required
              aria-required="true"
              aria-invalid={messageHasError}
              aria-describedby={messageHasError ? "photography-contact-message-error" : undefined}
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id elit a lectus dignissim porta at sit amet ipsum."
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputClassName} mt-3 min-h-[142px] resize-y sm:mt-4 sm:min-h-[177px]`}
            />
            {messageHasError && (
              <p
                id="photography-contact-message-error"
                className="mt-2 text-sm font-medium text-[#EA4335]"
                aria-live="polite"
              >
                {errors.message}
              </p>
            )}
          </div>

          <div className="mt-5 flex sm:mt-[21.69px] sm:justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-brand-teal px-10 py-4 text-lg font-extrabold leading-none tracking-[-1px] text-white transition-colors duration-200 hover:bg-white hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60 sm:w-auto sm:px-[61px] sm:py-5 sm:text-xl"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </div>

          <p
            id="photography-contact-status"
            className={`mt-5 border-l-4 border-brand-red px-3 py-2 text-sm font-medium text-brand-text-dark ${
              statusMessage ? "bg-brand-bg" : "sr-only"
            }`}
            aria-live="polite"
          >
            {statusMessage}
          </p>
        </form>
      </div>
    </section>
  );
};

export default PhotographyContact;
