//api key: aQEvZ74gOggHnrCQS90ssi2MrjIcEwIg
var topics = ["john mulaney", "dave chapelle", "ali wong", "tig notaro"];

function displayGif() {
    var searchTerm = $(this).attr("data-person");
    var currentOffset = 0;
    console.log(searchTerm);
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=aQEvZ74gOggHnrCQS90ssi2MrjIcEwIg&q=" + searchTerm + "&limit=10&offset=" + currentOffset;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        clearGifs();
        for(var i = 0; i < response.data.length; i++){
            var newFigure = $("<figure>");
            var newFigCaption = $("<figcaption>");
            var gif = $("<img src=" + response.data[i].images.fixed_width_still.url + ">");
            newFigure.addClass("figure");
            gif.addClass("gif");
            gif.attr("data-still", response.data[i].images.fixed_width_still.url);
            gif.attr("data-animate", response.data[i].images.fixed_width.url);
            gif.attr("data-state", "still");
            newFigCaption.addClass("figure-caption");
            newFigCaption.text("Rating: " + response.data[i].rating);
            newFigure.append(gif, newFigCaption);
            $("#gifs").append(newFigure);
        }

    });
};
function animate(){
    var state = $(this).attr("data-state");
    if(state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }else{
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
}
function clearGifs(){
    $("#gifs").empty();
}

function createButtons(){
    $("#buttons").empty();
    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>").text(topics[i]);
        newButton.addClass("button");
        newButton.attr("data-person", topics[i]);
        $("#buttons").append(newButton);
    };
}

$("#submit").on("click", function(event){
    event.preventDefault();
    var inputText = $("#input-field").val();
    topics.push(inputText);

    createButtons();
})

$(document).on("click", ".button", displayGif);
$(document).on("click",".gif", animate);
createButtons();
var clearButton = $("<button>");
clearButton.text("Clear Gifs");
clearButton.attr("onclick", "clearGifs()");
$("#buttons").append(clearButton);






