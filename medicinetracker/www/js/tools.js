var tools = {

    getURL: function(endpoint) {
        var url = storage.baseURL + endpoint;
        return url;
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
    },

    getPatients: function() {

        var self = this;
        var url = self.getURL('patients.json');

        $.ajax({
            url: url,
            async: true,
            success: function (result) {
                self.populatePatientList(result);
            },
            error: function (request,error) {
                alert('Network error has occurred please try again!');
            }
        });
    },

    populatePatientList: function(result) {
        patients = result;
        $('#patient-list').empty();
        $.each(result, function(i, row) {
            $('#patient-list').append('<li><a href="#" data-id="' + row.id + '"><h3>' + row.name + '</h3></a></li>');
        });
        $('#patient-list').listview('refresh');
    },
};
