const env = process.env.NODE_ENV || 'development';
const application = require(`./env/${env}/application.js`);
const database = require(`./env/${env}/database.js`);
var settings = {};

Object.assign(settings, {application:application});
Object.assign(settings, {db: database});

settings.db.connectionURL = async (connectionName) => {
    const connection = settings.db[connectionName || 'default'];
    const connString = `${connection.settings.client}://` +
        `${process.env.DATABASE_USERNAME}:`+
        `${process.env.DATABASE_PASSWORD}@` +
        `${process.env.DATABASE_HOST}:` +
        `${process.env.DATABASE_PORT}/` +
        `${process.env.DATABASE_NAME}` +
        `?authSource=${process.env.DATABASE_AUTHSOURCE}`;
    return connString;
}

module.exports = settings;