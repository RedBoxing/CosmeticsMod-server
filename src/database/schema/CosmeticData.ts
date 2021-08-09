import { Model, Table, Column, ForeignKey, DataType, BelongsTo, PrimaryKey, Unique, AllowNull } from 'sequelize-typescript';
import { Cosmetic } from './Cosmetic';
import { User } from './User';

@Table
export class CosmeticData extends Model {
    @AllowNull(false)
    @ForeignKey(() => Cosmetic)
    @Column({ unique: true })
    cosmeticId!: number;

    @BelongsTo(() => Cosmetic)
    cosmetic!: Cosmetic;

    @ForeignKey(() => User)
    @Column
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

    @Column(DataType.JSON)
    data?: any;
}