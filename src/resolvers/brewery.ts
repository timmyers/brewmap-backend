import { getBreweries, addBrewery } from '../db/brewery';
import {
  setVisited as setVisitedDB,
  getVisited as getVisitedDB
} from '../db/breweryVisits';

export const allBreweries = async () => {
  return await getBreweries();
};

export const addBreweryResolver = async(_: any, { name, lat, lng }: { name: string, lat: number, lng: number }, context: any ) => {
  if (!context.user || context.user.sub !== 'facebook|10213198044961330') {
    return false;
  }

  return await addBrewery(name, lat, lng);
}

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
