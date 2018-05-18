$(document).on('pagecreate', '#patients', function(){
  var url = tools.getURL('patients.json');

  $.ajax({
      url: url,
      async: true,
      success: function (result) {
          tools.populatePatientList(result);
      },
      error: function (request,error) {
          alert('Network error has occurred please try again!');
      }
  });
});

$(document).on('pagebeforeshow', '#events', function(){
    $('#event-list').empty();
});
