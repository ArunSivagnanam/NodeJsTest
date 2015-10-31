/**
 * Created by arun on 10/31/15.
 */

var angular = require('angular');
var routes = require('./routes/routes');
var controllers = require('./controllers/controllers');
var services = require('./services/services');

var app = angular.module('planpenny-app', [require('angular-route')]);

// registering routes
app.config(routes);

// registering controllers
app.controller(controllers);

// registering task service
app.service(services);