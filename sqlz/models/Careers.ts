//import { BelongsToMany, Column, CreatedAt, Model, Scopes, Table, UpdatedAt } from 'sequelize-typescript';
import { Column, CreatedAt, Model, UpdatedAt, DataType, PrimaryKey, AllowNull, Table, AutoIncrement } from 'sequelize-typescript';

@Table({tableName: 'careers', timestamps: true}) 
export class Careers extends Model<Careers> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  uid?: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  companyName!: string;
 
  @AllowNull(false)
  @Column(DataType.STRING)
  companyProject!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  startYear!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  startDate!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  endYear!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  endDate!: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt?: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt?: Date;
}