$(function() {
    $("#start_date").MonthPicker({ StartYear: 2020, ShowIcon: false, SelectedMonth: 1, MonthFormat: 'MM'  });
    
    $("#end_date").MonthPicker({ StartYear: 2020, ShowIcon: false, SelectedMonth: 12, MonthFormat: 'MM'  });

    $('#start_date').MonthPicker('option', 'OnAfterChooseMonth', function(){ 
        var minMonth = $('#start_date').MonthPicker('GetSelectedMonth');

        $('#end_date').MonthPicker('option', 'SelectedMonth', minMonth + 1);

     } );

    $("#filter_submit").on('click', ()=> {
        //getter
        var minMonth = $('#start_date').MonthPicker('GetSelectedMonth');
        var maxMonth = $('#end_date').MonthPicker('GetSelectedMonth');

        if (maxMonth <= minMonth) {
            alert('Enter a valid month range.');
            return;
        }

        console.log(minMonth);
        console.log(maxMonth);
    });
});