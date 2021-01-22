import { NextFunction, Request, Response } from 'express'
import { verify } from '../utils/jwt'

export async function authByToken(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.header('Authorization')?.split(' ')
    
    // check if authorization header exist
    if (!authHeader) return res.status(401).json({
        "errors": {
            "body": [
                "Authorization failed", "No authorization header"
            ]
        }
    })
    
    // check if authorization type is Token
    if (authHeader[0] != 'Token') return res.status(401).json({
        "errors": {
            "body": [
                "Authorization failed", "Token missing"
            ]
        }
    })


    
    try {
        const user = await verify(authHeader[1])
        if(!user) {
            throw new Error('No user found in token')
        }
        (req as any).user = user
        next();
    } catch (error) {
        return res.status(401).json({
            "errors": {
                "body": [
                    "Authorization failed", error
                ]
            }
        })
    }
}