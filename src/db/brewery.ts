import init from './index';

const breweryInit = async () => {
  const db = await init();
  return db.collection('Brewery');
}

export const getBreweries = async () => {
  const breweries = await breweryInit();
  return breweries.find().toArray();
}
