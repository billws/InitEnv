import ReactCookie from 'react-cookie';
import NetwCookieKeys from '../constants/NetwCookieConstants';

var _getNetwCookieKey = function(key, customize) {
    var _cookieKeys = NetwCookieKeys.CookieKeys;
    var cookieName = '';
    if (typeof customize !== 'string') {
        customize = 'netwCookie';
    }
    switch (key) {
        case _cookieKeys.NETW_USER:
            cookieName = 'neui';
            break;
        case _cookieKeys.CART_NAME:
            cookieName = 'sc';
            break;
        default:
            cookieName = customize;
    }
    return cookieName;
};

var NetwCookie = function(key, opt) {
    this._cookieName = _getNetwCookieKey(key, key);
    this._setting = {
        path: '/',
        expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        expiredays: 0,
        //expires: null,
        //maxAge: 0,
        //domain: netwGlobal.neRootDM,
        domain: window._netwCookieDomain,
        secure: false,
        httpOnly: false,
        firstPartyOnly: false
    };

    if (typeof opt === 'object') {
        jQuery.extend(this._setting, opt);
    }
    if (this._setting.expiredays !== 0) {
        if (this._setting.expiredays > 0) {
            this._setting.expires = new Date(new Date().getTime() + (24 * this._setting.expiredays) * 60 * 60 * 1000);
        } else {
            this._setting.expires = null;
        }
    }
};

NetwCookie.prototype.get = function() {
    return ReactCookie.load(this._cookieName);
};

NetwCookie.prototype.set = function(val) {
    return ReactCookie.save(this._cookieName, val, this._setting);
};

NetwCookie.prototype.delete = function() {
    return ReactCookie.remove(this._cookieName, this._setting);
};

module.exports = NetwCookie;
