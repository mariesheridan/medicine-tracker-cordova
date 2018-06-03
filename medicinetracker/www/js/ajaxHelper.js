var AjaxHelper = {

    getURL: function(endpoint) {
        var url = State.baseURL + endpoint;
        return url;
    },

    getRequest: function(endpoint, callback) {
        this.ajaxRequest('GET', endpoint, {}, callback);
    },

    postRequest: function(endpoint, data, callback) {
        this.ajaxRequest('POST', endpoint, data, callback);
    },

    putRequest: function(endpoint, data, callback) {
        this.ajaxRequest('PUT', endpoint, data, callback);
    },

    deleteRequest: function(endpoint, data, callback) {
        this.ajaxRequest('DELETE', endpoint, data, callback);
    },

    ajaxRequest: function(type, endpoint, data, callback) {
        var url = this.getURL(endpoint);

        $.ajax({
            type: type,
            url: url,
            data: data,
            contentType: 'application/json',
            success: function (result) {
                if ($.isFunction(callback)) {
                    callback(result);
                }
            },
            error: function (request,error) {
                alert('Network error has occurred please try again!');
                if ($.isFunction(callback)) {
                    callback(false);
                }
            }
        });
    }
};
