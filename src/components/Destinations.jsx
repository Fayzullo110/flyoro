import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCurrency } from "../context/CurrencyContext";
import { useTranslation } from "react-i18next";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currency, convert } = useCurrency();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    let mounted = true;
    fetch("/data/destinations.json")
      .then((res) => res.json())
      .then((data) => {
        if (mounted) setDestinations(data || []);
      })
      .catch(() => mounted && setDestinations([]))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-950 text-center">
      <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">{t('gateway', { defaultValue: 'Your Gateway to Adventure' })}</h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <motion.div
            className="w-10 h-10 rounded-full border-4 border-yellow-400 border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
          />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
          {destinations.map((d) => (
            <motion.div
              key={d.id}
              className="bg-white dark:bg-gray-900 dark:border-gray-800 border shadow rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
            >
              <img src={d.image} alt={(d.name?.[i18n.language] || d.name?.en || d.name)} className="w-full h-56 object-cover" />
              <div className="p-4 text-left">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{d.name?.[i18n.language] || d.name?.en || d.name}</h3>
                {typeof d.priceUSD === 'number' && (
                  <p className="mt-1 text-gray-700 dark:text-gray-300 text-sm">
                    {t('from', { defaultValue: 'From' })} <span className="font-semibold">{convert(d.priceUSD)} {currency}</span>
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}

