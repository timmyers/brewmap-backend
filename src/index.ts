import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

import { graphql, graphiql } from './graphql';

const PORT = 8080;

const app = express();

const whitelist = [process.env.corsOrigin, 'https://brewed-here.netlify.com'];
const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  allowedHeaders: 'Content-Type,Authorization',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.auth0Domain}/.well-known/jwks.json`
  }),
  credentialsRequired: false,
  audience: 'https://api.brewedhere.co',
  issuer: `https://${process.env.auth0Domain}/`,
  algorithms: ['RS256']
});

app.use(cors(corsOptions));
app.use(jwtCheck);

app.use('/graphql', bodyParser.json(), (req, res, next) => {
  graphql(req, res, next);
});

// app.use('/graphql', bodyParser.json(), graphql);

app.use('/graphiql', bodyParser.json(), graphiql);

app.listen(PORT);
