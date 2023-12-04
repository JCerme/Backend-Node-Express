import passport from "passport";
import GitHubStrategy from 'passport-github2';
import GoogleStrategy from 'passport-google-oauth2';
import jwt from 'passport-jwt'

import { logger } from "../helpers/logger.js";
import { userService, cartService } from "../services/index.js";

import dotenv from 'dotenv';
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
            const user = await userService.getUserByEmail(email)
            if(user) return done(null, user)

            const cart = cartService.addCart()
            const newUser = {
                first_name: profile._json.name,
                email,
                password: '',
                cart: cart._id
            }

            const result = await userService.addUser(newUser)
            return done(null, result)
        } catch(error) {
            logger.error(error);
            return done(error, false, { message: 'Error to login with github' + e })
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
            const user = await userService.getUserByEmail(email)
            if (user) return done(null, user)

            const cart = cartService.addCart()
            const newUser = {
                first_name: profile._json.name,
                email,
                password: '',
                cart: cart._id
            }

            const result = await userService.addUser(newUser)
            return done(null, result)
        } catch(error) {
            logger.error(error);
            return done(error, false, { message: 'Error to login with google' + e })
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
}

export default initializePassport;