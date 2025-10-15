import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function DestinationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const [user] = useAuthState(auth);
  const [destination, setDestination] = useState(null);
  const [date, setDate] = useState("");
  const [currency] = useState(localStorage.getItem("currency") || "USD");
  const rates = { USD: 1, EUR: 0.93, TRY: 34, KZT: 480, UZS: 12800 };

  useEffect(() => {
    fetch("/data/destinations.json")
      .then((res) => res.json())
      .then((data) => {
        const dest = data.find((d) => d.id === parseInt(id));
        setDestination(dest);
      });
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      alert(t("pleaseLoginFirst", { defaultValue: "Please log in first." }));
      navigate("/login");
      return;
    }

    if (!date) {
      alert(t("selectDate", { defaultValue: "Select travel date" }));
      return;
    }

    await addDoc(collection(db, "bookings"), {
      userId: user.uid,
      destination: destination.name.en,
      date,
      priceUSD: destination.priceUSD,
      createdAt: serverTimestamp(),
    });

    alert("✅ " + t("bookingSuccessful", { defaultValue: "Booking successful!" }));
    navigate("/dashboard");
  };

  if (!destination) return <p className="p-8">Loading...</p>;

  const convertedPrice = destination.priceUSD * (rates[currency] || 1);

  return (
    <div className="p-8 max-w-4xl mx-auto bg-white dark:bg-gray-900 min-h-screen">
      <img
        src={destination.image}
        alt={destination.name[i18n.language]}
        className="rounded-2xl w-full h-96 object-cover mb-6"
      />

      <h1 className="text-3xl font-bold text-yellow-600 mb-2">
        {destination.name[i18n.language]}
      </h1>

      <p className="text-gray-700 dark:text-gray-300 mb-4">{destination.region}</p>
      <p className="text-yellow-600 font-semibold text-xl mb-4">
        {convertedPrice.toFixed(0)} {currency}
      </p>

      <label className="block mb-2 font-medium text-gray-900 dark:text-white">{t("selectDate", { defaultValue: "Select Date" })}</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded w-60 mb-4 dark:bg-gray-800 dark:text-white dark:border-gray-700"
      />

      <button
        onClick={handleBooking}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded font-semibold"
      >
        {t("bookNow", { defaultValue: "Book Now" })}
      </button>
    </div>
  );
}
