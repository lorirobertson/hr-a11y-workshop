import createHandler from '@middleware/createHandler';
import utils from '@utilities/db-utils';

const apiRoute = createHandler();

// apiRoute.use()

apiRoute.get(async (req, res) => {
    console.log(utils.fetchAll('users'));
    // console.log(global.db);
    // const users = db['users'].find();
    // return fetchAll('users')
    // console.log(fetchAll);
    res.json({ hello: 'world' });
})

export default apiRoute;

export const config = {
	api: { bodyParser: true },
};