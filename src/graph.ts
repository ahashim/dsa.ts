import test from "ava";

/*
 * @dev Implements a vertex in a graph.
 */
class Vertex<T> {
  constructor(public value: T, public adjacentVertices: Vertex<T>[] = []) {}

  public addAdjacentVertices = (vertices: Vertex<T>[]) =>
    this.adjacentVertices.push(...vertices);
}

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
 * @dev Depth first traversal in a graph of vertices.
 */
const dfsTraverse = (
  vertex: Vertex<string>,
  visited: { [key: string]: boolean } = {},
  values: string[] = []
): string[] => {
  // mark the vertex as visited
  visited[vertex.value] = true;

  // add it to the output array
  values.push(vertex.value);

  // iterate over adjacent vertices
  for (let i = 0; i < vertex.adjacentVertices.length; i++) {
    const neighbor = vertex.adjacentVertices[i];

    // skip vertices that have already been seen
    if (!visited[neighbor.value]) {
      // recurse & pass visited + values seen so far
      dfsTraverse(neighbor, visited, values);
    }
  }

  return values;
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
 * @dev Depth first search for a specific vertex in a graph.
 */
const dfs = (
  vertex: Vertex<string>,
  search: string,
  visited: { [key: string]: boolean } = {}
): Vertex<string> | null => {
  // base case: vertex has the search value
  if (vertex.value === search) return vertex;

  // mark vertex as visited
  visited[vertex.value] = true;

  for (let i = 0; i < vertex.adjacentVertices.length; i++) {
    const neighbor = vertex.adjacentVertices[i];

    // skip the vertex if its been visited
    if (visited[neighbor.value]) continue;

    // base case: the neighbor vertex has the search value
    if (neighbor.value === search) return neighbor;

    // recursively search neighbor's vertices
    const foundVertex = dfs(neighbor, search, visited);

    // return the found vertex if it exists
    if (foundVertex) return foundVertex;
  }

  // vertex does not exist in the graph
  return null;
};

test("dfs", (t) => {
  // test if a vertex with the value "Irene" exists in the graph
  t.is(!!dfs(generateSocialGraph(), "Irene")?.value, true);
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
