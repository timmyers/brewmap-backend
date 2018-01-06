import DataLoader from 'dataloader';
import { getAllVisited } from '../db/breweryVisits';

const breweryVisitsBatch = async (user: any, breweryIds: any[]) => {
  if (!user) return breweryIds.map(breweryId => false);

  const visited = await getAllVisited(user.sub);
  return breweryIds.map(breweryId => visited.includes(breweryId));
}

export default (user: any) => ({
  breweryVisits: new DataLoader(keys => breweryVisitsBatch(user, keys)),
});
