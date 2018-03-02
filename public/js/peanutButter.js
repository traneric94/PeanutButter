  // Script for showing and hiding elements on the page
$(document).ready(function(){
  $('.nav a').click(function(e){
    clickNav.bind(this)(e);
    //Hide all navLinks, show on click

    //Needed to close document ready function
    return false;
  });

  $('.song').click(function(e){
    clickNav.bind(this)(e);
    //Hide all navLinks, show on click
    var songSelected = $(this).attr("id");
    renderSong(songSelected);

    //Needed to close document ready function
    return false;
  });

  function clickNav(e) {
    e.preventDefault();
    e.stopPropagation();
    $('.navLink').hide();
    $($(this).attr('data-element')).show();
  }

  $('#submit').click(function(e){
    // useless go to the lowest context where searchTerm is defined --> global
    //var searchTerm = $(this).children("input").val();
    var searchTerm = document.getElementById("inputSong").value;
    //getYoutube(searchTerm);
    // Writing a string matcher to go through the json data file and find
    // the song that matches the input
    var foundSong = false;

    $.getJSON('apitesting/data.json', function(data){

      for(i = 0; i < (data.songs).length; i++){
        if(searchTerm.localeCompare(data.songs[i].name) == 0){
          renderSong(i);
          foundSong = true;
          $('#notFound').hide();
          $('#Searching').text("Recent Searches");
          $('#searchingDetail').text("")

        }
      }
      // Checks to see if song was found
      if(!foundSong){
        $('#Searching').text("Song Not Available");
        $('#searchingDetail').text("Check spelling or browse library")
      }

    }); //End of json get request
  }); //End of search function

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
});


  //Youtube Player script
  var tag = document.createElement("Script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("Script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  function onYouTubeIframeAPIReady() {
      player = new YT.Player('videoPlayer', {
        events : {
          "onReady" : readyToPlay
        }
      });
  }
  function readyToPlay(event) {
    //event.target.playVideo();

    // Script for play and pause buttons
    var playButton = document.getElementById("play-button");
    playButton.addEventListener("click", function() {
      player.playVideo();
    });

    var pauseButton = document.getElementById("pause-button");
    pauseButton.addEventListener("click", function() {
      player.pauseVideo();
    });
  }

  //Update Script
  function renderSong(songId) {

    $.getJSON('apitesting/data.json', function(data){
      var chordsDirectory = "/apitesting/";
      chordsDirectory = chordsDirectory.concat(data.songs[songId].chords);
      $('#songChords').load(chordsDirectory);
      $('#songInformation').html(nl2br(data.songs[songId].info));
      $('#lyricText').html(nl2br((data.songs[songId].lyrics)));
      $('#videoPlayer').prop("src", data.songs[songId].videoURL + '?enablejsapi=1');
      $('#songImages').attr("src", data.songs[songId].albumArt);
      //Hide jumbo elements
      $('.jumbo').hide();
      //Show currently playing elements
      $('.currentlyP').show();
      $('.lyricTitle').text(data.songs[songId].name);
  });

    //Changes lyric format to html appropriate format (takes all newlines in javascript language and changes them to html language <br> breaks)
  function nl2br (str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
  }

}

/* Script for Accordion Widgets*/
$(document).ready(function(){
    // Add minus icon for collapse element which is open by default
    $(".collapse.in").each(function(){
      $(this).siblings(".panel-heading").find(".glyphicon").addClass("rotate");
    });
    // Toggle plus minus icon on show hide of collapse element
    $(".collapse").on('show.bs.collapse', function(){
      $(this).parent().find(".glyphicon").addClass("rotate");
    }).on('hide.bs.collapse', function(){
      $(this).parent().find(".glyphicon").removeClass("rotate");
    });
});

/*Script for authentication*/
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  $('#welcome').html("Welcome back " + profile.getGivenName());

}

/*Script for sign out*/
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    $('#welcome').html("");
  });
}
