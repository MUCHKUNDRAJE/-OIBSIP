import React,{useState,useEffect} from "react";
import custom_item from "../assets/models/custom_item";
import gsap from "gsap";
import { Link,useNavigate } from "react-router-dom";
import User from "./user";



function Custom() {


const [base, setBase] = useState(0);
const [Chesse, setchesse] = useState(0);
const [Sauce, setsauce] = useState(0);
const [veg, setveg] = useState(0);
const [caption, setCaption] = useState("");

const [total,setTotal]= useState(0)
const navigate = useNavigate(); 

useEffect(() => {
    const newTotal =
      custom_item[0].Pizza_base_prize[base] +
      custom_item[1].Chesse_prize[Chesse] +
      custom_item[2].sauce_prize[Sauce] +
      custom_item[3].veggie_prize[veg];
    setTotal(newTotal);
  }, [base, Chesse, Sauce, veg]);


const baseIncrement = () => {
    if (base < custom_item[0].Pizza_base.length - 1) {
      setBase(base + 1);
    }
  };

  const baseDecrement = () => {
    if (base > 0) {
      setBase(base - 1);
    }
  };

  const chesseIncrement = () => {
    if (Chesse < custom_item[1].Chesse.length - 1) {
      setchesse(Chesse + 1);
    }
  };

  const chesseDecrement = () => {
    if (Chesse > 0) {
      setchesse(Chesse - 1);
    }
  };

  const sauceIncrement = () => {
    if (Sauce< custom_item[2].Sauce.length - 1) {
      setsauce(Sauce+ 1);
    }
  };

  const sacuseDecrement = () => {
    if (Sauce> 0) {
      setsauce(Sauce- 1);
    }
  };

  const vegIncrement = () => {
    if (veg< custom_item[3].veggie.length - 1) {
      setveg(veg+ 1);
    }
  };

  const vegDecrement = () => {
    if (veg> 0) {
      setveg(veg- 1);
    }
  };

  const [order, setOrder] = useState({
    id: '',
    amount: 5000,
    currency: 'INR',
     description: 'Purchase of premium subscription'
  });

  useEffect(() => {
    let price = total;
    console.log(price);
    setOrder((prev) => ({
        ...prev,
        amount: price * 100,
    }));
}, [total]); 

  
const item ={
  name:"Custom Pizza", 
  price:`₹${total}`,
  img:"/image/1.png",  
  Pizza_Bases: custom_item[0].Pizza_base[base],
  Cheese:custom_item[1].Chesse[Chesse],
  Pizza_Sauces:custom_item[2].Sauce[Sauce] ,
  Veggies:custom_item[3].veggie[veg],
  veg:true
}
   

async function orderADD  () {
  try{

  const response = await fetch('http://localhost:8000/orders_add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      item:item,
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








    const Payment =  async() =>{
          
      const response = await fetch('http://localhost:8000/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: order.amount,
          currency: order.currency,
          item:item,
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
          animate('✅ Order Placed'); 
          orderADD()
     
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#F37254',
        },
      };
    
      const razorpay = new window.Razorpay(options);
      razorpay.open();

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
 
       <div className="h-screen w-full flex items-center justify-center relative ">

        <div className="h-[50px] w-[50px] absolute top-8 left-8 z-10  rounded-3xl flex items-center justify-center ">
         <Link to= "/user"><i class="ri-arrow-left-box-fill text-[2vw]"></i></Link> 
        </div>
    <div
        className={`customcard h-[640px] w-[1300px] bg-slate-100 border-4 border-dashed fixed rounded-xl p-4  `}>

        <div className="flex  justify-center h-100% w-100% gap-[50px]" >
            <div className="h-full w-[40%] ">
            <div className="h-[610px] w-[500px] rounded-lg overflow-hidden   "> 
                <img className="h-full w-full object-cover"  src="/image/Drunken Hour.png" alt="" />
            </div>
            </div>

            <div  className="h-[100%] w-1/2 ">
                 <div className="h-[600px] w-[100%] p-4">
                    <h1 className="name text-[2.5vw] font-bold">Create Custom Pizza<i className="ri-arrow-right-double-fill"></i></h1>
                    <p className="name">'Here you can Create your own custom pizza in PizzaHunt you can select  your own choice of Pizza base , Cheese , Sauce , Veggies in the below table </p>
                    <div className=" h-[210px] w-[600px] bg-slate-200 rounded-xl mt-4 flex items-center">
                    <div className="name chooice h-[100%] w-[400px]  py-4 px-3 ">
                            <h1 className="name font-bold">Choice</h1>
                            <p>Pizza-Base </p>
                            <p>Cheese</p>
                            <p>Sauce</p>
                            <p>Veggies</p>
                            <h1 className="name font-bold">Total</h1>
                    </div>
                    <div className="name prize h-[100%] w-[200px]  py-4 px-3 text-center ">
                    <h1 className=" font-bold text-center">Prize</h1>
                            <p>₹{custom_item[0].Pizza_base_prize[base]}</p>
                            <p>₹{custom_item[1].Chesse_prize[Chesse]}</p>
                            <p>₹{custom_item[2].sauce_prize[Sauce]}</p>
                            <p>₹{custom_item[3].veggie_prize[veg]}</p>
                          <div className="bg-zinc-400 w-full h-[1px] rounded-md "></div>
                          <p>₹{total}</p>
                    </div>
                    <div className=" name options h-[100%] w-[400px] py-4 px-3  text-center ">
                    <h1 className="name font-bold text-center">Options</h1>
                    <div className="flex  items-center justify-center gap-1"><button onClick={baseDecrement}  className=" border-[1px] hover:border-black px-[1px] "><i class="ri-arrow-left-s-fill"></i></button><p className=" w-[160px]"  >{custom_item[0].Pizza_base[base]}</p><button onClick={baseIncrement}  className=" border-[1px] hover:border-black px-[1px] "><i className="ri-arrow-right-s-fill"></i></button>  </div>
                    <div className="flex  items-center justify-center gap-2"><button onClick={chesseDecrement} className=" border-[1px] hover:border-black px-[1px] "><i class="ri-arrow-left-s-fill"></i></button><p className=" w-[160px]" >{custom_item[1].Chesse[Chesse]}</p><button onClick={chesseIncrement} className=" border-[1px] hover:border-black px-[1px] "><i className="ri-arrow-right-s-fill"></i></button>  </div>
                    <div className="flex  items-center justify-center gap-2"><button onClick={sacuseDecrement} className=" border-[1px] hover:border-black px-[1px] "><i class="ri-arrow-left-s-fill"></i></button><p className=" w-[160px]">{custom_item[2].Sauce[Sauce]}</p><button onClick={sauceIncrement} className=" border-[1px] hover:border-black px-[1px] "><i className="ri-arrow-right-s-fill"></i></button>  </div>
                    <div className="flex  items-center justify-center gap-2"><button onClick={vegDecrement} className=" border-[1px] hover:border-black px-[1px] "><i class="ri-arrow-left-s-fill"></i></button><p className=" w-[160px]">{custom_item[3].veggie[veg]}</p><button onClick={vegIncrement} className=" border-[1px] hover:border-black px-[1px] "><i className="ri-arrow-right-s-fill"></i></button>  </div>
          
                    </div>
                   
                    </div>
                    <button onClick={Payment} className="px-[30px] py-[8px] border-2 rounded-xl mt-5 absolute top-[45%] left-[80%] bg-red-500 text-white  hover:bg-white hover:text-red-500 hover:scale-[0.9] transition-all duration-500 ease-in-out ">
                      Add To Order
                    </button>
                     <div className="h-[230px] w-[230px] bg-slate-400 mt-4">
                            <img  className="h-full w-full object-cover" src="/image/chef.gif" alt="" />
                     </div>
                 </div>


            </div>


                      
        </div>


       </div>
  












        </div>
        </>
    );
  }
  
  export default Custom;
  