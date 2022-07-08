let graph;
let choice;
let nodeValue;
let vertex;
let vertex1;
let edgeModel;
let srcModel;
let destModel;
let song;

// ui-draw start
function setup() {
  createCanvas(windowWidth * 0.85, windowHeight);
  noLoop();
  song = loadSound("assets/sounds/money.mp3");

  graph = new Graph(100, song);

  graph.addEdge(0, 1, 2, 200, 400, 300, 200);
  graph.addEdge(0, 3, 8, 200, 400, 300, 600);
  graph.addEdge(3, 2, 1, 300, 600, 350, 400);
  graph.addEdge(1, 2, 4, 300, 200, 350, 400);
  graph.addEdge(2, 7, 9, 350, 400, 600, 200);
  graph.addEdge(3, 4, 6, 300, 600, 450, 600);
  graph.addEdge(1, 7, 7, 300, 200, 600, 200);
  graph.addEdge(6, 7, 4, 700, 400, 600, 200);
  graph.addEdge(6, 5, 3, 700, 400, 600, 600);
  graph.addEdge(4, 5, 5, 450, 600, 600, 600);

  let div = createDiv(`<form id="form">
<input id="input" placeholder="Enter edge # to start"></input>
<button id="bfs">breadth first search</button>
<button id="dfs">depth first search</button>
</form>`);

  div.position(width, 10);
  let form = document.querySelector("#form");
  let buttonBFS = form.querySelector("#bfs");
  let buttonDFS = form.querySelector("#dfs");
  let input = form.querySelector("#input");
  input.addEventListener("change", updateEdgeModel);
  buttonBFS.addEventListener("click", update);
  buttonDFS.addEventListener("click", update);
  form.addEventListener("submit", submitHandler);

  let div3 = createDiv(`<form id="form3">
		<input id="src" class="vertex" placeholder="From edge #"></input>
		<input id="dest" class="vertex" placeholder="To edge #"></input>
		<button id="printPath">Print Paths</button>
		</form>`);

  div3.position(width, 420);
  let form3 = document.querySelector("#form3");
  let src = form3.querySelector("#src");
  let dest = form3.querySelector("#dest");

  dest.addEventListener("change", updateDest);
  src.addEventListener("change", updateSrc);
  form3.addEventListener("submit", printAllPath);
}
// ui-draw end

function draw() {
  background(0);
  stroke("#fff");
  fill(255);
  graph.display();
}

function submitHandler(e) {
  e.preventDefault();
  if (choice === "bfs") {
    if (edgeModel !== "") {
      graph.display();
      graph.bfs(edgeModel);
    }
  } else {
    if (edgeModel !== "") {
      graph.display();
      graph.dfs(edgeModel);
    }
  }
}

function updateValue(e) {
  const inputValue = e.target.value;
  if (isInputValid(inputValue)) {
    edgeModel = e.target.value;
  } else {
    alert("Enter valid input");
    e.target.value = "";
  }
}

function addNodeEdge(e) {
  e.preventDefault();
  // v,w,weight,xv,yv,xw,yw
  graph.addEdge(
    vertex,
    vertex1,
    graph.data[vertex][vertex1],
    graph.adj[vertex].head.x,
    graph.adj[vertex].head.y,
    graph.adj[vertex1].head.x,
    graph.adj[vertex1].head.y
  );
  line(
    graph.adj[vertex].head.x,
    graph.adj[vertex].head.y,
    graph.adj[vertex1].head.x,
    graph.adj[vertex1].head.y
  );
  console.log("vertex:", vertex, "vertex1:", vertex1);
  graph.adj[vertex].head.draw();
  graph.adj[vertex1].head.draw();
}

function addNode(e) {
  e.preventDefault();
  graph.adj[nodeValue].head = new Node(
    nodeValue,
    nodeValue,
    random(50, width - 50),
    random(50, height - 50)
  );
  graph.adj[nodeValue].head.draw();
}

function printAllPath(e) {
  e.preventDefault();
  graph.printAllPath(parseInt(srcModel), parseInt(destModel));
}

function isInputValid(input) {
  return !isNaN(input) && input >= 0 && input <= 7;
}

function updateNodeValue(e) {
  nodeValue = e.target.value;
}

function updateEdgeModel(e) {
  edgeModel = e.target.value;
}

function updateVertex(e) {
  vertex = e.target.value;
}

function updateSrc(e) {
  srcModel = e.target.value;
}

function updateDest(e) {
  destModel = e.target.value;
}

function updateVertex1(e) {
  vertex1 = e.target.value;
}

function update(e) {
  choice = e.target.id;
}
