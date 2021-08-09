import { Dialect } from "sequelize/types";

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        DATABASE_HOST: string;
        DATABASE_PORT: number;
        DATABASE_USER: string;
        DATABASE_PASSWORD: string;
        DATABASE_TABLE: string;
        DATABASE_DIALECT: Dialect;

        PORT: number;
        USE_SSL: boolean;
        SSL_PRIVATE_KEY: string;
        SSL_CERTIFICATE: string;

        JWT_SECRET: string;
        UPLOAD_DIRECTORY: string;
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}