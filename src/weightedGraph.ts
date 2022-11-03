import test from "ava";

/*
 * @dev: Implements a vertex in a weighted graph
 */
class Vertex<T> {
  constructor(
    public value: T,
    public adjacentVertices: { [key: number]: Vertex<T>[] } = {}
  ) {}

  public addEdge = (vertex: Vertex<T>, weight: number) => {
    if (weight in this.adjacentVertices) {
      this.adjacentVertices[weight].push(vertex);
    } else {
      this.adjacentVertices[weight] = [vertex];
    }
  };
}

test("vertices", (t) => {
  const atlanta = new Vertex("Atlanta");
  const boston = new Vertex("Boston");
  const chicago = new Vertex("Chicago");

  atlanta.addEdge(boston, 100);
  atlanta.addEdge(chicago, 30);

  t.is(atlanta.adjacentVertices[100][0], boston);
  t.is(atlanta.adjacentVertices[30][0], chicago);
});
