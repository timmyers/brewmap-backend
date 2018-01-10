require('dotenv').config();
const { MongoClient } = require('mongodb');
const got = require('got');

const url = process.env.DB_URL;

let db;

// const removeKeys = async () => {
//   console.log('connecting to db');
//   db = await MongoClient.connect(url);
//   console.log('connected to db');
//
//   const breweriesDB = db.collection('Brewery');
//
//   await breweriesDB.updateMany(
//     {},
//     { $unset: { imgSrc: '' } }
//   );
// }

const run = async () => {
  console.log('connecting to db');
  db = await MongoClient.connect(url);
  console.log('connected to db');

  const breweriesDB = db.collection('Brewery');
  const breweries = await breweriesDB.find().toArray();

  // await searchBrewery(breweries[1]);
  for (var i = 0, len = breweries.length; i < len; i++) {
    // console.log(brewery);
    await searchBrewery(breweries[i]);
  }
}

const searchBrewery = async (brewery: any) => {
  if (brewery.googlePlaceId) return;

  const response = await got('https://maps.googleapis.com/maps/api/place/textsearch/json', {
    query: {
      key: 'AIzaSyAJHEy-Ota1aS2lnrBbCWSkFYGUiZ5jyQY',
      query: brewery.name,
    },
    json: true,
  });
  if (!response.body.results.length) {
    console.log(`${brewery.name} no result`);
    return;
  }
  const placeId = response.body.results[0].place_id;
  console.log(`${brewery.name}: ${placeId}`);

  const breweriesDB = db.collection('Brewery');
  await breweriesDB.findOneAndUpdate(
    { _id: brewery._id },
    { $set: { googlePlaceId: placeId } }
  );
  console.log(`${brewery.name} updated`);
}

(async () => {
  await run();
})();
