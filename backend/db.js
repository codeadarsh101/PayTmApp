const mongoose = require("mongoose");

mongoose.connect(
    
 ("mongodb+srv://adarshagrahari718:%23adarsh2025@cluster0.dohguvt.mongodb.net/paytm?retryWrites=true&w=majority")
  
   )

const userSchema = new mongoose.Schema({
    username:{
      type:String,
      maxLength:30,
      required:true
    },
    password:{
      type:String,
      maxLength:10,
      required:true
    },
    firstName:{
      type:String,
      maxLength:10,
      required:true
    },
    lastName:{
      type:String,
      maxLength:10,
      required:true
    }
})

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

 const User = mongoose.model("User",userSchema)
 const Account=mongoose.model("Account",accountSchema)

 module.exports={
    User,
    Account
 }
// Yes —-> the userId in your Account schema is directly linked to the _id field in your User collection (Exactly Same Value).
//  It’s how you connect those two collections.