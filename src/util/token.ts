import Jwt from "jsonwebtoken";
import { JWT_SECRET, REFRESHER, ACCES_EXPIRE } from "../config/jwt";

export const signAccesToken = (payload: object) =>{
    return Jwt.sign(payload, JWT_SECRET, {expiresIn: ACCES_EXPIRE})
}

export const signRefreshToken = (payload: object) =>{
    return Jwt.sign(payload, JWT_SECRET, {expiresIn: REFRESHER})
}

export const token = (payload: object) =>{
    return Jwt.sign(token, JWT_SECRET)
}