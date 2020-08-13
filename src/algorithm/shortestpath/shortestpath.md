# Shortest Path

## 소개

Shortest Path(최단 거리) 알고리즘은 주어진 가중 그래프에서 두 정점 사이 최단거리를 구하는 문제다. 다양한 최단 거리 알고리즘이 존재하는데, 간선들의 가중치나 최단거리를 구하려는 시작점, 끝점의 개수에 따라 맞는 알고리즘을 잘 선택하여 사용해야 한다.

## 종류

* [BFS](../graphtraversal/bfs/bfs.md)

  모든 간선의 가중치가 1일때 한 정점에서 모든 정점까지 최단 거리를 \\(O(V+E)\\)에 구할 수 있다.

* [Dijkstra](./dijkstra/dijkstra.md)

  모든 간선의 가중치가 0 이상일 때 한 정점에서 모든 정점까지 최단 거리를 \\(O(E\log V)\\)에 구할 수 있다.

* [Bellman-Ford](./bellmanford/bellmanford.md)

  음수 사이클이 없는 그래프에서, 한 정점에서 모든 정점까지 최단 거리를 \\(O(VE)\\)에 구할 수 있다.

* [Floyd-Warshall](./floydwarshall/floydwarshall.md)

  음수 사이클이 없는 그래프에서, 모든 정점쌍에 대한 최단거리를 \\(O(V^3)\\)에 구할 수 있다.