import * as React from "react";

export const initialContactValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export const contactFieldLabels = {
  name: "What's your name?",
  email: "Your email address?",
  phone: "Your contact number?",
  message: "How can we help?",
};

export const validateContactField = (field, value) => {
  const trimmedValue = value.trim();
  if (!trimmedValue) return `${contactFieldLabels[field]} is required.`;
  if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) return "Please enter a valid email address.";
  if (field === "phone") {
    const digitCount = (trimmedValue.match(/\d/g) || []).length;
    if (!/^[\d\s+()\-]+$/.test(trimmedValue) || digitCount < 7 || digitCount > 15) return "Please enter a valid phone number.";
  }
  return "";
};

const useContactForm = ({ logLabel = "Contact form" } = {}) => {
  const [values, setValues] = React.useState(initialContactValues);
  const [touched, setTouched] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [statusMessage, setStatusMessage] = React.useState("");
  const [honeypot, setHoneypot] = React.useState("");
  const fieldRefs = React.useRef({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (touched[name]) setErrors((current) => ({ ...current, [name]: validateContactField(name, value) }));
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
    setErrors((current) => ({ ...current, [name]: validateContactField(name, value) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage("");
    const nextErrors = Object.keys(values).reduce((current, field) => ({ ...current, [field]: validateContactField(field, values[field]) }), {});
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
        if (!response.ok) throw new Error("Contact form submission failed");
        setStatusMessage("Thanks, your message has been sent.");
      } else {
        // TODO: Configure GATSBY_CONTACT_FORM_ENDPOINT before enabling production submissions.
        console.info(`${logLabel} payload`, values);
        setStatusMessage("Form validated. The submission endpoint is not configured yet.");
      }
      setValues(initialContactValues);
      setTouched({});
      setErrors({});
    } catch (error) {
      setStatusMessage("We couldn't send your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { values, touched, errors, isSubmitting, statusMessage, honeypot, setHoneypot, fieldRefs, handleChange, handleBlur, handleSubmit };
};

export default useContactForm;
