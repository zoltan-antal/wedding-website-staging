import Household from './households';
import Guest from './guests';
import NameVariation from './nameVariations';

Guest.belongsTo(Household);
Household.hasMany(Guest);

NameVariation.belongsTo(Guest);
Guest.hasMany(NameVariation);

Household.sync({ alter: true })
  .then(() => {
    console.log('Household table sync successful');
  })
  .catch((err) => {
    console.log('Household table sync failed:');
    console.log(err);
  });
Guest.sync({ alter: true })
  .then(() => {
    console.log('Guest table sync successful');
  })
  .catch((err) => {
    console.log('Guest table sync failed:');
    console.log(err);
  });
NameVariation.sync({ alter: true })
  .then(() => {
    console.log('NameVariation table sync successful');
  })
  .catch((err) => {
    console.log('NameVariation table sync failed:');
    console.log(err);
  });

export { Household, Guest, NameVariation };
