var Patients = {

    getPatients: function() {
        var self = this;
        State.patientID = 0;
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
            State.patientID = patientID;
            self.displayPatient(patientID);
        });
    },

    sendPatientForm: function() {
        const formSelector = '#edit-patient-form';
        const jsonData = Tools.getFormJSONData(formSelector);
        const name = $(formSelector).find('[name="name"]').first().val();
        const id = State.patientObj.id;
        const navigateToPage = '#patients';

        if (!id) {
            var url = 'patients.json';
            AjaxHelper.postRequest('patients.json', jsonData, function(result){
                if (result) {
                    alert(name + " has been created successfully.");
                }
                $.mobile.navigate(navigateToPage);
            });
        } else {
            var url = 'patients/' + id + '.json';
            AjaxHelper.putRequest(url, jsonData, function(result){
                if (result) {
                    alert(name + " has been updated successfully.");
                }
                $.mobile.navigate(navigateToPage);
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

                self.getPatientItems(result.id, function(){});
            }
        });
    },

    getPatientItems: function(patientID, callback) {
        var promises = [];
        promises.push(Medicines.getMedicines(patientID));
        promises.push(Events.getEvents(patientID));
        Promise.all(promises).then(function(results) {
            Medicines.populateMedicineList(results[0]);
            Events.populateEventList(results[1])
            Report.createReport(results[0], results[1]);
            callback();
        });
    },

    clearPatientData: function() {
        State.patientObj = {};
    },

    setPatientData: function(patientData) {
        State.patientObj = patientData;
    },

    deletePatient: function(patientID, name) {
        if (confirm("Delete " + name + "?")) {
            const url = 'patients/' + patientID + ".json";
            AjaxHelper.deleteRequest(url, {}, function(result){
                if (result) {
                    alert(name + " has been deleted successfully.");
                }
                const navigateToPage = '#patients';
                $.mobile.navigate(navigateToPage);
            });
        }
    }
};
