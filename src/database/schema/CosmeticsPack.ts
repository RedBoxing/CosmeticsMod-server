import { Model, Table, Column, ForeignKey, HasMany, BelongsTo } from 'sequelize-typescript';
import { Cosmetic } from './Cosmetic';
import { User } from './User';

@Table
export class CosmeticsPack extends Model {
    @Column
    path!: string;

    @ForeignKey(() => User)
    @Column
    publisherId!: number;

    @BelongsTo(() => User)
    publisher!: User;

    @HasMany(() => Cosmetic)
    cosmetics!: Cosmetic[];
}