var Tools = {
    populateForm: function(formSelector, data) {
        $(formSelector).find('input').each(function(){
            const key = $(this).attr('name');
            const value = data[key];
            if ($(this).attr('type') === 'datetime-local') {
                const date = moment(value, 'YYYY-MM-DDTHH:mm').format('YYYY-MM-DDTHH:mm');
                $(this).val(date);
            } else {
                $(this).val(value);
            }
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
    },

    getMaxDate: function(moments) {
        let maxDate = moment.max(moments)
        return maxDate;
    },

    getMinDate: function(moments) {
        let minDate = moment.min(moments)
        return minDate;
    }
};
