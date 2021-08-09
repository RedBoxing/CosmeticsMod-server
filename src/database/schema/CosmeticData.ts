import { Model, Table, Column, ForeignKey, DataType, BelongsTo, PrimaryKey, Unique } from 'sequelize-typescript';
import { Cosmetic } from './Cosmetic';
import { User } from './User';

@Table
export class CosmeticData extends Model {
    @ForeignKey(() => Cosmetic)
    @Unique
    @Column
    cosmetic_id!: number;

    @BelongsTo(() => Cosmetic, 'cosmetic_id')
    cosmetic!: Cosmetic;

    @ForeignKey(() => User)
    @Column
    user_id!: number;

    @Column(DataType.JSON)
    data?: any;
}