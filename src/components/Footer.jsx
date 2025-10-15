import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="py-8 text-center text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900">
      <p>© {new Date().getFullYear()} Flyora. {t('footerRights', { defaultValue: 'All rights reserved.' })}</p>
    </footer>
  );
}
