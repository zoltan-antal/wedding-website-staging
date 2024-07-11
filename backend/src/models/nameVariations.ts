import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
  ForeignKey,
} from 'sequelize';
import { sequelize } from '../utils/db';
import Guest from './guests';

class NameVariation extends Model<
  InferAttributes<NameVariation>,
  InferCreationAttributes<NameVariation>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare type: 'first' | 'last';
  declare guestId: ForeignKey<Guest['id']>;
}

NameVariation.init(
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
    type: {
      type: DataTypes.ENUM,
      values: ['first', 'last'],
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'nameVariation',
  }
);

export default NameVariation;

export type NameVariationAttributes = InferAttributes<NameVariation>;
export type NameVariationCreationAttributes =
  InferCreationAttributes<NameVariation>;
