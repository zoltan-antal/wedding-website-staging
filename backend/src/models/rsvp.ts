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
import Guest from './guests';

class Rsvp extends Model<InferAttributes<Rsvp>, InferCreationAttributes<Rsvp>> {
  declare id: CreationOptional<number>;
  declare guestId: ForeignKey<Guest['id']>;
  declare householdId: ForeignKey<Household['id']>;
  declare data: string;
}

Rsvp.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    data: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    underscored: true,
    createdAt: true,
    updatedAt: false,
    modelName: 'rsvp',
  }
);

export default Rsvp;

export type RsvpAttributes = InferAttributes<Rsvp>;
export type RsvpCreationAttributes = InferCreationAttributes<Rsvp>;
