import { getBreweries } from '../db/brewery';

export const allBreweries = async () => {
  return await getBreweries();
}
