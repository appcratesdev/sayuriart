"use client";

import { useRef, useState } from "react";

export interface ContactFormText {
  nameLabel?: string;
  namePlaceholder?: string;
  emailInputLabel?: string;
  emailPlaceholder?: string;
  typeLabel?: string;
  projectTypes?: Array<{ _key?: string; value: string; label: string }>;
  messageLabel?: string;
  messagePlaceholder?: string;
  attachmentLabel?: string;
  attachmentHelpText?: string;
  submitLabel?: string;
  submittingLabel?: string;
  successMessage?: string;
  errorMessage?: string;
  nameRequiredError?: string;
  emailRequiredError?: string;
  emailInvalidError?: string;
  messageRequiredError?: string;
  messageTooLongError?: string;
  attachmentTypeError?: string;
  attachmentSizeError?: string;
  nameLabelEdit?: string;
  namePlaceholderEdit?: string;
  emailInputLabelEdit?: string;
  emailPlaceholderEdit?: string;
  typeLabelEdit?: string;
  projectTypesEdit?: string;
  messageLabelEdit?: string;
  messagePlaceholderEdit?: string;
  attachmentLabelEdit?: string;
  attachmentHelpTextEdit?: string;
  submitLabelEdit?: string;
  submittingLabelEdit?: string;
  successMessageEdit?: string;
  errorMessageEdit?: string;
  nameRequiredErrorEdit?: string;
  emailRequiredErrorEdit?: string;
  emailInvalidErrorEdit?: string;
  messageRequiredErrorEdit?: string;
  messageTooLongErrorEdit?: string;
  attachmentTypeErrorEdit?: string;
  attachmentSizeErrorEdit?: string;
}

type FooterDict = {
  options?: Record<string, string>;
  nameLabel?: string;
  namePlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  typeLabel?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  submit?: string;
};

const sanitizeInput = (input: string) =>
  input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

