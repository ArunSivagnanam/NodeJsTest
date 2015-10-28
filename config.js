/**
 * Created by arun on 10/9/15.
 */


var config = {
    mongoUri_DEV :'mongodb://127.0.0.1:27017/planpenny',
    mongoUri_PROD :""
};

config.cookieMaxAge = 30 * 24 * 3600 * 1000; // 30 days

module.exports = config;