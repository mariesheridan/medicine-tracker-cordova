var Medicines = {
    getMedicines: function(patientID) {
        var self = this;
        var url = 'patients/' + patientID + '/medicines.json'
        var promise = new Promise(function(resolve, reject){
            AjaxHelper.getRequest(url, function(result) {
                if (result) {
                    State.medicines = result;
                    resolve(result);
                } else {
                    State.medicines = [];
                    resolve([]);
                }
            });
        });

        return promise;
    },

    populateMedicineList: function(medicines) {
        var self = this;
        $('#medicine-list').empty();
        $.each(medicines, function(i, row) {
            var html =
                '<li>' +
                    '<a class="medicine-item" href="#view-medicine" data-id="' + row.id + '">' +
                        '<h3>' + row.antibiotic + '</h3>' +
                        '<p>Start: ' + row.start_date + '</p>' +
                        '<p>End: ' + row.end_date + '</p>' +
                        '<p>Dose: ' + row.dose + '</p>' +
                        '<p>Frequency: ' + row.frequency + '</p>' +
                    '</a>' +
                '</li>';

            $('#medicine-list').append(html);
        });

        $('.medicine-item').off('click');
        $('.medicine-item').on('click', function(){
            var medicineID = $(this).data('id');
            self.displayMedicine(medicineID);
        });
    },

    displayMedicine: function(id) {
        var contentElement = $('#view-medicine').find('.content-holder').first();
        contentElement.empty();
        var medicines = State.medicines;
        var medicine = medicines.find(function(item){
            return item.id === id;
        });

        if (medicine)
        {
            var html =
                "<div>" +
                    "<p>ID: " + medicine.id + "</p>" +
                    "<p>Antibiotic: " + medicine.antibiotic + "</p>" +
                    "<p>Start Date: " + medicine.start_date + "</p>" +
                    "<p>End Date: " + medicine.end_date + "</p>" +
                    "<p>Dose: " + medicine.dose + "</p>" +
                    "<p>Frequency: " + medicine.frequency + "</p>" +
                "</div>";
            contentElement.html(html);
        }
    },

    populateMedicineOptions: function(callback) {
        var self = this;
        var promises = [];
        promises.push(self.getAntibiotics());
        promises.push(self.getDoses());
        promises.push(self.getFrequencies());

        Promise.all(promises).then(function(result){
            callback();
        });
    },

    getAntibiotics: function() {
        var self = this;
        var url = 'antibiotics.json';
        var promise = new Promise(function(resolve, reject){
            AjaxHelper.getRequest(url, function(result) {
                $('#medicine-antibiotic').empty();
                if (result) {
                    self.populateAntibiotics(result);
                }
                resolve(true);
            });
        });

        return promise;
    },

    populateAntibiotics: function(antibiotics) {
        var length = antibiotics.length;
        const selector = '#medicine-antibiotic';
        $(selector).empty();
        const emptyHtml = '<option value="" data-id="0">Please choose one.</option>';
        $(selector).append(emptyHtml);
        for (let i = 0; i < length; i++) {
            const name = antibiotics[i].name;
            const html = '<option value="' + name +'">' + name + '</option>'
            $(selector).append(html);
        }
        $(selector).selectmenu('refresh');

    },

    getDoses: function() {
        var self = this;
        var url = 'doses.json'
        var promise = new Promise(function(resolve, reject){
            AjaxHelper.getRequest(url, function(result) {
                $('#medicine-dose').empty();
                if (result) {
                    self.populateDoses(result);
                }
                resolve(true);
            });
        });

        return promise;
    },

    populateDoses: function(doses) {
        var length = doses.length;
        const selector = '#medicine-dose';
        $(selector).empty();
        const emptyHtml = '<option value="" data-id="0">Please choose one.</option>';
        $(selector).append(emptyHtml);
        for (let i = 0; i < length; i++) {
            const name = doses[i].name;
            const html = '<option value="' + name +'">' + name + '</option>'
            $(selector).append(html);
        }
        $(selector).selectmenu('refresh');
    },

    getFrequencies: function() {
        var self = this;
        var url = 'frequencies.json'
        var promise = new Promise(function(resolve, reject){
            AjaxHelper.getRequest(url, function(result) {
                $('#medicine-frequency').empty();
                if (result) {
                    self.populateFrequencies(result);
                }
                resolve(true);
            });
        });

        return promise;
    },

    populateFrequencies: function(frequencies) {
        var length = frequencies.length;
        const selector = '#medicine-frequency';
        $(selector).empty();
        const emptyHtml = '<option value="" data-id="0">Please choose one.</option>';
        $(selector).append(emptyHtml);
        for (let i = 0; i < length; i++) {
            const name = frequencies[i].name;
            const html = '<option value="' + name +'">' + name + '</option>'
            $(selector).append(html);
        }
        $(selector).selectmenu('refresh');
    },

    clearMedicineOptions: function() {
        $('#medicine-antibiotic').val('');
        $('#medicine-dose').val('');
        $('#medicine-frequency').val('');

        $('#medicine-antibiotic').empty();
        $('#medicine-dose').empty();
        $('#medicine-frequency').empty();

        $('#medicine-antibiotic').selectmenu('refresh');
        $('#medicine-dose').selectmenu('refresh');
        $('#medicine-frequency').selectmenu('refresh');
    },

    clearEventData: function() {
        State.eventObj = {};
    },

    setEventData: function(eventData) {
        State.eventObj = eventData;
    }
};
