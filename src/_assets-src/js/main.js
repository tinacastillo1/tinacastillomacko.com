//main js

$(function(){
  
  //Primary Navigation
  // ------------------------
  //

  var menuIcon = $('.mobile-btn');
  
  //Open and close the menu on click
  menuIcon.on('click touch', function(e){

    if (menuIcon.attr('data-state') == 'inactive'){
      //make the button active and change the icon
      menuIcon.attr('data-state', 'active');
      $('.mobile-btn > div').addClass('change');

      //open the primary navigation container
      $('.primary').slideDown();
      
    } else {
      //make the button inactive and change the icon
      menuIcon.attr('data-state', 'inactive');
      $('.mobile-btn > div').removeClass('change');

      //close the primary navigation container
      $('.primary').slideUp();
      
    }
    e.preventDefault;
    return false;
  });


});

