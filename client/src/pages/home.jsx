import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import Image from "../components/img";

function Home() {
 
  const [Name, setName] = useState("");
  const Navigate = useNavigate();
   
 
 

  const navigate = ()=>{
    Navigate("/sign-in")
  }
  return (
    <div className="bhai h-screen w-full bg-white flex items-center justify-center flex-col font-gilroy relative z-0 overflow-hidden">
      
      <Image />
     
      
      <h1 className="text-[5.4vw] font-bold text-[#0D1282] mb-[-25px] z-10 ">Hello there,Guest!</h1>
      <h3 className=" font-bold text-[#0D1282] z-10 ">Welcome to PizzzHunt</h3>
      <button onClick={navigate} className=" p-3 bg-sky-400 rounded text-white font-bold mt-[2px] z-10 ">Sign-in</button>
    
    </div>
  );
}

export default Home;
