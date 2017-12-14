import { getBreweries } from '../db/brewery';
import {
  setVisited as setVisitedDB,
  getVisited as getVisitedDB
} from '../db/breweryVisits';

export const allBreweries = async () => {
  return await getBreweries();
};

export const setVisited = async(_: any, { brewery, visited }: { brewery: string, visited: boolean }, context: any ) => {
  if (!context.user) {
    return false;
  }

  return await setVisitedDB(context.user.sub, brewery, visited);
}

export const getVisited = async(obj: any, params: any, context: any ) => {
  if (!context.user) {
    return null;
  }

  const visited = await getVisitedDB(context.user.sub, obj.id);
  return visited;
}
