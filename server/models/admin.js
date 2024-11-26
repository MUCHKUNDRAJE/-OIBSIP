const mongoose = require("mongoose");

const Adminschema = mongoose.Schema({
 
  price:String,

  count:Number,
  
  Pizza_Bases:{
     None:Number,
     Classic_Hand_Tossed : Number,
     Thin_Crust:Number,
     Stuffed_Crust:Number,
     Whole_Wheat_Crust:Number,
     Gluten_Free_Crust:Number,
  },

  Pizza_Sauces:{
    None:Number,
    Classic_Marinara:Number,
    White_Alfredo_Sauce:Number,
    Pesto_Sauce:Number,
    Barbecue_Sauce:Number,
    Spicy_Sauce:Number ,
  },

  Cheese:{
      None:Number ,
      Mozzarella:Number ,
     Cheddar:Number ,
     Parmesan:Number ,
     Gorgonzola:Number ,
     Provolone:Number ,
  },
  meat:{
    Chicken:Number
  },

  veggie:{
    None:Number ,
    Bell_Peppers:Number ,
    Onions:Number ,
    Olives:Number ,
    Mushrooms:Number ,
    Capsicum:Number ,
  },

});

module.exports = mongoose.model("admin", Adminschema);
