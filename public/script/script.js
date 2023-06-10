$(document).ready(function () {
    $("#submit").click(function () {
        let query = $("#search").val();
        console.log(query);
        $.post("/summary", 
        {search: query},
        function (data, status) {
            console.log(data);
            });
    });
 });


 $(document).ready(function () {
    $("#search").on( "focus", function () {
       $.post("/suggestion", 
        {search: "supe"},
        function (data, status) {
            console.log(data);
         });
    });
 });
