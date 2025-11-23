import Link from "next/link";

export function DevNavigation() {
    return (
        <div className="fixed top-4 right-4 z-50 flex gap-2">
            <Link
                href="/"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded shadow-lg transition-colors"
            >
                PAG 1 (Countdown)
            </Link>
            <Link
                href="/evento"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded shadow-lg transition-colors"
            >
                PAG 2 (Evento)
            </Link>
            <Link
                href="/admin"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded shadow-lg transition-colors"
            >
                PAG 3 (Admin)
            </Link>
        </div>
    );
}
