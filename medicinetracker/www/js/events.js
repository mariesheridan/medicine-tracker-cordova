var Events = {
    getEvents: function(patientID) {
        var self = this;
        var url = 'patients/' + patientID + '/events.json'
        var promise = new Promise(function(resolve, reject){
            AjaxHelper.getRequest(url, function(result) {
                if (result) {
                    State.events = result;
                    resolve(result);
                } else {
                    State.events = [];
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
        var events = State.events;
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

    populateEventOptions: function(callback) {
        var self = this;
        var promises = [];
        promises.push(self.getOrgans());

        console.log('populateEventOptions');
        Promise.all(promises).then(function(result){
            callback();
        });
    },

    getOrgans: function() {
        console.log('getOrgans');
        var self = this;
        var url = 'organs.json'
        var promise = new Promise(function(resolve, reject){
            AjaxHelper.getRequest(url, function(result) {
                $('#event-organ').empty();
                if (result) {
                    self.populateOrgans(result);
                }
                console.log('getOrgans resolve called');
                resolve(true);
            });
        });

        return promise;
    },

    populateOrgans: function(organs) {
        var length = organs.length;
        const organValue = $('#event-organ').val();
        for (let i = 0; i < length; i++) {
            var name = organs[i].name;
            const selected = (organValue === name) ? 'selected' : '';
            console.log('populateOrgans: ' + name);
            var html = '<option value="' + name +'" ' + selected + '>' + name + '</option>'
            $('#event-organ').append(html);
        }
    },

    populateReactions: function(organID) {

    },

    populateSeverities: function() {

    },

    clearEventOptions: function() {
        $('#event-organ').val('');
        $('#event-reaction').val('');
        $('#event-severity').val('');
        $('#event-organ').empty();
        $('#event-reaction').empty();
        $('#event-severity').empty();
    }
};
