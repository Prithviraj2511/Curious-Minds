import { Router } from 'express'
import { createUser, userByEmail } from '../controllers/users'
import { authByToken } from '../middlewares/auth'

const route = Router()

// Register a new user
route.post('/', async (req, res) => {
  try {
    const user = await createUser(req.body.user)
    res.status(201).send(user)
  }
  catch (e) {
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

// Get current user
route.get('/', authByToken, async (req, res) => {
  try {
    const user = await userByEmail((req as any).user.email)
    return res.status(200).send(user)
  } catch (error) {
    res.status(404).json({
      "errors": {
        "body": [
          error.message
        ]
      }
    })
  }
})

// // Update current user
// route.patch('/',authByToken,async(req,res)=>{

// })


export const userRoute = route