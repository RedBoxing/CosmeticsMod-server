import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

import passport from "passport";

export class AuthRoutes {
    router: Router;

    public authController: AuthController = new AuthController();

    constructor() {
        this.router = Router();
        
        this.router.post('/auth/login', this.authController.login);
        this.router.post('/auth/register', this.authController.register);
    }
}