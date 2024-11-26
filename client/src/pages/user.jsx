import React, { useState,useEffect } from "react";
import Items from "../assets/models/item";
import Custom from "./custom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PaymentPage from "../assets/models/payment";
import {gsap} from "gsap";
import { useNavigate } from 'react-router-dom';














function User() {


  const [showPopup, setShowPopup] = useState(false);
  


  const user = JSON.parse(localStorage.getItem("user")) || { name: "Guest" };
  const [selectedItem, setSelectedItemIndex] = useState(0);
  const [options , setoptions]= useState([]);
  const [caption, setCaption] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: document.querySelector(".main"),
      smooth: true,
    });

   
    return () => {
      scroll.destroy();
    };
  }, []);

  const detail = (index) => {
    if (index !== undefined) {
      setSelectedItemIndex(index) 
      
    }    
  };
  const [order, setOrder] = useState({
    id: '',
    amount: 5000,
    currency: 'INR',
     description: 'Purchase of premium subscription'
  });

  useEffect(() => {
    console.log("Selected Item:", selectedItem);
    const item = Items[selectedItem]
    let price = item.price.split('₹')[1]

    setOrder((prev) => ({
      ...prev, 
      amount: price * 100, 
    }));
   


  }, [selectedItem]);
 
  useEffect(() => {
    async function listOrder() {
      try {
        if (!user) {
          console.error("User not found in localStorage");
          return;
        }
  
        const response = await fetch('http://localhost:8000/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            user: JSON.parse(localStorage.getItem("user"))
          }), 
        });
  
        if (response.ok) {
          const data = await response.json();
          const orders = data.order; 
          setoptions(orders);
          
        } else {
          console.error("Error in creating order:", response.statusText);
        }
      } catch (error) {
        console.error("Network error:", error);  
      }
    }
    
    listOrder(); 
  }, [options]); 
  
   


  async function orderADD  () {
    try{
  
    const response = await fetch('http://localhost:8000/orders_add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        item:Items[selectedItem],
        user: JSON.parse(localStorage.getItem("user"))
      }), 
    });
  
    if (response.ok) {
      const data = await response.json();  
      console.log(data)  
    } else {
      console.error("Error in creating order:", response.statusText);
    }
  
    
  } catch (error) {
    console.error("Network error:", error);  
  }
   } 
  









  
 

  

  
  const handlePayment = async () => {
    
    const response = await fetch('http://localhost:8000/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: order.amount,
        currency: order.currency,
        item:Items[selectedItem],
        user: JSON.parse(localStorage.getItem("user")) 
      }),
    });
    const data = await response.json();
    
    
    const options = {
      key: import.meta.env.VITE_Razor, 
      amount: order.amount, 
      currency: order.currency,
      name: 'PizzaHunt',
      description: order.description,
      order_id: data.order_id, 
      handler: function (response) {

      
       orderADD()
       animate("✅ Orders Placed ")
       
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '999999999',
      },
      theme: {
        color: '#F37254',
      },
    };
  
    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };
  
  
  const verifyPayment = async (response) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;
  
    
    const verificationResponse = await fetch('http://localhost:8000/verify-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      }),
    });
  
    const data = await verificationResponse.json();
    if (data.success) {
      alert('Payment Verified');
    } else {
      alert('Payment verification failed');
    }
  };


  const cardVariants = {
    hover: {
      backgroundColor: "#f1f5f9",
     
    },
  };



  const imgVariants = {
    hover: {
      scale: 0.9,
      transition: { duration: 0.3 },
    },
  };

;

