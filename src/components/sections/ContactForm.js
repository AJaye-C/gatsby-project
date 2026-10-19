import * as React from "react";
import useContactForm, { contactFieldLabels } from "../../hooks/useContactForm";
import { splitParagraphs } from "../../utils/acf";
import { stageNumeralSrc } from "../../utils/stageNumeral";

// Page-builder layout: "contact_form"  (fields: heading, text, variant, formHeading, stageNumber)
//
// `variant` (Select) picks the look:
//   inline : heading + short text on the left, form on the right, light background (Pricing page)
//   hero   : full teal hero with a big white 3-line heading, paragraphs and the form (Contact page)
//   yellow : yellow band, big black heading left, form right, teal Send button (Photography page)
//   yellow-wide : like yellow but a wider grid, with a paragraph under the heading (Testimonial pages)
//   stage  : yellow band with a faint stage numeral, big white heading + paragraphs on the left,
//            a form heading and the form on the right (How we work, stage 3)
// An empty or unknown value falls back to "inline". To add a look, add one entry to `variants`
// (class strings must be complete literals, gotcha 11). The variant also prefixes the field ids and
// labels the log line, so two different variants can share a page without clashing ids.
//
// heading:     one line per row if it contains line breaks (use a Text Area field for hero and stage).
// text:        inline = one block of text; hero and stage = one paragraph per line (Text Area).
// formHeading: stage only; the heading above the form fields (Text).
// stageNumber: stage only; Select "1" | "2" | "3" for the faint background numeral (empty = none).
const variants = {
  inline: {
    paragraphs: false,
    headingTag: "h2",
    section: "bg-brand-bg px-6 py-14 sm:px-10 md:py-24 min-[1440px]:px-0 min-[1440px]:py-[105px]",
    grid:
      "mx-auto grid max-w-[1378px] grid-cols-1 items-center gap-10 md:gap-14 xl:grid-cols-[minmax(0,420px)_minmax(0,738px)] xl:justify-center xl:gap-12 min-[1440px]:grid-cols-[486.833px_minmax(0,738px)] min-[1440px]:gap-[153px]",
    copy: "",
    heading:
      "text-5xl font-bold leading-none tracking-[-2.5px] text-brand-teal sm:text-6xl md:text-7xl xl:text-[64px] xl:tracking-[-3px] min-[1440px]:text-[80px] min-[1440px]:tracking-[-4px]",
    text:
      "mt-5 max-w-[510px] text-2xl font-medium leading-none tracking-[-1.2px] text-brand-slate sm:mt-6 sm:text-3xl md:text-4xl xl:text-[32px] xl:tracking-[-1.6px] min-[1440px]:mt-[34px] min-[1440px]:text-[40px] min-[1440px]:tracking-[-2px]",
    form: "relative w-full max-w-[738px] xl:max-w-none",
    fields: "grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-[22.5px]",
    label:
      "block text-base font-extrabold leading-none tracking-[-0.8px] text-black sm:text-lg min-[1440px]:text-xl min-[1440px]:tracking-[-1px]",
    input:
      "w-full border-0 bg-white px-5 py-4 text-base sm:px-[30px] sm:py-[26px] sm:text-lg font-normal leading-none tracking-[-0.9px] text-black placeholder:text-brand-slate focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal",
    inputSize: "mt-3 h-14 sm:mt-4 sm:h-[70.408px]",
    message: "mt-5 sm:mt-6",
    textarea: "mt-3 min-h-[160px] resize-y sm:mt-4 sm:min-h-[177px]",
    submitWrap: "mt-5 flex sm:justify-end min-[1440px]:mt-[21.69px]",
    button:
      "w-full rounded-full bg-brand-accent-yellow px-[61px] py-4 text-lg sm:w-auto sm:py-5 sm:text-xl font-extrabold leading-none tracking-[-1px] text-black transition-colors duration-200 ease-in-out hover:bg-brand-teal hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60",
    status: "mt-5 text-sm font-medium text-brand-slate",
    statusEmpty: "mt-5 text-sm font-medium text-brand-slate",
  },
  hero: {
    paragraphs: true,
    paragraph: "mt-5 leading-[1.29]",
    headingTag: "h1",
    section:
      "min-h-[1072px] bg-brand-teal px-6 pb-20 pt-[120px] text-white sm:px-10 sm:pt-[160px] lg:px-[clamp(24px,2.5vw,48px)] lg:pb-[100px] lg:pt-[200px]",
    grid:
      "mx-auto grid max-w-[1443px] grid-cols-1 gap-16 lg:grid-cols-[minmax(0,636fr)_minmax(0,738fr)] lg:gap-[clamp(32px,4.8vw,69px)]",
    copy: "lg:pt-[3px]",
    heading:
      "max-w-[636px] text-[clamp(3.5rem,6.25vw,7.5rem)] font-extrabold leading-none tracking-[-0.05em] text-white",
    text: "mt-[34px] max-w-[599px] text-xl font-medium leading-none tracking-[-1px] text-white",
    form: "relative w-full lg:min-h-[661px]",
    fields: "grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-[22.5px] lg:grid-cols-1 xl:grid-cols-3",
    label:
      "block text-xl font-extrabold leading-none tracking-[-1px] text-white xl:text-[clamp(1rem,1.25vw,1.25rem)]",
    input:
      "w-full border-0 bg-white px-5 py-[26px] min-[1600px]:px-[30px] text-lg font-normal leading-none tracking-[-0.9px] text-black placeholder:text-brand-slate focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-brand-teal",
    inputSize: "mt-4 h-[70.408px]",
    message: "mt-6",
    textarea: "mt-4 min-h-[395px] resize-y",
    submitWrap: "mt-[21.69px] flex justify-end",
    button:
      "rounded-full bg-brand-accent-yellow px-[61px] py-5 text-xl font-extrabold leading-none tracking-[-1px] text-black transition-colors duration-200 ease-in-out hover:bg-white hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-brand-teal disabled:cursor-wait disabled:opacity-60",
    status:
      "mt-5 border-l-4 border-brand-red bg-brand-bg px-3 py-2 text-sm font-medium text-brand-text-dark",
    statusEmpty: "mt-5 sr-only",
  },
  stage: {
    paragraphs: true,
    paragraph: "mt-5",
    watermark:
      "pointer-events-none absolute left-[5%] top-10 -z-10 h-auto w-[75%] max-w-[400px] select-none object-contain opacity-50 sm:left-[8%] sm:w-[50%] lg:left-[12%] lg:top-20 lg:w-[43%] lg:max-w-none",
    headingTag: "h2",
    section:
      "relative isolate overflow-hidden bg-brand-accent-yellow px-[clamp(24px,8vw,150px)] pb-12 pt-20 lg:min-h-[957px] lg:pb-20 lg:pt-[200px] min-[1920px]:px-0",
    grid:
      "mx-auto grid max-w-[1448px] grid-cols-1 gap-14 lg:items-start xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] xl:gap-[4vw] min-[1920px]:grid-cols-[minmax(0,636px)_minmax(0,738px)] min-[1920px]:gap-[45px]",
    copy: "lg:pt-[166px]",
    heading:
      "text-[clamp(4rem,6.25vw,7.5rem)] font-extrabold leading-none tracking-[-6px] text-white",
    text: "mt-[68px] max-w-[599px] text-[20px] font-medium leading-none tracking-[-1px] text-black",
    formHeading:
      "mb-8 max-w-[713px] text-[clamp(2rem,2.083vw,2.5rem)] font-extrabold leading-none tracking-[-2px] text-black",
    form: "relative w-full",
    fields: "grid grid-cols-1 gap-5 md:grid-cols-3 md:items-end md:gap-[22.5px]",
    label:
      "block text-base font-extrabold leading-none tracking-[-0.8px] text-black sm:text-lg xl:text-base min-[1920px]:text-xl min-[1920px]:tracking-[-1px]",
    input:
      "w-full border-0 bg-white px-5 py-4 text-base sm:px-[30px] sm:py-[26px] sm:text-lg font-normal leading-none tracking-[-0.9px] text-black placeholder:text-brand-slate focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal",
    inputSize: "mt-3 h-14 sm:mt-4 sm:h-[70.408px]",
    message: "mt-5 sm:mt-6",
    textarea: "mt-3 min-h-[300px] resize-y sm:mt-4 sm:min-h-[395px]",
    submitWrap: "mt-5 flex justify-end",
    button:
      "w-full rounded-full bg-brand-teal px-[61px] py-4 text-lg font-extrabold leading-none tracking-[-1px] text-white transition-colors duration-200 ease-in-out hover:bg-white hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60 sm:w-auto sm:py-5 sm:text-xl",
    status: "mt-5 text-sm font-medium text-black",
    statusEmpty: "mt-5 text-sm font-medium text-black",
  },
  yellow: {
    paragraphs: false,
    headingTag: "h2",
    section:
      "bg-brand-accent-yellow px-8 py-14 sm:px-12 sm:py-20 md:px-16 lg:px-[clamp(64px,4.5vw,150px)] lg:py-24 min-[1440px]:min-h-[606px] min-[1440px]:py-[141px] min-[1920px]:px-0",
    grid:
      "mx-auto grid max-w-[1316px] grid-cols-1 items-start gap-10 sm:gap-12 min-[1440px]:grid-cols-[minmax(0,583fr)_minmax(0,738fr)] min-[1440px]:gap-[46px]",
    copy: "",
    heading:
      "max-w-[583px] break-words text-4xl font-extrabold leading-none tracking-[-2px] text-black sm:text-5xl md:max-w-[720px] md:text-6xl lg:tracking-[-4px] min-[1440px]:max-w-[583px] min-[1440px]:text-[80px]",
    text: "mt-6 max-w-[583px] text-lg font-medium leading-[1.3] tracking-[-0.5px] text-black",
    form: "relative w-full",
    fields: "grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3 lg:gap-[22.5px]",
    label:
      "block text-base font-extrabold leading-none tracking-[-0.8px] text-black sm:text-lg min-[1440px]:text-xl min-[1440px]:tracking-[-1px]",
    input:
      "w-full border-0 bg-white px-5 py-4 text-base sm:px-[30px] sm:py-[26px] sm:text-lg font-normal leading-none tracking-[-0.9px] text-black placeholder:text-brand-slate focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-brand-accent-yellow",
    inputSize: "mt-3 h-14 sm:mt-4 sm:h-[70.408px]",
    message: "mt-5 sm:mt-6",
    textarea: "mt-3 min-h-[142px] resize-y sm:mt-4 sm:min-h-[177px]",
    submitWrap: "mt-5 flex sm:mt-[21.69px] sm:justify-end",
    button:
      "w-full rounded-full bg-brand-teal px-10 py-4 text-lg font-extrabold leading-none tracking-[-1px] text-white transition-colors duration-200 hover:bg-white hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60 sm:w-auto sm:px-[61px] sm:py-5 sm:text-xl",
    status: "mt-5 text-sm font-medium text-black",
    statusEmpty: "mt-5 text-sm font-medium text-black",
  },
  "yellow-wide": {
    paragraphs: false,
    headingTag: "h2",
    section:
      "bg-brand-accent-yellow px-8 py-14 sm:px-12 sm:py-20 md:px-16 lg:px-[clamp(24px,8vw,150px)] min-[1920px]:px-0 min-[1920px]:py-[109px]",
    grid:
      "mx-auto grid max-w-[1412px] grid-cols-1 gap-10 sm:gap-12 min-[1440px]:grid-cols-[minmax(0,636fr)_minmax(0,738fr)] min-[1440px]:gap-[30px]",
    copy: "",
    heading:
      "max-w-[636px] break-words text-[clamp(2.5rem,8vw,3.5rem)] font-extrabold leading-none tracking-[-2px] text-black lg:text-[clamp(3.5rem,4.167vw,5rem)] lg:tracking-[-4px]",
    text: "mt-6 max-w-[599px] text-lg font-medium leading-[1.3] tracking-[-0.5px] text-black sm:mt-12 sm:text-xl sm:tracking-[-1px] min-[1440px]:leading-none",
    form: "relative w-full",
    fields: "grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-[22.5px]",
    label:
      "block text-base font-extrabold leading-none tracking-[-0.8px] text-black min-[1920px]:text-xl min-[1920px]:tracking-[-1px]",
    input:
      "w-full border-0 bg-white px-5 py-4 text-base font-normal leading-none tracking-[-0.9px] text-black placeholder:text-brand-slate focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal sm:px-[30px] sm:py-[26px] sm:text-lg",
    inputSize: "mt-3 h-14 sm:mt-4 sm:h-[70.408px]",
    message: "mt-5 sm:mt-6",
    textarea: "mt-3 min-h-[142px] resize-y sm:mt-4",
    submitWrap: "mt-5 flex sm:justify-end",
    button:
      "w-full rounded-full bg-brand-teal px-10 py-3 text-lg font-extrabold leading-none tracking-[-1px] text-white transition-colors duration-200 hover:bg-white hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60 sm:w-auto",
    status: "mt-5 text-sm font-medium text-black",
    statusEmpty: "mt-5 text-sm font-medium text-black",
  },
};

