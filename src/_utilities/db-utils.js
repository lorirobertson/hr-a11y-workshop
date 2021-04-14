// var db = global.db;

const fetchAll = (collection) => {
    return (req, res, next) => {
        res.send('hello?');
        // const filters = JSON.parse(req.headers.helpers) || {};
        // const data = db[collection].find(filters);
        // res.send(paginate(data, req.body._start, req.body._limit));
    }
}

const paginate = (data, start, limit) => {
    if (start && limit) {
        let startIndex = start;
        return data.slice(startIndex, startIndex + limit);
    } else {
        return data;
    }
}

export default {
    fetchAll,
    paginate,
}