// Script for showing and hiding elements on the page
$(document).ready(function(){
  $('.nav a').click(function(e){
    e.preventDefault();
    e.stopPropagation();
    $('.navLink').hide();
    $($(this).attr('data-element')).show();
    return false;
  });
  $(".song").click(songClicked);
  function songClicked(e) {
    var songSelected = $(this).attr("id");
    renderSong(songSelected);
  }
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
  function renderSong(songName) {
  function nl2br (str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
  }

  $.getJSON('apitesting/shakira.json', function(data){
    $('#lyricText').html(nl2br(data[songName]));
  });
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
