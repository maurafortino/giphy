//api key: aQEvZ74gOggHnrCQS90ssi2MrjIcEwIg
var topics = ["john mulaney", "dave chapelle", "ali wong", "tig notaro"];
var currentOffset = 0;
var currentLimit = 10;

function displayGif() {
    clearGifs();
    var searchTerm = $(this).attr("data-person");
    console.log(searchTerm);
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=aQEvZ74gOggHnrCQS90ssi2MrjIcEwIg&q=" + searchTerm + "&limit=" + currentLimit + "&offset=" + currentOffset;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        for(var i = currentOffset; i < response.data.length; i++){
            var newDiv = $("<div>")
            var newFigure = $("<figure>");
            var newFigCaption = $("<figcaption>");
            var gif = $("<img src=" + response.data[i].images.fixed_width_still.url + ">");
            newDiv.addClass("col-12 col-md-4 text-center");
            newFigure.addClass("figure");
            gif.addClass("gif");
            gif.attr("data-still", response.data[i].images.fixed_width_still.url);
            gif.attr("data-animate", response.data[i].images.fixed_width.url);
            gif.attr("data-state", "still");
            newFigCaption.addClass("figure-caption");
            newFigCaption.html("<span> Title: " + response.data[i].title + "</span> <br>"
            + "<span>Rating: " + response.data[i].rating.toUpperCase() + "</span>");
            newFigure.append(gif, newFigCaption);
            newDiv.append(newFigure)
            $("#gifs").append(newDiv);
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
        newButton.addClass("button rounded");
        newButton.attr("data-person", topics[i]);
        $("#buttons").append(newButton);
    };
    var clearButton = $("<button>");
    clearButton.text("Clear Gifs");
    clearButton.addClass("clear rounded");
    clearButton.attr("onclick", "clearGifs()");
    $("#buttons").append(clearButton);
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

function get_joke_of_the_day() {
    var queryURL = "https://api.jokes.one/jod?category=animal";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        var questionDiv = $("<div>");
        questionDiv.text(response.contents.jokes[0].joke.text);
        $("#joke").append(questionDiv);

    })
};
get_joke_of_the_day();







