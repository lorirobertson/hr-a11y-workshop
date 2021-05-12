import createHandler from '@middleware/createHandler';
import { fetchOne, removeOne, updateOne } from '@utilities/db-utils';

const apiRoute = createHandler();

apiRoute.get(fetchOne('timesheets'));
apiRoute.delete(removeOne('timesheets'))
apiRoute.put(updateOne('timesheets'))

export default apiRoute;

export const config = {
	api: { bodyParser: true },
};