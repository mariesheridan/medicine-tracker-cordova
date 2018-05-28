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
        this.clearPatientData();
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
        var id = State.patientObj.id;

        if (!id) {
            var url = 'patients.json';
            AjaxHelper.postRequest('patients.json', jsonData, function(result){
                if (result) {
                    alert(name + " has been created successfully.");
                }
                $.mobile.navigate('#patients');
            });
        } else {
            var url = 'patients/' + id + '.json';
            AjaxHelper.putRequest(url, jsonData, function(result){
                if (result) {
                    alert(name + " has been updated successfully.");
                }
                $.mobile.navigate('#patients');
            });
        }
    },

    displayPatient: function(id) {
        var self = this;
        var endpoint = "patients/" + id + ".json";
        var patientJson = AjaxHelper.getRequest(endpoint, function(result) {
            if (result) {
                self.setPatientData(result);
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
                Report.createReport(result.medicines, result.events);
            }
        });
    },

    clearPatientData: function() {
        State.patientObj = {};
    },

    setPatientData: function(patientData) {
        State.patientObj = patientData;
    }
};
