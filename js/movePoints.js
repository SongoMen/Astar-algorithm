const remove = el => el.parentElement.removeChild(el);

function moveHandler(svgClass, blockClass) {
  $("." + svgClass).on("mousedown mouseup", function mouseState(e) {
    let elY, elX;
    if (e.type == "mousedown") {
      let icon = document.querySelector("." + svgClass);
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
          let targetBlock = document.querySelector(`.row-${elY} .block-${elX}`);
          if (!targetBlock.classList.contains("ending")) {
            console.log(document.querySelector("." + svgClass));
            remove(icon);
            $(".block").removeClass(blockClass);
            targetBlock.classList.add(blockClass);
            if (blockClass === "starting") {
              targetBlock.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class=${svgClass}><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
            } else {
              targetBlock.innerHTML = `<svg class=${svgClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 20.9l4.95-4.95a7 7 0 1 0-9.9 0L12 20.9zm0 2.828l-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/></svg>`;
            }
            //console.log(elY, elX);
          }
        }
      });
    } else {
      $(".area").off("mousemove");
    }
  });
}
moveHandler("startingsvg", "starting");
moveHandler("endingsvg", "ending");
