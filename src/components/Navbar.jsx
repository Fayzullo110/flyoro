import { useTranslation } from "react-i18next";
import { useCurrency } from "../context/CurrencyContext";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const { i18n } = useTranslation();
  const { currency, setCurrency } = useCurrency();
  const [theme, setTheme] = useState(() => (typeof window !== 'undefined' ? (localStorage.getItem('theme') || 'light') : 'light'));

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);

  const onLangChange = (val) => {
    i18n.changeLanguage(val);
    try { localStorage.setItem('lang', val); } catch {}
  };

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-900 shadow-md">
      <h1 className="text-2xl font-bold text-yellow-500">Flyora</h1>

      <div className="flex gap-3 items-center">
        <select
          onChange={(e) => onLangChange(e.target.value)}
          className="border rounded p-1 text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
          defaultValue={i18n.language || "en"}
        >
          <option value="en">EN</option>
          <option value="de">DE</option>
          <option value="uz">UZ</option>
          <option value="kz">KZ</option>
          <option value="ru">RU</option>
          <option value="tr">TR</option>
        </select>

        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="border rounded p-1 text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
        >
          <option>USD</option>
          <option>EUR</option>
          <option>UZS</option>
          <option>KZT</option>
          <option>RUB</option>
          <option>TRY</option>
        </select>

        <button
          aria-label="Toggle theme"
          className="ml-2 p-2 rounded border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-gray-700" />}
        </button>
      </div>
    </nav>
  );
}
