import {Router} from 'express'

const route= Router()

// // Login user
// route.post('/login',(req,res)=>{

// })

// Get users
route.get('/',(req,res)=>{
    res.send("GET users")
})

// // Update current user
// route.put('/',(req,res)=>{

// })


export const usersRoute=route