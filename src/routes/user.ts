import {Router} from 'express'
import {createUser} from '../controllers/users'
const route= Router()

// Register a new user
route.post('/',async(req,res)=>{
    try{
        const user=await createUser(req.body.user)
        res.status(201).send(user)
    }
    catch(e){
        res.status(422).json({
            "errors": {
              "body": [
                "could not create a user",
                e.message
              ]
            }
          })
    }
})

// // Get current user
// route.get('/',(req,res)=>{

// })

// // Update current user
// route.put('/',(req,res)=>{

// })


export const userRoute=route