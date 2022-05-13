// var db = global.db;
import { groupBy } from 'lodash';

const fetchAll = (collection) => {
    return async (req, res, next) => {
        const filters = req?.headers?.helpers || {};
        const data = await req?.db[collection].find(filters);
        res.json(data);
    }
}

function fetchOne(collection) {
    return async (req, res, next ) => {
        const data = await req?.db[collection].findOne({ _id: req.query.id });
        res.json(data);
    }
}

function count(collection) {
    return async (req, res, next ) => {
        const filters = req?.body?.filters || {};
        const data = await req?.db[collection].find(filters);
        res.json({ count: data.length });
    }
}

function create(collection) {
    return async (req, res, next ) => {
        const data = await req?.db[collection].save(JSON.parse(req.body));
        res.send(data);
    }
}

function updateOne(collection) {
    return async (req, res, next ) => {
        const data = await req?.db[collection].update({ _id: req.query.id }, JSON.parse(req.body));
        res.send(data);
    }
}

function removeOne(collection) {
    return async (req, res, next ) => {
        const data = await req?.db[collection].remove({ _id: req.query.id });
        res.send(data);
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

async function fetchAllGrouped(req, res, next ) {
    const data = await req?.db['timesheets'].find();
    res.json(groupByWeek(data));
}

const groupByWeek = (data) => {
    const grouped = groupBy(data, 'date');
    const output = [];

    Object.keys(grouped)
        .forEach((date, i) => {
            const { calculated } = calcHoursByWeek(grouped[date]);
            output.push({
                date,
                totalHours: calculated.totalHours,
            });
        });

    return output;
}

const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

const calcHoursByWeek = (data=[]) => {
    let calculated = {
        sunday: 0,
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
    };

    if ( data.length ) {
        calculated = data.reduce((a,b) => {
            return {
                sunday: a.sunday + b.sunday,
                monday: a.monday + b.monday,
                tuesday: a.tuesday + b.tuesday,
                wednesday: a.wednesday + b.wednesday,
                thursday: a.thursday + b.thursday,
                friday: a.friday + b.friday,
                saturday: a.saturday + b.saturday,
            }
        });
    }

    let totalHours = 0;
    Object.keys(calculated).forEach(k => {
        if ( dayNames.indexOf(k) > -1 ) {
            totalHours = totalHours + calculated[k];
        }
    });

    return {
        data,
        calculated: {
            totalHours: totalHours,
            byDay: calculated,
        }
    }
};

async function fetchAllByWeek(req, res, next ) {
    const data = await req?.db['timesheets'].find({
        date: req.query.weekOf
    });

    res.json(calcHoursByWeek(data));
}

export {
    fetchAll,
    fetchOne,
    count,
    create,
    updateOne,
    removeOne,
    fetchAllGrouped,
    fetchAllByWeek,
    paginate,
}