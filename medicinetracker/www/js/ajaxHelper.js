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

    getCSRFToken: function(endpoint, callback) {
        var url = AjaxHelper.getURL(endpoint);

        State.csrfToken = false;

        $.ajax({
            url: url,
            async: true,
            success: function (result) {
                var html = $.parseHTML(result);
                var csrfToken = html.find(function(element){
                    return element.name === "csrf-token";
                });

                State.csrfToken = csrfToken.content;

                if ($.isFunction(callback)) {
                    callback(true);
                }
            },
            error: function (request,error) {
                if ($.isFunction(callback)) {
                    callback(false);
                }
            }
        });
    },
};
