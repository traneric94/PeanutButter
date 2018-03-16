// Writing a string matcher to go through the json data file and find
// the song that matches the input
function searchCleaner(string) {
  return string.toLowerCase().replace(/[<>#!$%^&*(),.\[\]\"@\'\s]/gi, '');
}

//Changes lyric format to html appropriate format (takes all newlines in javascript language and changes them to html language <br> breaks)
function nl2br(str, is_xhtml) {
  var breakTag =
    is_xhtml || typeof is_xhtml === 'undefined' ? '<br />' : '<br>';
  return (str + '').replace(
    /([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,
    '$1' + breakTag + '$2'
  );
}

// function getYoutube (searchTerm) {
//   var params = {
//     'maxResults' : '1',
//     'q' : searchTerm,
//     'type' : 'video',
//     'videoEmbeddable' : true,
//     'part' : 'snippet'
//   };
//   buildApiRequest('GET', '/youtube/v3/search', params);
// }

// Script for showing and hiding elements on the page
$(document).ready(function() {
  $('.nav a').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    $('.navLink').hide();
    $($(this).attr('data-element')).show();
    //Hide all navLinks, show on click

    //Needed to close document ready function
    return false;
  });

  $('.song').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    $('.navLink').hide();
    var elem = $(this).attr('data-element');
    $(elem).show();

    //Hide all navLinks, show on click
    var songSelected = $(this).attr('id');
    renderSong(songSelected);

    socket.emit('messages', { song: songSelected });

    //Needed to close document ready function
    return false;
  });

  $('#submit').click(function(e) {
    e.preventDefault();
    e.stopPropagation();
    var searchTerm = $('#inputSong').value();
    searchTerm = searchCleaner(searchTerm);
    $.getJSON('json/data.json', function(data) {
      // Checks to see if song was found
      for (i = 0; i < data.songs.length; i++) {
        var compare = searchCleaner(data.songs[i].name);
        if (searchTerm.localeCompare(compare) == 0) {
          renderSong(i);
          $('#notFound').hide();
          $('.navLink').hide();
          $('#searchingDetail').text('');
          $('#karaokeContent').show();
          // $('#Searching').text("Recent Searches");
          return;
        }
      }
      // song wasn't found
      $('#Searching').text('Sorry, Song Not Available.');
      $('#searchingDetail').text('Check spelling or browse library');
    }); //End of json get request
  }); //End of search function

  //Youtube Player script
  $('<script>')
    .attr('src', 'https://www.youtube.com/iframe_api')
    .appendTo($('head'));
});

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('videoPlayer', {
    events: {
      onReady: playerCallback,
    },
  });
}

function playerCallback(event) {
  //event.target.playVideo();
  // Script for play and pause buttons

  $('#play-button').click(function() {
    socket.emit('messages', { play: true });
    player.playVideo();
  });

  // ga('create', 'UA-114581555-1', 'auto');
  // ga("send", "event", 'play_pause', 'click');

  $('#pause-button').click(function() {
    socket.emit('messages', { pause: true });
    player.pauseVideo();
  });

  // ga('create', 'UA-114581555-1', 'auto');
  // ga("send", "event", 'play_pause', 'click');
  // });
}

//Update Script
function renderSong(songId) {
  $.getJSON('json/data.json', function(data) {
    var song = data.songs[songId];
    var chords = $('<pre>').text(song.chords);
    $('#songChords').html(chords);
    $('#songInformation').html(nl2br(song.info));
    $('#lyricText').html(nl2br(song.lyrics));
    $('#songImages').attr('src', song.albumArt);
    $('#videoPlayer').prop(
      'src',
      data.songs[songId].videoURL + '?enablejsapi=1'
    );

    //Show currently playing elements
    $('.currentlyPlaying').show();
    $('#currentlyPlayingText').text(
      'Currently Playing: ' + song.name + ' - ' + song.artist
    );
    $('.lyricTitle').text(song.name);
  });
}

var socket = io.connect(location.href);

// When users join, master sends Hello
socket.on('connect', function(data) {
  //sent from client to server
  // socket.emit('join', 'New client joined');
});

socket.on('broad', function(data) {
  console.log('received', data);
  //server to client
  if (data.song) {
    renderSong(data.song);
  } else if (data.play) {
    player.playVideo();
  } else if (data.pause) {
    player.pauseVideo();
  }
});

/*Script for authentication*/
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  $('#welcome').html('Welcome back, ' + profile.getGivenName());
}

/*Script for sign out*/
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function() {
    console.log('User signed out.');
    $('#welcome').html('');
  });
}
