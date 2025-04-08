import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '../utils/db';
import Household from './households';

class Gift extends Model<InferAttributes<Gift>, InferCreationAttributes<Gift>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare link: string;
  declare householdId: ForeignKey<Household['id']> | null;
}

Gift.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, underscored: true, timestamps: false, modelName: 'gift' }
);

export default Gift;

export type GiftAttributes = InferAttributes<Gift>;
export type GiftCreationAttributes = InferCreationAttributes<Gift>;
