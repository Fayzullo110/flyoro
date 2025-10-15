import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function Dashboard() {
  const [user] = useAuthState(auth);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-3">Welcome, {user?.email}</h1>
      <p className="text-gray-600">
        This is your personal dashboard — bookings, favorites, etc. will appear here.
      </p>
    </div>
  );
}
