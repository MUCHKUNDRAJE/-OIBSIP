import React, { useEffect, useState,useRef } from "react";
import gsap from "gsap";
import custom_item from "../assets/models/custom_item";
import { Reorder } from "framer-motion";
import { initializeLenis } from "../assets/models/lenis";
import Items from "../assets/models/item";
import {io} from "socket.io-client"


function Admin() {
  const [items, setItems] = useState([]);
  const [received, setreceived] = useState([]);
  const [kitchen, setKitchen] = useState([]);
  const [delivery, setDelivery] = useState([]);

  useEffect(() => {
    const lenis = initializeLenis();

  
    return () => lenis.destroy();
  }, []);

  const [Total_pizza_base, setbase] = useState("");
  const [Total_pizza_suace, setSauce] = useState("");
  const [Total_pizza_cheeze, setCheeze] = useState("");
  const [Total_pizza_veggies, setveggies] = useState("");
  const [Total_pizza_meat, setmeat] = useState("");
  const [PizzaB, setPizza_base] = useState([]);
  const [PizzaS, setPizza_sauce] = useState([]);
  const [PizzaC, setPizza_cheeze] = useState([]);
  const [PizzaV, setPizza_veg] = useState([]);

  const [status, SetStatus] = useState(0);
  const [ALL, SetAll] = useState([
    "Pizza Base",
    "Cheeze",
    "Sauce",
    " Veggies",
     "Meat",
  ]);
 

  const Allinone =[
    custom_item[0].Pizza_base.slice(1),
    custom_item[1].Chesse.slice(1),
    custom_item[2].Sauce.slice(1),
    custom_item[3].veggie.slice(1),
    custom_item[4].Meat.slice(1),
  ]
  const [index, SetIndex] = useState(0);
  const [index2, SetIndex2] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [caption, setCaption] = useState("");

  let isAnimating = false;


  const prevLength = useRef(items.length); 

  useEffect(() => {
    if (items.length > prevLength.current) {
      animate("💹 New order arrived");
    }
    prevLength.current = items.length; 
  }, [items]); 






  const animate_right = () => {
    if (!isAnimating) {
      isAnimating = true;
      gsap.to("#here", {
        x: "+=-100%",
        duration: 1,
        ease: "back.inOut",
        onComplete: () => {
          isAnimating = false;
        },
      });
    }
  };

  const animate_left = () => {
    if (!isAnimating) {
      isAnimating = true;
      gsap.to("#here", {
        x: "+=100%",
        duration: 1,
        ease: "back.inOut",
        onComplete: () => {
          isAnimating = false;
        },
      });
    }
  };
  


  var tl = gsap.timeline();

  const Expand = () => {
    gsap.set(".Expand-b", { display: "none" });
    gsap.set(".contract-b", { display: "block" });

    tl.to(".Expand", {
      height: 165,
      duration: 0.5,
      ease: "power3",
    });
    tl.to(".item-list", {
      y: -5,
      opacity: 1,
      stagger: 0.1,
    });
  };
  const Contract = () => {
    gsap.set(".Expand-b", { display: "block" });
    gsap.set(".contract-b", { display: "none" });

    tl.to(".item-list", {
      opacity: 0,
      stagger: 0.1,
    });
    tl.to(".Expand", {
      height: 50,
      duration: 0.5,
      ease: "power3",
    });
  };

  async function Inventory() {
    try {
      const response = await fetch("http://localhost:8000/getInventory", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();

        setbase(data.total_base);
        setSauce(data.total_sauces);
        setCheeze(data.total_cheese);
        setveggies(data.total_veggies);
        setmeat(data.meat);
        setPizza_base(data.Pizza_Bases);
        setPizza_sauce(data.Pizza_Sauces);
        setPizza_cheeze(data.Pizza_cheeze);
        setPizza_veg(data.Veggies);
      } else {
        console.error("Error at responding");
      }
    } catch (err) {
      console.error("Network error:", error);
    }
 
  }





  const getindex = (index) => {
    console.log(Allinone[index]);

    SetIndex(index);
    console.log( "Index1", { index})
    
    gsap.to(".inventory", {
      x: "-110%",
      duration: 1,
      ease: "power3.inOut",
    });
   gsap.to(".vanish",{
    opacity:1,
   })

  };
  const getindex3 = (index) => {
    console.log("Before setting index2:", index2); 
    SetIndex2(index); 
    console.log("Setting index2 to:", index); 
  

    gsap.to(".inventory", {
      x: "-210%",
      duration: 1,
      ease: "power3.inOut",
    });
    gsap.to(".vanish1", {
      opacity: 1,
    });
  };
  

  useEffect(() => {
    console.log("Updated index2:", index2);
  }, [index2]);
  
  const getindex2 = (index) => {

    
    gsap.to(".inventory", {
      x: "0%",
      duration: 1,
      ease: "power3.inOut",
    });
   gsap.to(".vanish",{
    opacity:0,
   })

  };

  async function Order() {
    try {
      const response = await fetch("http://localhost:8000/getorder", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setItems(data.orders);
      } else {
        console.error("Error at responding");
      }
    } catch (err) {
      console.error("Network error:", error);
    }
  }

  async function Checking() {
    try {
      const response = await fetch("http://localhost:8000/checking", {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setreceived(data.Recevid);
        setKitchen(data.Kitchen);
        setDelivery(data.Delivery);
      } else {
        console.error("Error at responding");
      }
    } catch (err) {
      console.error("Network error:", err);
    }
  }



  const ChangeStatus = async (item) => {
    console.log(item);
    SetStatus((prevCount) => prevCount + 1);

    try {
      const response = await fetch("http://localhost:8000/changeStatus_right", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: item,
          increment: status, 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      
        animate("✅Status Change successfully!")

      } else {
        console.error("Error at responding");
      }
    } catch (err) {
      console.error("Network error:", err); 
    }
  };

  const ChangeStatus_1 = async (item) => {
    console.log(item);
    SetStatus((prevCount) => prevCount + 1);

    try {
      const response = await fetch("http://localhost:8000/changeStatus_left", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order: item,
          increment: status, 
        }),
      });
    
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        animate("✅Status Change successfully!")
     
      } else {
        console.error("Error at responding");
      }
    } catch (err) {
      console.error("Network error:", err); 
    }
  };


  const handleAddStock = async () => {
    try {
      const response = await fetch("http://localhost:8000/Addstock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputValue: inputValue, 
          index1: index,         
          index2: index2,         
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add stock");
      }

      const data = await response.json();
      console.log("API Response:", data);
      animate(" ✅Stock added successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add stock!");
    }
  };


