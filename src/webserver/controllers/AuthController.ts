import { Cosmetic } from "../../database/schema/Cosmetic";
import { NextFunction, Request, Response } from "express";
import { User } from "../../database/schema/User";

import jwt from 'jsonwebtoken'
import passport from "passport";
import bcrypt from 'bcrypt'

export class AuthController {
    authenticateJWT(req: Request, res: Response, next: NextFunction) {
        passport.authenticate("jwt", (err, user, info) => {
            if(err) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                });
            }
    
            if(!user) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                });
            } else {
                next();
            }
        })(req, res, next);
    }
    
    authorizeJWT(req: Request, res: Response, next: NextFunction) {
        passport.authenticate("jwt", (err, user, token) => {
            if(err) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                });
            }
    
            if(!user) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                });
            } else {
                const scope = req.baseUrl.split("/").slice(-1)[0];
                const authScope = token.scope;
                if (authScope && authScope.indexOf(scope) > -1) {
                    return next();
                }
                else {
                    return res.status(401).json({
                        success: false,
                        message: "Unauthorized"
                    });
                }
            }
        })(req, res, next);
    }
    
    login(req : Request, res : Response, next: NextFunction) {  
        if(req.body.username === undefined && req.body.password === undefined && req.headers.authorization !== undefined) {
            passport.authenticate('jwt', (err, user, token) => {
                if(err) {
                    return res.status(401).json({
                        success: false,
                        message: err
                    });
                }

                if(!user) {
                    return res.status(401).json({
                        success: false,
                        message: "Invalid Token"
                    });
                }
  
                return res.status(200).json({
                    success: true
                });
            })(req, res, next);
        } else if (req.body.username !== undefined && req.body.password !== undefined) {
            passport.authenticate('local', (err, user, info) => {
                try {
                    if(err) return res.status(401).json({
                        success: false,
                        message: err
                    });
        
                    if(!user) {
                        return res.status(401).json({
                            success: false,
                            message: "Invalid username or password"
                        });
                    }

                    const token = jwt.sign({
                        id: user.id,
                        uuid: user.uuid,
                        username: user.username
                    }, process.env.JWT_SECRET as string);
      
                    return res.status(200).json({
                        success: true,
                        token: token
                    });
                } catch (error) {
                    return res.status(401).json({
                        success: false,
                        message: error
                    });
                }
            })(req, res, next);
        } else {
            res.status(401).json({
                success: false
            })
        }
    }

    async register(req : Request, res : Response, next: NextFunction) {
        if(req.body.username === undefined || req.body.password === undefined || req.body.uuid === undefined) {
            return res.status(401).json({
                success: false,
                message: 'Missing fields'
            });
        }

        if(await User.findOne({ where: { uuid: req.body.uuid } }) || await User.findOne({ where: { username: req.body.username } })) {
            return res.status(401).json({
                success: false,
                message: 'Account already exists for your UUID or username'
            });
        }

        const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

        const user = await User.create({
            uuid: req.body.uuid,
            username: req.body.username,
            password: hashedPassword,
            cosmetics: Array<CosmeticData>()
        });

        const token = jwt.sign({
            id: user.id,
            uuid: user.uuid,
            username: user.username
        }, process.env.JWT_SECRET as string);

        return res.status(200).json({
            success: true,
            token: token
        });
    }
}
