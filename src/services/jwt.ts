import jwt from 'jsonwebtoken'

const {TOKEN_SECRET} = process.env
if(!TOKEN_SECRET) throw new Error("TOKEN_SECRET is undefined");

export function signUserToken(firstname: string, lastname: string): string {
    return jwt.sign({firstname, lastname}, TOKEN_SECRET!);
}

export function validateUserToken(token: string) {
    jwt.verify(token, TOKEN_SECRET!)
}