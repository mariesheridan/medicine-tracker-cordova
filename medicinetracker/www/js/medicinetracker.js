// function MedicineTracker() {
//
//     var MedicineTracker = {
//       patients: [],
//
//       startApp: function() {
//           var self = this;
//           var url = 'https://polar-reaches-96790.herokuapp.com/patients.json';
//
//           $.ajax({
//               url: url,
//               async: true,
//               success: function (result) {
//                   self.patients = result;
//                   self.populatePatientList(result);
//               },
//               error: function (request,error) {
//                   alert('Network error has occurred please try again!');
//               }
//           });
//       },
//
//       populatePatientList: function(result){
//           $.each(result, function(i, row) {
//               $('#patient-list').append('<li><a href="" data-id="' + row.id + '"><h3>' + row.name + '</h3></a></li>');
//           });
//           $('#patient-list').listview('refresh');
//       }
//     }
//
//     return MedicineTracker;
// };

$(document).on('pagecreate', '#patients', function(){
  var self = this;
  var url = 'https://polar-reaches-96790.herokuapp.com/patients.json';

  $.ajax({
      url: url,
      async: true,
      success: function (result) {
          ajax.populatePatientList(result);
      },
      error: function (request,error) {
          alert('Network error has occurred please try again!');
      }
  });
});

$(document).on('pagebeforeshow', '#events', function(){
    $('#event-list').empty();
    // $.each(patients, function(i, row) {
    //     if(row.id == movieInfo.id) {
    //         $('#event-list').append('<li>Title: '+row.original_title+'</li>');
    //         $('#event-list').listview('refresh');
    //     }
    // });
});

// $(document).on('tap', '#movie-list li a', function(){
//     movieInfo.id = $(this).attr('data-id');
//     $( ":mobile-pagecontainer" ).pagecontainer( "change", "#headline", { transition: "slide", changeHash: false } );
// });
//
var patients = []

var ajax = {
  populatePatientList: function(result){
      patients = result;
      $.each(result, function(i, row) {
          $('#patient-list').append('<li><a href="#" data-id="' + row.id + '"><h3>' + row.name + '</h3></a></li>');
      });
      $('#patient-list').listview('refresh');
  }
}
