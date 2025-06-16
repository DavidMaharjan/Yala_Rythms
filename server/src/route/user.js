import { Router } from "express"
import { User } from "../model/user.js"
import bcrypt from "bcrypt"
const saltRounds =10
const router = Router()


router.post('/register', async(req, res) => {
  const user = await User.findOne({email : req.body.email})
  if (user) 
    {return res.status(409).json({message:'Email already taken'})}
  else {
    req.body.password = await bcrypt.hash(req.body.password, saltRounds)
    await User.create(req.body)
    return res.status(201).json({ message: 'User registered!' })
  }
})

router.get('/register',async(req,res)=>{

    const users = await User.find()
    res.send(users)
})

export default router