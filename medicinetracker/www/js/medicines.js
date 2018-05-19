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
        // $('#medicine-list').listview('refresh');

        // $('.medicine-item').off('click');
        // $('.medicine-item').on('click', function(){
        //     var patientID = $(this).data('id');
        //     self.displayPatient(patientID);
        // });
    },
};
