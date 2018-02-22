  // Script for showing and hiding elements on the page
$(document).ready(function(){
  $('.nav a').click(function(e){
    clickNav.bind(this)(e);
    //Hide all navLinks, show on click

    //Needed to close document ready function
    return false;
  });

  $('.song').click(function(e){
    //TODO  
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

  $('#search').submit(function(e) {

    e.preventDefault();
    e.stopPropagation();
    // useless go to the lowest context where searchTerm is defined --> global
    var searchTerm = $(this).children("input").val();
    console.log(searchTerm);

    
    //getYoutube(searchTerm);    
    return false;
  })

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
    event.target.playVideo
  }

  //Update Script
  function renderSong(songId) {
      
    $.getJSON('apitesting/data.json', function(data){
      var chordsDirectory = "/apitesting/";
      chordsDirectory = chordsDirectory.concat(data.songs[songId].chords);
      $('#songChords').load(chordsDirectory);
      $('.lyricTitle').text(data.songs[songId].name);
      $('#songInformation').html(nl2br(data.songs[songId].info));
      $('#lyricText').html(nl2br((data.songs[songId].lyrics)));
      $('#videoPlayer').prop("src", data.songs[songId].videoURL);
      $('#songImages').attr("src", data.songs[songId].albumArt);
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
