import init from './index';

const breweryInit = async () => {
  const db = await init();
  return db.collection('Brewery');
}

export const getBreweries = async () => {
  const breweries = await breweryInit();
  const ret = await breweries.find().toArray();
  return ret.map((brewery) => {
    console.log(brewery._id);
    brewery.ID = brewery._id;
    delete brewery._id;
    return brewery;
  });
}
