$(document).ready(function(){
    $('#edit-patient-form').submit(function(e){
        e.preventDefault();
        Patients.sendPatientForm();
    });
});

$(document).on('pagebeforecreate', '#patients', function(){

});

$(document).on('pagebeforeshow', '#patients', function(){
    Patients.getPatients();
});

$(document).on('pagebeforeshow', '#edit-patient', function(){
    var form = $("#edit-patient-form");
    var id = form.data("id");
    if (id !== "0") {
        Tools.populateForm(form, State.patientObj);
    }
});

$(document).on('pagebeforeshow', '#events', function(){
    $('#event-list').listview('refresh');
});

$(document).on('pagebeforeshow', '#medicines', function(){
    $('#medicine-list').listview('refresh');
});
