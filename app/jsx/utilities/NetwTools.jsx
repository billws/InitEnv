var NetwCookieKeys = require('../constants/NetwCookieConstants');
var NetwWebAPIUtils = require('./NetwApiCall');
var NetwCookie = require('./NetwCookies');

var _host = window._netwHost;

module.exports = {
    parseUrlFormatByName: function(content, name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(content);
        return results === null
            ? ""
            : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    parseUrlFormatByNameIC: function(content, name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)", "gi"),
            results = regex.exec(content);
        return results === null
            ? ""
            : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    isHttpUriAbsolute: function(uri) {
        var result = false;
        if (uri.indexOf('http://') === 0 || uri.indexOf('https://') === 0) {
            result = true;
        }
        return result;
    },
    isUriAbsolute: function(uri) {
        var result = false;
        var absoluteUrl = new RegExp('^(?:[a-z]+:)?//', 'i');
        result = absoluteUrl.test(uri);
        return result;
    },
    isSecure: function() {
        if (window.location.protocol != "https:") {
            return false;
        } else {
            return true;
        }
    },
    matchEmail: function(email) {
        var emailRule = /^([\w-\.\+\-\_]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4})$/;
        return email.match(emailRule);
    },
    isiOSPrivMode: function(){
        var testKey = 'neTest', storage = window.localStorage;
        try {
          storage.setItem(testKey, '1');
          storage.removeItem(testKey);
          return true;
        } catch (error) {
          return false;
        }
    }
};
