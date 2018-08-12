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
        self.clearEventData();
        $('#event-list').empty();
        $.each(events, function(i, row) {
            var html =
                '<li>' +
                    '<a class="event-item" href="#view-event" data-id="' + row.id + '">' +
                        '<h3>' + row.reaction + '</h3>' +
                        '<p>Organ: ' + row.organ + '</p>' +
                        '<p>Date: ' + moment(row.event_date, 'YYYY-MM-DDTHH:mm').format('YYYY-MM-DD HH:mm') + '</p>' +
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
        var self = this;
        const formSelector = '#edit-event-form';
        const jsonData = Tools.getFormJSONData(formSelector);
        const reaction = $(formSelector).find('[name="reaction"]').first().val();
        const navigateToPage = '#events';

        if (!eventID) {
            var url = 'patients/' + patientID + '/events.json';
            AjaxHelper.postRequest(url, jsonData, function(result){
                if (result) {
                    navigator.notification.alert(
                        reaction + " has been created successfully.",
                        function() {
                            self.loadPatientItemsAndNavigateToPage(patientID, navigateToPage);
                        },
                        "Alert",
                        "Close"
                    );
                } else {
                    self.loadPatientItemsAndNavigateToPage(patientID, navigateToPage);
                }
            });
        } else {
            var url = 'patients/' + patientID + '/events/' + eventID + '.json';
            AjaxHelper.putRequest(url, jsonData, function(result){
                if (result) {
                    navigator.notification.alert(
                        reaction + " has been updated successfully.",
                        function() {
                            self.loadPatientItemsAndNavigateToPage(patientID, navigateToPage);
                        },
                        "Alert",
                        "Close"
                    );
                } else {
                    self.loadPatientItemsAndNavigateToPage(patientID, navigateToPage);
                }
            });
        }
    },

    loadPatientItemsAndNavigateToPage: function(patientID, page) {
        Patients.getPatientItems(patientID, function(){
            $.mobile.navigate(page);
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
            this.setEventData(event);
            var html =
                "<div>" +
                    "<p>ID: " + event.id + "</p>" +
                    "<p>Reaction: " + event.reaction + "</p>" +
                    "<p>Organ: " + event.organ + "</p>" +
                    "<p>Date: " + moment(event.event_date, 'YYYY-MM-DDTHH:mm').format('YYYY-MM-DD HH:mm') + "</p>" +
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
        var url = 'organs.json';
        State.organs = [];
        var promise = new Promise(function(resolve, reject){
            AjaxHelper.getRequest(url, function(result) {
                $('#event-organ').empty();
                if (result) {
                    State.organs = result;
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

        this.setReactionsDropdown(organs, function(){});
    },

    setReactionsDropdown: function(organs, callback) {
        const selector = '#event-organ';
        const selectedOrgan = $(selector).val();
        if (selectedOrgan === "") {
            const reactionSelector = '#event-reaction';
            const selectOrgan = '<option value="" data-id="0">Please select organ first.</option>';
            $(reactionSelector).empty();
            $(reactionSelector).append(selectOrgan);
            $(reactionSelector).selectmenu('refresh');
            callback();
        } else {
            const organ = organs.find(function(item){
                return item.name === selectedOrgan;
            });
            this.updateReactions(organ.id, callback);
        }
    },

    bindOrganOptions: function() {
        var self = this;
        $('#event-organ').off('change');
        $('#event-organ').on('change', function(){
            const value = $(this).val();
            const organID = $(this).find('option[value="' + value + '"]').first().data('id');
            $('#event-organ').selectmenu('refresh');
            $('#event-reaction').val('');
            self.updateReactions(organID);
        });
    },

    updateReactions: function(organID, callback) {
        let promises = [];
        promises.push(this.getReactions(organID));
        Promise.all(promises).then(function(result){
            $('#event-reaction').selectmenu('refresh');
            callback();
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
    },

    clearEventData: function() {
        State.eventObj = {};
    },

    setEventData: function(eventData) {
        State.eventObj = eventData;
    },

    deleteEvent: function(patientID, eventID, reaction) {
        var self = this;
        navigator.notification.confirm(
            "Delete " + reaction + "?",
            function() {
                const url = 'patients/' + patientID + '/events/' + eventID + ".json";
                AjaxHelper.deleteRequest(url, {}, function(result){
                    const navigateToPage = '#events';
                    navigator.notification.alert(
                        reaction + " has been deleted successfully.",
                        function() {
                            self.loadPatientItemsAndNavigateToPage(patientID, navigateToPage);
                        },
                        "Alert",
                        "Close"
                    );
                });
            },
            'Confirm',
            ['Delete', 'Cancel']
        );
    }
};
