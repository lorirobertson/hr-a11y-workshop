import createHandler from '../../../../middleware/createHandler';
import { fetchOne } from '../../../../_utilities/db-utils';

const apiRoute = createHandler();

apiRoute.get(fetchOne('posts'))

export default apiRoute;

export const config = {
	api: { bodyParser: true },
};