import { Router } from "express"
import { Product } from "../model/products.js"
const cartRouter = Router()

// For demo: store cart in memory (use DB for production)
let cart = []

// Add product to cart
cartRouter.post('/cart', async (req, res) => {
  const { productId } = req.body
  const product = await Product.findById(productId)
  if (!product) return res.status(404).json({ message: "Product not found" })
  cart.push(product)
  res.json({ message: "Added to cart", cart })
})

// Get all items in cart
cartRouter.get('/cart', (req, res) => {
  res.json(cart)
})

// Remove item from cart
cartRouter.delete('/cart/:id', (req, res) => {
  cart = cart.filter(item => item._id.toString() !== req.params.id)
  res.json({ message: "Removed from cart", cart })
})

export default cartRouter