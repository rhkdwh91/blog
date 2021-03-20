//import { BelongsToMany, Column, CreatedAt, Model, Scopes, Table, UpdatedAt } from 'sequelize-typescript';
import { Column, CreatedAt, Model, UpdatedAt, DataType, PrimaryKey, AllowNull, Table, AutoIncrement } from 'sequelize-typescript';

@Table({tableName: 'portfolio', timestamps: true}) 
export class Portfolio extends Model<Portfolio> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  uid?: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  content!: string;
 
  @AllowNull(false)
  @Column(DataType.STRING)
  image!: string;

  @CreatedAt
  @Column(DataType.TIME)
  createdAt?: Date;

  @UpdatedAt
  @Column(DataType.TIME)
  updatedAt?: Date;
}