import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="py-8 text-center text-gray-600">
      <p>© {new Date().getFullYear()} Flyora. {t('footerRights', { defaultValue: 'All rights reserved.' })}</p>
    </footer>
  );
}
