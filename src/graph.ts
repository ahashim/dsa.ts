import test from "ava";

/*
 * @dev Implements a vertex in a graph.
 */
class Vertex<T> {
  constructor(public value: T, public adjacentVertices: Vertex<T>[] = []) {}

  public addAdjacentVertex = (vertex: Vertex<T>) =>
    this.adjacentVertices.push(vertex);
}

test("vertices", (t) => {
  const ahmed = new Vertex("ahmed");
  const barbie = new Vertex("barbie");

  ahmed.addAdjacentVertex(barbie);

  t.is(ahmed.value, "ahmed");
  t.is(ahmed.adjacentVertices[0].value, "barbie");
});
