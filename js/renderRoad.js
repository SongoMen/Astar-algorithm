var graph = new Graph(board)
let doing = false;

/*
 * handles starting algorithm and other staff like cleaning grid or changing button text
 */

function search() {
    if (!doing) {
        document.getElementById("btn").innerHTML = "Loading...";
        doing = true
        $('.area .block').removeClass("road");
        $('.area .block').removeClass("visited");
        var graph = new Graph(board)

        var start = graph.grid[startX][startY];
        var end = graph.grid[endX][endY];

        var result = astar.search(graph, start, end);
        let check
        check = setInterval(checkAstar,100)
        
        function checkAstar(){
            if(done){
                getRoad(result)
            }
        }

        /*
         * adds classes to road and visited blocks, changes distance and button text, clears interval 
         */

        function getRoad(result){
            for (let i = 0; i < result.length; i++) {
                setTimeout(() => {
                    document.querySelector(`.row-${result[i].y} .block-${result[i].x}`).classList.remove("visited")
                    document.querySelector(`.row-${result[i].y} .block-${result[i].x}`).classList.add("road")
                }, 20 * i);
            }
            document.getElementById("allBlocks").innerHTML = "Distance in blocks: " + result.length
            setTimeout(() => {
                doing = false
                document.getElementById("btn").innerHTML = "Visualize";
            }, 20 * result.length);
            done = false
            clearInterval(check)
        }
    }
}


