//api key: aQEvZ74gOggHnrCQS90ssi2MrjIcEwIg
var buttons = ["john mulaney", "dave chapelle", "ali wong", "tig notaro"];

function displayGif() {
    var searchTerm = $(this).attr("data-person");
    console.log(searchTerm);
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=aQEvZ74gOggHnrCQS90ssi2MrjIcEwIg&q=" + searchTerm + "&limit=10&offset=0";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        clearGifs();
        for(var i = 0; i < response.data.length; i++){
            var gif = $("<img src=" + response.data[i].images.fixed_height.url + ">");
            $("#gifs").append(gif);
        }

    });
};

function clearGifs(){
    $("#gifs").empty();
}

function createButtons(){
    $("#buttons").empty();
    for (var i = 0; i < buttons.length; i++) {
        var newButton = $("<button>").text(buttons[i]);
        newButton.addClass("button");
        newButton.attr("data-person", buttons[i]);
        $("#buttons").append(newButton);
    };
}

$(document).on("click", ".button", displayGif);
createButtons();
var clearButton = $("<button>");
clearButton.text("Clear Gifs");
clearButton.attr("onclick", "clearGifs()");
$("#buttons").append(clearButton);






