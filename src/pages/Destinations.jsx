import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export default function Destinations() {
  const { i18n, t } = useTranslation();
  const [destinations, setDestinations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [currency, setCurrency] = useState(localStorage.getItem("currency") || "USD");

  const rates = { USD: 1, EUR: 0.93, TRY: 34, KZT: 480, UZS: 12800 };

  useEffect(() => {
    fetch("/data/destinations.json")
      .then((res) => res.json())
      .then((data) => {
        setDestinations(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("currency") || "USD";
    setCurrency(saved);
  }, []);

  useEffect(() => {
    let result = destinations.filter((d) =>
      (d.name[i18n.language] || d.name.en).toLowerCase().includes(query.toLowerCase())
    );
    if (region !== "All") result = result.filter((d) => d.region === region);
    setFiltered(result);
  }, [query, region, i18n.language, destinations]);

  return (
    <div className="p-8 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-yellow-600">{t("welcome")}</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder={t("search") || "Search..."}
          className="border rounded px-3 py-2 w-64 dark:bg-gray-800 dark:text-white dark:border-gray-700"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="border rounded px-3 py-2 dark:bg-gray-800 dark:text-white dark:border-gray-700"
        >
          <option value="All">🌍 {t("allRegions") || "All Regions"}</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
        </select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((dest) => {
          const convertedPrice = dest.priceUSD * (rates[currency] || 1);
          return (
            <div key={dest.id} className="shadow-lg rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
              <img src={dest.image} alt={dest.name[i18n.language] || dest.name.en} className="h-56 w-full object-cover" />
              <div className="p-4">
                <h2 className="font-bold text-lg text-gray-900 dark:text-white">{dest.name[i18n.language] || dest.name.en}</h2>
                <p className="text-yellow-600 font-semibold mt-2">
                  {convertedPrice.toFixed(0)} {currency}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{dest.region}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
