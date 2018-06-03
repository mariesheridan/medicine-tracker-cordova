var Report = {
    createReport: function(medicines, events) {
        var contentHolder = $('#report').find('.content-holder').first();
        contentHolder.empty();
        var container = contentHolder[0];
        const MedicineGroupID = 1;
        const EventGroupID = 2;

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
            editable: false,
            timeAxis: {
                scale: 'minute',
                step: 30
            },
            zoomable: false,
            horizontalScroll: true,
            stack: true
        };

        var timeline = new vis.Timeline(container, items, groups, options);
    }
};
