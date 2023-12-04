import { fileURLToPath } from 'url'
import { dirname } from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { userService } from './src/services/index.js'
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PRIVATE_KEY = process.env.JWT_SECRET;

export const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)
}

// JWT Generate token
export const generateToken = (user) => (
    jwt.sign(
        { uid: user._id},
        PRIVATE_KEY,
        { expiresIn: '24h' },
    )
)

export const authorization = (role) => {
    return async(req, res, next) => {
        const uid = req.uid;
        if(!uid) return res.status(401).send({error: 'Unauthorized'})
        if(!role) return next()

        const user = await userService.getUserById(uid)
        if(user.role != role) return res.status(403).send({error: 'No permission'})
        return next()
    }
}

export default __dirname