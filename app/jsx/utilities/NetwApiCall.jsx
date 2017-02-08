//import NetwApiMethods from '../constants/NetwApiMethods';
import NetwCookieKeys from '../constants/NetwCookieConstants';
import AjaxCallJQuery from './AjaxCall.JQuery';
//import AjaxCallSuperAgent from './ApiCall.SuperAgent';
import NetwCookie from './NetwCookies';

var NetwApiCall = function(opt) {
    this._setting = {
        url: '',
        async: true,
        cache: true,
        dataType: 'json',
        //contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        contentType: 'application/json',
        crossDomain: false,
        headers: {},
        customAuthorization: false
    };
    if (typeof opt === 'object') {
        jQuery.extend(this._setting, opt);
    }
};

NetwApiCall.prototype.get = function(queryString, opt) {
    if (!this._setting.customAuthorization) {
        var neui = new NetwCookie(NetwCookieKeys.CookieKeys.NETW_USER, null);
        this._setting.headers.Authorization = 'Basic ' + neui.get();
    }
    if (typeof opt === 'object') {
        jQuery.extend(this._setting, opt);
    }
    var apiCall = new AjaxCallJQuery(this._setting);
    return apiCall.get(queryString);
};

NetwApiCall.prototype.post = function(postData, opt) {
    if (!this._setting.customAuthorization) {
        var neui = new NetwCookie(NetwCookieKeys.CookieKeys.NETW_USER, null);
        this._setting.headers.Authorization = 'Basic ' + neui.get();
    }
    if (typeof opt === 'object') {
        jQuery.extend(this._setting, opt);
    }
    if (typeof postData === 'object' || jQuery.isArray(postData) === true) {
        this._setting.data = JSON.stringify(postData);
    } else {
        this._setting.data = postData;
    }
    var apiCall = new AjaxCallJQuery(this._setting);
    return apiCall.post();
};

NetwApiCall.prototype.put = function(putData, opt) {
    if (!this._setting.customAuthorization) {
        var neui = new NetwCookie(NetwCookieKeys.CookieKeys.NETW_USER, null);
        this._setting.headers.Authorization = 'Basic ' + neui.get();
    }
    if (typeof opt === 'object') {
        jQuery.extend(this._setting, opt);
    }
    if (typeof putData === 'object' || jQuery.isArray(putData) === true) {
        this._setting.data = JSON.stringify(putData);
    } else {
        this._setting.data = putData;
    }
    var apiCall = new AjaxCallJQuery(this._setting);
    return apiCall.put();
};

NetwApiCall.prototype.delete = function(deleteData, opt) {
    if (!this._setting.customAuthorization) {
        var neui = new NetwCookie(NetwCookieKeys.CookieKeys.NETW_USER, null);
        this._setting.headers.Authorization = 'Basic ' + neui.get();
    }
    if (typeof opt === 'object') {
        jQuery.extend(this._setting, opt);
    }
    if (typeof deleteData === 'object' || jQuery.isArray(deleteData) === true) {
        this._setting.data = JSON.stringify(deleteData);
    } else {
        this._setting.data = deleteData;
    }
    var apiCall = new AjaxCallJQuery(this._setting);
    return apiCall.delete();
};

module.exports = NetwApiCall;
