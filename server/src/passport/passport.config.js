import passport from "passport";
import GitHubStrategy from 'passport-github2';
import GoogleStrategy from 'passport-google-oauth2';
import jwt from 'passport-jwt'

import { logger } from "../helpers/logger.js";
import { userService, cartService } from "../services/index.js";

import dotenv from 'dotenv';
import { generateToken } from "../../utils.js";
dotenv.config();

const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const initializePassport = () => {
    const BASE_URL = process.env.BASE_URL || 'http://localhost:8080'
    // GitHub
    passport.use('github', new GitHubStrategy({
        clientID: process.env.GITHUB_CID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: `${BASE_URL}/api/auth/githubcallback`
    }, async (accessToken, refreshToken, profile, done) => {
        try  {
            const email = profile._json.email || profile.emails[0].value 
            let user = await userService.getUserByEmail(email)
            if(!user) {
                const cart = await cartService.addCart()
                const newUser = {
                    first_name: profile._json.name,
                    email,
                    password: '',
                    cart: cart._id
                }
                user = await userService.addUser(newUser)
            }

            user.token = generateToken(user)
            await userService.updateUser(user._id, { last_connection: new Date() });
            return done(null, user)
        } catch(error) {
            logger.error(error);
            return done(error, false, { message: 'Error to login with github' + error })
        }
    }));

    // Google
    passport.use('google', new GoogleStrategy({
        clientID: process.env.GOOGLE_CID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: `${BASE_URL}/api/auth/googlecallback`,
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile._json.email
            let user = await userService.getUserByEmail(email)
            if (!user) {
                const cart = await cartService.addCart()
                const newUser = {
                    first_name: profile._json.name,
                    email,
                    password: '',
                    cart: cart._id
                }
                user = await userService.addUser(newUser)
            }
            user.token = generateToken(user)
            await userService.updateUser(user._id, { last_connection: new Date() });
            return done(null, user)
        } catch(error) {
            logger.error(error);
            return done(error, false, { message: 'Error to login with google' + error })
        }
    }));

    // JWT
    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    }, async (jwt_payload, done) => {
        try {
            const user = await userService.getUserById(jwt_payload.uid);
            if (!user) return done(null, false, { message: 'User not found' });
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    }));

    // Serialize and deserialize user
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        const user = await usersModel.findById(id)
        done(null, user)
    })
}

export default initializePassport;