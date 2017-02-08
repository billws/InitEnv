var NEMAppDispatcher = require('../../dispatcher/NEMAppDispatcher');
var NetwAccountConstants = require('../../constants/NetwAccountConstants');
var NetwWebAPIUtils = require('../../utilities/NetwApiCall');

var AccountMethods = NetwAccountConstants.AccountMethods;


var _host = window._netwHost;
var _path = _host + '/myaccount/signup';
var _opt = {
    url: _path,
    async: true,
    cache: false,
    dataType: 'json',
    contentType: 'application/json',
    crossDomain: true,
    headers: {},
    customAuthorization: false
};

var _netwApi = new NetwWebAPIUtils(_opt);

module.exports = {

  signup: function(signupModel) {

    _netwApi.post(signupModel).then(function(response){
      NEMAppDispatcher.dispatch({
        type: AccountMethods.ACC_SIGNUP,
        response: response
      });
    });
  }
};
