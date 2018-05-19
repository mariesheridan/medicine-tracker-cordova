var Events = {
    populateEventList: function(events) {
        var self = this;
        $('#event-list').empty();
        $.each(events, function(i, row) {
            var html =
                '<li>' +
                    '<a class="event-item" href="#view-event" data-id="' + row.id + '">' +
                        '<h3>' + row.reaction + '</h3>' +
                        '<p>Organ: ' + row.organ + '</p>' +
                        '<p>Date: ' + row.event_Date + '</p>' +
                        '<p>Severity: ' + row.severity + '</p>' +
                    '</a>' +
                '</li>';

            $('#event-list').append(html);
        });
        // $('#event-list').listview('refresh');

        // $('.medicine-item').off('click');
        // $('.medicine-item').on('click', function(){
        //     var patientID = $(this).data('id');
        //     self.displayPatient(patientID);
        // });
    },
};
