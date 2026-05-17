"use client";

import { useState, useRef } from "react";

// Basic HTML sanitization function
const sanitizeInput = (input: string) => {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
};

const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const ContactForm = ({ dict }: { dict: any }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: Object.keys(dict.options || {})[0] || "",
    message: "",
  });
  const [files, setFiles] = useState<FileList | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit per file
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Imię jest wymagane";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email jest wymagany";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Podaj poprawny adres email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Wiadomość jest wymagana";
    } else if (formData.message.length > 2000) {
      newErrors.message = "Wiadomość jest zbyt długa (max 2000 znaków)";
    }

    if (files) {
      for (let i = 0; i < files.length; i++) {
        if (!ALLOWED_TYPES.includes(files[i].type)) {
          newErrors.attachment = "Niedozwolony format pliku. Dozwolone: JPG, PNG, WEBP, PDF";
          break;
        }
        if (files[i].size > MAX_FILE_SIZE) {
          newErrors.attachment = "Plik jest zbyt duży. Maksymalny rozmiar to 10MB";
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

    // Oczyszczanie danych przed wysyłką (zabezpieczenie przed XSS)
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      type: sanitizeInput(formData.type),
      message: sanitizeInput(formData.message),
    };

    try {
      // Symulacja wysyłki do API. Tutaj podpinamy prawdziwe żądanie fetch
      // np. const response = await fetch('/api/contact', { ... })
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus("success");
      setFormData({ name: "", email: "", type: Object.keys(dict.options || {})[0] || "", message: "" });
      if (fileInputRef.current) fileInputRef.current.value = "";
      setFiles(null);
      
      // Powrót do stanu początkowego po chwili
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name" className="form-label">{dict.nameLabel || "Imię"}</label>
        <input 
          type="text" 
          id="name" 
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className={`form-input-dark ${errors.name ? 'border-red-500' : ''}`} 
          placeholder={dict.namePlaceholder || "Twoje imię"} 
          maxLength={100}
        />
        {errors.name && <span className="text-red-400 text-xs mt-1 block">{errors.name}</span>}
      </div>
      <div>
        <label htmlFor="email" className="form-label">{dict.emailLabel || "Email"}</label>
        <input 
          type="email" 
          id="email" 
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className={`form-input-dark ${errors.email ? 'border-red-500' : ''}`} 
          placeholder={dict.emailPlaceholder || "Twoj email"} 
          maxLength={150}
        />
        {errors.email && <span className="text-red-400 text-xs mt-1 block">{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="type" className="form-label">{dict.typeLabel || "Temat"}</label>
        <select 
          id="type" 
          value={formData.type}
          onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
          className="form-input-dark appearance-none"
        >
          {Object.entries(dict.options || {}).map(([value, label]) => (
            <option key={value} value={value} className="bg-[var(--dark-bg)]">
              {label as string}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="form-label">{dict.messageLabel || "Wiadomość"}</label>
        <textarea 
          id="message" 
          rows={3} 
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
          className={`form-input-dark resize-none ${errors.message ? 'border-red-500' : ''}`} 
          placeholder={dict.messagePlaceholder || "Twoja wiadomość"}
          maxLength={2000}
        />
        {errors.message && <span className="text-red-400 text-xs mt-1 block">{errors.message}</span>}
      </div>
      <div>
        <label htmlFor="attachment" className="form-label">Załącz zdjęcia / pliki (opcjonalnie)</label>
        <input 
          type="file" 
          id="attachment" 
          multiple 
          ref={fileInputRef}
          accept={ALLOWED_TYPES.join(",")}
          onChange={(e) => setFiles(e.target.files)}
          className="form-input-dark text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[var(--primary)] file:text-[var(--primary-foreground)] hover:file:bg-[var(--primary)]/90" 
        />
        {errors.attachment && <span className="text-red-400 text-xs mt-1 block">{errors.attachment}</span>}
        <span className="text-white/40 text-xs mt-1 block">Max 10MB na plik. Dozwolone: JPG, PNG, WEBP, PDF</span>
      </div>
      
      {status === "success" && (
        <div className="bg-green-500/20 text-green-200 p-4 rounded-md text-sm text-center">
          Wiadomość została wysłana pomyślnie.
        </div>
      )}
      
      {status === "error" && (
        <div className="bg-red-500/20 text-red-200 p-4 rounded-md text-sm text-center">
          Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.
        </div>
      )}

      <button 
        type="submit" 
        disabled={status === "submitting"}
        className="btn btn-white w-full py-4 mt-2 text-sm tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Wysyłanie..." : (dict.submit || "Wyślij")}
      </button>
    </form>
  );
};
