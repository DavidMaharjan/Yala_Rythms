"use client"

import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-md px-4 py-2">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Logo" className="h-15 w-auto" />
          <span className="font-bold text-xl text-purple-700">YalaRythms</span>
        </Link>
        {/* Nav Links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-gray-700 hover:text-purple-700 font-medium transition-colors">Home</Link>
          <Link href="/products" className="text-gray-700 hover:text-purple-700 font-medium transition-colors">Products</Link>
          <Link href="/about" className="text-gray-700 hover:text-purple-700 font-medium transition-colors">About</Link>
          <Link href="/contact" className="text-gray-700 hover:text-purple-700 font-medium transition-colors">Contact</Link>
        </div>
        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Link href="login" className="text-purple-700 hover:underline font-semibold px-3 py-1 rounded">Login</Link>
          <Link href="/register" className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 font-semibold transition-colors">Sign Up</Link>
        </div>
      </div>
    </nav>
  )
}