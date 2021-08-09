import express, { Express } from 'express'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import https from 'https'
import fs from 'fs'
import passport from 'passport'

import { UserRoutes } from './routes/users'
import { PackRoutes } from './routes/packs'
import { AuthRoutes } from './routes/auth'
import { initializePassportStrategies } from './auth/passportHandler'

import * as logger from '../utils/logger'

export class WebServer {
    private app: Express = express();
    private server: https.Server;

    constructor() {
        this.app.set('trust proxy', true);

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.use(fileUpload({
            safeFileNames: true,
            preserveExtension: true,
            limits: {
                fileSize: 52428800
            }
        }))

        this.app.use(passport.initialize());
        //this.app.use(passport.session());

        initializePassportStrategies();

        this.app.use(new UserRoutes().router);
        this.app.use(new PackRoutes().router);
        this.app.use(new AuthRoutes().router);

       // if(process.env.USE_SSL === true) {
            this.server = https.createServer({
                key: fs.readFileSync(process.env.SSL_PRIVATE_KEY as string, 'utf8'),
                cert: fs.readFileSync(process.env.SSL_CERTIFICATE as string, 'utf8')
            }, this.app);
      /*  } else {
            this.server = https.createServer(this.app);
        }*/
    }

    run() {
        this.server.listen(process.env.PORT, () => {    
            logger.success("API Server listening on port " + process.env.PORT);
        })
    }
}