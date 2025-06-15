import { Router } from "express"
import { User } from "../model/user.js"
const router = Router()


router.post('/register', async(req, res) => {
  const user = await User.findOne({email : req.body.email})
  if (user) 
    {return res.status(409).json({message:'Email already taken'})}
  else {User.create(req.body)}
  // User.create(req.body)
  res.send('user registered!')
})

router.get('/register',async(req,res)=>{

    const users = await User.find()
    res.send(users)
})

export default router