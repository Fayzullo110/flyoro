import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const [user] = useAuthState(auth);
  const { t } = useTranslation();

  return (
    <div className="p-10 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
        {t('welcomeUser', { email: user?.email || '', defaultValue: 'Welcome, {{email}}' })}
      </h1>
      <p className="text-gray-700 dark:text-gray-300">
        {t('dashboardIntro', { defaultValue: 'This is your personal dashboard — bookings, favorites, etc. will appear here.' })}
      </p>
    </div>
  );
}
