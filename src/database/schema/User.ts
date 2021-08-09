import { Model, Table, Column, BelongsToMany, Unique } from 'sequelize-typescript';
import { Cosmetic } from './Cosmetic';
import { CosmeticData } from './CosmeticData';

@Table
export class User extends Model<User> {
    @Unique
    @Column
    uuid!: string;

    @Column
    username!: string;

    @Column
    password!: string;
}