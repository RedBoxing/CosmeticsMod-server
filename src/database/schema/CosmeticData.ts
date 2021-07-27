import { Model, Table, Column, ForeignKey, DataType } from 'sequelize-typescript';
import { Cosmetic } from './Cosmetic';
import { User } from './User';

@Table
export class CosmeticData extends Model {
    @ForeignKey(() => Cosmetic)
    @Column
    cosmetic_id!: number;

    @ForeignKey(() => User)
    @Column
    user_id!: number;

    @Column(DataType.JSON)
    data?: any;
}