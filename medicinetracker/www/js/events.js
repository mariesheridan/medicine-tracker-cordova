var Events = {
    getEvents: function(patientID) {
        var self = this;
        var url = 'patients/' + patientID + '/events.json'
        var promise = new Promise(function(resolve, reject){
            AjaxHelper.getRequest(url, function(result) {
                if (result) {
                    resolve(result);
                } else {
                    resolve([]);
                }
            });
        });

        return promise;
    },

    populateEventList: function(events) {
        var self = this;
        $('#event-list').empty();
        $.each(events, function(i, row) {
            var html =
                '<li>' +
                    '<a class="event-item" href="#view-event" data-id="' + row.id + '">' +
                        '<h3>' + row.reaction + '</h3>' +
                        '<p>Organ: ' + row.organ + '</p>' +
                        '<p>Date: ' + row.event_date + '</p>' +
                        '<p>Severity: ' + row.severity + '</p>' +
                    '</a>' +
                '</li>';

            $('#event-list').append(html);
        });

        $('.event-item').off('click');
        $('.event-item').on('click', function(){
            var eventID = $(this).data('id');
            self.displayEvent(eventID);
        });
    },

    displayEvent: function(id) {
        var contentElement = $('#view-event').find('.content-holder').first();
        contentElement.empty();
        var events = State.patientObj.events;
        var event = events.find(function(item){
            return item.id === id;
        });

        if (event)
        {
            var html =
                "<div>" +
                    "<p>ID: " + event.id + "</p>" +
                    "<p>Reaction: " + event.reaction + "</p>" +
                    "<p>Organ: " + event.organ + "</p>" +
                    "<p>Date: " + event.event_date + "</p>" +
                    "<p>Severity: " + event.severity + "</p>" +
                "</div>";
            contentElement.html(html);
        }
    },
};
