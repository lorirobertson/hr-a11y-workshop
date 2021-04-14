const fs = require('fs');
const appRoot = require('app-root-path');
const winston = require('winston');
require('winston-daily-rotate-file');
const logsDir = `${appRoot}/logs/`;

if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

const transportError = new (winston.transports.DailyRotateFile)({
    filename: logsDir + 'error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d',
    level: 'error'
});

const transportAccess = new (winston.transports.DailyRotateFile)({
    filename: logsDir + 'access-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d',
    level: 'info'
});

const logger = winston.createLogger({
    transports: [
        transportError,
        transportAccess,
    ]
  });

logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    },
};

module.exports = logger;