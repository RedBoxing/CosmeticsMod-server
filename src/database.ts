import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize/types";
import { Cosmetic } from "./database/schema/Cosmetic";
import { CosmeticData } from "./database/schema/CosmeticData";
import { CosmeticsPack } from "./database/schema/CosmeticsPack";
import { User } from "./database/schema/User";

export const sequelize = new Sequelize(process.env.DATABASE_TABLE as string, process.env.DATABASE_USER as string, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT as Dialect,
    dialectOptions: {
        autoJsonMap: false
    },
    models: [ User, Cosmetic, CosmeticsPack, CosmeticData ]
});