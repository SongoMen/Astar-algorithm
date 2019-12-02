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

for(let i =0;i<height;i++){
    let row = document.createElement("div");
    row.className = `row-${i} row`;
    for(let b=0;b<width;b++){
        let block = document.createElement("div");
        row.appendChild(block);
        block.className = `block`;
        block.id = `block-${b}`
        block.onclick=function(){
            this.className="block wall";
            console.log("x")

        }
    }
    document.getElementById("area").appendChild(row)
}   
