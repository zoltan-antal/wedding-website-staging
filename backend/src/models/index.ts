import Household from './households';
import Guest from './guests';
import NameVariation from './nameVariations';
import Rsvp from './rsvp';
import Gift from './gifts';

Guest.belongsTo(Household);
Household.hasMany(Guest);

NameVariation.belongsTo(Guest);
Guest.hasMany(NameVariation);

Gift.belongsTo(Household);
Household.hasMany(Gift);

Rsvp.belongsTo(Household);
Rsvp.belongsTo(Guest);
Household.hasMany(Rsvp);
Guest.hasMany(Rsvp);

Household.sync({ alter: true })
  .then(() => {
    console.log('Household table sync successful');
  })
  .catch((err) => {
    console.log('Household table sync failed:');
    console.error(err);
  });
Guest.sync({ alter: true })
  .then(() => {
    console.log('Guest table sync successful');
  })
  .catch((err) => {
    console.log('Guest table sync failed:');
    console.error(err);
  });
NameVariation.sync({ alter: true })
  .then(() => {
    console.log('NameVariation table sync successful');
  })
  .catch((err) => {
    console.log('NameVariation table sync failed:');
    console.error(err);
  });
Gift.sync({ alter: true })
  .then(() => {
    console.log('Gift table sync successful');
  })
  .catch((err) => {
    console.log('Gift table sync failed:');
    console.error(err);
  });
Rsvp.sync({ alter: true })
  .then(() => {
    console.log('Rsvp table sync successful');
  })
  .catch((err) => {
    console.log('Rsvp table sync failed:');
    console.error(err);
  });

export { Household, Guest, NameVariation, Gift, Rsvp };
