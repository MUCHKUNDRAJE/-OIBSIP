const mongoose = require("mongoose");

const foodschema = mongoose.Schema({

  order_no:Number,
  
  count:Number,

  name:String,
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user",
  },
  text:String,

  img:String,

  price:String,

  veg:Boolean,

  Pizza_Bases:String,

  Pizza_Sauces:String,

  Cheese:String,


  meat:String,
  
  Veggies:String,

  status:String,
  
  timestamp: { type: Date, default: Date.now }

  
});

module.exports = mongoose.model("order", foodschema);
