import { User } from "../entities/User";
import { getRepository } from "typeorm";

interface UserSignUpData {
    username: string,
    // password: string,
    email: string
}
export async function createUser(data: UserSignUpData) {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({email:data.email});
    if(user){
        throw new Error('Already account exist with this email')
    }
    const newUser=await userRepository.save({ 
        username:data.username,
        email:data.email
    });
    console.log(newUser)
    return newUser
}