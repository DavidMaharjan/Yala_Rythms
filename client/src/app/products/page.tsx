'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Products = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {products.map((item,id) => (
        <div
          key={id}
          className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition-shadow"
        >
          {item.imageUrl && (
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
          )}
          <div className="p-4 flex flex-col flex-1">
            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
            <p className="text-gray-700 mb-1 line-clamp-2">{item.description}</p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-lg font-bold text-purple-700">${item.price}</span>
              <span className="text-xs bg-gray-200 rounded px-2 py-1">{item.condition}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Category: {item.category}</p>
            <p className="text-xs text-gray-400 mt-auto">Added: {new Date(item.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Products