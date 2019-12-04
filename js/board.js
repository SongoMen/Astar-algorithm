function renderArea() {
  let headerHeight = document.getElementById("header").clientHeight,
    body = document.body,
    html = document.documentElement;

  let height = Math.floor(
    (Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    ) -
      headerHeight) /
      26
  );

  let width = Math.floor(document.body.clientWidth / 25);

  for (let i = 0; i < height; i++) {
    let row = document.createElement("div");
    row.className = `row-${i} row`;
    for (let b = 0; b < width; b++) {
      let block = document.createElement("div");
      row.appendChild(block);
      block.className = `block`;
      block.id = `block-${b}`;
      block.onclick = function() {
        if (this.className === "block wall") {
          this.className = "block";
        } else {
          this.className = "block wall";
        }
      };
    }
    document.getElementById("area").appendChild(row);
  }
}
renderArea();

//build walls on hold mouse button

$(".block").on("mousedown mouseup", function mouseState(e) {
  if (e.type == "mousedown"){
    $(document).on("mouseover", ".block", function(e) {
      if (this.className === "block wall") {
        this.className = "block";
      } else if (this.className === "block") {
        this.className = "block wall";
      }
    });
  }
  else{
    $(document).off("mouseover")
  }
});
