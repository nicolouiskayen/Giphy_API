
var animals = ["Cat", "Dog", "Fish"];


function renderButtons() {
    $('#buttons-view').empty();
    for (var i = 0; i < animals.length; i++) {
        var $button = $("<button>");
        $button.addClass("button");
        $button.attr("data-name", animals[i]);
        $button.text(animals[i]);
        $("#buttons-view").append($button);

    }
    $("button").on("click", function () {
        var query = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            query + "&api_key=e9cDjnQOUSpF46bVzeTe521FtdLJ9PHs&limit=10";
        $.ajax({
            method: "GET",
            url: queryURL
        })
            .then(function (response) {
                var results = response.data;
                console.log(results)
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                

                  

                
                    var $animalImage = $("<img>");
                    $animalImage.attr("src", results[i].images.fixed_height_small.url);

                    $animalImage.attr("data-still", results[i].images.fixed_height_small_still.url)
                    $animalImage.attr("data-animate", results[i].images.fixed_height_small.url);
                    $animalImage.attr("data-state", "animate")
                    $animalImage.addClass("gif")

                    gifDiv.prepend(p);
                    gifDiv.prepend($animalImage);
                    $("#gifs-appear-here").prepend(gifDiv);
                }
                $(".gif").on("click", function () {
                    var state = $(this).attr("data-state")

                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"))
                        $(this).attr("data-state", "animate")
                    } else if (state === "animate") {
                        $(this).attr("src", $(this).attr("data-still"))
                        $(this).attr("data-state", "still")
                    }

                });
            });

    });
}
$("#add-animal").on("click", function (event) {
    event.preventDefault();
    var animal = $("#animal-input").val().trim();
    animals.push(animal);
    renderButtons();
    $("#animal-input").empty();
});






renderButtons();