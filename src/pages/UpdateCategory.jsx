import React, { useEffect, useState } from 'react'
import { use } from 'react'
import api from '../Axios'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../components/Admin/Sidebar'
import Navbar from '../components/Admin/Navbar'
export default function UpdateCategory() {
    const [open,setOpen]=useState(false)
    const {id}=useParams()
    const navigate=useNavigate()
    const [name,setName]=useState('')
    const [description,setDescription]=useState('')
    useEffect(()=>{
        const fetchcategories= async()=>{
            try{
                const res= await api.get(`category/categoryDetail/${id}`)
                const category=res.data.category
            
    
            setName(category.name||'')
            setDescription(category.description||'')
        }
        catch(err){
            alert(err.response?.data?.message || 'Failed to Load Category')
            navigate('/categoryview')
        }
    }
    fetchcategories()
},[id,navigate])
   
    const handlesubmit=async (e)=>{
        e.preventDefault()
        try{
            const res= await api.put(`category/categoryEdit/${id}`,{name,description})
            navigate('/categoryview')
        }
        catch(err){
         alert(err.response?.data?.message || 'Failed to update category')
        }
    }
  return (
    <div className="flex min-h-screen bg-gray-100">
          <Sidebar open={open} />
          <div className="flex flex-1 flex-col ml-0 md:ml-64 ">
            <Navbar open={open} setOpen={setOpen} />
        <div className="mt-50">
            <h2 className="text-lg font-bold mb-4 text-center">Edit Category</h2>
            <form onSubmit={handlesubmit}  className="flex flex-col space-y-4 justify-center items-center">
                <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="border-1 border-gray-400 rounded-md p-2 w-full max-w-sm mx-auto"/>
                <textarea type="text" value={description} onChange={(e)=>setDescription(e.target.value)} className="border-1 border-gray-400 rounded-md p-2 w-full max-w-sm mx-auto"    ></textarea>
                <button type='submit'  className="bg-blue-700 py-2 px-6  rounded-md cursor-pointer">Edit</button>
            </form>
        </div>
    </div>
    </div>
  )
}
