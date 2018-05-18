$(document).ready(function(){
    $('#edit-patient-form').submit(function(e){
        e.preventDefault();
    });
});

$(document).on('pagebeforecreate', '#patients', function(){

});

$(document).on('pagebeforeshow', '#patients', function(){
    Patients.getPatients();
});

$(document).on('pagebeforeshow', '#edit-patient', function(){
    $("#edit-patient-form").hide();
    Tools.getCSRFToken('patients/new', function(success){
        $("#edit-patient-form").show();
    });
});

$(document).on('pagebeforeshow', '#events', function(){
    $('#event-list').empty();
});
