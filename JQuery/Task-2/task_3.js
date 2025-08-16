$(document).ready(function () {
  var angle = 0;
  var scale = 1;
  var $img = $("#image");
  
  $("img").on("transform", function () {
    $("img").css("transform", `rotate(${angle}deg) scale(${scale})`);
  });

  $("#rotateRight").on("click", function () {
    angle += 15;
    $img.trigger("transform");
  });

  $("#rotateLeft").on("click", function () {
    angle -= 15;
    $img.trigger("transform");
  });

  $("#scaleUp").on("click", function () {
    scale += 0.25;
    $img.trigger("transform");
  });

  $("#scaleDown").on("click", function () {
    scale -= 0.25;
    $img.trigger("transform");
  });
});
