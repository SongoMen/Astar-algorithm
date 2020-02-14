let moving;
let currentPoint;
let currentPointSvg;
document.body.onmousedown = function(x) {
  let target = x.path[0];
  if (
    !target.classList.contains("block") &&
    !target.classList.contains("row") &&
    target.classList.value !== "" &&
    !target.tagName !== "SPAN"
  ) {
    moving = true;
  } else mousedown = true;
};
document.body.onmouseup = function() {
  moving = false;
  mousedown = false;
};

const remove = el => el.parentElement.removeChild(el);

function movePoints(svgClass, blockClass) {
  $(svgClass).on("mousedown", function mouseState(e) {
    currentPoint = blockClass;
    currentPointSvg = svgClass;
    let elY, elX;
    if (e.type == "mousedown") {
      $(".block").on("mousemove", function(e) {
        if (moving && !doing) {
          doing = true;
          let x = e.pageX;
          let y = e.pageY;
          let counter = 0;
          let stack = [];
          let elementMouseIsOver = document.elementFromPoint(x, y);

          while (counter < 1) {
            stack.push(elementMouseIsOver);
            elementMouseIsOver.style.pointerEvents = "none";
            elementMouseIsOver = document.elementFromPoint(x, y);
            if (elementMouseIsOver.classList.contains("row")) {
              elY = elementMouseIsOver.classList.value
                .split("-")[1]
                .split(" ")[0];
            }
            if (elementMouseIsOver.classList.contains("block")) {
              elX = elementMouseIsOver.classList.value
                .split("-")[1]
                .split(" ")[0];
            }
            counter++;
          }
          var i = 0,
            il = counter;
          for (; i < il; i += 1) {
            stack[i].style.pointerEvents = "";
          }
          if (typeof elY !== "undefined" && typeof elX !== "undefined") {
            let targetBlock = document.querySelector(
              `.row-${elY} .block-${elX}`,
            );
            if (
              !targetBlock.classList.contains("ending") ||
              !targetBlock.classList.contains("starting")
            ) {
              remove(document.querySelector(currentPointSvg));
              $(".block").removeClass(currentPoint);
              targetBlock.classList.add(currentPoint);
              if (currentPoint === "starting") {
                targetBlock.innerHTML = `<span></span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="startingsvg"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
                startY = elY;
                startX = elX;
              } else {
                targetBlock.innerHTML = `<span></span><svg class="endingsvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 20.9l4.95-4.95a7 7 0 1 0-9.9 0L12 20.9zm0 2.828l-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/></svg>`;
                endY = elY;
                endX = elX;
              }
            }
          }
        } else {
          doing = false;
          return "";
        }
      });
    }
  });
}
movePoints(".startingsvg", "starting");
movePoints(".endingsvg", "ending");
