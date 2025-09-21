$(document).ready(function () {
  $("#start").click(function () {
    $("#sonicRun")[0].play();
    $("img").animate({ left: "900px" }, 3000);
  });
});
