import { Model, Table, Column, ForeignKey, HasMany, BelongsTo } from 'sequelize-typescript';
import { Cosmetic } from './Cosmetic';
import { User } from './User';

@Table
export class CosmeticsPack extends Model {
    @Column
    path!: string;

    @ForeignKey(() => User)
    @Column
    publisher_id!: number;

    @BelongsTo(() => User, 'publisher_id')
    publisher!: User;

    @HasMany(() => Cosmetic, 'id')
    cosmetics!: Cosmetic[];
}