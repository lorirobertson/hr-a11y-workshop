import createHandler from '@middleware/createHandler';
import { count } from '@utilities/db-utils';

const apiRoute = createHandler();

apiRoute.get(count('posts'))

export default apiRoute;

export const config = {
	api: { bodyParser: true },
};