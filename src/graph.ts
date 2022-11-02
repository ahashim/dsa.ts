import test from "ava";

/*
 * @dev Implements a vertex in a graph.
 */
class Vertex<T> {
  constructor(public value: T, public adjacentVertices: Vertex<T>[] = []) {}

  public addAdjacentVertices = (vertices: Vertex<T>[]) =>
    this.adjacentVertices.push(...vertices);
}

/*
 * @dev Represents a hashtable of visited vertice values.
 */
type Visited = {
  [key: string]: boolean;
};

test("vertices", (t) => {
  const ahmed = new Vertex("Ahmed");
  const barbie = new Vertex("Barbie");
  const carlos = new Vertex("Carlos");

  ahmed.addAdjacentVertices([barbie, carlos]);

  t.is(ahmed.value, "Ahmed");
  t.is(ahmed.adjacentVertices[0].value, "Barbie");
  t.is(ahmed.adjacentVertices[1].value, "Carlos");
});

/*
 * @dev Traverse a graph using breadth-first search.
 */
const bfsTraverse = (start: Vertex<string>): string[] => {
  const output: string[] = []; // output values
  const queue: Vertex<string>[] = []; // vertices to visit
  const visited: Visited = {}; // vertices already visited

  // mark starting vertex as visited
  visited[start.value] = true;

  // add it to the queue to traverse its neighbors
  queue.push(start);

  // while queue has items
  while (queue.length) {
    // remove first item off of the queue and make it the current vertex
    const currentVertex = queue.shift();

    if (currentVertex) {
      // add it to the output values
      output.push(currentVertex?.value);

      // iterate over adjacent vertices
      for (let i = 0; i < currentVertex.adjacentVertices.length; i++) {
        const neighbor = currentVertex.adjacentVertices[i];

        // if neighbor has not been visited
        if (!visited[neighbor.value]) {
          // mark it as visited
          visited[neighbor.value] = true;

          // add it to the queue to traverse its neighbors
          queue.push(neighbor);
        }
      }
    }
  }

  return output;
};

test("bfsTraverse", (t) => {
  const actual = bfsTraverse(generateSocialGraph());
  const expected = [
    "Ahmed",
    "Barbie",
    "Carlos",
    "Daphne",
    "Evan",
    "Fred",
    "Hans",
    "Gina",
    "Irene",
  ];

  t.deepEqual(actual, expected);
});

/*
 * @dev Depth-first search for a specific vertex in a graph.
 */
const dfs = (
  vertex: Vertex<string>,
  searchTerm: string,
  visited: Visited = {}
): Vertex<string> | undefined => {
  // base case: vertex has the search value
  if (vertex.value === searchTerm) return vertex;

  // mark vertex as visited
  visited[vertex.value] = true;

  for (let i = 0; i < vertex.adjacentVertices.length; i++) {
    const neighbor = vertex.adjacentVertices[i];

    // skip the vertex if its been visited
    if (!visited[neighbor.value]) {
      // base case: the neighbor vertex has the search value
      if (neighbor.value === searchTerm) return neighbor;

      // recursively search neighbor's vertices
      const foundVertex = dfs(neighbor, searchTerm, visited);

      // return the found vertex if it exists
      if (foundVertex) return foundVertex;
    }
  }

  // vertex does not exist in the graph
  return undefined;
};

test("dfs", (t) => {
  // test if a vertex with the value "Irene" exists in the graph
  const actual = !!dfs(generateSocialGraph(), "Irene")?.value;
  const expected = true;

  t.is(actual, expected);
});

/*
 * @dev Traverse a graph using depth-first search.
 */
const dfsTraverse = (
  vertex: Vertex<string>,
  visited: { [key: string]: boolean } = {},
  output: string[] = []
): string[] => {
  // mark the vertex as visited
  visited[vertex.value] = true;

  // add it to the output array
  output.push(vertex.value);

  // iterate over adjacent vertices
  for (let i = 0; i < vertex.adjacentVertices.length; i++) {
    const neighbor = vertex.adjacentVertices[i];

    // skip vertices that have already been seen
    if (!visited[neighbor.value]) {
      // recurse & pass visited + values seen so far
      dfsTraverse(neighbor, visited, output);
    }
  }

  return output;
};

test("dfsTraverse", (t) => {
  const actual = dfsTraverse(generateSocialGraph());
  const expected = [
    "Ahmed",
    "Barbie",
    "Fred",
    "Hans",
    "Carlos",
    "Daphne",
    "Evan",
    "Gina",
    "Irene",
  ];

  t.deepEqual(actual, expected);
});

/*
 * @dev Helper function to generate a social graph of users:
 *
 *   ┌─────────────────────┐
 *   │        ahmed        │
 *   └△△─△△──────────△△△──△┘
 *    ││ ││          │││ ┌┴─────┐
 *    ││ ││          │││ │barbie│
 *    ││ ││          │││ └△△────┘
 *    ││ ││         ┌┴┴┴─┐││
 *    ││ ││         │evan│││
 *    ││ ││         └┬┬──┘││
 *    ││ ││┌────┐    ││   ││
 *    ││ │││gina│    ││   ││
 *    ││ ││└┬┬─△┘    ││   ││
 *    ││ ││ ││┌┴────┐││   ││
 *    ││ ││ │││irene│││   ││
 *    ││ ││ ││└─────┘││   ││
 *    ││┌┴┴─▽▽───────▽▽─┐ ││
 *    │││    daphne     │ ││
 *    ││└───────────────┘ ││
 *    ││┌──────┐          ││
 *    │││ hans │          ││
 *    ││└┬───┬┬┘          ││
 *   ┌┴┴─▽──┐││           ││
 *   │carlos│││           ││
 *   └──────┘││           ││
 *   ┌───────▽▽───────────┴┴─┐
 *   │         fred          │
 *   └───────────────────────┘
 */
const generateSocialGraph = (): Vertex<string> => {
  const ahmed = new Vertex("Ahmed");
  const barbie = new Vertex("Barbie");
  const carlos = new Vertex("Carlos");
  const daphne = new Vertex("Daphne");
  const evan = new Vertex("Evan");
  const fred = new Vertex("Fred");
  const gina = new Vertex("Gina");
  const hans = new Vertex("Hans");
  const irene = new Vertex("Irene");

  ahmed.addAdjacentVertices([barbie, carlos, daphne, evan]);
  barbie.addAdjacentVertices([ahmed, fred]);
  carlos.addAdjacentVertices([ahmed, hans]);
  daphne.addAdjacentVertices([ahmed, evan, gina]);
  evan.addAdjacentVertices([ahmed, daphne]);
  fred.addAdjacentVertices([barbie, hans]);
  gina.addAdjacentVertices([daphne, irene]);
  hans.addAdjacentVertices([carlos, fred]);
  irene.addAdjacentVertices([gina]);

  // return ahmed as the starting vertex
  return ahmed;
};
