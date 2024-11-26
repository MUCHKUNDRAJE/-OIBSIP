import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



function forgot() {


    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [getotp, setGetOtp] = useState('');
    const [Symbol, setSymbol] = useState('');


    const navigate = useNavigate()

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:8000/send-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          });
          const data = await response.json();
            setGetOtp(parseInt( data.otp))
         
        } catch (error) {
          console.log('Failed to send OTP');
        }
      };

      const handlePassword = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:8000/Change_password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, otp, newPassword }),
          });
      
          const data = await response.json();
          
      
          if (data.success) {
            navigate("/login"); 
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error('Failed to change password', error);
        }
      };
      
  



useEffect(() => {
    if (otp) {

      if (otp == getotp) {
        setSymbol('✅')
      } else {
        setSymbol('❌')
      }
    }
  }, [otp, getotp]);
  


  return (
    <div className='name h-screen w-full bg-[url(https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center flex items-center justify-center ' >
  
  <div className='w-[300px] bg-white rounded-xl flex items-start justify-center h-[410px] p-10 '>
        <form>
        <div className='h-[50px] w-[50px]  rounded-full m-auto  border-2 overflow-hidden flex items-center justify-center mt-[-20px]'> <img className='ml-2' src="https://i.pinimg.com/736x/c3/3e/0c/c33e0cc1d677f47893f77ff3358a3f5b.jpg" alt="" /> </div>
        <h2 className='text-center font-gilroy font-bold text-[23px] mb-2 text-red-600 '>Forgot Password </h2>
        <p className='text-center font-gilroy font-bold text-[17px] leading-4 mb-2 text-red-400 ' >Enter your email and enter otp you get form Email </p>
    
         <input  className='block border:solid border:2px mb-3 p-2 border-2 rounded-lg w-[210px] focus:outline-none focus:border-red-500' type="Email" placeholder='Email' 
             value={email}
             onChange={(e) => setEmail(e.target.value)}
         />
         <div className="flex  items-center w-full justify-center gap-1 " >
         <input className="block border:solid border:2px mb-3 p-2 border-2 rounded-lg focus:outline-none focus:bored-red-500 w-[100px]" type="Number" placeholder='Otp' 
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
         />
         <h1>{Symbol}</h1>
         <button onClick={handleSendOtp} className='p-1 bg-red-400 text-white rounded-md'>Get Otp </button>
         </div>
         <input  className='block border:solid border:2px mb-3 p-2 border-2 rounded-lg w-[210px] focus:outline-none focus:border-red-500' type="Password" placeholder='New Password'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
         />
       <div className='text-center'>
            <input
            onClick={handlePassword }
              type="submit"
              className='name block border:solid border:2px mb-3 border-none rounded-lg px-5 py-2 bg-blue-500 font-bold text-white m-auto mt-3'
             value="Change Password"
             
            />
          </div>
        </form>
      </div>

 

    </div>
  )
}

export default forgot