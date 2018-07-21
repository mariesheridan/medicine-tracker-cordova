var Report = {
    createReport: function(medicines, events) {
        google.charts.load('current', {'packages':['timeline']});
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {
            var contentHolder = $('#report').find('.timeline').first();
            contentHolder.empty();
            var container = contentHolder[0];
            var chart = new google.visualization.Timeline(container);
            var dataTable = new google.visualization.DataTable();
            var options = {
                width: 2500,
                timeline: {
                    groupByRowLabel: false
                }
            };

            dataTable.addColumn({ type: 'string', id: 'ItemType' });
            dataTable.addColumn({ type: 'string', id: 'Title' });
            // dataTable.addColumn({ type: 'string', role: 'tooltip' });
            dataTable.addColumn({ type: 'date', id: 'Start' });
            dataTable.addColumn({ type: 'date', id: 'End' });

            var medicinesLength = medicines.length;
            for (var i = 0; i < medicinesLength; i++) {
                const start = moment(medicines[i].start_date, 'YYYY-MM-DD');
                const end = moment(medicines[i].end_date, 'YYYY-MM-DD').toDate();
                const duration = moment.duration(start.diff(end)).humanize();
                // const tooltip = "<div>Duration: " + duration + "</div>";
                var medicine = [
                    'Medicine',
                    medicines[i].antibiotic,
                    // tooltip,
                    moment(medicines[i].start_date, 'YYYY-MM-DD').toDate(),
                    moment(medicines[i].end_date, 'YYYY-MM-DD').toDate()
                ];
                dataTable.addRow(medicine);
            }

            var eventsLength = events.length;
            for (var i = 0; i < eventsLength; i++) {
                const date = moment(events[i].event_date, 'YYYY-MM-DDTHH:mm');
                // const tooltip = "Date and Time: " + date.format("YYYY-MM-DD HH:mm");
                var event = [
                    'Event',
                    events[i].organ + ": " + events[i].reaction,
                    // tooltip,
                    date.toDate(),
                    date.add(1, 'hour').toDate()
                ];
                dataTable.addRow(event);
            }

            chart.draw(dataTable, options);
        }
    }
};
