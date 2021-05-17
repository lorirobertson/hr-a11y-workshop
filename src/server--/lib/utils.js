const jwt    = require('jsonwebtoken');
const _      = require('lodash');
const logger = require('./logger');
const roles  = require('./roles');
const md5    = require('md5');
const moment = require('moment');

const extractToken = (req) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    return authHeader && (authHeader).replace(/Bearer\s/g,'');
}

const parseHelpersFromBody = (body) => {
    return {
        filters: body.filters || {},
        select: body.select || null,
        sort: body.sort || null,
        skip: body.skip || null,
        limit: body.limit || null
    };
}

const parseHelpersFromQuery = async (querystring) => {
    let limit = null;
    let skip = null;
    let sort = {};
    let select = {};

    if ( querystring.hasOwnProperty('select') ) {
        let fieldValue = 1;

        if( querystring.select.startsWith('-') ) {
            fieldValue = 0;
            querystring.select = querystring.select.substr(1);
        }

        querystring.select
            .split(',')
            .forEach(field => {
                select[field] = fieldValue;
            });

        delete querystring.select;
    }

    if ( querystring.hasOwnProperty('limit') || querystring.hasOwnProperty('skip') ) {
        limit = parseInt(querystring.limit) || null;
        skip = parseInt(querystring.skip) || 0;

        delete querystring.limit;
        delete querystring.skip;
    }

    if ( querystring.hasOwnProperty('sort') ) {
        querystring.sort
            .split(',')
            .forEach(field => {
                if( field.startsWith('-') ) {
                    sort[field.substr(1)] = -1;
                } else {
                    sort[field] = 1;
                }
            });

        sort = sort;
        delete querystring.sort;
    }

    return {
        filters: {},
        select: select,
        sort: sort,
        skip: skip,
        limit: limit
    };
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

module.exports = {
    genericError: (errorString, actualError) => {
        if ( actualError )
            logger.error(`${actualError.status || 500} - ${actualError.message} - ${actualError.stack}`);

        return new Error(
            errorString ||
            'There was an unknown error while trying to process this request. Please try again!'
        );
    },

    createToken: async (secret, payload) => {
        const sanitizedUserObj = _.pick(payload, ['id', 'fullName', 'username', 'email', 'role', 'organizations', 'img']);
        const token = jwt.sign(sanitizedUserObj, secret, { expiresIn: process.env.TOKEN_EXPIRATION });
        return { token, payload: sanitizedUserObj };
    },

    getTokenExpiration: async (token, secret) => {
        try {
            const { exp } = await jwt.verify(token, secret);
            return exp;
        } catch(err) {
            return err;
        }
    },

    gravatarURL: async (email) => {
        const hashedEmail = md5(email);
        return `https://www.gravatar.com/avatar/${hashedEmail}?d=identicon`;
    },
    
    isAuthenticated: async (req, res, next) => {
        const token = extractToken(req);

        if ( token) {
            jwt.verify(token, req.app.get('secret'), function(err, userObject) {
                if (err) {
                    var message = (err.name == 'TokenExpiredError')? 'Token has expired.': 'Failed to authenticate token.';
                    return res.status(403).json({ message: message });
                } else if ( userObject ) {
                    // if everything is good, save to request for use in other routes
                    req.authenticatedUser = userObject;

                    // check if the user has roles needed for requested route.
                    roles.checkAccess(req)
                        .then( hasAccess => {
                            return hasAccess ? next() : res.status(403).json({ message: 'Unauthorized.' });
                        });
                }
            });
        } else {
            res.status(403).json({message: 'Invalid access token.'});
        }
    },

    responseObject: async (req, res, next) => {
        const status = req.responseData.status;
        const response = req.responseData.data;
        res.status(status).json(response);
    },

    errorHandler: (err, req, res, next) => {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
    
        // add this line to include winston logging
        logger.error(`${err.status || 500} - ${err.message} - ${JSON.stringify(req.body)} - ${err.stack} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    
        // render the error page
        res.status(err.status || 500).send(err.message);
    },

    parseQuery: async (req, res, next) => {
        if (req.method !== 'GET')
            next(new Error(`Error! Query parsing is only allowed for GET requests.`));

        if ( (req.query && Object.keys(req.query).length) && (req.body && Object.keys(req.body).length) )
            next(new Error(`You have used both query string parameters and sent a body object. You cannot use both.`));

        try {
            req.queryHelpers = {
                filters: {},
                select: null,
                sort: null,
                skip: null,
                limit: null
            };

            if (req.query && Object.keys(req.query).length) 
                req.queryHelpers = await parseHelpersFromQuery(req.query);

            if (req.body && Object.keys(req.body).length) 
                req.queryHelpers = await parseHelpersFromBody(req.body);

            next();
        }
        
        catch (e) {
            next(new Error('There was an error trying to build the query.'));
        }
    },

    isCurrentWeekOf: (itmDate, selectedWeekStart) => {
        const provided = moment(new Date(itmDate + ' EST')).format('YYYY-MM-DD');
        const weekStart = moment(new Date(selectedWeekStart + ' EST')).format('YYYY-MM-DD');
        
        return provided === weekStart;
    },

    groupByWeek: (data) => {
        const grouped = _.groupBy(data, 'date');
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
    },

    calcHoursByWeek: calcHoursByWeek,
}