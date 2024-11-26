import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Sign() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Address, setAddress] = useState('');
  const [Contact, setContact] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

   
    const formData = {
      name,
      email,
      password,
      Address,
      Contact,
    };

    try {
  
      const response = await fetch('http://localhost:8000/hello', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

     
      if (response.ok) { 
        navigate('/login');
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className=' bhai h-screen w-full bg-[url(https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] flex items-center justify-center bg-center bg-cover '>
    <div className='h-screen w-full absolute top-0 left-0 bg-black z-0 opacity-25 '  > </div> 


      <div className='w-[400px] h-[510px] bg-white rounded-xl   p-10 z-10  '>
    
      <form onSubmit={handleSubmit}>
      <div className='h-[50px] w-[50px]  rounded-full m-auto  border-2 overflow-hidden flex items-center justify-center mt-[-20px]'> <img className='ml-2' src="https://i.pinimg.com/736x/c3/3e/0c/c33e0cc1d677f47893f77ff3358a3f5b.jpg" alt="" /> </div>
        <h2 className='text-center font-gilroy font-bold text-[23px] mb-2 text-red-600 '>Sign up</h2>
        <p className='text-center font-gilroy font-bold text-[17px] leading-4 mb-2 text-red-400 ' >Create a free account with your email.</p>
        <div>
        
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name} className='block border:solid border:2px mb-3 p-2 border-2 rounded-lg w-[300px] focus:outline-none focus:border-red-600'
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email} className='block border:solid border:2px mb-3 p-2 border-2 rounded-lg w-[300px] focus:outline-none focus:border-red-600 '
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password} className='block border:solid border:2px mb-3 p-2 border-2 rounded-lg w-[300px] focus:outline-none focus:border-red-600' 
            onChange={(e) => setPassword(e.target.value)}
          />
           <input
            type="text"
            placeholder="Address"
            name="Address"
            value={Address} className='block border:solid border:2px mb-3 p-2 border-2 rounded-lg w-[300px] focus:outline-none focus:border-red-600' 
            onChange={(e) => setAddress(e.target.value)}
          />
          
           <input
            type="Number"
            placeholder="Contact no."
            name="Contact no."
            value={Contact} className='block border:solid border:2px mb-3 p-2 border-2 rounded-lg w-[300px] focus:outline-none focus:border-red-600' 
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
            
            <p className=' leading-[1] text-zinc-400 name font-bold text-center '>If You Already Have the Account Then <Link to = "/login" className='text-blue-400 '>Login</Link></p>
       <div className='text-center'>
        
        <input
          type="submit" className='block border:solid border:2px mb-3 border-none rounded-lg px-4 py-2 bg-red-500 font-bold text-white mt-2 '
          value="Sign up"
        />
        </div> 
      </form>

      </div>
    
    </div>
  );
}

export default Sign;
