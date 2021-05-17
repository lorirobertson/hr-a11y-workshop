const appRoot = require('app-root-path');
const diskdb = require('diskdb');

export default async (req, res, next) => {
    try {
        if ( !req?.db ) {
            req.db = diskdb.connect(`${appRoot}/data`, [
                'users',
                'products',
                'posts',
                'timesheets'
            ]);
        }
    }

    catch ( err ) {
        console.error(err);
    }
    
    return next();
};