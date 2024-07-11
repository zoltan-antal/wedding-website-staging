import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
  ForeignKey,
} from 'sequelize';
import { sequelize } from '../utils/db';
import Household from './households';

class Guest extends Model<
  InferAttributes<Guest>,
  InferCreationAttributes<Guest>
> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare lastName: string | null;
  declare passwordHash: string;
  declare householdId: ForeignKey<Household['id']>;
}

Guest.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  },
  { sequelize, underscored: true, timestamps: false, modelName: 'guest' }
);

export default Guest;

export type GuestAttributes = InferAttributes<Guest>;
export type GuestCreationAttributes = InferCreationAttributes<Guest>;
