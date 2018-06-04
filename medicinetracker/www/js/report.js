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
                start: moment(medicines[i].start_date, 'YYYY-MM-DD').format('YYYY-MM-DD 00:00'),
                end: moment(medicines[i].end_date, 'YYYY-MM-DD').format('YYYY-MM-DD 23:59'),
                group: MedicineGroupID
            };
            itemsArray.push(medicine);
        }

        var eventsLength = events.length;
        for (var i = 0; i < eventsLength; i++) {
            var event = {
                id: idCounter++,
                content: events[i].organ + ": " + events[i].reaction,
                start: moment(events[i].event_date, 'YYYY-MM-DDTHH:mm').format('YYYY-MM-DDTHH:mm'),
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

        const zoomMax = 7 * 24 * 60 * 60 * 1000;
        const zoomMin = 4 * 60 * 60 * 1000;

        var options = {
            align: 'left',
            editable: false,
            horizontalScroll: true,
            moveable: true,
            stack: true,
            zoomable: true,
            zoomMax: zoomMax,
            zoomMin: zoomMin
        };

        var timeline = new vis.Timeline(container, items, groups, options);
    }
};
