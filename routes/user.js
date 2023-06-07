const express = require("express");
const z = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const {findUserByEmail,saveUser}= require("../database/user")
const router = express.Router();

const UserSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(5),
});
const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

router.post("/register",async(req,res) =>{
    try{
        const user = UserSchema.parse(req.body);
        const isEmailAlreadyBeingUsed = await findUserByEmail(user.email); 
        if(isEmailAlreadyBeingUsed) return res.status(400).json({
         message: "email already being used brow"
        }); 
        const hashedPassword = bcrypt.hashSync(user.password,10);
        user.password = hashedPassword;
        
        const savedUser = await saveUser(user);
        delete savedUser.password; 
        res.json({ user: savedUser});
    }catch (error){
      console.log(error);
    if (error instanceof z.ZodError){
      return res.status(422).json({
         message: error.errors,
      });
    }
    res.status(500).json({
      message: "server error"
    });
   }
});

router.post("/login",async (req,res)=>{
  try{
    const data = LoginSchema.parse(req.body);
    const user = await findUserByEmail(data.email);
    if(!user) return res.status(401).send();
    const isSamePassword = bcrypt.compareSync(data.password, user.password);
    if(!isSamePassword) return res.status(401).send();
    const token = jwt.sign({
      userId: user.id
    },process.env.SECRET);
    res.json({
      token,
    });
  }catch(error){
    console.log(error);
    if (error instanceof z.ZodError){
      return res.status(422).json({
         message: error.errors,
      });
    }
    res.status(500).json({
      message: "server error"
    });
  }
})


module.exports= router;