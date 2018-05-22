var Report = {
    createReport: function(medicines, events) {
        var container = $('#report').find('.content-holder').first()[0];
        const MedicineGroupID = 1;
        const EventGroupID = 2;

        // var items = new vis.DataSet([
        //     {id: 1, content: 'item 1', start: '2013-04-20 08:00'},
        //     {id: 2, content: 'item 2', start: '2013-04-20 07:00'},
        //     {id: 3, content: 'item 3', start: '2013-04-18'},
        //     {id: 4, content: 'item 4', start: '2013-04-16', end: '2013-04-19'},
        //     {id: 5, content: 'item 5', start: '2013-04-25'},
        //     {id: 6, content: 'item 6', start: '2013-04-27'}
        // ]);

        var itemsArray = [];
        var idCounter = 1;

        var medicinesLength = medicines.length;
        for (var i = 0; i < medicinesLength; i++) {
            var medicine = {
                id: idCounter++,
                content: medicines[i].antibiotic,
                start: medicines[i].start_date,
                end: medicines[i].end_date,
                group: MedicineGroupID
            };
            itemsArray.push(medicine);
        }

        var eventsLength = events.length;
        for (var i = 0; i < eventsLength; i++) {
            var event = {
                id: idCounter++,
                content: events[i].organ + ": " + events[i].reaction,
                start: events[i].event_date,
                group: EventGroupID
            };
            itemsArray.push(event);
        }

        var items = new vis.DataSet(itemsArray);

        var groups = [
            {
                id: MedicineGroupID,
                content: "Medicines"
            },
            {
                id: EventGroupID,
                content: "Events"
            }
        ];

        var options = {
            editable: false
        };

        var timeline = new vis.Timeline(container, items, groups, options);
    }
};
