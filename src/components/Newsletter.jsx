import { useTranslation } from "react-i18next";

export default function Newsletter() {
  const { t } = useTranslation();
  return (
    <section className="bg-blue-600 dark:bg-blue-700 text-white text-center py-16 px-4">
      <h2 className="text-3xl font-bold mb-4">{t('newsletterTitle', { defaultValue: 'Stay Updated with Our Travel Newsletter' })}</h2>
      <p className="text-lg mb-6 text-white/90">{t('newsletterSubtitle', { defaultValue: 'Get exclusive travel tips and deals straight to your inbox!' })}</p>
      <form className="flex flex-col sm:flex-row justify-center gap-2 max-w-md mx-auto">
        <input
          type="email"
          placeholder={t('enterEmail', { defaultValue: 'Enter your email' })}
          className="p-3 rounded-lg text-gray-800 w-full"
        />
        <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg px-6 py-3">
          {t('subscribe', { defaultValue: 'Subscribe' })}
        </button>
      </form>
    </section>
  );
}
