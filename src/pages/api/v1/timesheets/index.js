import createHandler from '../../../../middleware/createHandler';
import { fetchAll, create, updateOne } from '../../../../_utilities/db-utils';

const apiRoute = createHandler();

apiRoute.get(fetchAll('timesheets'));
apiRoute.post(create('timesheets'))

export default apiRoute;

export const config = {
	api: { bodyParser: true },
};
