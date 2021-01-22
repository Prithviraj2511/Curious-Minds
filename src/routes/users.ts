import { Router } from 'express'
import { loginUser } from '../controllers/users'

const route = Router()

// Login user
route.post('/login', async (req, res) => {
    try {
        const user = await loginUser(req.body.user)
        return res.status(200).send(user)
    } catch (error) {
        res.status(422).json({
            "errors": {
                "body": [
                    "Login Failed",
                    error.message
                ]
            }
        })
    }
})

// Get users
route.get('/', (req, res) => {
    res.send("GET users")
})

// // Update current user
// route.put('/',(req,res)=>{

// })


export const usersRoute = route