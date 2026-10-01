import * as React from "react";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const fieldLabels = {
  name: "What’s your name?",
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

const ContactHero = () => {
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
        console.info("Contact form payload", values);
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

  const labelClassName = "block text-xl font-extrabold leading-none tracking-[-1px] text-white xl:text-[clamp(1rem,1.25vw,1.25rem)]";

  const inputClassName = "w-full border-0 bg-white px-5 py-[26px] min-[1600px]:px-[30px] text-lg font-normal leading-none tracking-[-0.9px] text-black placeholder:text-brand-slate focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-brand-teal";

  return (
    <section className="min-h-[1072px] bg-brand-teal px-6 pb-20 pt-[120px] text-white sm:px-10 sm:pt-[160px] lg:px-[clamp(24px,2.5vw,48px)] lg:pb-[100px] lg:pt-[200px]">
      <div className="mx-auto grid max-w-[1443px] grid-cols-1 gap-16 lg:grid-cols-[minmax(0,636fr)_minmax(0,738fr)] lg:gap-[clamp(32px,4.8vw,69px)]">
        <div className="lg:pt-[3px]">
          <h1 className="max-w-[636px] text-[clamp(3.5rem,6.25vw,7.5rem)] font-extrabold leading-none tracking-[-0.05em] text-white">
            <span className="block">Grab a latte</span>
            <span className="block">and let&apos;s</span>
            <span className="block">have a chat</span>
          </h1>
          <div className="mt-[34px] max-w-[599px] text-xl font-medium leading-none tracking-[-1px] text-white">
            <p>Want to talk about your new project with our video and photography agency team?</p>
            <p className="mt-5 leading-[1.29]">We aim to reply within&nbsp;1 hour&nbsp;during normal working hours, so we can get you that quote and any more information as quickly as possible.</p>
            <p className="mt-5">We’d love to hear from you!</p>
          </div>
        </div>

        <form noValidate onSubmit={handleSubmit} className="w-full lg:min-h-[661px]" aria-describedby="contact-hero-status">
          <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="contact-hero-company">Company</label>
            <input
              id="contact-hero-company"
              tabIndex="-1"
              autoComplete="off"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-[22.5px] lg:grid-cols-1 xl:grid-cols-3">
            {[
              { field: "name", type: "text", placeholder: "John Doe", autoComplete: "name" },
              { field: "email", type: "email", placeholder: "johndoe@example.com", autoComplete: "email" },
              { field: "phone", type: "tel", placeholder: "999-999-9999", autoComplete: "tel" },
            ].map(({ field, type, placeholder, autoComplete }) => {
              const errorId = `contact-hero-${field}-error`;
              const hasError = Boolean(touched[field] && errors[field]);

              return (
                <div key={field}>
                  <label htmlFor={`contact-hero-${field}`} className={labelClassName}>
                    {fieldLabels[field]} <span aria-hidden="true" className="text-[#EA4335]">*</span>
                  </label>
                  <input
                    ref={(element) => { fieldRefs.current[field] = element; }}
                    id={`contact-hero-${field}`}
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
                    className={`${inputClassName} mt-4 h-[70.408px]`}
                  />
                  {hasError && <p id={errorId} className="mt-2 text-sm font-medium text-[#EA4335]" aria-live="polite">{errors[field]}</p>}
                </div>
              );
            })}
          </div>

          <div className="mt-6">
            <label htmlFor="contact-hero-message" className={labelClassName}>
              {fieldLabels.message} <span aria-hidden="true" className="text-[#EA4335]">*</span>
            </label>
            <textarea
              ref={(element) => { fieldRefs.current.message = element; }}
              id="contact-hero-message"
              name="message"
              required
              aria-required="true"
              aria-invalid={Boolean(touched.message && errors.message)}
              aria-describedby={touched.message && errors.message ? "contact-hero-message-error" : undefined}
              placeholder="I would like to ask you..."
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${inputClassName} mt-4 min-h-[395px] resize-y`}
            />
            {touched.message && errors.message && <p id="contact-hero-message-error" className="mt-2 text-sm font-medium text-[#EA4335]" aria-live="polite">{errors.message}</p>}
          </div>

          <div className="mt-[21.69px] flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-brand-accent-yellow px-[61px] py-5 text-xl font-extrabold leading-none tracking-[-1px] text-black transition-colors duration-200 ease-in-out hover:bg-white hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-brand-teal disabled:cursor-wait disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </div>

          <p id="contact-hero-status" className={`mt-5 border-l-4 border-brand-red px-3 py-2 text-sm font-medium text-brand-text-dark ${statusMessage ? "bg-brand-bg" : "sr-only"}`} aria-live="polite">
            {statusMessage}
          </p>
        </form>
      </div>
    </section>
  );
};

export default ContactHero;