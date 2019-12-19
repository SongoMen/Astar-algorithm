var graph = new Graph(board)
let doing = false;
function search() {
    if (!doing) {
        doing = true
        $('.block').removeClass("road");
        $('.block').removeClass("visited");
        var graph = new Graph(board)

        var start = graph.grid[startX][startY];
        var end = graph.grid[endX][endY];

        var result = astar.search(graph, start, end);

        let check = () => setInterval(()=>{
            if(done){
                getRoad(result)
                clearInterval(check)
            }
        },100)
        check()
        
    }
}

function getRoad(result){
    for (let i = 0; i < result.length + 1; i++) {
        setTimeout(() => {
            document.querySelector(`.row-${result[i].y} .block-${result[i].x}`).classList.remove("visited")
            document.querySelector(`.row-${result[i].y} .block-${result[i].x}`).classList.add("road")
        }, 20 * i);
    }
    document.getElementById("allBlocks").innerHTML = result.length
    setTimeout(() => {
        doing = false
    }, 50 * result.length);
}

