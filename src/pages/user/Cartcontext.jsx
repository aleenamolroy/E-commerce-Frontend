import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../../Axios'
const Cartcontext =createContext()
export  function Cartprovider({childern}) {
        const [cartCount,setcartCount]=useState(0)
        useEffect(()=>{
            const fetchCart=async()=>{ 
                try {
                    const res=await api.get('cart/showcart')
                    const count=res.data.cartItems?.reduce(
                        (sum,item)=>sum+item.quantity,0
                    )
                    setcartCount(count)
                }
                catch(err){
                    console.log(err)
                }
            }
            fetchCart()
        },[])
    const increamentCart=()=>setcartCount((prev)=>prev+1)
    const resetcart=(count)=>setcartCount(count)
  return (
   <Cartcontext.Provider value={{cartCount,increamentCart,resetcart}}>
    {childern}
   </Cartcontext.Provider>
  )
}
export const useCart=()=>useContext(Cartcontext)
