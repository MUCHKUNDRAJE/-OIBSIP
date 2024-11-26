const express = require("express");
const cors = require("cors");
const usermodel = require('./models/user')
const ordermodel = require("./models/order")
const nodemailer = require('nodemailer');
const cookie = require("cookie-parser");
const bcrypt = require("bcrypt");
const Razorpay = require("razorpay")
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser")
const crypto = require("crypto");
const adminmodel = require("./models/admin")
const { create } = require("domain");
const admin = require("./models/admin");
const order = require("./models/order");
const user = require("./models/user");
require('dotenv').config();



const app = express();

var Admin = "673d6f5d4b5583d065885bae"
let get_otp =""


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());


app.get("/", (req, res, next) => {
  res.json({ fruits: ["apple", "banana", "orange"] });
});

function generateRandomValue() {
  return Math.floor(Math.random() * 10000);
} 

 

const razorpay = new Razorpay({
  key_id: process.env.PAY_ID,
  key_secret: process.env.PAY_KEY,
 
});
app.post('/create-order', async (req, res) => {
  const { amount, currency, item , user} = req.body;

  

  const options = {
    amount: amount, 
    currency: currency,
    receipt: `receipt_${Math.random()}`,
    payment_capture: 1,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({ order_id: order._id });

  } catch (error) {
    res.status(500).json({ error: 'Error creating Razorpay order' });
  }
});


app.post('/verify-payment', async (req, res) => {
  const { payment_id, order_id, signature } = req.body;

  const generated_signature = crypto
    .createHmac('sha256', process.env.PAY_KEY)
    .update(payment_id + "|" + order_id)
    .digest('hex');

  if (generated_signature === signature) {
    res.json({ success: true });
  } else {
    res.status(400).json({ error: 'Payment verification failed' });
  }
});


app.post("/orders", async (req,res,next)=>{
   const {user} = req.body;
  let order_data = await usermodel.findOne({_id:user._id}).populate("order")
  res.json(order_data)
})


let count = 1; 

app.post("/orders_add",async (req,res,next)=>{
  const {item , user} = req.body;
  console.log(user)
  
  let Dbuser = await usermodel.findOne({_id:user._id})
  let admin = await adminmodel.findOne({_id : Admin})
  
  let order_data = await ordermodel.create({
    count:1,
    order_no:admin.count++,
    user: user._id, 
    name: item.name,
    text: item.text,
    img: item.img,
    price: item.price,
    veg: item.veg,
    Pizza_Bases: item.Pizza_Bases,
    Pizza_Sauces: item.Pizza_Sauces,
    Cheese: item.Cheese,
    meat: item.meat,
    Veggies:item.Veggies,
    timestamp: new Date(),
    status:"As Received",
   })
   Dbuser.order.push(order_data._id);

   await Dbuser.save();

  
   await admin.save();

   AddInventory(item.Pizza_Bases,item.Pizza_Sauces,item.Cheese,item.meat,item.Veggies)

 res.json({message:"sucess"})
})



