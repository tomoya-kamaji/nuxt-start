import { type ContactForm, contactSchema } from "../type/contact";

export const useContactForm = () => {
  const form = useState<ContactForm>("contactForm", () => ({
    name: "",
    email: "",
    subject: "",
    message: "",
  }));

  const errors = useState<Partial<Record<keyof ContactForm, string>>>(
    "contactFormErrors",
    () => ({})
  );

  const validateForm = () => {
    const result = contactSchema.safeParse(form.value);
    if (!result.success) {
      return false;
    }
    errors.value = {};
    return true;
  };

  return {
    form,
    errors,
    validateForm,
  };
};