// Select fields can arrive as a string or a list; "default"/empty/unknown fall back to "inline".
const variantKey = (variant) => {
  const raw = Array.isArray(variant) ? variant[0] : variant;
  const key = String(raw || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return variants[key] ? key : "inline";
};

const fields = [
  { field: "name", type: "text", placeholder: "John Doe", autoComplete: "name" },
  { field: "email", type: "email", placeholder: "johndoe@example.com", autoComplete: "email" },
  { field: "phone", type: "tel", placeholder: "999-999-9999", autoComplete: "tel" },
];

const ContactForm = ({ heading = "", text = "", variant = "", formHeading = "", stageNumber = "" }) => {
  const key = variantKey(variant);
  const styles = variants[key];
  const idPrefix = `contact-${key}`;
  const HeadingTag = styles.headingTag;
  const numeral = styles.watermark ? stageNumeralSrc(stageNumber) : "";
  const headingLines = String(heading || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

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
  } = useContactForm({ logLabel: `Contact form (${key})` });

  const inputClassName = `${styles.input} ${styles.inputSize}`;

  return (
    <section className={styles.section}>
      {numeral && <img src={numeral} alt="" aria-hidden="true" className={styles.watermark} />}
      {/* inline: stacked below 1280px, two columns from xl, full Figma widths at 1440+. hero: two columns from lg. */}
      <div className={styles.grid}>
        <div className={styles.copy}>
          {headingLines.length > 0 && (
            <HeadingTag className={styles.heading}>
              {headingLines.length > 1
                ? headingLines.map((line, index) => (
                    <span key={`${line}-${index}`} className="block">
                      {line}
                    </span>
                  ))
                : headingLines[0]}
            </HeadingTag>
          )}

          {text &&
            (styles.paragraphs ? (
              <div className={styles.text}>
                {splitParagraphs(text).map((paragraph, index) => (
                  <p key={`${paragraph}-${index}`} className={index > 0 ? styles.paragraph : undefined}>
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <p className={styles.text}>{text}</p>
            ))}
        </div>

        <form noValidate onSubmit={handleSubmit} className={styles.form} aria-describedby={`${idPrefix}-status`}>
          {styles.formHeading && formHeading && <h2 className={styles.formHeading}>{formHeading}</h2>}
          <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor={`${idPrefix}-company`}>Company</label>
            <input
              id={`${idPrefix}-company`}
              tabIndex="-1"
              autoComplete="off"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
            />
          </div>

          <div className={styles.fields}>
            {fields.map(({ field, type, placeholder, autoComplete }) => {
              const errorId = `${idPrefix}-${field}-error`;
              const hasError = Boolean(touched[field] && errors[field]);

              return (
                <div key={field}>
                  <label htmlFor={`${idPrefix}-${field}`} className={styles.label}>
                    {contactFieldLabels[field]} <span aria-hidden="true" className="text-[#EA4335]">*</span>
                  </label>
                  <input
                    ref={(element) => { fieldRefs.current[field] = element; }}
                    id={`${idPrefix}-${field}`}
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
                    className={inputClassName}
                  />
                  {hasError && (
                    <p id={errorId} className="mt-2 text-sm font-medium text-[#EA4335]" aria-live="polite">
                      {errors[field]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className={styles.message}>
            <label htmlFor={`${idPrefix}-message`} className={styles.label}>
              {contactFieldLabels.message} <span aria-hidden="true" className="text-[#EA4335]">*</span>
            </label>
            <textarea
              ref={(element) => { fieldRefs.current.message = element; }}
              id={`${idPrefix}-message`}
              name="message"
              required
              aria-required="true"
              aria-invalid={Boolean(touched.message && errors.message)}
              aria-describedby={touched.message && errors.message ? `${idPrefix}-message-error` : undefined}
              placeholder="I would like to ask you..."
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${styles.input} ${styles.textarea}`}
            />
            {touched.message && errors.message && (
              <p id={`${idPrefix}-message-error`} className="mt-2 text-sm font-medium text-[#EA4335]" aria-live="polite">
                {errors.message}
              </p>
            )}
          </div>

          <div className={styles.submitWrap}>
            <button type="submit" disabled={isSubmitting} className={styles.button}>
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </div>

          <p id={`${idPrefix}-status`} className={statusMessage ? styles.status : styles.statusEmpty} aria-live="polite">
            {statusMessage}
          </p>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;