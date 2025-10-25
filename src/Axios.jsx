import React from 'react'
import axios from 'axios'
const api = axios.create({

    baseURL:['http://localhost:3000/','http://13.53.137.81'],

    withCredentials:true
})
export default api