async function AddInventory(Pizza_Bases,Pizza_Sauces,Cheese,meat,veggie) {
  try {
      const admin = await adminmodel.findOne({_id: Admin})
      console.log(Pizza_Bases)
       if(Pizza_Bases=="Classic Hand-Tossed"){admin.Pizza_Bases.Classic_Hand_Tossed--;}
       else if(Pizza_Bases=="Thin Crust"){admin.Pizza_Bases.Thin_Crust--;}
       else if(Pizza_Bases=="Whole Wheat Crust"){admin.Pizza_Bases.Whole_Wheat_Crust--;}
       else if(Pizza_Bases=="Gluten-Free Crust"){admin.Pizza_Bases.Gluten_Free_Crust--;}
       else if(Pizza_Bases=="Stuffed Crust"){admin.Pizza_Bases.Stuffed_Crust--;}

       console.log(Pizza_Sauces)
       if(Pizza_Sauces=="Classic Marinara"){admin.Pizza_Sauces. Classic_Marinara--;}
       else if(Pizza_Sauces=="White Alfredo Sauce"){admin.Pizza_Sauces.White_Alfredo_Sauce--;}
       else if(Pizza_Sauces=="Pesto Sauce"){admin.Pizza_Sauces.Pesto_Sauce--;}
       else if(Pizza_Sauces=="Barbecue Sauce"){admin.Pizza_Sauces.Barbecue_Sauce--;}
       else if(Pizza_Sauces=="Spicy Sauce"){admin.Pizza_Sauces.Spicy_Sauce--;}

       console.log(Cheese)
       if(Cheese=="Mozzarella"){admin.Cheese.Mozzarella--;}
       else if(Cheese=="Cheddar"){admin.Cheese.Cheddar--;}
       else if(Cheese=="Parmesan"){admin.Cheese.Parmesan--;}
       else if(Cheese=="Gorgonzola"){admin.Cheese.Gorgonzola--;}
       else if(Cheese=="Provolone"){admin.Cheese.Provolone--;}

      console.log(veggie)
      if(veggie=="Bell Peppers"){admin.veggie.Bell_Peppers--;}
      else if(veggie=="Onion"){admin.veggie. Onions--;}
      else if(veggie=="Olives"){admin.veggie.Olives--;}
      else if(veggie=="Panner"){admin.veggie.Mushrooms--;}
      else if(veggie=="Capsicum"){admin.veggie.Capsicum--;}
   
       console.log(meat)
       if(meat=="Chicken"){ admin.meat. Chicken--};


    await admin.save();

    AlertEmail()
    console.log("Inventory added successfully:", admin);
  } catch (error) {
    console.error("Error adding inventory:", error);
  }
}


app.post("/getInventory", async(req,res,next)=>{
    const admin = await adminmodel.findOne({_id:Admin});
    
    let total_base =   admin.Pizza_Bases.Classic_Hand_Tossed + admin.Pizza_Bases.Thin_Crust + admin.Pizza_Bases.Stuffed_Crust + admin.Pizza_Bases.Whole_Wheat_Crust + admin.Pizza_Bases.Gluten_Free_Crust
    let total_sauces = admin.Pizza_Sauces.Classic_Marinara + admin.Pizza_Sauces.White_Alfredo_Sauce + admin.Pizza_Sauces.Barbecue_Sauce + admin.Pizza_Sauces.Pesto_Sauce + admin.Pizza_Sauces.Spicy_Sauce
    let total_cheese = admin.Cheese.Mozzarella + admin.Cheese.Cheddar + admin.Cheese.Parmesan + admin.Cheese.Gorgonzola + admin.Cheese.Provolone
    let total_veggies = admin.veggie.Bell_Peppers +admin.veggie.Capsicum+admin.veggie.Onions+admin.veggie.Olives+admin.veggie.Mushrooms ;
    let meat = admin.meat.Chicken
    let Pizza_Bases = [ admin.Pizza_Bases.Classic_Hand_Tossed , admin.Pizza_Bases.Thin_Crust , admin.Pizza_Bases.Stuffed_Crust , admin.Pizza_Bases.Whole_Wheat_Crust ,admin.Pizza_Bases.Gluten_Free_Crust]
    let Pizza_Sauces = [ admin.Pizza_Sauces.Classic_Marinara , admin.Pizza_Sauces.White_Alfredo_Sauce ,  admin.Pizza_Sauces.Pesto_Sauce ,admin.Pizza_Sauces.Barbecue_Sauce , admin.Pizza_Sauces.Spicy_Sauce ] 
    let Pizza_cheeze = [ admin.Cheese.Mozzarella , admin.Cheese.Cheddar , admin.Cheese.Parmesan , admin.Cheese.Gorgonzola , admin.Cheese.Provolone ]
    let Veggies = [admin.veggie.Bell_Peppers ,admin.veggie.Onions,admin.veggie.Olives,admin.veggie.Mushrooms,admin.veggie.Capsicum ]
    
  

      res.json({total_base, total_sauces, total_cheese, total_veggies,meat,admin,Pizza_Bases,Pizza_Sauces,Pizza_cheeze,Veggies});
})


app.post("/getorder",async(req,res,next)=>{
    
        let orders = await ordermodel.find({}).populate("user")
        res.json({orders})
})


