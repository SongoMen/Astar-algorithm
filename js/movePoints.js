let moveStart = false;
let moveEnd = false;

$(".starting").on("mousedown mouseup", function mouseState(e) {
  if (e.type == "mousedown") {
    let mydiv1 = document.querySelector(".startingsvg");
    $(".startingsvg").on("mousemove", function(e) {
      let x = e.pageX;
      let y = e.pageY;
      mydiv1.style.top = y - 15 + "px";
      mydiv1.style.left = x - 10 + "px";
    });
  } else {
    console.log("x");
    $(".starting").off("mousedown mouseup");
    $(".startingsvg").off("mousemove");
  }
});
