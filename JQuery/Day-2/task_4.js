$(function () {
  $("#imageContainer").draggable({
    drag: function (event, ui) {
      var circleOffset = $("#circle").offset();
      var imageOffset = ui.offset;
      var circleRadius = $("#circle").width() / 2;

      var distance = Math.sqrt(
        Math.pow(
          imageOffset.left +
            $("#circle")[0].clientWidth / 2 -
            (circleOffset.left + circleRadius),
          2
        ) +
          Math.pow(
            imageOffset.top +
              $("#circle")[0].clientHeight / 2 -
              (circleOffset.top + circleRadius),
            2
          )
      );

      if (distance > circleRadius) {
        $("#image").effect("shake", { times: 4 }, 1000);
      }

      if (distance <= circleRadius) {
        $("#image").stop();
      }
    },
  });

  $("#circle").droppable({
    drop: function (event, ui) {
      var imageOffset = ui.draggable.offset();
      var circleOffset = $(this).offset();
      var circleRadius = $(this).width() / 2;

      var distance = Math.sqrt(
        Math.pow(imageOffset.left - circleOffset.left, 2) +
          Math.pow(imageOffset.top - circleOffset.top, 2)
      );

      if (circleRadius >= distance) {
        $("#circle").css("background-color", "green");
        ui.draggable.hide();
      }
    },
  });
});
