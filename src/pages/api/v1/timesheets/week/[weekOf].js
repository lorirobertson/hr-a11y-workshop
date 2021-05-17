import createHandler from '@middleware/createHandler';
import { fetchAllByWeek } from '@utilities/db-utils';

const apiRoute = createHandler();

apiRoute.get(fetchAllByWeek)

export default apiRoute;

export const config = {
	api: { bodyParser: true },
};