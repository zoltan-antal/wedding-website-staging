import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '../utils/db';

class Household extends Model<
  InferAttributes<Household>,
  InferCreationAttributes<Household>
> {
  declare id: CreationOptional<number>;
  declare username: string;
}

Household.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { sequelize, underscored: true, timestamps: false, modelName: 'household' }
);

export default Household;

export type HouseholdAttributes = InferAttributes<Household>;
export type HouseholdCreationAttributes = InferCreationAttributes<Household>;
