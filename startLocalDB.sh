docker start brewmap-db || docker run --name brewmap-db -d -p 27017:27017 mongo
mongoimport --collection Brewery --file breweries.json --uri mongodb://localhost/brewmap