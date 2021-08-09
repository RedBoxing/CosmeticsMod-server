import { Model, Table, Column, ForeignKey, DataType, BelongsTo, PrimaryKey, Unique, AllowNull } from 'sequelize-typescript';
import { Cosmetic } from './Cosmetic';
import { User } from './User';

@Table
export class CosmeticData extends Model {
    @AllowNull(false)
    @ForeignKey(() => Cosmetic)
    @Column({ unique: true })
    cosmetic_id!: number;

    @BelongsTo(() => Cosmetic, { foreignKey: 'cosmetic_id' })
    cosmetic!: Cosmetic;

    @ForeignKey(() => User)
    @Column
    user_id!: number;

    @BelongsTo(() => User, { foreignKey: 'user_id'})
    user!: User;

    @Column(DataType.JSON)
    data?: any;
}