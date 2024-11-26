import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';



function otp({ email, password }) {
  const  navigator = useNavigate();
  const [otp ,setotp] = useState("");

  const formdata ={
    email,
    otp,
    password,

  }
  
  const check_otp = async () => {
    try {
   
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });
  
 
      if (response.ok) {
        const data = await response.json();
        
 
        console.log('Response Data:', data);
        
        if (data.token) {
     
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          
          let admin = JSON.parse(localStorage.getItem("user"))
          let ADmin = import.meta.env.VITE_EMAIL_USER;

          if(admin.email == ADmin)
          {
            navigator("/admin")
          }else{
            navigator('/user')
          }
          
        }

        
      } else {
        alert(' user not found ');
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      alert("Something went wrong")
      console.error('Error:', error);
    }
  }
  
 



  return (
    <div id='bhai2' className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] h-[200px] w-[400px] bg-zinc-100 rounded-3xl p-4 border-dashed border-2 border-zinc-600 '>

 <h1 className='font-bold text-black text-center '> OTP</h1>
   <h3 className='text-center text-bold text-zinc-500'> Enter Otp which is sent on your mail </h3>
     <input className='block border:solid border:2px mb-3 p-2 border-2 rounded-lg w-[210px] focus:outline-none focus:border-blue-500 m-auto'
     value={otp} onChange={(e) => setotp(e.target.value)}
     type="number" />
     <input className='block border:solid border:2px mb-3 border-none rounded-lg px-5 py-2 bg-blue-500 font-bold text-white m-auto'
      onClick={check_otp}
      type="submit" />
    </div>
  )
}

export default otp