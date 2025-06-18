import { Router } from "express"
import { User } from "../model/user.js"
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken"
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

router.get('/login', (req, res) => {
  res.send('Login endpoint is working. Use POST to log in.');
});

router.post('/login', async(req, res) => {
  const {email,password} = req.body
 //step 1: email should exist
 const user =await User.findOne({email : req.body.email})
 //no: return email not found
if(!user) return res.send({message:'Email not found'})
 //yes:
 //step 2: check if password matches 
 const isMatched = await bcrypt.compare(req.body.password,user.password)
 if(!isMatched) return res.send({message:'Invalid password'})
 const token = await jwt.sign({ email: email }, '33ceecfc3c914cb6dee77a8c16d08211caf46cfb1aa0b9372f24e39fbaaa1fca31d1a7ae7938579f7ed157636babf812ac42468d431128f7f3098c51a5a4a69a');

 return res.send(
{
  message : "logged in successfully",
  user:user,
  isLoggedin :true,
  token
}
)

})


export default router