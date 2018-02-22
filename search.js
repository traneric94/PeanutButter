function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    'videoEmbeddable':'true',
    'type': 'video'
  });

  request.execute(function(response) {
    var id = response.result.items[0].id.videoId
    var url = 'https://www.youtube.com/embed/' + id
    console.log(response.result)
    $('#videoPlayer').attr('src', url)
  });
}