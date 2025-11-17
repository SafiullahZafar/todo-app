import React from 'react'

const Navebar = () => {
  return (
   <nav className='flex justify-between bg-violet-700 text-white py-1 '>
    <div className="logo">
        <span className='font-bold text-xl mx-8'></span>
    </div>
    <ul className="flex gap-12 mx-9">
        <li className='cursor-pointer   '><button className='focus:bg-slate-900  focus:transition-all focus:border-[1px] focus:border-purple-300 focus:px-3 focus:py-1 focus:rounded-full'>Home</button></li>
        <li className='cursor-pointer '><button className='focus:bg-slate-900 focus:transition-all focus:border-[1px] focus:border-purple-300 focus:px-3 focus:py-1 focus:rounded-full '>Your Tasks</button></li>
        
    </ul>
   </nav>
  )
}

export default Navebar
