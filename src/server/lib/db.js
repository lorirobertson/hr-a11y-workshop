const appRoot = require('app-root-path');
const diskdb = require('diskdb');
const db = diskdb.connect(`${appRoot}/data`, ['users', 'products', 'posts', 'timesheets']);

module.exports = db;