app.post("/send-otp",async(req,res,next)=>{
   let {email} = req.body
   get_otp = generateRandomValue();
   sendMail(email,get_otp,"Guest");
   
   res.json({message:"Succes", otp:get_otp})

  })


  app.post("/Change_password", async (req, res, next) => {
    try {
      const { email, otp, newPassword } = req.body;
  
  
      if (!email || !otp || !newPassword) {
        return res.status(400).json({ success: false, message: "Invalid input" });
      }
  
   
      const user = await usermodel.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
   
  
    
      bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
  
        bcrypt.hash(newPassword, salt, async (err, hash) => {
          if (err) return next(err); 
  
          user.password = hash;
          await user.save();
  
          res.json({ success: true, message: "Password changed successfully" });
        });
      });
    } catch (error) {
      console.error("Error in /Change_password route:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  


async function peek(input, index1, index2) {
  try {
    let admin = await adminmodel.findOne({ _id: Admin }); 

    const baseFields = ["Classic_Hand_Tossed", "Thin_Crust", "Stuffed_Crust", "Whole_Wheat_Crust", "Gluten_Free_Crust"];
    const ChezzeFields = ["Mozzarella", "Cheddar", "Parmesan", "Gorgonzola", "Provolone"];
    const sauceFields = ["Classic_Marinara", "White_Alfredo_Sauce", "Pesto_Sauce", "Barbecue_Sauce", "Spicy_Sauce"];
    const VeggiesFields = ["Bell_Peppers", "Onions", "Mushrooms", "Barbecue_Sauce", "Capsicum"];
    const Meat = ["Chicken"];

    if (index1 === 0) {
      const field = baseFields[index2];
      admin.Pizza_Bases[field] += parseInt(input);
    } else if (index1 === 2) {
      const field = sauceFields[index2];
      admin.Pizza_Sauces[field] += parseInt(input);
    }else if (index1 === 1) {
      const field = ChezzeFields[index2];
      admin.Cheese[field] +=parseInt(input);
    }else if (index1 === 4) {
      const field = Meat[index2];
      admin.meat[field] +=parseInt(input); 
    }else if (index1 === 3) {
      const field = VeggiesFields[index2];
      admin.veggie[field] +=parseInt(input); 
    } else {
      throw new Error("Invalid index1 value");
    }

   
    await admin.save();
    console.log("Stock updated successfully");
  } catch (error) {
    console.error("Error in peek function:", error.message);
    throw error; 
  }
}





app.post("/Addstock", async (req, res, next) => {
  try {
    console.log("Raw body:", req.body);
    const { inputValue, index1, index2 } = req.body;
    console.log("Parsed values:", inputValue, index1, index2);
    peek( inputValue,index1,index2)
    res.json({ inputValue , index1 ,index2 });
  } catch (error) {
    console.error("Error in /Addstock route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});





app.post("/changeStatus_right", async (req, res, next) => {
  const { order } = req.body;  
     let status_order = await ordermodel.findOne({_id:order}).populate("user");
     
    
    if(status_order.count < 4)
  {
  status_order.count ++ ;
  }

      console.log(status_order.count)
      
       if(status_order.count == 1)
       {
        status_order.status = "As Received"
       }else if(status_order.count == 2)
       {
           status_order.status = "In Kitchen"
           console.log("In Kitchen")
           SendStatus(status_order.user.email,status_order.name, status_order.user.name,"In Kitchen")
       }else if(status_order.count == 3){
        status_order.status = "Out For Delivery"
        SendStatusDelivery(status_order.user.email,status_order.name, status_order.user.name,"Out For Delivery")
       }else{
         status_order.status = "Delivered"
       }
       
       await status_order.save();
      
     
    res.json({ message: "success" });  

  
});

app.post("/changeStatus_left", async (req, res, next) => {
  const { order } = req.body;  
     let status_order = await ordermodel.findOne({_id:order}).populate("user");
     
    
    if(status_order.count > 1)
  {
       status_order.count -- ;
  }

      console.log(status_order.count)
      
       if(status_order.count == 1)
       {
        status_order.status = "As Received"
   
       }else if(status_order.count == 2)
       {
           status_order.status = "In Kitchen"
       }else{
        status_order.status = "Out For Delivery"
       }
       
       await status_order.save();
      
     
    res.json({ message: "success" }); 
});

app.post("/checking",async (req,res,next)=>{
  
   const Recevid = await ordermodel.find({status:"As Received" }).populate("user") 
   const Kitchen = await ordermodel.find({status:"In Kitchen"}).populate("user")
   const Delivery = await ordermodel.find({status:"Out For Delivery"}).populate("user")

  res.json({Recevid:Recevid , Kitchen:Kitchen , Delivery:Delivery })

})



function sendMail(Email, otp , user)
{

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  
  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: `${Email}`, 
    subject: 'Your One-Time Password (OTP) for Login ',  
   html: `<p>Dear <strong>${user.name}</strong>,</p>
      <p>We received a request to log in to your account. Use the OTP below to complete your login:</p>
      <p><strong style="font-size: 18px; color: #333;">${otp}</strong></p>
      <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
      <p>If you did not request this, please ignore this email or contact support immediately.</p>
      <p>Thank you for using <strong>PizzaHunt</strong>.</p>
      <p>Best regards,<br>
      PizzaHunt<br>
     `
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error:', error);
    }
    console.log('Email sent: ' + info.response);
  });
}



app.post("/hello", async (req, res, next) => {
  const { name, email, password ,Address ,Contact} = req.body;
  
  const user = {
    name,
    email,
    password,
    Address,
    Contact

  };

  console.log('Received input:', user);
  let Olduser = await usermodel.findOne({ email });
  
  if (Olduser) {
    return res.status(400).send("You are already registered");
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err); 

    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) return next(err); 

      let newUser = await usermodel.create({
        name,
        email,
        password: hash,
        Address,
        Contact

      });

      let token = jwt.sign({ username: email, userId: newUser._id }, "shhhhh");
      
     
      res.cookie("token", token);
      res.json({ user });
    });
  });
});



