$(document).ready(function () {
    // Global Variable
    var topics = ["Diablo 3", "Resident Evil", "Devil May Cry"];

    // Displays buttons 
    function renderButtons() {

        $("#videoGame-btns").empty();

        for (i = 0; i < topics.length; i++) {
            var newButton = $("<button>");
            newButton.addClass("game-btns");
            newButton.attr("data-name", topics[i]);
            newButton.text(topics[i]);
            $("#videoGame-btns").append(newButton);
        }
    };

    // Displays ten gifs for that topic when button is clicked
    $(document).on("click", ".game-btns", function () {

        $("#games-view").empty();

        var game = $(this).attr("data-name");
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" +
            game + "&api_key=NgUh9E3QByW58L8xhE7BMiDMSDn7i3O3&limit=10";

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            console.log(queryUrl);
            console.log(response);

            var result = response.data;

            for (var i = 0; i < result.length; i++) {

                var gameDiv = $("<div>").addClass("game-imgs");
                var titleP = $("<p> Title: " + result[i].title + "</p>");
                gameDiv.append(titleP);
                var ratingP = $("<p> Rating: " + result[i].rating + "</p>");
                gameDiv.append(ratingP);

                var image = $("<img>");
                var gameImage = image.attr({
                    "src": result[i].images.fixed_height_still.url,
                    "class": "game-gif",
                    "data-state": "still",
                    "data-still": result[i].images.fixed_height_still.url,
                    "data-animate": result[i].images.fixed_height.url
                });
                gameDiv.prepend(gameImage);

                $("#games-view").prepend(gameDiv);
            }

        });

    });

    // animates gif when it is clicked and resets it to still if it is clicked when animated
    $(document).on("click", ".game-gif", function () {
        var state = $(this).attr("data-state");
        console.log(state);
        if (state === "still") {
            $(this).attr("data-state", "animate")
            $(this).attr("src", $(this).attr("data-animate"));
        }
        else {
            $(this).attr("data-state", "still")
            $(this).attr("src", $(this).attr("data-still"));
        };
    });

    // adds new button when user inputs something into the textbox and submits it
    $("#add-game").on("click", function (event) {
        event.preventDefault();
        var newGame = $("#game-input").val().trim();
        topics.push(newGame);
        console.log(topics);
        renderButtons();
    });

    // renders the initial buttons when the html loads
    renderButtons();

});