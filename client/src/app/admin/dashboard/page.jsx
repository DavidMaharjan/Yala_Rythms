"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import axios from "axios"
import { Trash2, PlusCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const [products, setProducts] = useState([])
  const [showAdd, setShowAdd] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
    condition: "",
  })
  const [message, setMessage] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = () => {
    axios.get('http://localhost:3001/products')
      .then(res => setProducts(res.data))
      .catch(err => setMessage({ type: "error", text: "Failed to fetch products" }))
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:3001/products', newProduct)
      setShowAdd(false)
      setNewProduct({
        name: "",
        description: "",
        price: "",
        category: "",
        imageUrl: "",
        condition: "",
      })
      setMessage({ type: "success", text: "Product added successfully!" })
      fetchProducts()
    } catch (err) {
      setMessage({ type: "error", text: "Failed to add product" })
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/products/${id}`)
      setMessage({ type: "success", text: "Product deleted successfully!" })
      fetchProducts()
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete product" })
    }
  }

  const handleLogout = () => {
    // Remove token or session info if you use it
    localStorage.removeItem("token")
    router.push("/admin/login")
  }

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [message])

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-sm shadow-md px-4 py-2">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Logo" className="h-10 w-auto" />
            <span className="font-bold text-xl text-red-700">YalaRythms Admin</span>
          </Link>
          <div className="flex items-center gap-6">
            <button
              onClick={() => setShowAdd(!showAdd)}
              className="flex items-center gap-1 text-gray-700 hover:text-red-700 font-medium transition-colors"
            >
              <PlusCircle className="w-5 h-5" /> Add Product
            </button>
            <Link href="/admin/dashboard" className="text-gray-700 hover:text-red-700 font-medium transition-colors">
              View Products
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="text-red-700 hover:underline font-semibold px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Success/Error Message */}
      {message && (
        <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded shadow-lg text-white
          ${message.type === "success" ? "bg-green-600" : "bg-red-600"}`}>
          {message.text}
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form
            onSubmit={handleAddProduct}
            className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md space-y-4"
          >
            <h2 className="text-xl font-bold mb-2 text-red-700">Add New Product</h2>
            <input
              type="text"
              placeholder="Name"
              value={newProduct.name}
              onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
            <textarea
              placeholder="Description"
              value={newProduct.description}
              onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={newProduct.category}
              onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
              className="w-full border rounded px-3 py-2"
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newProduct.imageUrl}
              onChange={e => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Condition"
              value={newProduct.condition}
              onChange={e => setNewProduct({ ...newProduct, condition: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="container mx-auto py-8 mt-24">
        <h2 className="text-2xl font-bold mb-6 text-red-700">All Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-lg flex flex-col hover:shadow-2xl transition-shadow border border-gray-100 relative"
            >
              <button
                onClick={() => handleDelete(item._id)}
                className="absolute top-2 left-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 z-10"
                title="Delete Product"
              >
                <Trash2 className="w-5 h-5" />
              </button>
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
                  <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                    {item.condition}
                  </span>
                )}
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h2 className="text-lg font-bold mb-1 text-gray-900">{item.name}</h2>
                <p className="text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-bold text-red-700">${item.price}</span>
                  <span className="text-xs text-gray-500">Category: {item.category}</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">Added: {new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}