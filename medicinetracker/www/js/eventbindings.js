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
    console.log("FIRED: edit-patient pagecontainerbeforeshow");
});

$(document).on('pagebeforeshow', '#events', function(){
    $('#event-list').empty();
});
