var fs = require('fs')

var command = process.argv[2];
var input = process.argv[3];

var keys = require("./keys.js");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var client = new Twitter(keys.twitterKeys);  
var spotify = new Spotify(keys.spotifyKeys);


switch (command) {
  case "my-tweets":
  tweets();
  break;

  case "spotify-this-song":
  songs();
  break;

  case "movie-this":
  movies();
  break;

  case "do-what-it-says":
  doWhatItSays();
  break;
}


function tweets() {
 
  var params = {screen_name: 'FireGarPax312'};
 
  client.get('statuses/user_timeline', params, function(error, tweets, response){
   
    if (!error) {
      for (var i = 0; i < 20; i++) {
       
        console.log("Tweet Date: " + tweets[i].created_at);
        console.log("Tweet Text: " + tweets[i].text);
       
        fs.appendFile("log.txt", "Tweet Date: " + tweets[i].created_at + "Text: " + tweets[i].text);
     
      }  
    }
  });
};

function songs() {
  
  spotify.search({ type: 'track', query: input || "Seven Nation Army" }, function(err, data) {
   
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
    console.log("Artist:" + data.tracks.items[0].artists[0].name);
    console.log("Song Name:" + data.tracks.items[0].name); 
    console.log("Album:" + data.tracks.items[0].album.name);
    console.log("Preview URL:" + data.tracks.items[0].preview_url);
   
    fs.appendFile('log.txt', "Artist:" + data.tracks.items[0].artists[0].name);
    fs.appendFile('log.txt', "Song Name:" + data.tracks.items[0].name);
    fs.appendFile('log.txt', "Album:" + data.tracks.items[0].album.name);
    fs.appendFile('log.txt', "Preview URL:" + data.tracks.items[0].preview_url);

  });
}

function movies() {
 
  request("http://www.omdbapi.com/?t="+ (input || "The Godfather") + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

  
  if (!error && response.statusCode === 200) {

    console.log("Movie Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomato Rating: " + JSON.parse(body).tomatoRating);
    console.log("Country of Origen: " + JSON.parse(body).Country);
    console.log("Plot Summary: " + JSON.parse(body).Plot);
    console.log("Main Actors: " + JSON.parse(body).Actors);
    console.log("Language: " + JSON.parse(body).Language);
    

    fs.appendFile("log.txt", "Movie Title: " + JSON.parse(body).Title);
    fs.appendFile("log.txt", "Release Year: " + JSON.parse(body).Year);
    fs.appendFile("log.txt", "IMDB Rating: " + JSON.parse(body).imdbRating);
    fs.appendFile("log.txt", "Rotten Tomato Rating: " + JSON.parse(body).tomatoRating);
    fs.appendFile("log.txt", "Country of Origen: " + JSON.parse(body).Country);
    fs.appendFile("log.txt", "Plot Summary: " + JSON.parse(body).Plot);
    fs.appendFile("log.txt", "Main Actors: " + JSON.parse(body).Actors);
    fs.appendFile("log.txt", "Language: " + JSON.parse(body).Language);
  }
});
}

function doWhatItSays() {
 
  fs.readFile("random.txt", "utf8", function(error, data) {
  
  var dataArr = data.split(",");
  var input = dataArr[1];
  
  function songs() {
   
    spotify.search({ type: 'track', query: input }, function(err, data) {
      
      if (err) {
        return console.log('Error occurred: ' + err);
      }


      console.log("Artist:" + data.tracks.items[0].artists[0].name);
      console.log("Song Name:" + data.tracks.items[0].name); 
      console.log("Album:" + data.tracks.items[0].album.name);
      console.log("Preview URL:" + data.tracks.items[0].preview_url);
      

      fs.appendFile("log.txt", "Artist:" + data.tracks.items[0].artists[0].name);
      fs.appendFile("log.txt", "Song Name:" + data.tracks.items[0].name);
      fs.appendFile("log.txt", "Album:" + data.tracks.items[0].album.name);
      fs.appendFile("log.txt", "Preview URL:" + data.tracks.items[0].preview_url);
   

    });
  }
  
  songs();
});
}
