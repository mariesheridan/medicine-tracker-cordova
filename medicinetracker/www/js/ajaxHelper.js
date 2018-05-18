var AjaxHelper = {

    getURL: function(endpoint) {
        var url = State.baseURL + endpoint;
        return url;
    },

    getRequest: function(endpoint, callback) {
        var url = this.getURL(endpoint);
        $.ajax({
            url: url,
            async: true,
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
    },
};
