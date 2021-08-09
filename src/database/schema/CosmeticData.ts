import { Model, Table, Column, ForeignKey, DataType, BelongsTo, PrimaryKey, Unique, AllowNull } from 'sequelize-typescript';
import { Cosmetic } from './Cosmetic';
import { User } from './User';

@Table
export class CosmeticData extends Model<CosmeticData> {
    @AllowNull(false)
    @ForeignKey(() => Cosmetic)
    @Column({ unique: true })
    cosmetic_id!: number;

    @BelongsTo(() => Cosmetic, { foreignKey: 'cosmetic_id' })
    cosmetic!: Cosmetic;

    @ForeignKey(() => User)
    @Column
    user_id!: number;

    @Column(DataType.JSON)
    data?: any;
}