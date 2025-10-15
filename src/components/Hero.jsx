import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <section
      className="relative bg-cover bg-center min-h-[80vh] flex flex-col justify-center items-center text-center px-4"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/Travel.jpg)`,
      }}
    >
      <div className="bg-black/30 absolute inset-0" />

      <motion.div
        className="relative z-10 text-white max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-5xl font-bold leading-tight">{t("welcome")}</h1>
        <p className="mt-4 text-lg text-gray-200">
          {t("heroSubtext", { defaultValue: "Find your perfect getaway. Explore destinations around the world." })}
        </p>

        <div className="mt-8 bg-white rounded-2xl shadow-lg p-4 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center">
          <input
            type="text"
            placeholder={t("search", { defaultValue: "Search destination" })}
            className="border border-gray-200 rounded-lg p-2 w-full sm:w-1/3 text-gray-900"
          />
          <input
            type="date"
            className="border border-gray-200 rounded-lg p-2 w-full sm:w-1/4 text-gray-900"
          />
          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg flex items-center gap-2">
            <Search className="w-4 h-4" /> {t("search", { defaultValue: "Search" })}
          </button>
        </div>
      </motion.div>
    </section>
  );
}

