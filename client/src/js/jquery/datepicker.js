$(function() {
    $("#start_date").datepicker(
    {
        changeMonth: true,
        changeYear: true,
        maxDate: -1,
        onSelect: () => {
            $("#end_date").datepicker("setDate", new Date($(this).datepicker("getDate")));
        }
    }
    );
    
    $("#end_date").datepicker(
    {
        changeMonth: true,
        changeYear: true,
        maxDate: -1
    }
    );

    $("#filter_submit").on('click', ()=> {
        console.log($("#start_date").datepicker("getDate"));
        console.log($("#end_date").datepicker("getDate"));
    });
});