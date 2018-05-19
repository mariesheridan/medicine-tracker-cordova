var Patients = {

    getPatients: function() {
        var self = this;
        AjaxHelper.getRequest('patients.json', function(result) {
            if (result) {
                self.populatePatientList(result);
            }
        });
    },

    populatePatientList: function(result) {
        $('#patient-list').empty();
        $.each(result, function(i, row) {
            $('#patient-list').append('<li><a class="patient-item" href="#view-patient" data-id="' + row.id + '"><h3>' + row.name + '</h3></a></li>');
        });
        $('#patient-list').listview('refresh');

        $('.patient-item').off('click');
        $('.patient-item').on('click', function(){
            var patientID = $(this).data('id');
            var contentElement = $('#view-patient').find('[data-role="content"]').first();
            contentElement.empty();
            contentElement.text("PatientID: " + patientID);
        });
    },

    sendPatientForm: function() {
        var formElement = $("#edit-patient-form");
        var urn = formElement.find("input[name='urn']").first().val();
        var name = formElement.find("input[name='name']").first().val();
        var data = {
            urn: urn,
            name: name
        };

        var jsonData = JSON.stringify(data);

        AjaxHelper.postRequest('patients.json', jsonData, function(result){
            if (result) {
                alert(name + " has been saved successfully.");
            }
        });
    },
};
