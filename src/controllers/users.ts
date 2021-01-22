import { User } from "../entities/User";
import { getRepository } from "typeorm";
import {hashPassword,comparePassword} from "../utils/password"
import {sanitizeFields} from "../utils/security"
import { sign} from "../utils/jwt"

interface UserSignUpData {
    username: string,
    email: string,
    password: string
}

interface UserLoginData{
    email: string,
    password: string
}

// creates new user
export async function createUser(data: UserSignUpData):Promise<User> {
    // checking whether all fields are filled or not
    if(!data.username) throw new Error("Username is blank")
    if(!data.email) throw new Error("Email is blank")
    if(!data.password) throw new Error("Password is blank")
    
    // checking whether account already exist or not
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({email:data.email});
    if(user){
        throw new Error('Already account exist with this email')
    }
    // hashing the plain password
    const hashedPass=await hashPassword(data.password)
    // inserting user to the database
    const newUser=await userRepository.save({ 
        username:data.username,
        email:data.email,
        password:hashedPass
    });
    
    // creating token for the user
    newUser.token=await sign(newUser)

    // hiding some data from user
    return sanitizeFields(newUser)
}

export async function loginUser(data:UserLoginData):Promise<User> {
    // checking whether all fields are filled or not
    if(!data.email) throw new Error("Email is blank")
    if(!data.password) throw new Error("Password is blank")

    // checking whether account exist or not
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({email:data.email});
    if(!user){
        throw new Error('No user with this email')
    }

    // checking whether the password is correct or not
    const passMatch=await comparePassword(data.password,user.password!)
    if(passMatch === false){
        throw new Error('Incorrect Password')
    }

    // creating token for the user
    user.token=await sign(user)

    // hiding some data from user
    return sanitizeFields(user)
}