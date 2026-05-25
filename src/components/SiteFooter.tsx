import { Footer } from "./Footer";
import { getFooter, getSiteSettings } from "../../sanity/lib/fetch";
import { createSanityEdit } from "../../sanity/lib/edit";
import type { Locale } from "@/lib/i18n";

const localizedField = (field: string, locale: string) => `${field}.${locale}`;

export async function SiteFooter({ locale }: { locale: Locale }) {
  const [footer, siteSettings] = await Promise.all([getFooter(locale), getSiteSettings(locale)]);

  return (
    <Footer
      locale={locale}
      content={{
        headingStart: footer?.headingStart,
        headingAccent: footer?.headingAccent,
        description: footer?.description,
        emailLabel: footer?.emailLabel,
        socialLabel: footer?.socialLabel,
        nameLabel: footer?.nameLabel,
        namePlaceholder: footer?.namePlaceholder,
        emailInputLabel: footer?.emailInputLabel,
        emailPlaceholder: footer?.emailPlaceholder,
        typeLabel: footer?.typeLabel,
        projectTypes: footer?.projectTypes,
        messageLabel: footer?.messageLabel,
        messagePlaceholder: footer?.messagePlaceholder,
        attachmentLabel: footer?.attachmentLabel,
        attachmentHelpText: footer?.attachmentHelpText,
        submitLabel: footer?.submitLabel,
        submittingLabel: footer?.submittingLabel,
        successMessage: footer?.successMessage,
        errorMessage: footer?.errorMessage,
        nameRequiredError: footer?.nameRequiredError,
        emailRequiredError: footer?.emailRequiredError,
        emailInvalidError: footer?.emailInvalidError,
        messageRequiredError: footer?.messageRequiredError,
        messageTooLongError: footer?.messageTooLongError,
        attachmentTypeError: footer?.attachmentTypeError,
        attachmentSizeError: footer?.attachmentSizeError,
        privacyLabel: footer?.privacyLabel,
        termsLabel: footer?.termsLabel,
        developerLabel: footer?.developerLabel,
        rightsText: footer?.rightsText,
        headingStartEdit: createSanityEdit(footer, localizedField("headingStart", locale)),
        headingAccentEdit: createSanityEdit(footer, localizedField("headingAccent", locale)),
        descriptionEdit: createSanityEdit(footer, localizedField("description", locale)),
        emailLabelEdit: createSanityEdit(footer, localizedField("emailLabel", locale)),
        socialLabelEdit: createSanityEdit(footer, localizedField("socialLabel", locale)),
        nameLabelEdit: createSanityEdit(footer, localizedField("nameLabel", locale)),
        namePlaceholderEdit: createSanityEdit(footer, localizedField("namePlaceholder", locale)),
        emailInputLabelEdit: createSanityEdit(footer, localizedField("emailInputLabel", locale)),
        emailPlaceholderEdit: createSanityEdit(footer, localizedField("emailPlaceholder", locale)),
        typeLabelEdit: createSanityEdit(footer, localizedField("typeLabel", locale)),
        projectTypesEdit: createSanityEdit(footer, "projectTypes"),
        messageLabelEdit: createSanityEdit(footer, localizedField("messageLabel", locale)),
        messagePlaceholderEdit: createSanityEdit(footer, localizedField("messagePlaceholder", locale)),
        attachmentLabelEdit: createSanityEdit(footer, localizedField("attachmentLabel", locale)),
        attachmentHelpTextEdit: createSanityEdit(footer, localizedField("attachmentHelpText", locale)),
        submitLabelEdit: createSanityEdit(footer, localizedField("submitLabel", locale)),
        submittingLabelEdit: createSanityEdit(footer, localizedField("submittingLabel", locale)),
        successMessageEdit: createSanityEdit(footer, localizedField("successMessage", locale)),
        errorMessageEdit: createSanityEdit(footer, localizedField("errorMessage", locale)),
        nameRequiredErrorEdit: createSanityEdit(footer, localizedField("nameRequiredError", locale)),
        emailRequiredErrorEdit: createSanityEdit(footer, localizedField("emailRequiredError", locale)),
        emailInvalidErrorEdit: createSanityEdit(footer, localizedField("emailInvalidError", locale)),
        messageRequiredErrorEdit: createSanityEdit(footer, localizedField("messageRequiredError", locale)),
        messageTooLongErrorEdit: createSanityEdit(footer, localizedField("messageTooLongError", locale)),
        attachmentTypeErrorEdit: createSanityEdit(footer, localizedField("attachmentTypeError", locale)),
        attachmentSizeErrorEdit: createSanityEdit(footer, localizedField("attachmentSizeError", locale)),
        privacyLabelEdit: createSanityEdit(footer, localizedField("privacyLabel", locale)),
        termsLabelEdit: createSanityEdit(footer, localizedField("termsLabel", locale)),
        developerLabelEdit: createSanityEdit(footer, localizedField("developerLabel", locale)),
        rightsTextEdit: createSanityEdit(footer, localizedField("rightsText", locale)),
      }}
      settings={{
        title: siteSettings?.title,
        titleEdit: createSanityEdit(siteSettings, localizedField("title", locale)),
        email: siteSettings?.email,
        emailEdit: createSanityEdit(siteSettings, "email"),
        instagram: siteSettings?.socialLinks?.instagram,
        facebook: siteSettings?.socialLinks?.facebook,
        linkedin: siteSettings?.socialLinks?.linkedin,
      }}
    />
  );
}
