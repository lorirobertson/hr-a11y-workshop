import nextConnect from 'next-connect';
import database from './database';

export default function createHandler(...middleware) {
	return  nextConnect({
		onError(error, req, res) {
			res.status(501).json({
				error: `Sorry something Happened! ${error.message}`
			});
		},
		onNoMatch(req, res) {
			res.status(405).json({
				error: `Method '${req.method}' Not Allowed`
			});
		},
	}).use(database, ...middleware);
}