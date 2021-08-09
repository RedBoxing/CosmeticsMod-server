import { Model, Table, Column, ForeignKey, HasMany, BelongsTo } from 'sequelize-typescript';
import { Cosmetic } from './Cosmetic';
import { User } from './User';

@Table
export class CosmeticsPack extends Model<CosmeticsPack> {
    @Column
    path!: string;

    @ForeignKey(() => User)
    @Column
    publisher_id!: number;

    @BelongsTo(() => User, { foreignKey: 'publisher_id' })
    publisher!: User;

    @HasMany(() => Cosmetic, { foreignKey: 'cosmetics_pack_id' })
    cosmetics!: Cosmetic[];
}