import { Model, Table, Column, ForeignKey, BelongsTo, PrimaryKey } from 'sequelize-typescript';
import { CosmeticsPack } from './CosmeticsPack';

@Table
export class Cosmetic extends Model {
    @Column
    identifier!: string;

    @Column
    name!: string;

    @Column
    display_name!: string;

    @ForeignKey(() => CosmeticsPack)
    @Column
    cosmetics_packId!: number;

    @BelongsTo(() => CosmeticsPack)
    cosmetics_pack!: CosmeticsPack;
}