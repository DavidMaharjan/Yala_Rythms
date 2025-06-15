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

export default productRouter