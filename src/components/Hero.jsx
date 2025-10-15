import { motion } from "framer-motion";
import {
  Search,
  ArrowLeftRight,
  MapPin,
  Calendar,
  Users,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [tripType, setTripType] = useState("round");
  const [nearFrom, setNearFrom] = useState(false);
  const [nearTo, setNearTo] = useState(false);
  const [directOnly, setDirectOnly] = useState(false);
  const [addHotel, setAddHotel] = useState(false);
  const [adults, setAdults] = useState(1);
  const [cabin, setCabin] = useState("economy");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (fromCity) params.set("from", fromCity);
    if (toCity) params.set("to", toCity);
    if (date) params.set("date", date);
    if (tripType === "round" && returnDate) params.set("return", returnDate);
    params.set("trip", tripType);
    params.set("adults", adults.toString());
    params.set("cabin", cabin);
    navigate(`/destinations?${params.toString()}`);
  };

  return (
    <section
      className="relative bg-cover bg-center min-h-[80vh] flex flex-col justify-center items-center text-center px-4"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/Travel.jpg)`,
      }}
    >
      {/* Background overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />

      <motion.div
        className="relative z-10 text-white max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-5xl font-bold leading-tight drop-shadow-lg">
          {t("welcome", { defaultValue: "Discover the Excitement Ahead" })}
        </h1>
        <p className="mt-4 text-lg text-gray-200">
          {t("heroSubtext", {
            defaultValue:
              "Find your perfect getaway. Explore destinations around the world.",
          })}
        </p>

        {/* Search Card */}
        <div className="mt-10 w-full max-w-6xl mx-auto">
          <div className="backdrop-blur-xl bg-white/95 dark:bg-gray-900/80 shadow-2xl rounded-3xl p-8 border border-white/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
              
              {/* Trip Type */}
              <div>
                <label className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {t("tripType", { defaultValue: "Trip Type" })}
                </label>
                <select
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                  className="mt-1 w-full text-sm border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option value="round">{t("Round Trip")}</option>
                  <option value="oneway">{t("One Way")}</option>
                </select>
              </div>

              {/* From City */}
              <div>
                <label className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {t("fromCity", { defaultValue: "From" })}
                </label>
                <div className="relative mt-1">
                  <MapPin className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t("fromCity", { defaultValue: "From city" })}
                    className="w-full text-sm border border-gray-300 dark:border-gray-700 rounded-xl pl-10 pr-3 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                    value={fromCity}
                    onChange={(e) => setFromCity(e.target.value)}
                    aria-label="From city"
                  />
                </div>
              </div>

              {/* Swap Button */}
              <div className="hidden xl:flex items-end justify-center">
                <button
                  type="button"
                  onClick={() => {
                    setFromCity(toCity);
                    setToCity(fromCity);
                  }}
                  className="rounded-full border border-gray-300 dark:border-gray-700 p-4 bg-gray-50 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition focus:ring-2 focus:ring-blue-500"
                  aria-label="Swap origin and destination"
                >
                  <ArrowLeftRight className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                </button>
              </div>

              {/* To City */}
              <div>
                <label className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {t("toCity", { defaultValue: "To" })}
                </label>
                <div className="relative mt-1">
                  <MapPin className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t("toCity", { defaultValue: "To city" })}
                    className="w-full text-sm border border-gray-300 dark:border-gray-700 rounded-xl pl-10 pr-3 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                    value={toCity}
                    onChange={(e) => setToCity(e.target.value)}
                    aria-label="To city"
                  />
                </div>
              </div>

              {/* Departure Date */}
              <div>
                <label className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  {t("departure", { defaultValue: "Departure" })}
                </label>
                <div className="relative mt-1">
                  <Calendar className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    className="w-full text-sm border border-gray-300 dark:border-gray-700 rounded-xl pl-10 pr-3 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    aria-label="Departure date"
                  />
                </div>
              </div>

              {/* Return, Travelers, Search */}
              <div className="xl:col-span-2 grid grid-cols-5 gap-3">
                {tripType === "round" && (
                  <div className="col-span-2">
                    <label className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      {t("return", { defaultValue: "Return" })}
                    </label>
                    <div className="relative mt-1">
                      <Calendar className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="date"
                        className="w-full text-sm border border-gray-300 dark:border-gray-700 rounded-xl pl-10 pr-3 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        aria-label="Return date"
                      />
                    </div>
                  </div>
                )}

                {/* Travelers */}
                <div className="col-span-1">
                  <label className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    {t("travelers", { defaultValue: "Travelers" })}
                  </label>
                  <div className="relative mt-1">
                    <Users className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full text-sm border border-gray-300 dark:border-gray-700 rounded-xl pl-10 pr-3 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                        <option key={n} value={n}>
                          {n} {t("adults", { defaultValue: "Adult(s)" })}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <div className="flex items-end col-span-2">
                  <button
                    onClick={handleSearch}
                    className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 text-white text-base font-semibold shadow-md transition"
                  >
                    <Search className="inline w-5 h-5 mr-2" />
                    {t("searchFlights", { defaultValue: "Search Flights" })}
                  </button>
                </div>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-left text-gray-800 dark:text-gray-200 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-blue-600"
                  checked={nearFrom}
                  onChange={(e) => setNearFrom(e.target.checked)}
                />
                {t("addNearbyFrom", {
                  defaultValue: "Nearby airports (From)",
                })}
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-blue-600"
                  checked={nearTo}
                  onChange={(e) => setNearTo(e.target.checked)}
                />
                {t("addNearbyTo", {
                  defaultValue: "Nearby airports (To)",
                })}
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-blue-600"
                  checked={directOnly}
                  onChange={(e) => setDirectOnly(e.target.checked)}
                />
                {t("directOnly", { defaultValue: "Direct flights only" })}
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-blue-600"
                  checked={addHotel}
                  onChange={(e) => setAddHotel(e.target.checked)}
                />
                {t("addHotel", { defaultValue: "Include hotel" })}
              </label>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
