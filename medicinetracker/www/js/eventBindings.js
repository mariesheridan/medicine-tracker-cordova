$(document).ready(function(){
    $('#edit-patient-form').submit(function(e){
        e.preventDefault();
        Patients.sendPatientForm();
    });

    $('#edit-event-form').submit(function(e){
        e.preventDefault();
        Events.sendEventForm(State.patientID, State.eventID);
    });

    $('#edit-medicine-form').submit(function(e){
        e.preventDefault();
        Medicines.sendMedicineForm(State.patientID, State.medicineID);
    });

    $('.delete-btn').off('click');
    $('.delete-btn').on('click', function(e){
        const type = $(this).data('type');
        switch (type) {
            case "patient":
                Patients.deletePatient(State.patientObj.id, State.patientObj.name);
                break;
            case "event":
                Events.deleteEvent(State.patientObj.id, State.eventObj.id, State.eventObj.reaction);
                break;
            case "medicine":
                Medicines.deleteMedicine(State.patientObj.id, State.medicineObj.id, State.medicineObj.antibiotic);
                break;
            default:
                console.log("Deleting unsupported type");
        }
    });
});

$(document).on('pagebeforecreate', '#patients', function(){

});

$(document).on('pagebeforeshow', '#patients', function(){
    Patients.getPatients();
});

$(document).on('pagebeforeshow', '#edit-patient', function(){
    const formSelector = '#edit-patient-form';
    if (State.patientID) {
        Tools.populateForm(formSelector, State.patientObj);
    }
});

$(document).on('pagebeforeshow', '#events', function(){
    State.eventID = 0;
    $('#event-list').listview('refresh');
});

$(document).on('pagebeforeshow', '#edit-event', function(){
    const formSelector = '#edit-event-form';
    const form = $(formSelector);
    form.hide();

    Events.populateEventOptions(function(){
        if (State.eventID) {
            Tools.populateForm(formSelector, State.eventObj);
            Events.setReactionsDropdown(State.organs, function(){
                Tools.updateSelectValue('#event-reaction', State.eventObj.reaction);
                form.show();
            });
        } else {
            form.show();
        }
    });
});

$(document).on('pagebeforehide', '#edit-event', function(){
    Events.clearEventOptions();
});

$(document).on('pagebeforeshow', '#medicines', function(){
    State.medicineID = 0;
    $('#medicine-list').listview('refresh');
});

$(document).on('pagebeforeshow', '#edit-medicine', function(){
    const formSelector = '#edit-medicine-form';
    const form = $(formSelector);
    form.hide();

    Medicines.populateMedicineOptions(function(){
        if (State.medicineID) {
            Tools.populateForm(formSelector, State.medicineObj);
        }
        form.show();
    });
});

$(document).on('pagebeforehide', '#edit-medicine', function(){
    Medicines.clearMedicineOptions();
});