const filteredItems = searchQuery
  ? items.filter((item) => {
     
      return (
 
        item.order_no.toString().includes(searchQuery) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||  
        item.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase()) 
      );
    })
  : items;
  var prices = 0
 items.forEach((val)=>{
             prices = prices +  parseInt(val.price.split("₹")[1]) 
    })



 
    
  
  useEffect(() => {
  
    Inventory();
    Order();
    Checking();

    const interval = setInterval(() => {
      Inventory();
    }, 1000);

    const interval2 = setInterval(() => {
      Order();
      Checking();
    }, 500);

    return () => clearInterval(interval, interval2);
  }, []);

 
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
  

    <div id="main">
      <div className="min-h-screen w-full px-6 py-5">
        <h1 className="name font-bold text-[2vw] text-red-500">
          Admin Dashboard
        </h1>
        <div className="flex items-start gap-4">
          <div className="wrapper mt-2">
            <div className="logo-1 h-[100px] w-[400px] border-dashed border-4 rounded-lg p-4 flex items-center justify-center">
              <div className="flex items-center justify-center">
                <div className="h-[80px] w-[70px] overflow-hidden rounded-full">
                  <img
                    className="h-full w-full object-cover ml-[10px]"
                    src="https://i.pinimg.com/736x/c3/3e/0c/c33e0cc1d677f47893f77ff3358a3f5b.jpg"
                    alt=""
                  />
                </div>
                <h1 className="name font-bold text-[2.3vw] bg-red-500 px-1 rounded-md text-white mr-6">
                  PizzaHunt
                </h1>
              </div>
            </div>

            <div className="h-[100px] w-[400px] bg-slate-200 rounded-xl flex items-center justify-around mt-2">
              <h1 className="name font-bold text-[2vw] text-red-600">
                Today's Order {items.length}
              </h1>
            </div>

            <div className="h-[120px] w-[400px] bg-slate-100 rounded-xl flex items-center justify-around mt-3">
              <div className="name h-[80px] w-[90px] flex flex-col items-center justify-center">
                <i className="ri-mail-check-fill text-[30px] text-red-700"></i>
                <p className="new text-[1.2vw] mt-[-10px]">{received.length}</p>
                <p className="new mt-[-10px] text-zinc-600">As Received</p>
              </div>
              <div className="name h-[80px] w-[90px] flex flex-col items-center justify-center">
                <i className="ri-restaurant-2-fill text-[30px] text-red-700"></i>
                <p className="new text-[1.2vw] mt-[-10px]">{kitchen.length}</p>
                <p className="new mt-[-10px] text-zinc-600">In Kitchen</p>
              </div>
              <div className="name h-[80px] w-[90px] flex flex-col items-center justify-center">
                <i className="ri-e-bike-2-fill text-[30px] text-red-700"></i>
                <p className="new text-[1.2vw] mt-[-10px]">{delivery.length}</p>
                <p className="new mt-[-10px] text-zinc-600 whitespace-nowrap">
                  Out for Delivery
                </p>
              </div>
            </div>

            <div className="h-[250px] w-[400px] bg-slate-200 mt-4 rounded-xl py-2 relative">
              <h1 className="name text-[1.3vw] font-bold text-zinc-500 text-center">
                Mini Inventory
              </h1>
              <div className="h-[90%] w-full p-4 flex gap-4 flex-wrap">
                {[
                  {
                    id: "first",
                    icon: "ri-pie-chart-fill",
                    label: "Base",
                    content1: [custom_item[0].Pizza_base[1]],
                    content2: [custom_item[0].Pizza_base[2]],
                    content3: [custom_item[0].Pizza_base[3]],
                    content4: [custom_item[0].Pizza_base[4]],
                    content5: [custom_item[0].Pizza_base[5]],
                    total: Total_pizza_base,
                  },
                  {
                    id: "second",
                    icon: "ri-triangle-fill rotate-12",
                    label: "Cheeze",
                    content1: [custom_item[1].Chesse[1]],
                    content2: [custom_item[1].Chesse[2]],
                    content3: [custom_item[1].Chesse[3]],
                    content4: [custom_item[1].Chesse[4]],
                    content5: [custom_item[1].Chesse[5]],
                    total: Total_pizza_cheeze,
                  },
                  {
                    id: "third",
                    icon: "ri-ink-bottle-fill",
                    label: "Sauce",
                    content1: [custom_item[2].Sauce[1]],
                    content2: [custom_item[2].Sauce[2]],
                    content3: [custom_item[2].Sauce[3]],
                    content4: [custom_item[2].Sauce[4]],
                    content5: [custom_item[2].Sauce[5]],
                    total: Total_pizza_suace,
                  },
                  {
                    id: "fourth",
                    icon: "ri-bowl-fill",
                    label: "Veggies",
                    total: Total_pizza_veggies,
                  },
                  {
                    id: "fifth",
                    icon: "ri-knife-blood-fill",
                    label: "Meat",
                    total: Total_pizza_meat,
                  },
                ].map((item) => (
                  <div
                    id={`#${item.id}`}
                    key={item.id}
                    data-id={item.id}
                    onClick={() => handleClick(item.id)}
                    className={`inventory-item h-[80px] w-[80px] flex flex-col items-center justify-center bg-slate-300 p-4 rounded-xl`}
                  >
                    <div className="hi flex items-center justify-center flex-col">
                      <i className={`${item.icon} text-[1.8vw]`}></i>
                      <p className="new text-[1.2vw] mt-[-10px]">
                        {item.total}
                      </p>
                      <p className="new mt-[-10px] text-zinc-600">
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className=" h-[210px] w-[400px] bg-slate-200 mt-3 rounded-xl  gap-2 z-10 relative p-1 flex-col overflow-hidden   ">
              <div className="flex items-center justify-between">
                <button onClick={animate_left}>
                  <i class="ri-arrow-left-s-fill "></i>
                </button>
                <h1 className="name text-center font-bold text-[1.3vw] text-zinc-500   ">
                  Inventory
                </h1>
                <button onClick={animate_right}>
                  <i className="ri-arrow-right-s-fill relative top-0 "></i>
                </button>
              </div>

              <div className="flex">
                <div id="here" className="flex  py-1 px-6 ">
                  <div className="h-[170px] w-[190px] rounded-xl  ">
                    <h1 className="name font-bold text-xl"> Pizza Base </h1>
                    {custom_item[0].Pizza_base.slice(1).map((base) => (
                      <p> {base} </p>
                    ))}
                  </div>
                  <div className="h-[170px] w-[170px]  rounded-xl   ">
                    <h1 className="name font-bold text-xl text-center">
                      {" "}
                      Quntity{" "}
                    </h1>
                    {PizzaB.map((base) => (
                      <p className="text-center"> {base} </p>
                    ))}
                  </div>
                </div>

                <div id="here" className="flex  py-1 px-6 ">
                  <div className="h-[170px] w-[190px] rounded-xl  ">
                    <h1 className="name font-bold text-xl"> Sauce </h1>
                    {custom_item[2].Sauce.slice(1).map((base) => (
                      <p> {base} </p>
                    ))}
                  </div>
                  <div className="h-[170px] w-[170px]  rounded-xl   ">
                    <h1 className="name font-bold text-xl text-center">
                      {" "}
                      Quntity{" "}
                    </h1>
                    {PizzaS.map((base) => (
                      <p className="text-center"> {base} </p>
                    ))}
                  </div>
                </div>

                <div id="here" className="flex  py-1 px-6 ">
                  <div className="h-[170px] w-[190px] rounded-xl  ">
                    <h1 className="name font-bold text-xl"> Cheeze </h1>
                    {custom_item[1].Chesse.slice(1).map((base) => (
                      <p> {base} </p>
                    ))}
                  </div>
                  <div className="h-[170px] w-[170px]  rounded-xl   ">
                    <h1 className="name font-bold text-xl text-center">
                      {" "}
                      Quntity{" "}
                    </h1>
                    {PizzaC.map((base) => (
                      <p className="text-center"> {base} </p>
                    ))}
                  </div>
                </div>

                <div id="here" className="flex  py-1 px-6 ">
                  <div className="h-[170px] w-[190px] rounded-xl  ">
                    <h1 className="name font-bold text-xl"> Veggies </h1>
                    {custom_item[3].veggie.slice(1).map((base) => (
                      <p> {base} </p>
                    ))}
                  </div>
                  <div className="h-[170px] w-[170px]  rounded-xl   ">
                    <h1 className="name font-bold text-xl text-center">
                      {" "}
                      Quntity{" "}
                    </h1>
                    {PizzaV.map((base) => (
                      <p className="text-center"> {base} </p>
                    ))}
                  </div>
                </div>

                <div id="here" className="flex  py-1 px-6 ">
                  <div className="h-[170px] w-[190px] rounded-xl  ">
                    <h1 className="name font-bold text-xl"> Meat </h1>

                    <p> Chicken </p>
                  </div>
                  <div className="h-[170px] w-[170px]  rounded-xl   ">
                    <h1 className="name font-bold text-xl text-center">
                      {" "}
                      Quntity{" "}
                    </h1>

                    <p className="text-center"> {Total_pizza_meat} </p>
                  </div>
                </div>
              </div>
            </div>

            <div className=" Expand h-[50px] w-[400px] bg-slate-200 rounded-lg mt-2 p-3 relative overflow-hidden  ">
              <div className="flex items-center justify-between ">
                <div className="flex w-full ">
                <h1 className="name font-bold text-zinc-500 ">Add Stock </h1>
                <i className="ri-arrow-right-double-fill name font-bold text-zinc-500 "></i> 

                <h1 onClick={getindex2}  className="vanish name font-bold text-zinc-500 opacity-0">{ALL[index]}<i className="ri-arrow-right-double-fill name font-bold text-zinc-500 "></i> </h1>
           
                <h1  className="vanish1 name font-bold text-zinc-500 opacity-0">{Allinone[index][index2]}</h1>
                </div>
                <div className="relative flex h-[25px] ">
                  <button
                    onClick={Expand}
                    className="Expand-b  bg-white px-2 rounded-lg border-[1px] text-black border-dashed "
                  >
                    <i class="ri-arrow-drop-down-fill"></i>
                  </button>
                  <button
                    onClick={Contract}
                    className="  contract-b bg-white px-2 rounded-lg border-[1px] text-black border-dashed hidden "
                  >
                    <i class="ri-arrow-drop-up-fill"></i>
                  </button>
                </div>
              </div>
              <div className="inventory flex   ">
                <div className="h-300px w-300px  ">
                  {ALL.map((item, index) => (
                    <p
                      onClick={() => getindex(index)}
                      className="item-list name font-bold hover:bg-red-600 hover:text-white px-2 cursor-pointer opacity-0 rounded-md w-[200px] "
                    >
                      {item}
                    </p>
                  ))}
                </div>
                <div>
                  <div>
                    {Allinone[index].map((item,index) => (
                      <p
                        onClick={() => getindex3(index)}
                        className="item-list name font-bold hover:bg-red-600 hover:text-white px-2 cursor-pointer opacity-0 rounded-md translate-x-[120%]"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
               
                </div>
                <div  className=" absolute top-0 left-[210%] p-3">
                    <h1 className="name font-bold text-[1vw] ">Add Qunatity</h1>
                    <input className="bg-white border-black block p-1 name rounded-lg" type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}         
                    />
                    <button onClick={handleAddStock} className="px-4  py-1 bg-red-600 name font-bold text-white rounded-md mt-2 ">Add</button>
                  </div>
              </div>
            </div>
          </div>
          <div>
            <div> 
              <div className="  min-h-[1010px] w-[800px] bg-slate-200 rounded-2xl p-5 ">
                <div className="flex items-center justify-between">

                <h1 className="name text-[2vw] font-bold text-red-600 mt-3 ml-2 ">
                  
                  <i class="ri-bard-fill"></i>Order List
                </h1>
                    
                    <div>
         
                         <input className="  p-2 w-[200px] rounded-xl mt-1 mr-1 text-red-500 name outline-red-500  border-zinc-600  " type="text" placeholder='Search' 
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                         />
                      
                    </div>
                </div>
                    
                <div className="  flex flex-col gap-3 items-center p-4 ">
                {filteredItems.length === 0 ? (
  <div className="h-full w-full flex items-center justify-center gap-[50px]">
    <h1 className="name text-zinc-400 font-bold text-[2vw]">No Order</h1>
  </div>
) : (
  filteredItems
    .slice() 
    .sort((a, b) => b.id - a.id)
    .reverse() 
    .map((item , index ) => (
      <div
        key={item.id}     
        className="h-[170px] w-[760px] bg-slate-300 rounded-2xl p-3 flex gap-2"
      >
        <div className="h-[100%] w-[25%] bg-red-200 rounded-2xl overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={`${item.img}`}
            alt=""
          />
        </div>
        <div className="leading-[1.3]">
          <p className="name">Order#{item.order_no}</p>
          <div className="leading-[0.8]">
            <div className="flex items-center gap-2">
              <h1 className="name font-bold text-[1.3vw] text-red-600">
                {item.name}
              </h1>
              <div
                className={`h-[20px] w-[20px] ${
                  item.veg ? "border-green-500" : "border-red-500"
                } border-2 bg-white flex items-center justify-center`}
              >
                <i
                  className={`ri-circle-fill ${
                    item.veg ? "text-green-500" : "text-red-500"
                  } text-[13px]`}
                ></i>
              </div>
            </div>
            <span className="text-[0.9vw] name font-bold whitespace-nowrap text-red-600">
              {item.name === "Custom Pizza"
                ? `(${item.Pizza_Bases} , ${item.Pizza_Sauces} , ${item.Cheese} , ${item.Veggies})`
                : ""}
            </span>
          </div>
          <h4>
            Buyer <span className="name capitalize">{item.user.name}</span>
          </h4>
          <p className="name">
           Address : {item.user.Address}
          </p>
          <div className="flex items-center gap-5">
            <p className="name">Phone : {item.user.Contact}</p>
            <p className="name">
              Price :{" "}
              <span className="bg-red-600 text-white px-1 rounded-md">
                {item.price}
              </span>
            </p>
          </div>
          <div
            className={`h-[30px] w-[150px] rounded-xl flex items-center justify-center px-4 ${
              item.status === "As Received"
                ? "bg-green-700"
                : item.status === "In Kitchen"
                ? "bg-yellow-500"
                :item.status === "Out For Delivery"
                ? "bg-red-500"
                :"bg-blue-500"

            }`} 
          >
            <button onClick={() => ChangeStatus_1(item._id)}>
              <i className="ri-arrow-left-s-fill text-white"></i>
            </button>
            <h1 className="name font-bold text-white capitalize whitespace-nowrap ">
              {item.status}
            </h1>
            <button onClick={() => ChangeStatus(item._id)}>
              <i className="ri-arrow-right-s-fill text-white"></i>
            </button>
          </div>
        </div>
      </div>
    ))
)}

                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="h-[110px] w-[230px] bg-slate-200 rounded-2xl p-5">
              <h1 className="name text-3xl font-bold text-center text-red-600 ">
                Today's Sale
              </h1>
              <h1 className="new text-3xl font-bold text-center text-red-600 ">
                ₹ {prices}
              </h1>
            </div>
            <div className=" min-h-[100px] w-[230px] bg-slate-200 rounded-2xl p-3 leading-4">
              <h1 className="name text-green-700 font-bold text-[1.2vw]">
                <i class="ri-bard-fill"></i>As Received{" "}
              </h1>
              {received.length === 0 ? ( 
                <div className="h-full w-full flex items-center justify-center  mt-4">
                  <h1 className="name text-zinc-400 font-bold text-[1.6vw]">
                    No Order
                  </h1>
                </div>
              ) : (
                received.map((order) => (
                  <div
                    key={order.order_no}
                    className="h-[70px] w-full bg-slate-300 mt-2 rounded-lg p-2"
                  >
                    <p className="name text-[0.9vw]">Order#{order.order_no}</p>
                    <h1>{order.name}</h1>
                    <h1 className="name text-[0.9vw]">{order.user.name}</h1>
                  </div>
                ))
              )}
            </div>

            <div className="min-h-[100px] w-[230px] bg-slate-200 rounded-2xl p-3 leading-4">
              <h1 className="name text-yellow-600 font-bold text-[1.2vw]">
                <i class="ri-bard-fill"></i>In Kitchen{" "}
              </h1>
              {kitchen.length === 0 ? ( 
                <div className="h-full w-full flex items-center justify-center  mt-4">
                  <h1 className="name text-zinc-400 font-bold text-[1.6vw]">
                    No Order
                  </h1>
                </div>
              ) : (
                kitchen.map((order) => (
                  <div
                    key={order.order_no}
                    className="h-[70px] w-full bg-slate-300 mt-2 rounded-lg p-2"
                  >
                    <p className="name text-[0.9vw]">Order#{order.order_no}</p>
                    <h1>{order.name}</h1>
                    <h1 className="name text-[0.9vw]">{order.user.name}</h1>
                  </div>
                ))
              )}
            </div>
            <div className="min-h-[100px] w-[230px] bg-slate-200 rounded-2xl p-3 leading-4 ">
              <h1 className="name text-red-600 font-bold text-[1.2vw]">
                <i class="ri-bard-fill"></i>Out For Delivery{" "}
              </h1>
              {delivery.length === 0 ? ( 
                <div className="h-full w-full flex items-center justify-center  mt-4">
                  <h1 className="name text-zinc-400 font-bold text-[1.6vw]">
                    No Order
                  </h1>
                </div>
              ) : (
                delivery.map((order) => (
                  <div
                    key={order.order_no}
                    className="h-[70px] w-full bg-slate-300 mt-2 rounded-lg p-2"
                  >
                    <p className="name text-[0.9vw]">Order#{order.order_no}</p>
                    <h1>{order.name}</h1>
                    <h1 className="name text-[0.9vw]">{order.user.name}</h1>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Admin;
