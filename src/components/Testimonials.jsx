import { useTranslation } from "react-i18next";

export default function Testimonials() {
  const { t } = useTranslation();
  return (
    <section className="py-16 text-center bg-white dark:bg-gray-900">
      <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t('testimonialsTitle', { defaultValue: 'What Our Travelers Say' })}</h2>
      <p className="text-gray-600 dark:text-gray-300">{t('testimonialsSoon', { defaultValue: 'Testimonials coming soon.' })}</p>
    </section>
  );
}
