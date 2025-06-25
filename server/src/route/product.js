import { Router } from "express"
import { Product } from "../model/products.js"
const productRouter = Router()


productRouter.post('/products', async(req, res) => {

//   const product = await User.findOne({email : req.body.email})
  Product.create(req.body)
  res.send('product listed!')
})

productRouter.get('/products',async(req,res)=>{

    const product = await Product.find()
    res.send(product)
})
productRouter.delete('/products/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id)
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" })
    }
    res.json({ message: "Product deleted" })
  } catch (err) {
    res.status(500).json({ message: "Error deleting product" })
  }
})

export default productRouter