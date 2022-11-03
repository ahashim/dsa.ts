import test from "ava";

/*
 * @dev: Implements a vertex in a weighted graph
 */
class Vertex<T> {
  constructor(
    public value: T,
    public adjacentVertices: {
      [key: number]: Vertex<T>[];
    } = {}
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
  const ahmed = new Vertex("Ahmed");
  const barbie = new Vertex("Barbie");
  const carlos = new Vertex("Carlos");

  ahmed.addEdge(barbie, 100);
  ahmed.addEdge(carlos, 30);

  t.is(ahmed.adjacentVertices[100][0], barbie);
  t.is(ahmed.adjacentVertices[30][0], carlos);
});
