import {User} from "../entities/User"

async function sanitizeFields(user:User) {
    if(user.password){
        delete user.password
    }
    return user
}

export {sanitizeFields}