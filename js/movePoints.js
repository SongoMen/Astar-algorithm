const remove = el => el.parentElement.removeChild(el);

$(".startingsvg").on("mousedown mouseup", function mouseState(e) {
  let elY, elX;
  console.log(e.type);
  if (e.type == "mousedown") {
    console.log("x2");
    let mydiv1 = document.querySelector(".startingsvg");
    $(".area").on("mousemove", function(e) {
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
          elY = elementMouseIsOver.classList.value.split("-")[1].split(" ")[0];
        }
        if (elementMouseIsOver.classList.contains("block")) {
          elX = elementMouseIsOver.classList.value.split("-")[1].split(" ")[0];
        }
        counter++;
      }

      var i = 0,
        il = counter;

      for (; i < il; i += 1) {
        stack[i].style.pointerEvents = "";
      }
	          if (typeof elY !== "undefined" && typeof elX !== "undefined") {

      let targetBlock = document.querySelector(`.row-${elY} .block-${elX}`);
      if (!targetBlock.classList.contains("ending")) {
        remove(document.querySelector(".startingsvg"));
        $(".block").removeClass("starting");

          targetBlock.classList.add("starting");
          targetBlock.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="startingsvg"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
        
        //console.log(elY, elX);

        mydiv1.style.top = y - 15 + "px";
        mydiv1.style.left = x - 10 + "px";
        startY = elY;
        startX = elX;
      }
			  }
    });
  } else {
    console.log("x");
    $(".area").off("mousemove");
  }
});
