const mongoose =require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/pizza")
const userschema = mongoose.Schema({

  name : String,
  email : String,
  password: String,
  Address:String,
  Contact:String,
  order:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"order"
    }
  ]

})

module.exports = mongoose.model("user" , userschema)
