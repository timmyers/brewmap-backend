import { ObjectId } from 'mongodb';
import init from './index';
import { getBrewery } from './brewery';
import log from '../logger';

const visitInit = async () => {
  const db = await init();
  return db.collection('BreweryVisit');
}

export const setVisited = async(userID: string,
                                breweryIDString: string,
                                visited: boolean) => {
  const visits = await visitInit();

  const breweryID = new ObjectId(breweryIDString);

  if (visited) {
    await visits.findOneAndUpdate({
      user: userID,
      brewery: breweryID,
    }, {
      $set: {
        user: userID,
        brewery: breweryID,
      },
    },
    { upsert: true });
  } else {
    await visits.deleteOne({
      user: userID,
      brewery: breweryID,
    });
  }

  const brewery = await getBrewery(breweryIDString);
  brewery.visited = visited;
  return brewery;
}

export const getVisited = async (userID: string,
                                breweryIDString: string) => {
  log.info('getVisited');

  const visits = await visitInit();

  const breweryID = new ObjectId(breweryIDString);
  const doc = await visits.findOne({
    user: userID,
    brewery: breweryID,
  });

  if (doc) {
    return true;
  }
  return false;
}

export const getAllVisited = async (userID: string) => {
  log.info({ userID }, 'getAllVisited');

  const visits = await visitInit();

  const visited = await visits.find({ user: userID }, { brewery: 1 }).toArray();
  return visited.map(visit => visit.brewery.toHexString());
}
