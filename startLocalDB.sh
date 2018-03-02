mongoexport --host brewmap-db-shard-0/brewmap-db-shard-00-00-pwuiv.mongodb.net:27017,brewmap-db-shard-00-01-pwuiv.mongodb.net:27017,brewmap-db-shard-00-02-pwuiv.mongodb.net:27017 --ssl --username timmyers --password xrUwfVmwpXZtOC49jk6v --authenticationDatabase admin --db brewmap --collection Brewery --out breweries.json
docker start brewmap-db || docker run --name brewmap-db -d -p 27017:27017 mongo
mongoimport --collection Brewery --file breweries.json --uri mongodb://localhost/brewmap
