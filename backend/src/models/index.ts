import Household from './households';
import Guest from './guests';

Guest.belongsTo(Household);
Household.hasMany(Guest);

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

export { Household, Guest };
