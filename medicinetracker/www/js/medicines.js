var Medicines = {
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
        var medicines = State.patientObj.medicines;
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
};
