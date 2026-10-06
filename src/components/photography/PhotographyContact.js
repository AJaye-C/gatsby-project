import * as React from "react";
import useContactForm from "../../hooks/useContactForm";

const PhotographyContact = () => {
  const { values, touched, errors, isSubmitting, statusMessage, honeypot, setHoneypot, fieldRefs, handleChange, handleBlur, handleSubmit } = useContactForm({ logLabel: "Photography contact form" });
  const labels = { name: "What's your name?", email: "Your email address?", phone: "Your contact number?", message: "How can we help?" };
  const inputClassName = "w-full border-0 bg-white px-[30px] py-[26px] text-lg font-normal leading-none tracking-[-0.9px] text-black placeholder:text-brand-slate focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 focus-visible:ring-offset-brand-accent-yellow";

  return (
    <section className="bg-brand-accent-yellow px-6 py-20 sm:px-10 lg:min-h-[606px] lg:px-0 lg:py-[141px]">
      <div className="mx-auto grid max-w-[1316px] grid-cols-1 items-start gap-16 lg:grid-cols-[583px_738px] lg:gap-[46px]">
        <h2 className="max-w-[583px] text-5xl font-extrabold leading-none tracking-[-4px] text-black sm:text-6xl lg:text-[80px]">
          Ready to see what we could do with your next project?
        </h2>
        <form noValidate onSubmit={handleSubmit} className="w-full" aria-describedby="photography-contact-status">
          <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true"><label htmlFor="photography-contact-company">Company</label><input id="photography-contact-company" tabIndex="-1" value={honeypot} onChange={(event) => setHoneypot(event.target.value)} /></div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-[22.5px]">
            {[{ field: "name", type: "text", placeholder: "John Doe", autoComplete: "name" }, { field: "email", type: "email", placeholder: "johndoe@example.com", autoComplete: "email" }, { field: "phone", type: "tel", placeholder: "", autoComplete: "tel" }].map(({ field, type, placeholder, autoComplete }) => {
              const errorId = `photography-contact-${field}-error`;
              const hasError = Boolean(touched[field] && errors[field]);
              return <div key={field}><label htmlFor={`photography-contact-${field}`} className="block text-xl font-extrabold leading-none tracking-[-1px] text-black">{labels[field]} <span aria-hidden="true" className="text-[#EA4335]">*</span></label><input ref={(element) => { fieldRefs.current[field] = element; }} id={`photography-contact-${field}`} name={field} type={type} placeholder={placeholder} autoComplete={autoComplete} required aria-required="true" aria-invalid={hasError} aria-describedby={hasError ? errorId : undefined} value={values[field]} onChange={handleChange} onBlur={handleBlur} className={`${inputClassName} mt-4 h-[70.408px]`} />{hasError && <p id={errorId} className="mt-2 text-sm font-medium text-[#EA4335]" aria-live="polite">{errors[field]}</p>}</div>;
            })}
          </div>
          <div className="mt-6"><label htmlFor="photography-contact-message" className="block text-xl font-extrabold leading-none tracking-[-1px] text-black">{labels.message} <span aria-hidden="true" className="text-[#EA4335]">*</span></label><textarea ref={(element) => { fieldRefs.current.message = element; }} id="photography-contact-message" name="message" required aria-required="true" aria-invalid={Boolean(touched.message && errors.message)} aria-describedby={touched.message && errors.message ? "photography-contact-message-error" : undefined} placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut id elit a lectus dignissim porta at sit amet ipsum." value={values.message} onChange={handleChange} onBlur={handleBlur} className={`${inputClassName} mt-4 min-h-[177px] resize-y`} />{touched.message && errors.message && <p id="photography-contact-message-error" className="mt-2 text-sm font-medium text-[#EA4335]" aria-live="polite">{errors.message}</p>}</div>
          <div className="mt-[21.69px] flex justify-end"><button type="submit" disabled={isSubmitting} className="rounded-full bg-brand-teal px-[61px] py-5 text-xl font-extrabold leading-none tracking-[-1px] text-white transition-colors duration-200 hover:bg-white hover:text-brand-teal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60">{isSubmitting ? "Sending..." : "Send"}</button></div>
          <p id="photography-contact-status" className={`mt-5 border-l-4 border-brand-red px-3 py-2 text-sm font-medium text-brand-text-dark ${statusMessage ? "bg-brand-bg" : "sr-only"}`} aria-live="polite">{statusMessage}</p>
        </form>
      </div>
    </section>
  );
};

export default PhotographyContact;