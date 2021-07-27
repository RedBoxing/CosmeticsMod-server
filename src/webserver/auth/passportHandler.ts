import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../../database/schema/User";

import bcrypt from 'bcrypt'
import passport from "passport";

import * as logger from '../../utils/logger'

export function initializePassportStrategies() {
    logger.info("Initializing passport strategies...");

    passport.serializeUser((user, done) => {
        //@ts-expect-error
        return done(null, user.id);
    })

    passport.deserializeUser((user_id, done) => {
        User.findOne({
            where: {
                id: user_id as number
            }
        }).then(user => {
            return done(null, user);
        })
    })

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
        User.findOne({
            where: {
                username: username
            }
        }).then(user => {
            if(!user) {
                return done(undefined, false, {
                    message: `User with username ${username} not found !`
                });
            }
    
            bcrypt.compare(password, user.password, (err, same) => {    
                if(err) {
                    return done(err);
                }
    
                if(same) {
                    return done(undefined, user);
                }
    
                return done(undefined, false, {
                    message: 'Invalid username or password'
                });
            })
        })
    }))
    
    passport.use(new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET as string
        }, (token, done) => {
            User.findOne({
                where: {
                    id: token.id
                }
            }).then(user => {
                if(user) {
                   return done(undefined, user, token); 
                } 
    
                return done(undefined, false);
            });
        })
    );
}