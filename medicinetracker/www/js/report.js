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

            dataTable.addColumn({ type: 'string', id: 'ItemType' });
            dataTable.addColumn({ type: 'string', id: 'Title' });
            dataTable.addColumn({ type: 'date', id: 'Start' });
            dataTable.addColumn({ type: 'date', id: 'End' });

            var datesArray = [];

            const medicinesLength = medicines.length;
            for (var i = 0; i < medicinesLength; i++) {
                const start = moment(medicines[i].start_date, 'YYYY-MM-DD');
                const end = moment(medicines[i].end_date, 'YYYY-MM-DD');
                datesArray.push(start);
                datesArray.push(end);
                var medicine = [
                    'Medicine',
                    medicines[i].antibiotic,
                    start.toDate(),
                    end.toDate()
                ];
                dataTable.addRow(medicine);
            }

            const eventsLength = events.length;
            for (var i = 0; i < eventsLength; i++) {
                const date = moment(events[i].event_date, 'YYYY-MM-DDTHH:mm');
                datesArray.push(date);
                var event = [
                    'Event',
                    events[i].organ + ": " + events[i].reaction,
                    date.toDate(),
                    date.add(1, 'hour').toDate()
                ];
                dataTable.addRow(event);
            }

            let minDate = Tools.getMinDate(datesArray);
            let maxDate = Tools.getMaxDate(datesArray);
            let days = Math.ceil(moment.duration(maxDate.diff(minDate)).asDays()) + 1;
            let width = (days * 100) + 100;

            const options = {
                width: width,
                height: 400,
                timeline: {
                    groupByRowLabel: false,
                    colorByRowLabel: true
                }
            };

            chart.draw(dataTable, options);
        }
    }
};
