import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { PackController } from "../controllers/PackController";

export class PackRoutes {
    router: Router;

    public packController: PackController = new PackController();
    public authController: AuthController = new AuthController();

    constructor() {
        this.router = Router();
        
        this.router.get('/packs', this.packController.index);
        this.router.get('/packs/:id', this.packController.download);
        this.router.post('/packs', this.authController.authenticateJWT, this.packController.upload);
    }
}