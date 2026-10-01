import * as React from "react";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const fieldLabels = {
  name: "What's your name?",
  email: "Your email address?",
  phone: "Your contact number?",
  message: "How can we help?",
};

const validateField = (field, value) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return `${fieldLabels[field]} is required.`;
  }

  if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
    return "Please enter a valid email address.";
  }

  if (field === "phone") {
    const digitCount = (trimmedValue.match(/\d/g) || []).length;
    if (!/^[\d\s+()\-]+$/.test(trimmedValue) || digitCount < 7 || digitCount > 15) {
      return "Please enter a valid phone number.";
    }
  }

  return "";
};

const PricingContact = () => {
  const [values, setValues] = React.useState(initialValues);
  const [touched, setTouched] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [statusMessage, setStatusMessage] = React.useState("");
  const [honeypot, setHoneypot] = React.useState("");
  const fieldRefs = React.useRef({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));

    if (touched[name]) {
      setErrors((current) => ({ ...current, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
    setErrors((current) => ({ ...current, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage("");

    const nextErrors = Object.keys(values).reduce((current, field) => ({
      ...current,
      [field]: validateField(field, values[field]),
    }), {});
    const invalidField = Object.keys(values).find((field) => nextErrors[field]);

    setTouched({ name: true, email: true, phone: true, message: true });
    setErrors(nextErrors);

    if (invalidField) {
      fieldRefs.current[invalidField]?.focus();
      return;
    }

    if (honeypot) {
      setStatusMessage("Thanks, your message has been sent.");
      return;
    }

    setIsSubmitting(true);

    try {
      const endpoint = process.env.GATSBY_CONTACT_FORM_ENDPOINT;

      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error("Contact form submission failed");
        }

        setStatusMessage("Thanks, your message has been sent.");
      } else {
        // TODO: Configure GATSBY_CONTACT_FORM_ENDPOINT before enabling production submissions.
        console.info("Pricing contact form payload", values);
        setStatusMessage("Form validated. The submission endpoint is not configured yet.");
      }

      setValues(initialValues);
      setTouched({});
      setErrors({});
    } catch (error) {
      setStatusMessage("We couldn't send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName = "w-full border-0 bg-white px-5 py-4 text-base sm:px-[30px] sm:py-[26px] sm:text-lg font-normal leading-none tracking-[-0.9px] text-black placeholder:text-brand-slate focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal";

  return (
    <section className="bg-brand-bg px-6 py-14 sm:px-10 md:py-24 min-[1440px]:px-0 min-[1440px]:py-[105px]">
      {/* Stacked below 1280px; two columns from xl, full Figma widths at 1440+ */}
      <div className="mx-auto grid max-w-[1378px] grid-cols-1 items-center gap-10 md:gap-14 xl:grid-cols-[minmax(0,420px)_minmax(0,738px)] xl:justify-center xl:gap-12 min-[1440px]:grid-cols-[486.833px_minmax(0,738px)] min-[1440px]:gap-[153px]">
        <div>
          <h2 className="text-5xl font-bold leading-none tracking-[-2.5px] text-brand-teal sm:text-6xl md:text-7xl xl:text-[64px] xl:tracking-[-3px] min-[1440px]:text-[80px] min-[1440px]:tracking-[-4px]">
            Get In Touch
          </h2>
          <p className="mt-5 max-w-[510px] text-2xl font-medium leading-none tracking-[-1.2px] text-brand-slate sm:mt-6 sm:text-3xl md:text-4xl xl:text-[32px] xl:tracking-[-1.6px] min-[1440px]:mt-[34px] min-[1440px]:text-[40px] min-[1440px]:tracking-[-2px]">
            Drop us a mail, let us know your budget, and we&apos;ll share what we can offer
          </p>
        </div>

        <form noValidate onSubmit={handleSubmit} className="relative w-full max-w-[738px] xl:max-w-none" aria-describedby="pricing-contact-status">
          <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="pricing-contact-company">Company</label>
            <input
              id="pricing-contact-company"
              tabIndex="-1"
              autoComplete="off"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-[22.5px]">
            {[
              { field: "name", type: "text", placeholder: "John Doe", autoComplete: "name" },
              { field: "email", type: "email", placeholder: "johndoe@example.com", autoComplete: "email" },
              { field: "phone", type: "tel", placeholder: "999-999-9999", autoComplete: "tel" },
            ].map(({ field, type, placeholder, autoComplete }) => {
              const errorId = `pricing-contact-${field}-error`;
              const hasError = Boolean(touched[field] && errors[field]);

              return (
                <div key={field}>
                  <label htmlFor={`pricing-contact-${field}`} className="block text-base font-extrabold leading-none tracking-[-0.8px] text-black sm:text-lg min-[1440px]:text-xl min-[1440px]:tracking-[-1px]">
                    {fieldLabels[field]} <span aria-hidden="true" className="text-[#EA4335]">*</span>
                  </label>
                  <input
                    ref={(element) => { fieldRefs.current[field] = element; }}
                    id={`pricing-contact-${field}`}
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
            <label htmlFor="pricing-contact-message" className="block text-base font-extrabold leading-none tracking-[-0.8px] text-black sm:text-lg min-[1440px]:text-xl min-[1440px]:tracking-[-1px]">
              {fieldLabels.message} <span aria-hidden="true" className="text-[#EA4335]">*</span>
            </label>
            <textarea
              ref={(element) => { fieldRefs.current.message = element; }}
              id="pricing-contact-message"
              name="message"
              required
              aria-required="true"
              aria-invalid={Boolean(touched.message && errors.message)}
              aria-describedby={touched.message && errors.message ? "pricing-contact-message-error" : undefined}
              placeholder="I would like to ask you..."
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputClassName} mt-3 min-h-[160px] resize-y sm:mt-4 sm:min-h-[177px]`}
            />
            {touched.message && errors.message && <p id="pricing-contact-message-error" className="mt-2 text-sm font-medium text-[#EA4335]" aria-live="polite">{errors.message}</p>}
          </div>

          <div className="mt-5 flex sm:justify-end min-[1440px]:mt-[21.69px]">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-brand-accent-yellow px-[61px] py-4 text-lg sm:w-auto sm:py-5 sm:text-xl font-extrabold leading-none tracking-[-1px] text-black transition-colors duration-200 ease-in-out hover:bg-brand-teal hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </div>

          <p id="pricing-contact-status" className="mt-5 text-sm font-medium text-brand-slate" aria-live="polite">
            {statusMessage}
          </p>
        </form>
      </div>
    </section>
  );
};

export default PricingContact;