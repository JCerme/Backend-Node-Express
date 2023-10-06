import passport from "passport";
import local from "passport-local";
import { usersModel } from "../dao/models/mongoose.js";
import { createHash, isValidPassword } from "../../utils.js";
import GitHubStrategy from 'passport-github2';
import GoogleStrategy from 'passport-google-oauth2';

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    // GitHub
    passport.use('github', new GitHubStrategy({
        clientID: process.env.GITHUB_CID,
        clientSecret: process.env.GITHUB_SECRET,
        callbackURL: 'http://localhost:8080/auth/githubcallback'
    }, async (accessToken, refreshToken, profile, done) => {
        try  {
            const email = profile._json.email || profile.emails[0].value 
            const user = await usersModel.findOne({ email })
            if(user) return done(null, user)

            const newUser = {
                first_name: profile._json.name,
                email,
                password: ''
            }
            const result = await usersModel.create(newUser)
            return done(null, result)
        } catch(e) {
            return done(null, false, { message: 'Error to login with github' + e })
        }
    }));

    // Google
    passport.use('google', new GoogleStrategy({
        clientID: process.env.GOOGLE_CID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: "http://localhost:8080/auth/googlecallback",
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await usersModel.findOne({ email: profile._json.email })
            if (user) return done(null, user)

            const newUser = {
                first_name: profile._json.name,
                email:  profile._json.email,
                password: ''
            }
            const result = await usersModel.create(newUser)
            return done(null, result)
        } catch(e) {
            return done(null, false, { message: 'Error to login with google' + e })
        }
    }));

    // Register
    passport.use('register', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            try {
                const user = await usersModel.findOne({ email: email });
                if (user) return done(null, false, { message: 'User already exists' });

                const newUser = new usersModel({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: email,
                    password: createHash(password),
                });
    
                const savedUser = await newUser.save();
                return done(null, savedUser);
            } catch (e) {
                done(e, false, { message: 'Registration error' });
            }
        }
    ));

    // Login
    passport.use('login', new LocalStrategy(
        { usernameField: 'email' },
        async (username, password, done) => {
            try {
                if (!username || !password)
                    return done(null, false, { message: 'Invalid credentials' })

                const user = await usersModel.findOne({ email: username }).lean().exec()
                if (!user)
                    return done(null, false, { message: 'User doesn\'t exist' })

                if (!isValidPassword(user, password))
                    return done(null, false, { message: 'Password not valid' })

                return done(null, user, { message: 'Logged in Successfully' })
            } catch (e) {
                return done(null, false, { message: 'Error login ' + error })
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await usersModel.findById(id)
        done(null, user)
    })

}

export default initializePassport;