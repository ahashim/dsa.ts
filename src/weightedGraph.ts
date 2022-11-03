import test from "ava";

/*
 * @dev: Implements a vertex in a weighted graph
 */
class Vertex<T> {
  constructor(
    public value: T,
    public edges: { [key: number]: Vertex<T>[] } = {}
  ) {}

  public addEdge = (vertex: Vertex<T>, weight: number) => {
    // edges are keyed by weight
    if (weight in this.edges) {
      this.edges[weight].push(vertex);
    } else {
      this.edges[weight] = [vertex];
    }
  };

  public getEdgeByValue = (searchTerm: T): Vertex<T> | undefined => {
    const weights = Object.keys(this.edges);

    // search all weights
    for (let i = 0; i < weights.length; i++) {
      const weight = parseInt(weights[i], 10); // convert to int

      // search all vertexes in that weight class
      for (let i = 0; i < this.edges[weight].length; i++) {
        const vertex = this.edges[weight][i];

        if (vertex.value === searchTerm) return vertex;
      }
    }

    // vertex is not in edges
    return undefined;
  };
}

test("vertices", (t) => {
  const atlanta = new Vertex("Atlanta");
  const boston = new Vertex("Boston");
  const chicago = new Vertex("Chicago");

  atlanta.addEdge(boston, 100);
  atlanta.addEdge(chicago, 30);

  // edges by weight
  t.deepEqual(atlanta.edges[100], [boston]);
  t.deepEqual(atlanta.edges[30], [chicago]);

  // edge by value
  t.is(atlanta.getEdgeByValue("Boston"), boston);
  t.is(atlanta.getEdgeByValue("Chicago"), chicago);
});
