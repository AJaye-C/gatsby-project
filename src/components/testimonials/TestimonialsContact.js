import * as React from "react";
import useContactForm, { contactFieldLabels } from "../../hooks/useContactForm";

const fields = [
  { field: "name", type: "text", placeholder: "John Doe", autoComplete: "name" },
  { field: "email", type: "email", placeholder: "johndoe@example.com", autoComplete: "email" },
  { field: "phone", type: "tel", placeholder: "", autoComplete: "tel" },
];

const inputClassName =
  "w-full border-0 bg-white px-5 py-4 text-base font-normal leading-none tracking-[-0.9px] text-black placeholder:text-brand-slate focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal sm:px-[30px] sm:py-[26px] sm:text-lg";

const labelClassName =
  "block text-base font-extrabold leading-none tracking-[-0.8px] text-black min-[1920px]:text-xl min-[1920px]:tracking-[-1px]";

const TestimonialsContact = ({ heading, paragraph, logLabel }) => {
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
  } = useContactForm({ logLabel });

  const messageHasError = Boolean(touched.message && errors.message);

  return (
    <section className="bg-brand-accent-yellow px-8 py-14 sm:px-12 sm:py-20 md:px-16 lg:px-[clamp(24px,8vw,150px)] min-[1920px]:px-0 min-[1920px]:py-[109px]">
      <div className="mx-auto grid max-w-[1412px] grid-cols-1 gap-10 sm:gap-12 min-[1440px]:grid-cols-[minmax(0,636fr)_minmax(0,738fr)] min-[1440px]:gap-[30px]">
        <div>
          <h2 className="max-w-[636px] break-words text-[clamp(2.5rem,8vw,3.5rem)] font-extrabold leading-none tracking-[-2px] text-black lg:text-[clamp(3.5rem,4.167vw,5rem)] lg:tracking-[-4px]">
            {heading}
          </h2>
          <p className="mt-6 max-w-[599px] text-lg font-medium leading-[1.3] tracking-[-0.5px] text-black sm:mt-12 sm:text-xl sm:tracking-[-1px] min-[1440px]:leading-none">
            {paragraph}
          </p>
        </div>

        <form
          noValidate
          onSubmit={handleSubmit}
          className="w-full"
          aria-describedby={`${logLabel.replaceAll(" ", "-").toLowerCase()}-status`}
        >
          {/* Honeypot */}
          <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor={`${logLabel}-company`}>Company</label>
            <input
              id={`${logLabel}-company`}
              tabIndex="-1"
              autoComplete="off"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-[22.5px]">
            {fields.map(({ field, type, placeholder, autoComplete }) => {
              const errorId = `${logLabel}-${field}-error`;
              const hasError = Boolean(touched[field] && errors[field]);

              return (
                <div key={field} className="min-w-0">
                  <label htmlFor={`${logLabel}-${field}`} className={labelClassName}>
                    {contactFieldLabels[field]}{" "}
                    <span aria-hidden="true" className="text-[#EA4335]">
                      *
                    </span>
                  </label>
                  <input
                    ref={(element) => {
                      fieldRefs.current[field] = element;
                    }}
                    id={`${logLabel}-${field}`}
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
            <label htmlFor={`${logLabel}-message`} className={labelClassName}>
              {contactFieldLabels.message}{" "}
              <span aria-hidden="true" className="text-[#EA4335]">
                *
              </span>
            </label>
            <textarea
              ref={(element) => {
                fieldRefs.current.message = element;
              }}
              id={`${logLabel}-message`}
              name="message"
              required
              aria-required="true"
              aria-invalid={messageHasError}
              aria-describedby={messageHasError ? `${logLabel}-message-error` : undefined}
              placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id elit a lectus dignissim porta at sit amet ipsum."
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputClassName} mt-3 min-h-[142px] resize-y sm:mt-4`}
            />
            {messageHasError && (
              <p
                id={`${logLabel}-message-error`}
                className="mt-2 text-sm font-medium text-[#EA4335]"
                aria-live="polite"
              >
                {errors.message}
              </p>
            )}
          </div>

          <div className="mt-5 flex sm:justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-brand-teal px-10 py-3 text-lg font-extrabold leading-none tracking-[-1px] text-white transition-colors duration-200 hover:bg-white hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </div>

          <p className="mt-5 text-sm font-medium text-black" aria-live="polite">
            {statusMessage}
          </p>
        </form>
      </div>
    </section>
  );
};

export default TestimonialsContact;
