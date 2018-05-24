var Tools = {
    populateForm: function(form, data) {
        form.find("input").each(function(){
            var key = $(this).attr('name');
            $(this).val(data[key]);
        });
    }
};
