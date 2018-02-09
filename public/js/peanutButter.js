
// reveals list of links when clicked
$(".collapse").click(reveal);

/*
*  Function that reveals text when clicked
*/
function reveal(){
  //Prevent page from reloading
  event.preventDefault();
  console.log("Toggling menu");
  $(this).find('ul').toggle();
}
