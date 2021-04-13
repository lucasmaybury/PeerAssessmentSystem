'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.userUsernameGET = function userUsernameGET (req, res, next) {
  var username = req.swagger.params['username'].value;
  Default.userUsernameGET(username)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
