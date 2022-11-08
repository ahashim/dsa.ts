import test from "ava";

/*
 * @dev: Implements a vertex in a weighted graph
 */
class Vertex {
  constructor(
    public value: string,
    public edges: Vertex[] = [],
    public weights: { [key: string]: number } = {}
  ) {}

  public addEdge = (vertex: Vertex, weight: number) => {
    this.edges.push(vertex);
    this.weights[vertex.value] = weight;
  };

  public getEdge = (
    searchTerm: string
  ):
    | {
        vertex: Vertex;
        weight: number;
      }
    | undefined => {
    const vertex = this.edges.find((edge) => edge.value === searchTerm);

    if (vertex)
      return {
        vertex,
        weight: this.weights[vertex.value],
      };

    return undefined;
  };
}

test("vertices", (t) => {
  const atlanta = new Vertex("Atlanta");
  const boston = new Vertex("Boston");
  const chicago = new Vertex("Chicago");

  atlanta.addEdge(boston, 100);
  atlanta.addEdge(chicago, 30);

  t.deepEqual(atlanta.getEdge("Boston"), { vertex: boston, weight: 100 });
  t.deepEqual(atlanta.getEdge("Chicago"), { vertex: chicago, weight: 30 });
  t.is(atlanta.getEdge("El Paso"), undefined);
});

/*
 * @dev Gets the shortest path between 2 vertices in a weighted graph using
 *      Dijkstra's algorithm.
 */
const shortestPath = (start: Vertex, finish: Vertex): string[] => {
  // the cumulative lowest weight to an edge from the starting vertex
  const lowestWeightedVertex: { [key: string]: number } = {
    // starting vertex has a weight of zero since we are already there
    [start.value]: 0,
  };

  // the lowest weighted vertex connected to a given vertex (from the
  // perspective of the the start city)
  const lightestPreviousVertex: { [key: string]: string } = {};

  // visited vertices (using a hashtable for O(1) lookups)
  const visited: { [key: string]: boolean } = {};

  // unvisited vertices starting with the current city (can also use a min-heap
  // by weight for faster dequeues)
  let unvisited: Vertex[] = [];

  // set current vertex to `start``
  let currentVertex: Vertex | undefined = start;

  // -------- START OF CORE ALGORITHM --------
  while (currentVertex) {
    // mark current vertex as visited
    visited[currentVertex.value] = true;
    unvisited = unvisited.filter((v) => v.value !== currentVertex?.value);

    // typescript null check
    if (currentVertex) {
      // iterate over its edges
      for (let i = 0; i < currentVertex.edges.length; i++) {
        const edge = currentVertex.edges[i];

        // mark any newly discovered unvisited vertices
        if (!visited[edge.value]) unvisited.push(edge);

        // get the total weight of "start to edge" path via the current vertex
        const pathWeight =
          lowestWeightedVertex[currentVertex.value] +
          currentVertex.weights[edge.value];

        // if `pathWeight` is less than the current lowest weight to the edge
        if (
          !lowestWeightedVertex[edge.value] ||
          pathWeight < lowestWeightedVertex[edge.value]
        ) {
          // update the lowest weight & closest vertex tables accordingly
          lowestWeightedVertex[edge.value] = pathWeight;
          lightestPreviousVertex[edge.value] = currentVertex.value;
        }
      }
    }

    // current vertex is updated to the new lowest weighted unvisited vertex
    currentVertex = unvisited.reduce(
      (prev, curr) =>
        lowestWeightedVertex[curr.value] < lowestWeightedVertex[prev.value]
          ? curr
          : prev,
      unvisited[0] // reducer start value
    );
  }
  // -------- END OF CORE ALGORITHM --------

  // build the shortest path working backwards from the `finish` using the now
  // populated `lowestWeightedVertex` and `lightestPreviousVertex` objects
  const shortestPath: string[] = [];
  let currentVertexValue = finish.value;

  // loop until starting vertex is reached
  while (currentVertexValue !== start.value) {
    // add each current city name to the shortest path array
    shortestPath.push(currentVertexValue);

    // use the lightestPreviousVertex to follow each vertex value to its
    // previous vertex
    currentVertexValue = lightestPreviousVertex[currentVertexValue];
  }

  // finally add the starting city at the end of the path
  shortestPath.push(start.value);

  // reverse the output to read from beginning -> end
  return shortestPath.reverse();
};

test("shortestPath", (t) => {
  const { start, finish } = generateWeightedGraph();
  const actual = shortestPath(start, finish);
  const expected = ["Atlanta", "Denver", "Chicago", "El Paso"];

  t.deepEqual(actual, expected);
});

/*
 * @dev Helper function to generate a weighted graph of cities => cost to visit.
 *
 *    ┌──────────────────┐
 *    │                  │
 *    │              ┌───▼───┐
 *    │         ┌────┤Chicago◄─────────────────┐
 *    │         │    └───────┘                 │
 *    │         │                              │
 *    │         │                              │
 *    │         │  ┌───────────────────────────┼─┐
 *    │         │  │                           │ │
 *    │         │  │                        ┌──┴─▼─┐
 *    │  ┌──────┼──┼────────────────────────┤Boston│
 *    │  │      │  │                        └──▲───┘
 *   ┌┴──▼──┐   │  │                           │
 *   │Denver◄───┼──┼────────────┐              │
 *   └──┬───┘   │  │            │              │
 *      │       │  │            │              │
 *      │       │  │            │              │
 *      │   ┌───▼──┴┐       ┌───┴───┐          │
 *      └───►El Paso│       │Atlanta├──────────┘
 *          └───────┘       └───────┘
 */
const generateWeightedGraph = (): {
  start: Vertex;
  finish: Vertex;
} => {
  const atlanta = new Vertex("Atlanta");
  const boston = new Vertex("Boston");
  const chicago = new Vertex("Chicago");
  const denver = new Vertex("Denver");
  const elPaso = new Vertex("El Paso");

  atlanta.addEdge(boston, 100);
  atlanta.addEdge(denver, 160);
  boston.addEdge(chicago, 120);
  boston.addEdge(denver, 180);
  chicago.addEdge(elPaso, 80);
  denver.addEdge(chicago, 40);
  denver.addEdge(elPaso, 140);

  return {
    start: atlanta,
    finish: elPaso,
  };
};
