import { signOut } from "@/app/(auth)/actions";

export default function AdminNavbar() {
  return (
    <nav className="flex justify-between p-4 bg-slate-900 text-white">
      <h1 className="font-bold">Brilliant Tour Admin</h1>

      <form action={signOut}>
        <button
          type="submit"
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition"
        >
          Sign Out
        </button>
      </form>
    </nav>
  );
}

