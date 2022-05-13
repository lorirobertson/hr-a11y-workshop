import createHandler from '../../../../middleware/createHandler';
import { fetchAllGrouped } from '../../../../_utilities/db-utils';

const apiRoute = createHandler();

apiRoute.get(fetchAllGrouped)

export default apiRoute;

export const config = {
	api: { bodyParser: true },
};