console.log(get_otp)

app.post("/otp", async( req , res, next)=>{
  const{ email ,password} = req.body

   get_otp = generateRandomValue();
   let user = await usermodel.findOne({ email });
   if (!user) return res.status(400).send("User not found");
   sendMail(email,get_otp, user)
  

})


app.post("/login", async (req, res, next) => {
  const { email, otp, password } = req.body;

  if (parseInt(otp) !== get_otp) {
    return res.status(400).send("Invalid OTP");
  }

  let user = await usermodel.findOne({ email });
  if (!user) return res.status(400).send("User not found");

  bcrypt.compare(password, user.password, async (err, result) => {
    if (err) return next(err); 

    if (result) {
      const token = jwt.sign({ username: email, userId: user._id }, process.env.JWT_SECRET,);
   
      res.json({ message: "Login successful", token , user }); 
    } else {
      res.status(400).send("Invalid password");
    }
  });
});

function verifyToken(req, res, next) {
  const token = req.headers['authorization']; 
  
  if (!token) {
    return res.status(403).send("Token is required");
  }

  // Verify the token
  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send("Invalid or expired token");
    }
    req.user = decoded; 
    next();
  });
}

app.get('/user', verifyToken, (req, res) => {
  res.send("Protected User Data"); 
});



async function AlertEmail() {
  try {

    const admin = await adminmodel.findOne({ _id: Admin });

    if (!admin || !admin.Pizza_Bases) {
      console.error("Admin document or Pizza_Bases field is missing.");
      return;
    }

    const baseFields = ["Classic_Hand_Tossed", "Thin_Crust", "Stuffed_Crust", "Whole_Wheat_Crust", "Gluten_Free_Crust"];
    const ChezzeFields = ["Mozzarella", "Cheddar", "Parmesan", "Gorgonzola", "Provolone"];
    const sauceFields = ["Classic_Marinara", "White_Alfredo_Sauce", "Pesto_Sauce", "Barbecue_Sauce", "Spicy_Sauce"];
    const VeggiesFields = ["Bell_Peppers", "Onions", "Mushrooms", "Barbecue_Sauce", "Capsicum"];
    const Meat = ["Chicken"];

    baseFields.forEach((val, index) => {
      if (admin.Pizza_Bases[val] <= 20) {
        send_Alert_Email(baseFields[index], admin.Pizza_Bases[val]);
      }
    });

    ChezzeFields.forEach((val, index) => {
      if (admin.Cheese[val] <= 20) {
        send_Alert_Email(ChezzeFields[index], admin.Cheese[val]);
      }
    });

    sauceFields.forEach((val, index) => {
      if (admin.Pizza_Sauces[val] <= 20) {
        send_Alert_Email(sauceFields[index], admin.Pizza_Sauces[val]);
      }
    });

  VeggiesFields.forEach((val, index) => {
      if (admin.veggie[val] <= 20) {
        send_Alert_Email(VeggiesFields[index], admin.veggie[val]);
      }
    });

    Meat.forEach((val, index) => {
      if (admin.meat[val] <= 20) {
        send_Alert_Email(Meat[index], admin.meat[val]);
      }
    });

    console.log("Stock checked successfully.");
  } catch (error) {
    console.error("Error in AlertEmail function:", error.message);
    throw error;
  }
}






