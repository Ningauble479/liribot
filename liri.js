require("dotenv").config();

var Spotify = require("node-spotify-api");

var keys = require("./keys");

var axios = require("axios");

var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var artistName = function(artist) {
    return artist.name
}

var spotifySearch = function(songName){
    if (songName === undefined) {
        songName = "Schism"
    }

    spotify.search(
        {
            type: 'track',
            query: songName
        },
        function(err, data) {
            if (err){
                console.log('nowork :c')
                return
            }
            var songs = data.tracks.items
            for (i=0;i<songs.length;i++){
                console.log(i)
                console.log('artist' + songs[i].artists.map(artistName))
                console.log('song' + songs[i].name)
                console.log('preview' + songs[i].preview_url)
                console.log('album' + songs[i].album.name)
            }
        }
    )
}

var getBands = function(artist){

    var qurl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"


    axios.get(qurl).then(
        function(data){
        
        for(i=0;i<data.data.length;i++){
            console.log('Concert Info UwU')
            console.log('name: '+data.data[i].venue.name)
            console.log('country: '+data.data[i].venue.country)
            console.log('state/region: '+data.data[i].venue.region)
            console.log('city: '+data.data[i].venue.city)
            console.log('date: '+data.data[i].datetime.substring(0, 10))
            console.log('----------------------')
        }
    }
    )

}

var getMovie = function(movieName) {
    if (movieName === undefined) {
        movieName = "Alien";
      }

      var qURL = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

      axios.get(qURL).then(
          function(data){
              console.log('Title: '+ data.data.Title)
              console.log('Year: '+data.data.Year)
              console.log('Rating: '+data.data.Rated)
              console.log('Released: '+data.data.Released)
              console.log('Runtime: '+data.data.Runtime)
              console.log('Genre: '+data.data.Genre)
              console.log('(If its not Ridley Scott it doesnt matter)Director: '+data.data.Director)
              for(i=0;i<data.data.Ratings.length; i++){
              console.log('Company: '+ data.data.Ratings[i].Source + ' Score: '+ data.data.Ratings[i].Value)
              }
          }
      )


}

var doWhatItSays = function(){
    fs.readFile("random.txt", "utf8", function(error, data) {
        console.log(data);
    
        var dataArr = data.split(",");
    
        if (dataArr.length === 2) {
          pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length === 1) {
          pick(dataArr[0]);
        }
      });
}


var pick = function(caseData, functionData) {
    switch (caseData) {
    case "concert-this":
      getBands(functionData);
      break;
    case "spotify-this-song":
      spotifySearch(functionData);
      break;
    case "movie-this":
      getMovie(functionData);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("LIRI doesn't know that");
    }
  };


  var runThis = function(argOne, argTwo){
    pick(argOne, argTwo)
  }

  runThis(process.argv[2], process.argv.slice(3).join(" "));