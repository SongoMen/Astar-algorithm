let width, height;
let doing = false;
let board = [];
let startY;
let startX;
let endY;
let endX;

/*
 * creates 2D array that represents grid for algorithm and renders block on page
 */

function renderArea() {
  doing = false;
  if (!doing) {
    document.getElementById("area").innerHTML = "";
    board = [];
    let headerHeight = document.getElementById("header").clientHeight,
      body = document.body,
      html = document.documentElement;

    height = Math.floor(
      (Math.max(
        body.scrollHeight,
        body.offsetHeight,
        html.clientHeight,
        html.scrollHeight,
        html.offsetHeight
      ) -
        headerHeight) /
        27
    );

    width = Math.floor(document.body.clientWidth / 27);

    // GENERATE GRID IN 2D ARRAY

    for (let i = 0; i < width; i++) {
      board[i] = [];
      for (let b = 0; b < height; b++) {
        board[i].push(1);
      }
    }

    for (let i = 0; i < height; i++) {
      let row = document.createElement("div");
      row.className = `row-${i} row`;
      for (let b = 0; b < width; b++) {
        let block = document.createElement("div");
        let span = document.createElement("span");
        span.innerHTML = "&nbsp;";
        row.appendChild(block);
        block.append(span);
        block.className = `block`;
        block.className += ` block-${b}`;
        block.onclick = function() {
          let row = $(this)
            .parent()[0]
            .classList.value.split("-")[1]
            .split(" ")[0];
          let col = this.classList.value.split("-")[1].split(" ")[0];
          if (
            !doing &&
            !this.classList.contains("ending") &&
            !this.classList.contains("starting")
          ) {
            if (this.classList.contains("wall")) {
              this.classList.remove("wall");

              board[col][row] = 1;
            } else {
              this.classList.add("wall");
              board[col][row] = 0;
            }
          }
        };
      }
      document.getElementById("area").appendChild(row);
    }
    renderPoints();
  }
}

/*
 * generates points on grid
 */

function renderPoints() {
  const positions = {
    start: { x: Math.floor(width / 5), y: Math.floor(height / 2) },
    end: { x: Math.floor(width / 1.3), y: Math.floor(height / 2) }
  };

  // start point

  document.querySelector(
    `.row-${positions.start.y} .block-${positions.start.x}`
  ).innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="startingsvg"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;

  document.querySelector(
    `.row-${positions.start.y} .block-${positions.start.x}`
  ).classList += " starting";

  document.querySelector(
    `.row-${positions.start.y} .block-${positions.start.x}`
  ).id += "starting";

  startY = positions.start.y;
  startX = positions.start.x;

  //end point

  document.querySelector(
    `.row-${positions.end.y} .block-${positions.end.x}`
  ).innerHTML = `<svg class="endingsvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 20.9l4.95-4.95a7 7 0 1 0-9.9 0L12 20.9zm0 2.828l-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728zM12 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 2a4 4 0 1 1 0-8 4 4 0 0 1 0 8z"/></svg>`;

  document.querySelector(
    `.row-${positions.end.y} .block-${positions.end.x}`
  ).classList += " ending";

  endY = positions.end.y;
  endX = positions.end.x;
}

renderArea();

/*
 * build walls while holding mouse button
 */

mousedown = false;
document.body.onmousedown = function() {
  mousedown = true;
};
document.body.onmouseup = function() {
  mousedown = false;
};

$(".block").on("mousedown mouseup", function mouseState(e) {
  if (e.type == "mousedown") {
    $(document).on("mouseover", ".block", function(e) {
      let row = $(this)
        .parent()[0]
        .classList.value.split("-")[1]
        .split(" ")[0];
      let col = this.classList.value.split("-")[1].split(" ")[0];
      if (
        !doing &&
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
  }
});
