import { Model, Table, Column, ForeignKey, BelongsTo, PrimaryKey } from 'sequelize-typescript';
import { CosmeticsPack } from './CosmeticsPack';

@Table
export class Cosmetic extends Model<Cosmetic> {
    @Column
    identifier!: string;

    @Column
    name!: string;

    @Column
    display_name!: string;

    @ForeignKey(() => CosmeticsPack)
    @Column
    cosmetics_pack_id!: number;

    @BelongsTo(() => CosmeticsPack, { foreignKey: 'cosmetics_pack_id' })
    cosmetics_pack!: CosmeticsPack;
}