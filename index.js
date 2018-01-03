$(document).ready(function() {
  var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];
  var url = "https://api.twitch.tv/kraken/streams/";
  var usersURL = "https://api.twitch.tv/kraken/users/";
  var clientID = "?client_id=85wunzjkzg30oeii8ys1353kry28pm";

  //loop through array of twitch users
  for (var i = 0; i < users.length; i++) {
    //retrieves streaming data
   $.ajax ({
    type: "GET",
    url: url + users[i] + clientID,
    async: false,
    dataType: "json",
    success: function(data) {
      //offline players
      if (data.stream === null) {
      $('#results_online').append('<a class="text-center offline list-group-item" id="' + users[i] + '" href="https://twitch.tv/' + users[i] + '" target="_blank">' + users[i] + '</a>');
      }
      //online players
      else if (data.stream.hasOwnProperty("stream_type")) {
        $('#results_online').prepend('<a class="text-center online list-group-item" href="https://twitch.tv/' + data.stream.channel.display_name + '" target="_blank">' + data.stream.channel.display_name + ' is currently playing: ' + data.stream.game + '</a>');
      }
    }
  })
    //checks /users/ endpoint for deleted/non-existent accounts
 $.ajax({
   type: "GET",
   url: usersURL + users[i] + clientID,
   async: false,
   dataType: "json",
   error: function() {
     //changs the li for accounts that don't exist
     $('#' + users[i] + '').replaceWith('<li class="text-center no-account list-group-item">' + users[i] + ' can\'t be found</li>');
   }
 })

  }//for loop
});//end of input for document.ready
