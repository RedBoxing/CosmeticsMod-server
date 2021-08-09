import { Model, Table, Column, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import { Cosmetic } from './Cosmetic';
import { User } from './User';

@Table
export class CosmeticData extends Model {
    @ForeignKey(() => Cosmetic)
    @Column
    cosmetic_id!: number;

    @BelongsTo(() => Cosmetic)
    cosmetic!: Cosmetic;

    @ForeignKey(() => User)
    @Column
    user_id!: number;

    @Column(DataType.JSON)
    data?: any;
}