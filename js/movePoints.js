function elementsAtLocation(x, y) {
  var stack = [],
    el;
  let b = 0;
  do {
    el = document.elementFromPoint(x, y);
    stack.push(el);
    el.classList.add("pointerEventsNone");
    b++;
  } while (b < 10);
  console.log(el.tagName);
  // clean up
  for (var i = 0; i < stack.length; i += 1)
    stack[i].classList.remove("pointerEventsNone");

  return stack;
}
let moveStart = false;
let moveEnd = false;

$(".starting").on("mousedown mouseup", function mouseState(e) {
  if (e.type == "mousedown") {
    console.log("x2");
    let mydiv1 = document.querySelector(".startingsvg");
    $(".startingsvg").on("mousemove", function(e) {
      let x = e.pageX;
      let y = e.pageY;
      let elY, elX;
        let counter = 0;
            let stack = [];
       let elementMouseIsOver = document.elementFromPoint(x, y);


      while (elementMouseIsOver.tagName !== "HTML") {
      stack.push(elementMouseIsOver)
        elementMouseIsOver.style.pointerEvents = "none";
        elementMouseIsOver = document.elementFromPoint(x, y);
        if (elementMouseIsOver.classList.contains("row")) {
          console.log(elementMouseIsOver.classList.value);
          elY = elementMouseIsOver.classList.value.split("-")[1].split(" ")[0];
        }
        if (elementMouseIsOver.classList.contains("block")) {
          elX = elementMouseIsOver.classList.value.split("-")[1].split(" ")[0];
        }
          counter++
      }
      console.log( document.querySelector(
        `.row-${elY} .block-${elX}`,
      ));
      document.querySelector(
        `.row-${elY} .block-${elX}`,
      ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="startingsvg"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
      /* Now clean it up */

      var i = 0,
        il = counter

      for (; i < il; i += 1) {
        stack[i].style.pointerEvents = "";
      }
      mydiv1.style.top = y - 15 + "px";
      mydiv1.style.left = x - 10 + "px";
    });
  } else {
    console.log("x");
    $(".startingsvg").off("mousemove");
  }
});
