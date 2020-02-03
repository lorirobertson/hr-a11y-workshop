const db = require('./lib/db');
const bcrypt = require('bcrypt');
const utils  = require('./lib/utils');

async function login(req, res, next) {
    const identity = req.body.identifier;
    const password = req.body.password;

    const user = db.users.findOne({username: identity});

    if (!user)
        res.json({ status: 401, data: 'Authentication failed.' });

    try {
        const passwordMatch = await bcrypt.compare(password, user.password);
        
        if (!passwordMatch)
            returnres.json({ status: 401, data: 'Authentication failed.' });

        const { token, payload } = await utils.createToken(process.env.SECRET, user);

        res.json({ status: 200, data: { token, user: payload } });
    } catch(err) {
        res.status(500).json({ status: 500, data: null, err: err });
    };    
}

function fetchAll(collection) {
    return (req, res, next ) => {
        const filters = JSON.parse(req.headers.helpers) || {};
        const data = db[collection].find(filters);
        res.send(paginate(data, req.body._start, req.body._limit));
    }
}

function count(collection) {
    return (req, res, next ) => {
        const filters = req.body.filters || {};
        const data = db[collection].find(filters);
        res.send({ count: data.length });
    }
}

function fetchOne(collection) {
    return (req, res, next ) => {
        const data = db[collection].findOne({ _id: req.params.id });
        res.send(data);
    }
}

function paginate(data, start, limit) {
    if ( start && limit ) {
        let startIndex = start;
        return data.slice(startIndex, startIndex+limit);
    } else {
        return data;
    }
}

function create(collection) {
    return (req, res, next ) => {
        const data = db[collection].save(req.body);
        res.send(data);
    }
}

function updateOne(collection) {
    return (req, res, next ) => {
        const data = db[collection].update({ _id: req.params.id }, req.body);
        res.send(data);
    }
}

function removeOne(collection) {
    return (req, res, next ) => {
        const data = db[collection].remove({ _id: req.params.id });
        res.send(data);
    }
}

function fetchAllGrouped(req, res, next ) {
    const data = db['timesheets'].find();

    res.send(utils.groupByWeek(data));
}

function fetchAllByWeek(req, res, next ) {
    const data = db['timesheets'].find({
        date: req.params.weekOf
    });

    res.send(utils.calcHoursByWeek(data));
}

module.exports = (server) => {

    const uriPrefix = '/api/v1';

    // Auth
    server.post(uriPrefix + '/auth/local', login);

    // Users
    server.get(uriPrefix + '/users', fetchAll('users'));
    server.get(uriPrefix + '/users/:id', fetchOne('users'));

    // Timesheets
    server.get(uriPrefix + '/timesheets', fetchAll('timesheets'));
    server.get(uriPrefix + '/timesheets/grouped', fetchAllGrouped);
    server.get(uriPrefix + '/timesheets/week/:weekOf', fetchAllByWeek);
    server.post(uriPrefix + '/timesheets', create('timesheets'));
    server.get(uriPrefix + '/timesheets/:id', fetchOne('timesheets'));
    server.put(uriPrefix + '/timesheets/:id', updateOne('timesheets'));
    server.delete(uriPrefix + '/timesheets/:id', removeOne('timesheets'));

    // Posts
    server.get(uriPrefix + '/posts', fetchAll('posts'));
    server.get(uriPrefix + '/posts/count', count('posts'));
    server.get(uriPrefix + '/posts/:id', fetchOne('posts'));

    // Products
    server.get(uriPrefix + '/products', fetchAll('products'));
    server.get(uriPrefix + '/products/:id', fetchOne('products'));

};