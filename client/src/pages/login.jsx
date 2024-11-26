import React, { useState } from 'react';
import { motion } from 'framer-motion'; 
import Otp from '../components/otp';
import { Link } from 'react-router-dom';

function Login() {
  const [showOtp, setShowOtp] = useState(false); 
  const [opacity, setOpacity] = useState(1); 
  const [email,setEmail] = useState('');
  const [password,setpassword] =useState('');

  const formdata ={
    email,
    password,
  }
  const see = async(e) => {

    e.preventDefault();
    setOpacity(0.6); 
    setShowOtp(true); 

    try {
   
      const response = await fetch('http://localhost:8000/otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
      });

  
      if (response.ok) { 
        
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };





  return (
    <>
    <motion.div
      className='bhai h-screen w-full  flex items-center justify-center bg-[url(https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center  '
      style={{ opacity }} 
      transition={{ duration: 0.5 }} 
    >
      <div className='w-[300px] bg-white rounded-xl flex items-start justify-center h-[410px] p-10 '>
        <form>
          <div className='h-[50px] w-[50px] rounded-full m-auto mb-3 border-2 overflow-hidden flex items-center justify-center mt-[-15px]'>
            <img className='ml-2' src="https://i.pinimg.com/736x/c3/3e/0c/c33e0cc1d677f47893f77ff3358a3f5b.jpg" alt="" />
          </div>
          <h2 className='text-center font-gilroy font-bold text-[23px] mb-2 text-red-600'>Login</h2>
          <p className='text-center font-gilroy font-bold text-[17px] leading-4 mb-4 text-red-400'>Enter your Email and Password to login.</p>
          <div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}  onChange={(e) => setEmail(e.target.value)}
              className='block border:solid border:2px mb-3 p-2 border-2 rounded-lg w-[210px] focus:outline-none focus:border-blue-500'
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}  onChange={(e) => setpassword(e.target.value)}
              className='block border:solid border:2px mb-3 p-2 border-2 rounded-lg w-[210px] focus:outline-none focus:border-blue-500'
            />
          </div>
          <h1 className='name text-[0.9vw] font-bold mt-[-10px] text-zinc-400  '><Link to='/forgot'>Forgot Password?</Link></h1>
            <h1 className='leading-[1] mt-2 text-zinc-400'>If you don't have the account then <Link to="/sign-in" className='name font-bold text-blue-400'>SignIn </Link></h1>
          <div className='text-center'>
            <input
              type="submit"
              className='block border:solid border:2px mb-3 border-none rounded-lg px-5 py-2 bg-blue-500 font-bold text-white m-auto mt-3'
              value="Login"
              onClick={see}
            />
          </div>
        </form>
      </div>

 
    </motion.div>
     
         {showOtp && (
            <motion.div
              initial={{ scale: 0, y:-350}} 
              animate={{ scale: 1 }} 
              exit={{ opacity: 0 }} 
              transition={{ duration: 0.5 }} 
            >
              <Otp email={email} password={password}  />
            </motion.div>
          )}

          </>
  );
}

export default Login;
