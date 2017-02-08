var NEMAppDispatcher = require('../../dispatcher/NEMAppDispatcher');
var NetwAccountConstants = require('../../constants/NetwAccountConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AccountMethods = NetwAccountConstants.AccountMethods;
var CHANGE_EVENT = 'accountSignup';
var signupResponse = "";

function _setResponse(response){
  signupResponse = response;
}

var SignupStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getResponse: function() {
    return signupResponse;
  }
});

SignupStore.dispatchToken = NEMAppDispatcher.register(function(action) {
  switch (action.type) {
    case AccountMethods.ACC_SIGNUP:
      _setResponse(action.response);
      SignupStore.emitChange();
      break;
    default:
      // do nothing
  }
});

module.exports = SignupStore;