export const ContactForm = ({ dict, content }: { dict: FooterDict; content?: ContactFormText }) => {
  const projectTypes = content?.projectTypes?.length
    ? content.projectTypes
    : Object.entries(dict.options || {}).map(([value, label]) => ({ value, label }));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: projectTypes[0]?.value || "",
    message: "",
  });
  const [files, setFiles] = useState<FileList | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = content?.nameRequiredError || "Imie jest wymagane";
    }

    if (!formData.email.trim()) {
      newErrors.email = content?.emailRequiredError || "Email jest wymagany";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = content?.emailInvalidError || "Podaj poprawny adres email";
    }

    if (!formData.message.trim()) {
      newErrors.message = content?.messageRequiredError || "Wiadomosc jest wymagana";
    } else if (formData.message.length > 2000) {
      newErrors.message = content?.messageTooLongError || "Wiadomosc jest zbyt dluga (max 2000 znakow)";
    }

    if (files) {
      for (let i = 0; i < files.length; i++) {
        if (!ALLOWED_TYPES.includes(files[i].type)) {
          newErrors.attachment =
            content?.attachmentTypeError || "Niedozwolony format pliku. Dozwolone: JPG, PNG, WEBP, PDF";
          break;
        }
        if (files[i].size > MAX_FILE_SIZE) {
          newErrors.attachment = content?.attachmentSizeError || "Plik jest zbyt duzy. Maksymalny rozmiar to 10MB";
          break;
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus("submitting");

    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      type: sanitizeInput(formData.type),
      message: sanitizeInput(formData.message),
    };

    try {
      void sanitizedData;
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setStatus("success");
      setFormData({ name: "", email: "", type: projectTypes[0]?.value || "", message: "" });
      if (fileInputRef.current) fileInputRef.current.value = "";
      setFiles(null);

      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="form-label" data-sanity={content?.nameLabelEdit}>
          {content?.nameLabel || dict.nameLabel || "Imie"}
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          className={`form-input-dark ${errors.name ? "border-red-500" : ""}`}
          placeholder={content?.namePlaceholder || dict.namePlaceholder || "Twoje imie"}
          data-sanity={content?.namePlaceholderEdit}
          maxLength={100}
        />
        {errors.name && (
          <span className="text-red-400 text-xs mt-1 block" data-sanity={content?.nameRequiredErrorEdit}>
            {errors.name}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="email" className="form-label" data-sanity={content?.emailInputLabelEdit}>
          {content?.emailInputLabel || dict.emailLabel || "Email"}
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          className={`form-input-dark ${errors.email ? "border-red-500" : ""}`}
          placeholder={content?.emailPlaceholder || dict.emailPlaceholder || "Twoj email"}
          data-sanity={content?.emailPlaceholderEdit}
          maxLength={150}
        />
        {errors.email && (
          <span
            className="text-red-400 text-xs mt-1 block"
            data-sanity={errors.email === content?.emailInvalidError ? content?.emailInvalidErrorEdit : content?.emailRequiredErrorEdit}
          >
            {errors.email}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="type" className="form-label" data-sanity={content?.typeLabelEdit}>
          {content?.typeLabel || dict.typeLabel || "Temat"}
        </label>
        <select
          id="type"
          value={formData.type}
          onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
          className="form-input-dark appearance-none"
          data-sanity={content?.projectTypesEdit}
        >
          {projectTypes.map(({ value, label }) => (
            <option key={value} value={value} className="bg-[var(--dark-bg)]">
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="form-label" data-sanity={content?.messageLabelEdit}>
          {content?.messageLabel || dict.messageLabel || "Wiadomosc"}
        </label>
        <textarea
          id="message"
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
          className={`form-input-dark resize-none ${errors.message ? "border-red-500" : ""}`}
          placeholder={content?.messagePlaceholder || dict.messagePlaceholder || "Twoja wiadomosc"}
          data-sanity={content?.messagePlaceholderEdit}
          maxLength={2000}
        />
        {errors.message && (
          <span
            className="text-red-400 text-xs mt-1 block"
            data-sanity={errors.message === content?.messageTooLongError ? content?.messageTooLongErrorEdit : content?.messageRequiredErrorEdit}
          >
            {errors.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="attachment" className="form-label" data-sanity={content?.attachmentLabelEdit}>
          {content?.attachmentLabel || "Zalacz zdjecia / pliki (opcjonalnie)"}
        </label>
        <input
          type="file"
          id="attachment"
          multiple
          ref={fileInputRef}
          accept={ALLOWED_TYPES.join(",")}
          onChange={(e) => setFiles(e.target.files)}
          className="form-input-dark text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--primary)] file:text-[var(--primary-foreground)] hover:file:bg-[var(--primary)]/90"
        />
        {errors.attachment && (
          <span
            className="text-red-400 text-xs mt-1 block"
            data-sanity={errors.attachment === content?.attachmentSizeError ? content?.attachmentSizeErrorEdit : content?.attachmentTypeErrorEdit}
          >
            {errors.attachment}
          </span>
        )}
        <span className="text-white/40 text-xs mt-1 block" data-sanity={content?.attachmentHelpTextEdit}>
          {content?.attachmentHelpText || "Max 10MB na plik. Dozwolone: JPG, PNG, WEBP, PDF"}
        </span>
      </div>

      {status === "success" && (
        <div className="bg-green-500/20 text-green-200 p-4 rounded-md text-sm text-center" data-sanity={content?.successMessageEdit}>
          {content?.successMessage || "Wiadomosc zostala wyslana pomyslnie."}
        </div>
      )}

      {status === "error" && (
        <div className="bg-red-500/20 text-red-200 p-4 rounded-md text-sm text-center" data-sanity={content?.errorMessageEdit}>
          {content?.errorMessage || "Wystapil blad podczas wysylania wiadomosci. Sprobuj ponownie."}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn btn-white w-full py-4 mt-2 text-sm tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span data-sanity={status === "submitting" ? content?.submittingLabelEdit : content?.submitLabelEdit}>
          {status === "submitting" ? content?.submittingLabel || "Wysylanie..." : content?.submitLabel || dict.submit || "Wyslij"}
        </span>
      </button>
    </form>
  );
};
