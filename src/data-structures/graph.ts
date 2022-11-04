import test from "ava";

/*
 * @dev Implements a vertex in a graph.
 */
class Vertex<T> {
  constructor(public value: T, public edges: Vertex<T>[] = []) {}

  public addEdges = (vertices: Vertex<T>[]) => this.edges.push(...vertices);
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

  ahmed.addEdges([barbie, carlos]);

  t.is(ahmed.value, "Ahmed");
  t.is(ahmed.edges[0], barbie);
  t.is(ahmed.edges[1], carlos);
});

/*
 * @dev Breadth-first search for a value in a graph
 */
const bfs = (
  start: Vertex<string>,
  searchTerm: string
): Vertex<string> | undefined => {
  // return if the starting vertex has the search term
  if (start.value === searchTerm) return start;

  const queue: Vertex<string>[] = []; // vertices to visit
  const visited: Visited = {}; // vertices already visited

  // mark starting vertex as visited
  visited[start.value];

  // add it to the queue to check its neighbors
  queue.push(start);

  // while the queue has items
  while (queue.length) {
    // get the first vertex
    const currentVertex = queue.shift();

    if (currentVertex) {
      // return if the current vertex in the queue has the search term
      if (currentVertex.value === searchTerm) return currentVertex;

      // iterate over adjacent vertices
      for (let i = 0; i < currentVertex.edges.length; i++) {
        const neighbor = currentVertex.edges[i];

        // if the vertex has not been visited
        if (!visited[neighbor.value]) {
          // return if a neighbor has the search term
          if (neighbor.value === searchTerm) return neighbor;

          // mark it as visited
          visited[neighbor.value] = true;

          // add it to the queue to traverse its neighbors
          queue.push(neighbor);
        }
      }
    }
  }

  return undefined;
};

test("bfs", (t) => {
  const actual = !!bfs(generateSocialGraph(), "Evan")?.value;
  const expected = true;

  t.is(actual, expected);
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
      for (let i = 0; i < currentVertex.edges.length; i++) {
        const neighbor = currentVertex.edges[i];

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
    "Jon",
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

  for (let i = 0; i < vertex.edges.length; i++) {
    const neighbor = vertex.edges[i];

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
  const actual = !!dfs(generateSocialGraph(), "Jon")?.value;
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
  for (let i = 0; i < vertex.edges.length; i++) {
    const neighbor = vertex.edges[i];

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
    "Jon",
    "Gina",
    "Irene",
  ];

  t.deepEqual(actual, expected);
});

/*
 * @dev Helper function to generate a social graph of users:
 *                                  ┌─────┐
 *    ┌───────────────────┬─────────┤Ahmed├───────┬─────────────────────┐
 *    │                   │         └──┬──┘       │                     │
 *    │                   │            │          │                     │
 *    │                   │            │          │                     │
 *    │                   │            │          │                     │
 * ┌──┴───┐            ┌──┴───┐        │       ┌──┴───┐              ┌──┴─┐
 * │Barbie│            │Carlos│        │       │Daphne├──────────────┤Evan│
 * └──┬───┘            └──┬───┘        │       └──┬───┘              └──┬─┘
 *    │                   │            │          │                     │
 *    │                   │            │          │                     │
 *    │                   │            │          │                     │
 *    │                   │            │          │                     │
 * ┌──┴─┐                 │            │       ┌──┴─┐                   │
 * │Fred│                 │            │       │Gina│                   │
 * └──┬─┘                 │            │       └──┬─┘                   │
 *    │                   │            │          │                     │
 *    │                   │            │          │                     │
 *    │                   │            │          │                     │
 * ┌──┴─┐                 │            │       ┌──┴──┐                  │
 * │Hans├─────────────────┘            │       │Irene│                  │
 * └────┘                              │       └──┬──┘                  │
 *                                     │          │                     │
 *                                     │          │                     │
 *                                     │       ┌──┴┐                    │
 *                                     └───────┤Jon├────────────────────┘
 *                                             └───┘
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
  const jon = new Vertex("Jon");

  ahmed.addEdges([barbie, carlos, daphne, evan, jon]);
  barbie.addEdges([ahmed, fred]);
  carlos.addEdges([ahmed, hans]);
  daphne.addEdges([ahmed, evan, gina]);
  evan.addEdges([ahmed, daphne, jon]);
  fred.addEdges([barbie, hans]);
  gina.addEdges([daphne, irene]);
  hans.addEdges([carlos, fred]);
  irene.addEdges([gina, jon]);
  jon.addEdges([ahmed, evan]);

  // return ahmed as the starting vertex
  return ahmed;
};
