import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({
    // Not null
    allowNull: false,
    type: DataType.DECIMAL,
    validate: {
      min: 0,
    },
  })
  balance: number;
}
