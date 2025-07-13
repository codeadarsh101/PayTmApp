 
const express =require("express")
 const router = express.Router(); //mini router object..

 const userRouter = require("./user"); //importing
 const accountRouter = require('./account')

 router.use("/user",userRouter)
 router.use("/account",accountRouter)



module.exports =router