const logout = () =>{
   localStorage.removeItem("token");
   localStorage.removeItem("user");
   navigate("/login")
}


 
const animate = (name) => {
  setCaption(name); 
  gsap.to(".animate", {
    opacity: 1,
    y: 10,
    duration: 0.5,
    ease: "power3.inOut",
  });
  gsap.to(".animate", {
    opacity: 0,
    y: 0,
    duration: 0.5,
    delay: 2,
    ease: "power3.inOut",
  });
};
 
  


  return (

     <>




<div className="animate opacity-0 p-2 bg-zinc-100 border-2 fixed top-[10%] left-[45%] z-10 rounded-lg  "><h1>{caption}</h1></div>
  
 <div className="main">


   <div className="w-full min-h-screen p-7 flex items-center justify-center relative z-0 ">
   
         <button onClick={logout} className="absolute top-2 right-2 px-3 py-1 bg-red-600 rounded-lg text-white name font-bold hover:bg-slate-200 hover:text-red-600 transition-all duration-500">LogOut</button>

     <div className="flex items-center justify-center flex-col mt-[-126%] gap-5">
     
     <div className="logo-1 h-[100px] w-[300px] border-dashed border-4 rounded-lg p-4 flex items-center justify-center  " >
       <div className="flex items-center justify-center">
            <div  className=" h-[70px] w-[70px] overflow-hidden rounded-full">
             <img className="h-full w-full object-cover ml-[10px]" src="https://i.pinimg.com/736x/c3/3e/0c/c33e0cc1d677f47893f77ff3358a3f5b.jpg" alt="" />
            </div>
            <h1  className="name font-bold text-[2.3vw] bg-red-500  px-1 rounded-md text-white mr-6 ">PizzaHunt</h1>

       </div>
     </div>


     <div className="logo h-[100px] w-[300px] bg-slate-200 rounded-lg p-4" >
     <h1 className="name font-bold">Hello,</h1>
       <h2 className="name font-bold text-[2vw] mt-[-10px] text-red-500 capitalize">
         {user.name}<i className="ri-arrow-right-double-fill"></i>
       </h2>
       <h1 className="name font-bold mt-[-10px]">
         Welcome to the{" "}
         <span className="bg-red-500 text-white px-1 rounded-md">
           PizzaHunt
         </span>
       </h1>

     </div>


     <div className="left w-[320px] min-h-[720px] bg-slate-200 rounded-2xl p-4   ">
             <h1 className="name font-bold text-[2vw] text-red-500 ">Your Order<i className="ri-arrow-right-double-fill"></i></h1>
             <div className="h-[1px] w-[80%] bg-zinc-400 "></div>
               

             {options.map((val, index) => {

  const dateObj = new Date(val.timestamp);


  const options = { day: '2-digit', month: 'short' };
  const formattedDate = dateObj.toLocaleDateString('en-GB', options);

  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const seconds = dateObj.getSeconds().toString().padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; 
  const time = `${hours}:${minutes} ${period}`;

  return (
    <div
      key={index} 
      className="h-[100px] w-full bg-slate-300 rounded-xl mt-4 p-5 flex gap-2"
    >
      <div className="name leading-5">
       
        <div className="flex items-center justify-between gap-5">
        <p>OrderNo#{val.order_no}</p>
       <p className="text-[0.9vw] bg-red-600 rounded-lg px-3 text-white">   {formattedDate} {time}</p> 
        </div>
        
        <h1 className="font-bold text-[1.2vw] text-zinc-700">
          {val.name}
        </h1>

        <p className="mt-1">
          Status: 
          <span className={`${
            val.status === "As Received"
              ? "bg-green-700"
              : val.status === "In Kitchen"
              ? "bg-yellow-500"
              : val.status === "Out For Delivery"
              ? "bg-red-500"
              : "bg-blue-500"
          } font-semibold text-white rounded-lg px-2 py-[2px]`}>
            {val.status}
          </span>
        </p>
      </div>
    </div>
  );
})}



     </div>
     </div>

  
     <div className="right-wrapp w-[80%] min-h-[100%] rounded-2xl flex items-center justify-center flex-col gap-8 p-4">
       <div className="right-top w-[95%] h-[300px] bg-slate-200 rounded-2xl overflow-hidden">
        <img className="h-full w-full object-cover" src="/image/p-1.png"  alt="" />
       </div>
       <div className="right-bottom w-[95%] min-h-[800px] bg-slate-200 rounded-2xl p-10 flex-wrap gap-5">
         <div className="flex items-center justify-between ">
         <h1 className="name font-bold text-[2vw] text-[#CC2B52] mb-[10px] ">
           Our Delicious Menu <i className="ri-arrow-right-double-fill"></i>
         </h1>

         <Link to="/custom">
<button className="custom px-3 py-2 bg-red-500 text-white rounded-2xl font-bold hover:scale-[0.9] hover:bg-white hover:text-red-500 transition-all duration-500 ease-in-out">
 Custom Pizza <i className="ri-tent-line"></i>
</button>
</Link>       </div>

   
         {Items.map((val, index) => (
           <motion.div 
             key={index}
             whileHover="hover"
             variants={cardVariants}
             onHoverStart={()=>{(detail(index))}}
             className="h-72 bg-slate-300 rounded-2xl mb-2 border-[2px]"
           >
             <div className="menu h-full w-full flex items-center justify-center gap-[20px]">
               <motion.div
                 className="h-[250px] w-[300px] rounded-2xl overflow-hidden"
                 variants={imgVariants}
               >
                 <motion.img
                   className="h-full w-full object-cover rounded-2xl"
                   src={val.img}
                   alt={val.name}
                 />
               </motion.div>
               <div className="name h-[100%] w-[65%] p-4">
                 <h1 className="name text-[2vw] font-bold">{val.name}</h1>
                 <p>{val.text}</p>
                 <div className="flex gap-2 items-center">
                   <div
                     className={`h-[20px] w-[20px] ${
                       val.veg
                         ? "border-green-500"
                         : "border-red-500"
                     } border-2 flex items-center justify-center bg-white`}
                   >
                     <i
                       className={`ri-circle-fill ${
                         val.veg ? "text-green-500" : "text-red-500"
                       } text-[13px]`}
                     ></i>
                   </div>
                   <h2>{val.veg ? "Veg" : "Non-Veg"}</h2>
                 </div>
                 <h1 className="name text-[20px] font-semibold mt-3">
                   {val.price}
                 </h1>
                 <button onClick={handlePayment} className="px-[40px] py-[10px] border-2 rounded-xl mt-5">
     Add to Order
   </button>

          
           
               </div>
             </div>
           </motion.div>
         ))}
       </div>
     </div>
   </div>
 </div>
     </>
   
  );
}

export default User;
