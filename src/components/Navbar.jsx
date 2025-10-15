import { useTranslation } from "react-i18next";
import { useCurrency } from "../context/CurrencyContext";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { currency, setCurrency } = useCurrency();
  const [theme, setTheme] = useState(() => (typeof window !== 'undefined' ? (localStorage.getItem('theme') || 'light') : 'light'));
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try { localStorage.setItem('theme', theme); } catch {}
  }, [theme]);

  useEffect(() => {
    document.title = t('welcome', { defaultValue: 'Discover the Excitement Ahead' });
  }, [t]);

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

        <Link
          to="/destinations"
          className="ml-2 px-3 py-2 text-sm rounded border border-yellow-500 text-yellow-600 hover:bg-yellow-50 dark:border-yellow-600 dark:text-yellow-400"
        >
          {t("destinations", { defaultValue: "Destinations" })}
        </Link>

        {user ? (
          <div className="flex items-center gap-3 ml-2">
            <span className="text-sm dark:text-white">{user.email}</span>
            <button
              onClick={() => signOut(auth)}
              className="px-3 py-2 text-sm rounded bg-yellow-500 text-white hover:bg-yellow-600"
            >
              {t("logout", { defaultValue: "Logout" })}
            </button>
            <Link
              to="/dashboard"
              className="px-3 py-2 text-sm rounded border border-yellow-500 text-yellow-600 hover:bg-yellow-50 dark:border-yellow-600 dark:text-yellow-400"
            >
              {t("dashboard", { defaultValue: "Dashboard" })}
            </Link>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="ml-2 px-3 py-2 text-sm rounded border border-yellow-500 text-yellow-600 hover:bg-yellow-50 dark:border-yellow-600 dark:text-yellow-400"
            >
              {t("login", { defaultValue: "Login" })}
            </Link>
            <Link
              to="/register"
              className="px-3 py-2 text-sm rounded bg-yellow-500 text-white hover:bg-yellow-600"
            >
              {t("register", { defaultValue: "Register" })}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

