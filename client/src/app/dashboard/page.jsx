"use client"

import Link from "next/link"
import { ShoppingCart, Search } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"

export default function Dashboard() {
  const [search, setSearch] = useState("")
  const [products, setProducts] = useState([])
  const router = useRouter()

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      router.push(`/search?query=${encodeURIComponent(search)}`)
    }
  }

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token") // or your auth key
    router.push("/")
  }

  // Add to Cart handler
  const handleAddToCart = async (productId) => {
    try {
      await axios.post('http://localhost:3001/cart', { productId })
      alert("Added to cart!")
    } catch (err) {
      alert("Failed to add to cart")
    }
  }

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-sm shadow-md px-4 py-2">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Logo" className="h-10 w-auto" />
            <span className="font-bold text-xl text-purple-700">YalaRythms</span>
          </Link>
          {/* Nav Links */}
          <div className="flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-purple-700 font-medium transition-colors">Home</Link>
            <Link href="/products" className="text-gray-700 hover:text-purple-700 font-medium transition-colors">Products</Link>
            <Link href="/about" className="text-gray-700 hover:text-purple-700 font-medium transition-colors">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-purple-700 font-medium transition-colors">Contact</Link>
          </div>
          {/* Auth Buttons, Search & Cart */}
          <div className="flex items-center gap-3">
            <form onSubmit={handleSearch} className="flex items-center gap-1">
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                className="border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-purple-500 text-sm"
              />
              <button type="submit" className="hover:text-purple-700 transition-colors" aria-label="Search">
                <Search className="w-5 h-5" />
              </button>
            </form>
            <Link href="/cart" className="hover:text-purple-700 transition-colors" aria-label="Cart">
              <ShoppingCart className="w-6 h-6" />
            </Link>
            <button
              onClick={handleLogout}
              className="text-purple-700 hover:underline font-semibold px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Add top margin so content doesn't hide under navbar */}
      <div className="container mx-auto py-8 mt-24">
        <h2 className="text-2xl font-bold mb-6 text-purple-700">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((item, id) => (
            <div
              key={id}
              className="bg-white rounded-lg shadow-lg flex flex-col hover:shadow-2xl transition-shadow border border-gray-100"
            >
              <div className="relative">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-56 object-cover rounded-t-lg"
                  />
                ) : (
                  <div className="w-full h-56 flex items-center justify-center bg-gray-100 rounded-t-lg text-gray-400">
                    No Image
                  </div>
                )}
                {item.condition && (
                  <span className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-1 rounded">
                    {item.condition}
                  </span>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1 ">
                <h2 className="text-lg font-bold mb-1 text-gray-900">{item.name}</h2>
                <p className="text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-bold text-purple-700">${item.price}</span>
                  <span className="text-xs text-gray-500">Category: {item.category}</span>
                </div>
                <button
                  className="mt-auto bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                  onClick={() => handleAddToCart(item._id)}
                >
                  Add to Cart
                </button>
                <p className="text-xs text-gray-400 mt-2">Added: {new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}