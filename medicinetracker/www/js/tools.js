var tools = {

    getURL: function(endpoint) {
        var url = storage.baseURL + endpoint;
        return url;
    },

    populatePatientList: function(result) {
        patients = result;
        $.each(result, function(i, row) {
            $('#patient-list').append('<li><a href="#" data-id="' + row.id + '"><h3>' + row.name + '</h3></a></li>');
        });
        $('#patient-list').listview('refresh');
    },

    getCSRFToken: function(endpoint) {
        var url = this.getURL(endpoint);

        $.ajax({
            url: url,
            async: true,
            success: function (result) {
                console.log(result);
            },
            error: function (request,error) {

            }
        });
    }

};
