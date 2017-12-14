import { ObjectId } from 'mongodb';
import init from './index';

const breweryInit = async () => {
  const db = await init();
  return db.collection('Brewery');
}

export const getBrewery = async (breweryID: string) => {
  const breweries = await breweryInit();
  const brewery =  await breweries.findOne({
    _id: new ObjectId(breweryID),
  })

  brewery.id = brewery._id.toHexString();
  delete brewery._id;
  return brewery;
}

export const getBreweries = async () => {
  const breweries = await breweryInit();
  const ret = await breweries.find().toArray();
  return ret.map((brewery) => {
    brewery.id = brewery._id.toHexString();
    delete brewery._id;
    return brewery;
  });
}
