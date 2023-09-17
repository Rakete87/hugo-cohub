$(document).ready(function () {
    "use strict";
    //Copyright Date
    // var newYear = document.getElementById("newYear");
    // newYear.innerHTML = new Date().getFullYear();
    
    // Scroll to top
    $("a[href='#top']").click(function () {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        "slow"
      );
      return false;
    });
  
    // Smooth scroll
    $("a.scroll-to").on("click", function (event) {
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $(this.hash).offset().top - 50,
          },
          1000
        );
      event.preventDefault();
      if (screen.width < 992) {
        $(".navbar-toggler").click();
      }
    });
  
    // AOS initialize
    AOS.init({
      disable: "mobile",
    });
  
  });