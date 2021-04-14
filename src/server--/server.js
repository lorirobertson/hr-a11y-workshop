require('dotenv').config();
const appRoot = require('app-root-path');
const path = require('path');
const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const config = require('./lib/config');
const logger = require('./lib/logger');
const utils = require('./lib/utils');
const port = config.application.port || process.env.PORT;
const nextConfig = require(appRoot.resolve('next.config'));

const next = require('next');
const app = next(nextConfig);
const handle = app.getRequestHandler();
const cookieParser = require('cookie-parser');

app.prepare().then(async () => {
	server.set('secret', process.env.SECRET);
	server.set('config', config.application);

	server.use(compression());
	server.use(bodyParser.urlencoded({ extended: false }));
	server.use(bodyParser.json());
	server.use(cookieParser());
	server.use(helmet());
	server.use(morgan('combined', { stream: logger.stream }));

	require('./routes')(server);

	server.get('*', (req, res) => {
		return handle(req, res);
	});
	
	server.use(utils.errorHandler);

	server.listen(port, () => logger.info('Server started'));
});

module.exports = app;