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
                    navigator.notification.alert(
                        name + " has been created successfully.",
                        function() {
                            $.mobile.navigate(navigateToPage);
                        },
                        "Creation Successful",
                        "Close"
                    );
                } else {
                    $.mobile.navigate(navigateToPage);
                }
            });
        } else {
            var url = 'patients/' + id + '.json';
            AjaxHelper.putRequest(url, jsonData, function(result){
                if (result) {
                    navigator.notification.alert(
                        name + " has been updated successfully.",
                        function() {
                            $.mobile.navigate(navigateToPage);
                        },
                        "Update Successful",
                        "Close"
                    );
                } else {
                    $.mobile.navigate(navigateToPage);
                }
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
        navigator.notification.confirm(
            "Delete " + name + "?",
            function() {
                const url = 'patients/' + patientID + ".json";
                AjaxHelper.deleteRequest(url, {}, function(result){
                    const navigateToPage = '#patients';
                    if (result) {
                        navigator.notification.alert(
                            name + " has been deleted successfully.",
                            function() {
                                $.mobile.navigate(navigateToPage);
                            },
                            "Deletion Successful",
                            "Close"
                        );
                    } else {
                        $.mobile.navigate(navigateToPage);
                    }
                });
            },
            'Confirm',
            ['Delete', 'Cancel']
        );
    },

    loadPatientItemsAndNavigateToPage: function(patientID, page) {
        this.getPatientItems(patientID, function(){
            $.mobile.navigate(page);
        });
    },

    clearPatientForm: function() {
        $('#patient-name').val('');
        $('#patient-urn').val('');
    },
};
