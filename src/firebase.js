import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfaLIO8y4ee8GrRWGK5ci8ggIcVNyTiYk",
  authDomain: "flyora-a009a.firebaseapp.com",
  projectId: "flyora-a009a",
  storageBucket: "flyora-a009a.firebasestorage.app",
  messagingSenderId: "913429840457",
  appId: "1:913429840457:web:55b410f505f4b3fa76f598",
  measurementId: "G-B415DZW0RV",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function initAnalytics() {
  if (typeof window === "undefined") return null;
  try {
    const supported = await isSupported();
    return supported ? getAnalytics(app) : null;
  } catch (_) {
    return null;
  }
}

export { app, auth };
