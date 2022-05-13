import createHandler from '../../../../../middleware/createHandler';
import { fetchAllByWeek } from '../../../../../_utilities/db-utils';

const apiRoute = createHandler();

apiRoute.get(fetchAllByWeek)

export default apiRoute;

export const config = {
	api: { bodyParser: true },
};