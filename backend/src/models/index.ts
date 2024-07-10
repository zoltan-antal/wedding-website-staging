import Household from './households';

Household.sync({ alter: true })
  .then(() => {
    console.log('Household table sync successful');
  })
  .catch((err) => {
    console.log('Household table sync failed:');
    console.log(err);
  });

export { Household };
