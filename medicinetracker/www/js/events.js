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
            State.eventID = eventID;
            self.displayEvent(eventID);
        });
    },

    sendEventForm: function(patientID, eventID) {
        var formElement = $("#edit-event-form");
        let data = {};
        $(formElement).find('input').each(function(){
            const name = $(this).attr('name');
            data[name] = $(this).val();
        });
        $(formElement).find('select').each(function(){
            const name = $(this).attr('name');
            data[name] = $(this).val();
        });
        var jsonData = JSON.stringify(data);

        if (!eventID) {
            var url = 'patients/' + patientID + '/events.json';
            AjaxHelper.postRequest(url, jsonData, function(result){
                if (result) {
                    alert(name + " has been created successfully.");
                }
                Patients.getPatientItems(patientID, function(){
                    $.mobile.navigate('#events');
                });
            });
        } else {
            var url = 'patients/' + patientID + '/events/' + eventID + '.json';
            AjaxHelper.putRequest(url, jsonData, function(result){
                if (result) {
                    alert(name + " has been updated successfully.");
                }
                Patients.getPatientItems(patientID, function(){
                    $.mobile.navigate('#events');
                });
            });
        }
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
        promises.push(self.getSeverities());

        Promise.all(promises).then(function(result){
            callback();
        });
    },

    getOrgans: function() {
        var self = this;
        var url = 'organs.json'
        var promise = new Promise(function(resolve, reject){
            AjaxHelper.getRequest(url, function(result) {
                $('#event-organ').empty();
                if (result) {
                    self.populateOrgans(result);
                    self.bindOrganOptions();
                }
                resolve(true);
            });
        });

        return promise;
    },

    populateOrgans: function(organs) {
        var length = organs.length;
        const selector = '#event-organ';
        $(selector).empty();
        const emptyHtml = '<option value="" data-id="0">Please choose one.</option>';
        $(selector).append(emptyHtml);
        for (let i = 0; i < length; i++) {
            const name = organs[i].name;
            const organID = organs[i].id;
            const html = '<option value="' + name +'" data-id="' + organID + '">' + name + '</option>'
            $(selector).append(html);
        }
        $(selector).selectmenu('refresh');

        if ($(selector).val() === "") {
            const selectOrgan = '<option value="" data-id="0">Please select organ first.</option>';
            $('#event-reaction').empty();
            $('#event-reaction').append(selectOrgan);
            $('#event-reaction').selectmenu('refresh');
        }
    },

    bindOrganOptions: function() {
        var self = this;
        $('#event-organ').off('change');
        $('#event-organ').on('change', function(){
            const value = $(this).val();
            const organID = $(this).find('option[value="' + value + '"]').first().data('id');
            $('#event-reaction').val('');
            self.getReactions(organID);

            $('#event-organ').selectmenu('refresh');
        });
    },

    getReactions: function(organID) {
        var self = this;
        var url = 'organs/' + organID +'/reactions.json'
        var promise = new Promise(function(resolve, reject){
            AjaxHelper.getRequest(url, function(result) {
                $('#event-reaction').empty();
                if (result) {
                    self.populateReactions(result);
                }
                resolve(true);
            });
        });

        return promise;
    },

    populateReactions: function(reactions) {
        var length = reactions.length;
        const selector = '#event-reaction';
        $(selector).empty();
        const emptyHtml = '<option value="" data-id="0">Please choose one.</option>';
        $(selector).append(emptyHtml);
        for (let i = 0; i < length; i++) {
            const name = reactions[i].name;
            const html = '<option value="' + name +'">' + name + '</option>'
            $(selector).append(html);
        }
        $(selector).selectmenu('refresh');
    },

    getSeverities: function() {
        var self = this;
        var url = 'severities.json'
        var promise = new Promise(function(resolve, reject){
            AjaxHelper.getRequest(url, function(result) {
                $('#event-severity').empty();
                if (result) {
                    self.populateSeverities(result);
                }
                resolve(true);
            });
        });

        return promise;
    },

    populateSeverities: function(severities) {
        var length = severities.length;
        const selector = '#event-severity';
        $(selector).empty();
        const emptyHtml = '<option value="" data-id="0">Please choose one.</option>';
        $(selector).append(emptyHtml);
        for (let i = 0; i < length; i++) {
            const name = severities[i].name;
            const html = '<option value="' + name +'">' + name + '</option>'
            $(selector).append(html);
        }
        $(selector).selectmenu('refresh');
    },

    clearEventOptions: function() {
        $('#event-organ').val('');
        $('#event-reaction').val('');
        $('#event-severity').val('');

        $('#event-organ').empty();
        $('#event-reaction').empty();
        $('#event-severity').empty();

        $('#event-organ').selectmenu('refresh');
        $('#event-reaction').selectmenu('refresh');
        $('#event-severity').selectmenu('refresh');
    }
};
