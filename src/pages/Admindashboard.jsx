import React, { useState } from 'react'
import Navbar from '../components/Admin/Navbar'
import Sidebar from '../components/Admin/Sidebar'
export default function Admindashboard() {
  const [open,setOpen] = useState(false)
  return (
    <div className='flex overflow-y-hidden '>
      <Sidebar open={open}/>
      <div className='flex flex-1 flex-col ml-0 md:ml-64 '>
              <Navbar open={open} setOpen={setOpen}/>

      </div>
    </div>
  )
}
