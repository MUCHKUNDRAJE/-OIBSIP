import { motion } from 'framer-motion'
import React from 'react'




function img() {
  return (
<>

<motion.div  initial={{opacity:0,rotate:-10,y:-20 }} animate={{opacity:1,y:20}} transition={{duration:1,ease:"backInOut"}}
 className="h-[40vh] w-[40vh]  absolute top-[2%] left-[5%] rounded-xl rotate-[-10deg] overflow-hidden  ">
    <img className='h-full w-full object-cover opacity-[0.9] '  src="https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" /  >
</motion.div>

<motion.div initial={{opacity:0,rotate: 10}} animate={{opacity:1,y:-20,}} transition={{duration:1,ease:"backInOut", delay:0.5}}
 className="h-[300px] w-[300px] bg-red-500 absolute top-[55%] left-[10%] rounded-xl rotate-[10deg] overflow-hidden ">
<img className='h-full w-full object-cover ' src="https://images.unsplash.com/photo-1542282811-943ef1a977c3?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
</motion.div> 

< motion.div drag initial={{opacity:0,rotate: 10}} animate={{opacity:1,y:20,}} transition={{duration:1,ease:"backInOut", delay:2}}
 className="h-[300px] w-[300px] bg-red-500 absolute top-[2%] left-[75%] rounded-xl rotate-[10deg] overflow-hidden ">
<img className='h-full w-full object-cover pointer-events-none  ' src="https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
</motion.div> 

< motion.div drag dragConstraints={{
  top:0,
  bottom:500,
  left:-500,
  right:500,
}}

whileTap={{
  scale:0.8,
  duration:0.1,
  transition:"linear",
}}

initial={{opacity:0,rotate: 10}} animate={{opacity:1,y:20,}} transition={{duration:1,ease:"backInOut", delay:1}}
 className="h-[300px] w-[300px] bg-red-500 absolute top-[5%] left-[39%] rounded-xl rotate-[-10deg] overflow-hidden ">
<img className='h-full w-full object-cover opacity-[0.9] pointer-events-none ' src="https://images.unsplash.com/photo-1611915365928-565c527a0590?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
</motion.div> 

<motion.div initial={{opacity:0,rotate: -10,y:2}} animate={{opacity:1,y:-20,}} transition={{duration:1,ease:"backInOut", delay:1.5}}
 className="h-[300px] w-[300px] bg-red-500 absolute top-[56%] left-[62%] rounded-xl rotate-[10deg] overflow-hidden ">
<img className='h-full w-full object-cover ' src="https://images.unsplash.com/photo-1525518392674-39ba1fca2ec2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
</motion.div> 





</>
  )
}

export default img