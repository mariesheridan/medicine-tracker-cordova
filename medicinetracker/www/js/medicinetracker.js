function MedicineTracker() {

    var MedicineTracker = {
      patients: [],

      startApp: function() {
          var self = this;
          var url = 'https://polar-reaches-96790.herokuapp.com/patients.json';

          $.ajax({
              url: url,
              async: true,
              success: function (result) {
                  self.patients = result;
                  self.populatePatientList(result);
              },
              error: function (request,error) {
                  alert('Network error has occurred please try again!');
              }
          });
      },

      populatePatientList: function(result){
          $.each(result, function(i, row) {
              $('#patient-list').append('<li><a href="" data-id="' + row.id + '"><h3>' + row.name + '</h3></a></li>');
          });
          $('#patient-list').listview('refresh');
      }
    }

    return MedicineTracker;
};


// $(document).on('pagebeforeshow', '#headline', function(){
//     $('#movie-data').empty();
//     $.each(movieInfo.result, function(i, row) {
//         if(row.id == movieInfo.id) {
//             $('#movie-data').append('<li><img src="https://image.tmdb.org/t/p/w300_and_h450_bestv2'+row.poster_path+'"></li>');
//             $('#movie-data').append('<li>Title: '+row.original_title+'</li>');
//             $('#movie-data').append('<li>Release date'+row.release_date+'</li>');
//             $('#movie-data').append('<li>Popularity : '+row.popularity+'</li>');
//             $('#movie-data').append('<li>Popularity : '+row.vote_average+'</li>');
//             $('#movie-data').listview('refresh');
//         }
//     });
// });
//
// $(document).on('tap', '#movie-list li a', function(){
//     movieInfo.id = $(this).attr('data-id');
//     $( ":mobile-pagecontainer" ).pagecontainer( "change", "#headline", { transition: "slide", changeHash: false } );
// });
//
// var patients = []
//
// var ajax = {
//
// }
