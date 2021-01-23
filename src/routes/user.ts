import { Router } from 'express'
import { createUser, updateUser, userByEmail } from '../controllers/users'
import { authByToken } from '../middlewares/auth'

const route = Router()

// POST user/ Register a new user
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

// GET user/ current user
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

// PATCH user/   Update current user
route.patch('/',authByToken,async(req,res)=>{
  try {
    const user=await updateUser((req as any).user.email,req.body.user)
    return res.status(200).send(user)
  } catch (error) {
    res.status(422).json({
      "errors": {
        "body": [
          "Update Failed",
          error.message
        ]
      }
    })
  }
})


export const userRoute = route