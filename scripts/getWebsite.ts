require('dotenv').config();
const { MongoClient } = require('mongodb');
const got = require('got');

const url = process.env.DB_URL;

let db;

const run = async () => {
  console.log('connecting to db');
  db = await MongoClient.connect(url);
  console.log('connected to db');

  const breweriesDB = db.collection('Brewery');
  const breweries = await breweriesDB.find().toArray();

  // await populateWebsite(breweries[0]);
  for (var i = 0, len = breweries.length; i < len; i++) {
    // console.log(brewery);
    await populateWebsite(breweries[i]);
  }
}

const populateWebsite = async (brewery: any) => {
  if (!brewery.googlePlaceId ) return;

  const response = await got('https://maps.googleapis.com/maps/api/place/details/json', {
    query: {
      key: 'AIzaSyAJHEy-Ota1aS2lnrBbCWSkFYGUiZ5jyQY',
      placeid: brewery.googlePlaceId
    },
    json: true,
  });
  if (!response.body.result) {
    console.log(`${brewery.name} no result`);
    console.log(response.body);
    return;
  }
  const website = response.body.result.website;
  console.log(`${brewery.name}: ${website}`);

  const breweriesDB = db.collection('Brewery');
  await breweriesDB.findOneAndUpdate(
    { _id: brewery._id },
    { $set: { website } }
  );
  console.log(`${brewery.name} updated`);
}

(async () => {
  await run();
})();
