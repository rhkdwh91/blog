//import { BelongsToMany, Column, CreatedAt, Model, Scopes, Table, UpdatedAt } from 'sequelize-typescript';
import {
  Column,
  CreatedAt,
  Model,
  UpdatedAt,
  DataType,
  PrimaryKey,
  Unique,
  AllowNull,
  Table,
  AutoIncrement,
} from "sequelize-typescript";
import bcrypt from "bcrypt";

@Table({ tableName: "user", timestamps: true })
export class User extends Model<User> {
  @PrimaryKey
  @AllowNull(false)
  @AutoIncrement
  @Column(DataType.INTEGER)
  uid?: number;

  @Unique({ name: "user_id", msg: "이미 있는 이메일입니다." })
  @AllowNull(false)
  @Column(DataType.STRING)
  user_id!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  user_name!: string;

  @Column(DataType.STRING)
  get password(): string {
    return this.getDataValue("password");
  }
  set password(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    this.setDataValue("password", hash);
  }

  @CreatedAt
  @Column(DataType.TIME)
  createdAt?: Date;

  @UpdatedAt
  @Column(DataType.TIME)
  updatedAt?: Date;

  public isValidPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}
