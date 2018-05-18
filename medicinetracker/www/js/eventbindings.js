$(document).ready(function(){

});

$(document).on('pagebeforecreate', '#patients', function(){

});

// $(document).on('pagecreate', '#patients', function(){
//     console.log('FIRED: patients pagecreate');
//     tools.getPatients();
// });

$(document).on('pagebeforeshow', '#patients', function(){
    console.log('FIRED: patients pagecontainerbeforeshow');
    tools.getPatients();
});

$(document).on('pagebeforeshow', '#edit-patient', function(){
    $("#edit-patient-form").hide();
    console.log("FIRED: edit-patient pagecontainerbeforeshow");
    tools.getCSRFToken('patients/new', function(success){
        $("#edit-patient-form").show();
    });
});

$(document).on('pagebeforeshow', '#events', function(){
    $('#event-list').empty();
});
