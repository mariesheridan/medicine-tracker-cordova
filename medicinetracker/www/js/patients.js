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
        var self = this;
        $('#patient-list').empty();
        $.each(result, function(i, row) {
            var html =
                '<li>' +
                    '<a class="patient-item" href="#view-patient" data-id="' + row.id + '">' +
                        '<h3>' + row.name + '</h3>' +
                        '<p>URN: ' + row.urn + '</p>' +
                    '</a>' +
                '</li>';
            $('#patient-list').append(html);
        });
        $('#patient-list').listview('refresh');

        $('.patient-item').off('click');
        $('.patient-item').on('click', function(){
            var patientID = $(this).data('id');
            self.displayPatient(patientID);
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

    displayPatient: function(id) {
        var endpoint = "patients/" + id + ".json";
        State.patientObj = {};
        var patientJson = AjaxHelper.getRequest(endpoint, function(result) {
            if (result) {
                State.patientObj = result;
                var contentElement = $('#view-patient').find('.content-holder').first();
                contentElement.empty();

                var html =
                    "<div>" +
                        "<p>ID: " + result.id + "</p>" +
                        "<p>URN: " + result.urn + "</p>" +
                        "<p>Name: " + result.name + "</p>" +
                    "</div>";
                contentElement.html(html);
                Medicines.populateMedicineList(result.medicines);
                Events.populateEventList(result.events);
            }
        });
    },
};
