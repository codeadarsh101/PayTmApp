const express =require("express");
 const zod= require("zod");
const router =express.Router();
 const jwt = require("jsonwebtoken")
const {User} =require("../db")
 const {Account} =require("../db")
const JWT_SECRET=require("../config.js")
const  { authMiddleware } = require("../middleware.js");

const signupSchema = zod.object({
    username:zod.string(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})

router.post("/signup",async(req,res)=>{
    const body= req.body;
    const {success}= signupSchema.safeParse(body)
    if(!success){
        return res.json({
            msg:"EmailAlready taken/ Incorrect inputs"
        })
    }

      // check if user already exists
    const existingUser = await User.findOne({
       username : req.body.username
    })

    if( existingUser){
        return res.json({
            msg:"User already exists"
        })
    }
    
    // create the new user ...
     
      const user = await User.create({
      username :req.body.username,
       password:req.body.password,
        firstName:req.body.firstName,
         lastName:req.body.lastName
  })

   const userId= user._id; //given by mongodb..
  
  await Account.create({ //create acc. as well
    userId,
    balance:1+Math.random()*1000
  })


  
  const token =jwt.sign({
      userId
  } ,JWT_SECRET)

  res.json({
    msg:"User created successfully",
    token:token
 })

})

const signinSchema=zod.object({
    username:zod.string(),
    password:zod.string()
})

router.post("/signin",async(req,res)=>{
     const body= req.body;
     const {success}= signinSchema.safeParse(body);
   if(!success){
     return res.json({
        msg:"Wrong credentials"
     })
   }
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
       
    }else{
        res.status(411).json({
        message: "Error while logging in"
    })

    }

    
})

const updateBody = zod.object({
	password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
})
 
// for updating route must be secured.. 
router.put("/update", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(
     { _id: req.userId },   // find by userId
     { $set: req.body }     // apply the update
    )

    res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id 
        }))
    })
})



module.exports =  router

