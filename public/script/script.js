// It completes the search
function complete() {
    let query = $("#suggestion").html();
    $("#search").val(query);
    $("#suggestionArrow").hide();
    $("#suggestion").hide();
}

// When the user types in the search bar, it will send a post request to the server
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
    // When the user clicks on the suggestion section, it will complete the search
    $("#suggestionSection").on("click", function () {
        complete();
    });
    // When the user presses the tab key, it will complete the search
    $("#search").on("keydown", function (e) {
        if (e.keyCode == 9) {
            complete();
        }
    });
});
