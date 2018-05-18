var Tools = {

    getCSRFToken: function(endpoint, callback) {
        var url = AjaxHelper.getURL(endpoint);

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
