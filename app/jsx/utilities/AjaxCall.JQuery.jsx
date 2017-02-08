var AjaxCallJQuery = function(opt) {
    this._setting = {
        url: '',
        async: true,
        cache: true,
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        crossDomain: false,
        data: '',
        headers: {}
    };
    if (typeof opt === 'object') {
        jQuery.extend(this._setting, opt);
    }
};

AjaxCallJQuery.prototype.get = function(queryString) {
    this._setting.url = this._setting.url + ((!queryString || 0 === queryString.length)
        ? ''
        : '?' + queryString);
    var option = this._setting;
    return new Promise(function(resolve, reject) {
        jQuery.ajax({
            method: 'GET',
            url: option.url,
            dataType: option.dataType,
            async: option.async,
            cache: option.cache,
            contentType: option.contentType,
            crossDomain: option.crossDomain,
            beforeSend: function(xhr) {
                var headerKeys = Object.keys(option.headers);
                if (jQuery.isArray(headerKeys) === true && headerKeys.length > 0) {
                    headerKeys.forEach(function(element) {
                        xhr.setRequestHeader(element, option.headers[element]);
                    });
                }
            }
        }).then(function(data, textStatus, jqXHR) {
            resolve(data);
        }, function(jqXHR, textStatus, errorThrown) {
            var errorMessage = {};
            errorMessage['jqXHR'] = jqXHR;
            errorMessage['textStatus'] = textStatus;
            errorMessage['errorThrown'] = errorThrown;
            reject(errorMessage);
        });
    });
};

AjaxCallJQuery.prototype.post = function() {
    var option = this._setting;
    return new Promise(function(resolve, reject) {
        jQuery.ajax({
            method: 'POST',
            url: option.url,
            dataType: option.dataType,
            data: option.data,
            contentType: option.contentType,
            crossDomain: option.crossDomain,
            beforeSend: function(xhr) {
                var headerKeys = Object.keys(option.headers);
                if (jQuery.isArray(headerKeys) === true && headerKeys.length > 0) {
                    headerKeys.forEach(function(element) {
                        xhr.setRequestHeader(element, option.headers[element]);
                    });
                }
            }
        }).then(function(data, textStatus, jqXHR) {
            resolve(data);
        }, function(jqXHR, textStatus, errorThrown) {
            var errorMessage = {};
            errorMessage['jqXHR'] = jqXHR;
            errorMessage['textStatus'] = textStatus;
            errorMessage['errorThrown'] = errorThrown;
            reject(errorMessage);
        });
    });
};

AjaxCallJQuery.prototype.put = function() {
    var option = this._setting;
    return new Promise(function(resolve, reject) {
        jQuery.ajax({
            method: 'PUT',
            url: option.url,
            dataType: option.dataType,
            data: option.data,
            contentType: option.contentType,
            crossDomain: option.crossDomain,
            beforeSend: function(xhr) {
                var headerKeys = Object.keys(option.headers);
                if (jQuery.isArray(headerKeys) === true && headerKeys.length > 0) {
                    headerKeys.forEach(function(element) {
                        xhr.setRequestHeader(element, option.headers[element]);
                    });
                }
            }
        }).then(function(data, textStatus, jqXHR) {
            resolve(data);
        }, function(jqXHR, textStatus, errorThrown) {
            var errorMessage = {};
            errorMessage['jqXHR'] = jqXHR;
            errorMessage['textStatus'] = textStatus;
            errorMessage['errorThrown'] = errorThrown;
            reject(errorMessage);
        });
    });
};

AjaxCallJQuery.prototype.delete = function() {
    var option = this._setting;
    return new Promise(function(resolve, reject) {
        jQuery.ajax({
            method: 'DELETE',
            url: option.url,
            dataType: option.dataType,
            data: option.data,
            contentType: option.contentType,
            crossDomain: option.crossDomain,
            beforeSend: function(xhr) {
                var headerKeys = Object.keys(option.headers);
                if (jQuery.isArray(headerKeys) === true && headerKeys.length > 0) {
                    headerKeys.forEach(function(element) {
                        xhr.setRequestHeader(element, option.headers[element]);
                    });
                }
            }
        }).then(function(data, textStatus, jqXHR) {
            resolve(data);
        }, function(jqXHR, textStatus, errorThrown) {
            var errorMessage = {};
            errorMessage['jqXHR'] = jqXHR;
            errorMessage['textStatus'] = textStatus;
            errorMessage['errorThrown'] = errorThrown;
            reject(errorMessage);
        });
    });
};

module.exports = AjaxCallJQuery;
