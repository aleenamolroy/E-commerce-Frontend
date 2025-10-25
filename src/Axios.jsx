import React from 'react'
import axios from 'axios'
const api = axios.create({
    baseURL:['http://localhost:3000/','http://16.171.71.249'],
    withCredentials:true
})
export default api