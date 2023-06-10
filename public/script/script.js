// $(document).ready(function () {
//     $("#submit").on("submit", function () {
//         let query = $("#search").val();
//         console.log(query);
//         $.post("/result", 
//         {search: query},
//         function (data, status) {
//             console.log(data);
//         });
//     });
// });


$(document).ready(function () {
    $("#search").on("change keyup paste", function () {
        let query = $("#search").val();
        $.post("/suggestion", 
        {search: query},
        function (data, status) {
            console.log(data);
        });
    });
});
