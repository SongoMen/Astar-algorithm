let moveStart = false;
let moveEnd = false;

$(".starting").on("mousedown mouseup", function mouseState(e) {
  if (e.type == "mousedown") {
    $(document).on("mouseover", ".block", function(e) {
      console.log(this);
      let row = $(this)
        .parent()[0]
        .classList.value.split("-")[1]
        .split(" ")[0];
      let col = this.classList.value.split("-")[1].split(" ")[0];
      if (
        mousedown &&
        !this.classList.contains("ending") &&
        !this.classList.contains("starting")
      ) {
        if (this.classList.contains("wall")) {
          this.classList.remove("wall");
          board[col][row] = 1;
        } else {
          board[col][row] = 0;
          this.classList.add("wall");
        }
      }
    });
  } else {
    $(document).off("mousedown mouseup");
  }
});

document.addEventListener(
  "mousemove",
  function(ev) {
      console.log(ev)
    document.querySelector(".startingsvg").style.transform =
      "translateY(" + (ev.clientY - 80) + "px)";
    document.querySelector(".startingsvg").style.transform +=
      "translateX(" + (ev.clientX - 100) + "px)";
  },
  false,
);
