import { Sequelize } from "sequelize-typescript";
import { Cosmetic } from "./database/schema/Cosmetic";
import { CosmeticData } from "./database/schema/CosmeticData";
import { CosmeticsPack } from "./database/schema/CosmeticsPack";
import { User } from "./database/schema/User";

export const sequelize = new Sequelize(process.env.DATABASE_TABLE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    dialectOptions: {
        autoJsonMap: false
    },
    //models: [__dirname + 'database/schema/models/*.ts']
    models: [ User, Cosmetic, CosmeticsPack, CosmeticData ]
});