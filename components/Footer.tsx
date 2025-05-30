import { Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-secondary text-white py-8 px-4 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* Filters */}
        <div>
          <h2 className="text-lg font-bold mb-3">Filters</h2>
          <div className="flex gap-4 mb-3">
            <Link href="#" className="hover:underline">All</Link>
            <Link href="#" className="hover:underline font-mono tracking-wider">Electronics</Link>
          </div>
          <div className="text-sm text-blue-100 mt-6">© 2024 American</div>
        </div>
        {/* About Us */}
        <div>
          <h2 className="text-lg font-bold mb-3">About Us</h2>
          <div className="flex flex-col gap-2">
            <Link href="#" className="hover:underline">About Us</Link>
            <Link href="#" className="hover:underline">Contact</Link>
          </div>
        </div>
        {/* Follow Us */}
        <div>
          <h2 className="text-lg font-bold mb-3">Follow Us</h2>
          <div className="flex gap-4 mt-2">
            <Link href="#" className="bg-primary hover:bg-[#125bb3] rounded-full p-2 transition">
              <Facebook size={24} />
            </Link>
            <Link href="#" className="bg-primary hover:bg-[#125bb3] rounded-full p-2 transition">
              <Twitter size={24} />
            </Link>
            <Link href="#" className="bg-primary hover:bg-[#125bb3] rounded-full p-2 transition">
              <Instagram size={24} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;