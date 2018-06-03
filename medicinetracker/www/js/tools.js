var Tools = {
    populateForm: function(formSelector, data) {
        $(formSelector).find('input').each(function(){
            const key = $(this).attr('name');
            $(this).val(data[key]);
        });
        $(formSelector).find('select').each(function(){
            const key = $(this).attr('name');
            $(this).val(data[key]);
            $(this).selectmenu('refresh');
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
    },

    updateSelectValue: function(selector, value) {
        let selectElement = $(selector);
        selectElement.val(value);
        selectElement.selectmenu('refresh');
    }
};
