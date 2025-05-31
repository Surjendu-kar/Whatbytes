import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="bg-primary hover:bg-secondary text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
