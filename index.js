var app = require('./app');
//var debug = require('debug')('express-sequelize');
var http = require('http');
var models = require('./models');

var logger = require('./logConfig').logger('./index', 'debug');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '5000');
//var port = normalizePort(process.env.PORT || '5000');
//var port = normalizePort(process.env.PORT || '80');

app.set('port', port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Sync all defined models to the DB.
 * @param {Object} [options={}]
 * @param {Boolean} [options.force=false] If force is true, each DAO will do DROP TABLE IF EXISTS ..., before it tries to create its own table
 * @param {RegEx} [options.match] Match a regex against the database name before syncing, a safety check for cases where force: true is used in tests but not live code
 * @param {Boolean|function} [options.logging=console.log] A function that logs sql queries, or false for no logging
 * @param {String} [options.schema='public'] The schema that the tables should be created in. This can be overriden for each table in sequelize.define
 * @param  {String} [options.searchPath=DEFAULT] An optional parameter to specify the schema search_path (Postgres only)
 * @param {Boolean} [options.hooks=true] If hooks is true then beforeSync, afterSync, beforBulkSync, afterBulkSync hooks will be called
 * @return {Promise}
 */

var syncOption = {
    force: false,
    logging: false
};

models.sequelize.sync().then(function () {
    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port, function () {
        //debug('Express server listening on port ' + server.address().port);
        console.log('Node app is running on port', port);
        logger.info('Node app is running on port', port);
    });

    server.on('error', onError);
    server.on('listening', onListening);

});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {

    //console.log("normalizePort",val);
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {

    console.error(error.code);
    //console.log(error);
    logger.error(error);

    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ?
        'Pipe ' + port :
        'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            logger.info(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            logger.info(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {

    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    //debug('Listening on ' + bind);

}