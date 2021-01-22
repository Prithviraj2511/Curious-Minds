import jwt from 'jsonwebtoken'
import { User } from '../entities/User'

const JWTSECRET = "You are so smart"

async function sign(user: User): Promise<string> {
    return new Promise((resolve, reject) => {
        jwt.sign({
            username: user.username,
            email: user.email
        }, JWTSECRET, { expiresIn: "1d" }, function (err, token) {
            if (err) reject(err)
            else resolve(token as string)
        });
    })
}

async function verify(token: string): Promise<User> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, JWTSECRET, function (err, decoded) {
            if (err) reject(err)
            else {
                resolve(decoded as User)
            }
        });
    })
}

export {sign,verify}