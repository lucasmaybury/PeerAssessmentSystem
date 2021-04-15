'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.apiUserGET = function apiUserGET (req, res, next) {
  Default.apiUserGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.rootGET = function rootGET (req, res, next) {
  Default.rootGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
