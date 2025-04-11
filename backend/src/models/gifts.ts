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
  declare nameEnglish: string;
  declare nameHungarian: string;
  declare links: string[];
  declare householdId: ForeignKey<Household['id']> | null;
}

Gift.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nameEnglish: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nameHungarian: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    links: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
  },
  { sequelize, underscored: true, timestamps: false, modelName: 'gift' }
);

export default Gift;

export type GiftAttributes = InferAttributes<Gift>;
export type GiftCreationAttributes = InferCreationAttributes<Gift>;
