import Link from "next/link"
import { ShoppingCart, Search } from "lucide-react"

function Header() {
  return (
    <div className="flex items-center justify-around bg-[#0d4e9c] p-4">
      {/* Logo */}
      <div>
        <Link href="/">
          <h1 className="text-2xl font-bold text-white">Logo</h1>
        </Link>
      </div>

      {/* Search Bar */}
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <Search size={20} />
          </span>
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full pl-10 pr-4 py-2 rounded border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-transparent text-white placeholder:text-blue-100"
          />
        </div>
      
      <div>
        {/* Cart Button */}
        <Link href="/cart">
          <button className="flex items-center gap-2 bg-[#152657] hover:bg-[#10204e] text-white font-semibold px-6 py-2 rounded-md transition" >
            <ShoppingCart size={20} />
            Cart
          </button>
        </Link>
        {/*  avatar */}
        
      </div>
    </div>
  )
}

export default Header