import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { UserController } from "../controllers/userController";

export class UserRoutes {
    router: Router;

    public userController: UserController = new UserController();
    public authController: AuthController = new AuthController();

    constructor() {
        this.router = Router();
        
        this.router.get('/users/:uuid', this.userController.show);
        this.router.post('/users/:uuid', this.authController.authenticateJWT, this.userController.update);
    }
}