function SendStatus(Email, food, name, status) {
  if (!Email || !food || !name || !status) {
    console.error("Missing required parameters: Email, food, name, or status.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: Email, 
    subject: "Order Status Update", 
    html: `
    <p>Dear <strong>${name}</strong>,</p>
    <p>Great news! Your order is now <strong>in the kitchen</strong>, and our team is working hard to prepare it for you.</p>
    <p>Order Details:<br>
    <strong>-${food}</strong></p>
    <p>We aim to deliver your order fresh and on time. We’ll notify you once it’s ready for pickup or out for delivery.</p>
    <p>If you have any questions or special requests, feel free to reach out to our support team at <a href="mailto:PizzaH@gamil.com">PizzaH@gamil.com</a>.</p>
    <p>Thank you for choosing <strong>PizzaHunt</strong>. We hope you enjoy your meal!</p>
    <p>Best regards,<br>
       PizzaHunt
    <br>
     `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return;
    }
    console.log("Email sent: " + info.response);
  });
}


function SendStatusDelivery(Email, food, name, status) {
  if (!Email || !food || !name || !status) {
    console.error("Missing required parameters: Email, food, name, or status.");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: Email, 
    subject: "Order Status Update", 
    html: `
      <p>Dear <strong>${name}</strong>,</p>
      <p>Your order is now <strong>out for delivery</strong>. It will reach you shortly!</p>
      <p>Order Details:<br>
    <strong>-${food}</strong></p>
      <p>The delivery person assigned to your order is:</p>
      <ul>
        <li><strong>Name:</strong> Mukesh Shukla</li>
        <li><strong>Contact:</strong> 987654321 </li>
      </ul>
      <p>If you have any questions or need to coordinate the delivery, feel free to contact the delivery person directly.</p>
      <p>Thank you for choosing <strong>PizzaHunt</strong>. We hope you enjoy your order!</p>
      <p>Best regards,<br>
        PizzaHunt<br>
     `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return;
    }
    console.log("Email sent: " + info.response);
  });
}






function send_Alert_Email(Item,amount)
{

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  
  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to: process.env.EMAIL_USER  , 
    subject: 'Alert for Stock',  
    html: `
   <p>Dear <strong>Admin</strong>,</p>
      <p>This is a stock alert notification for your inventory. The following item is running low and requires attention:</p>
      <p><strong>Item Details:</strong></p>
      <ul>
        <li><strong>Item Name:</strong> ${Item}</li>
        <li><strong>Current Stock:</strong> ${amount}</li>
        <li><strong>Threshold Level:</strong> 20 </li>
      </ul>
      <p>Please take the necessary action to replenish the stock to avoid any disruptions.</p>
      <p>Thank you for managing inventory effectively!</p>
      <p>Best regards,<br>
      PizzaHunt<br>   `, 
    
  };
  
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error:', error);
    }
    console.log('Email sent: ' + info.response);
  });
}










app.listen(8000, (err) => {
  if (!err) {
    console.log("Server is running on port 8000");
  } else {
    console.log(err);
  }
});
