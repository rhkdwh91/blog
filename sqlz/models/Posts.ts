//import { BelongsToMany, Column, CreatedAt, Model, Scopes, Table, UpdatedAt } from 'sequelize-typescript';
import {
  Column,
  CreatedAt,
  Model,
  UpdatedAt,
  DataType,
  PrimaryKey,
  AllowNull,
  Table,
  AutoIncrement,
} from "sequelize-typescript";

@Table({ tableName: "posts", timestamps: true })
export class Posts extends Model<Posts> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  uid?: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  title!: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  content?: string;

  @AllowNull(true)
  @Column(DataType.STRING)
  userName!: string;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt?: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt?: Date;
}
