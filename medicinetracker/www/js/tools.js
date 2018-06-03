var Tools = {
    populateForm: function(form, data) {
        form.find("input").each(function(){
            var key = $(this).attr('name');
            $(this).val(data[key]);
        });
    },

    getFormJSONData: function(formSelector) {
        const formElement = $(formSelector);
        let data = {};
        $(formElement).find('input').each(function(){
            const name = $(this).attr('name');
            data[name] = $(this).val();
        });
        $(formElement).find('select').each(function(){
            const name = $(this).attr('name');
            data[name] = $(this).val();
        });
        const jsonData = JSON.stringify(data);

        return jsonData;
    }
};
