import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";

export default function Destinations() {
  const { i18n, t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [destinations, setDestinations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [stopsFilter, setStopsFilter] = useState("any"); // any | 0 | 1 | 2plus
  const [airlinesFilter, setAirlinesFilter] = useState([]); // array of strings
  const [sortBy, setSortBy] = useState("price_asc");
  const [currency, setCurrency] = useState(localStorage.getItem("currency") || "USD");
  const [routeInfo, setRouteInfo] = useState(null);

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

  // Initialize from URL params
  useEffect(() => {
    const to = searchParams.get("to") || "";
    const from = searchParams.get("from") || "";
    const date = searchParams.get("date") || "";
    const ret = searchParams.get("return") || "";
    const trip = searchParams.get("trip") || "round";
    const direct = searchParams.get("direct") === "1";
    const regionParam = searchParams.get("region");
    const adults = Number(searchParams.get("adults")) || 1;
    const cabin = searchParams.get("cabin") || "economy";
    const nearFrom = searchParams.get("nearFrom") === "1";
    const nearTo = searchParams.get("nearTo") === "1";

    setRouteInfo({ from, to, date, ret, trip, direct, adults, cabin, nearFrom, nearTo });
    if (to) setQuery(to);
    if (regionParam) setRegion(regionParam);
    if (direct) setStopsFilter("0");
  }, [searchParams]);

  // Derive available airlines from data
  const allAirlines = useMemo(() => {
    const set = new Set();
    destinations.forEach((d) => (d.airlines || []).forEach((a) => set.add(a)));
    return Array.from(set).sort();
  }, [destinations]);

  useEffect(() => {
    let result = destinations.filter((d) =>
      (d.name[i18n.language] || d.name.en || "").toLowerCase().includes(query.toLowerCase())
    );
    if (region !== "All") result = result.filter((d) => d.region === region);
    if (stopsFilter !== "any") {
      if (stopsFilter === "2plus") result = result.filter((d) => (d.stops ?? 0) >= 2);
      else result = result.filter((d) => String(d.stops ?? 0) === String(stopsFilter));
    }
    if (airlinesFilter.length) {
      result = result.filter((d) => {
        const airlines = d.airlines || [];
        return airlinesFilter.every((a) => airlines.includes(a));
      });
    }
    // Sort
    const sorter = (a, b) => {
      switch (sortBy) {
        case "price_desc":
          return b.priceUSD - a.priceUSD;
        case "stops_asc":
          return (a.stops ?? 0) - (b.stops ?? 0);
        case "stops_desc":
          return (b.stops ?? 0) - (a.stops ?? 0);
        case "duration_asc":
          return (a.durationMinutes ?? Infinity) - (b.durationMinutes ?? Infinity);
        case "duration_desc":
          return (b.durationMinutes ?? -Infinity) - (a.durationMinutes ?? -Infinity);
        case "price_asc":
        default:
          return a.priceUSD - b.priceUSD;
      }
    };
    result = [...result].sort(sorter);
    setFiltered(result);
  }, [query, region, stopsFilter, airlinesFilter, sortBy, i18n.language, destinations]);

  return (
    <div className="p-6 sm:p-8 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-yellow-600">{t("welcome")}</h1>

      {routeInfo && (routeInfo.from || routeInfo.to) && (
        <div className="mb-6 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-gray-800 dark:to-gray-800/60 border border-yellow-100 dark:border-gray-800 p-4">
            <div className="text-gray-900 dark:text-white font-semibold text-lg">
              {(routeInfo.from || "").trim() || t("fromCity", { defaultValue: "From" })}
              <span className="mx-2">→</span>
              {(routeInfo.to || "").trim() || t("toCity", { defaultValue: "To" })}
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300 flex flex-wrap gap-2 mt-2">
              {routeInfo.trip === "oneway" ? (
                <span className="px-2 py-1 rounded-full bg-white/70 dark:bg-gray-900/40 border border-yellow-100 dark:border-gray-700">{t("departure", { defaultValue: "Departure" })}: {routeInfo.date || t("any", { defaultValue: "Any" })}</span>
              ) : (
                <span className="px-2 py-1 rounded-full bg-white/70 dark:bg-gray-900/40 border border-yellow-100 dark:border-gray-700">{t("dates", { defaultValue: "Dates" })}: {routeInfo.date || t("any", { defaultValue: "Any" })}{routeInfo.ret ? ` → ${routeInfo.ret}` : ""}</span>
              )}
              <span className="px-2 py-1 rounded-full bg-white/70 dark:bg-gray-900/40 border border-yellow-100 dark:border-gray-700">{t("travelers", { defaultValue: "Travelers" })}: {routeInfo.adults}</span>
              <span className="px-2 py-1 rounded-full bg-white/70 dark:bg-gray-900/40 border border-yellow-100 dark:border-gray-700">{t("cabin", { defaultValue: "Cabin" })}: {routeInfo.cabin}</span>
              {routeInfo.direct && <span className="px-2 py-1 rounded-full bg-white/70 dark:bg-gray-900/40 border border-yellow-100 dark:border-gray-700">{t("directOnly", { defaultValue: "Direct flights" })}</span>}
              {routeInfo.nearFrom && <span className="px-2 py-1 rounded-full bg-white/70 dark:bg-gray-900/40 border border-yellow-100 dark:border-gray-700">{t("addNearbyFrom", { defaultValue: "Nearby (From)" })}</span>}
              {routeInfo.nearTo && <span className="px-2 py-1 rounded-full bg-white/70 dark:bg-gray-900/40 border border-yellow-100 dark:border-gray-700">{t("addNearbyTo", { defaultValue: "Nearby (To)" })}</span>}
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="sticky top-2 z-10">
        <div className="backdrop-blur-xl bg-white/85 dark:bg-gray-900/70 ring-1 ring-black/10 dark:ring-white/10 shadow-xl rounded-2xl p-4 flex flex-wrap gap-3 items-center">
          <input
            type="text"
            placeholder={t("search") || "Search..."}
            className="border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-2 w-full sm:w-64 dark:bg-gray-900/40 dark:text-white"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-2 dark:bg-gray-900/40 dark:text-white"
          >
            <option value="All">🌍 {t("allRegions") || "All Regions"}</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
          </select>

          <select
            value={stopsFilter}
            onChange={(e) => setStopsFilter(e.target.value)}
            className="border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-2 dark:bg-gray-900/40 dark:text-white"
          >
            <option value="any">🛬 {t("anyStops") || "Any stops"}</option>
            <option value="0">Direct (0)</option>
            <option value="1">1 stop</option>
            <option value="2plus">2+ stops</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-200 dark:border-gray-800 rounded-xl px-3 py-2 dark:bg-gray-900/40 dark:text-white"
          >
            <option value="price_asc">💲 {t("cheapest") || "Cheapest"}</option>
            <option value="price_desc">💲 {t("expensive") || "Most expensive"}</option>
            <option value="duration_asc">⏱️ {t("shortest") || "Shortest fly"}</option>
            <option value="duration_desc">⏱️ {t("longest") || "Longest fly"}</option>
            <option value="stops_asc">🛫 {t("fewestStops") || "Fewest stops"}</option>
            <option value="stops_desc">🛫 {t("mostStops") || "Most stops"}</option>
          </select>

          {/* Airlines checkboxes */}
          <div className="flex flex-wrap gap-2 items-center">
            {allAirlines.map((a) => (
              <label key={a} className="flex items-center gap-2 text-sm text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-full px-3 py-1">
                <input
                  type="checkbox"
                  className="accent-yellow-500"
                  checked={airlinesFilter.includes(a)}
                  onChange={(e) => {
                    setAirlinesFilter((prev) =>
                      e.target.checked ? [...prev, a] : prev.filter((x) => x !== a)
                    );
                  }}
                />
                {a}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((dest) => {
          const convertedPrice = dest.priceUSD * (rates[currency] || 1);
          return (
            <Link key={dest.id} to={`/destinations/${dest.id}`} className="transform transition hover:scale-[1.02]">
              <div className="shadow-lg rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <img src={dest.image} alt={dest.name[i18n.language] || dest.name.en} className="h-56 w-full object-cover" />
                <div className="p-4">
                  <h2 className="font-bold text-lg text-gray-900 dark:text-white">{dest.name[i18n.language] || dest.name.en}</h2>
                  <p className="text-yellow-600 font-semibold mt-2">
                    {convertedPrice.toFixed(0)} {currency}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{dest.region}</p>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex flex-wrap gap-2">
                    <span>🛫 {dest.stops ?? 0} stops</span>
                    {typeof dest.durationMinutes === "number" && (
                      <span>⏱️ {(dest.durationMinutes / 60).toFixed(1)} h</span>
                    )}
                  </div>
                  {Array.isArray(dest.airlines) && dest.airlines.length > 0 && (
                    <div className="text-[11px] text-gray-600 dark:text-gray-400 mt-1 truncate">
                      {dest.airlines.join(", ")}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
