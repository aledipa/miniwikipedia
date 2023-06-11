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

function complete() {
    let query = $("#suggestion").html();
    $("#search").val(query);
    $("#suggestionArrow").hide();
    $("#suggestion").hide();
}

$(document).ready(function () {
    $("#search").on("change keyup paste", function () {
        let query = $("#search").val();
        $.post("/suggestion", 
        {search: query},
        function (data, status) {
            console.log(data[0].suggestion);
            // Checks if the data is not null
            if (data[0].suggestion != null) {
                $("#suggestion").html(data[0].suggestion);
                $("#suggestionArrow").show();
                $("#suggestion").show();
            } else {
                $("#suggestionArrow").hide();
                $("#suggestion").hide();
            }
        });
    });

    $("#suggestionSection").on("click", function () {
        complete();
    });

    $("#search").on("keydown", function (e) {
        if (e.keyCode == 9) {
            complete();
        }
    });
});
