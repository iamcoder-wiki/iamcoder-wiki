# Floyd-Warshall Algorithm
## 소개
플로이드-워셜(Floyd-Warshall) 알고리즘은 한 정점으로부터 다른 모든 정점까지의 최단 경로를 구하는 [[ Dijkstra Algorithm ]]이나 [[ Bellman-Ford Algorithm ]]과는 다르게 모든 정점에서부터 모든 정점까지의 최단 경로를 구할 수 있는 알고리즘이다. 음수 간선이 있지만, 음수 사이클은 없는 그래프에서도 동작하며, 구현은 매우 간단하지만 시간복잡도가 \\(O(|V|^3)\\)으로 느린 알고리즘이다.

## 원리
만약 현재 찾은 \\(i\\)에서 \\(j\\)로 가는 경로가 \\(k\\)를 경유하는 경로[^1]보다 길다면  \\(i\\)에서 \\(j\\)로 가는 최단 거리을 갱신해줘야 한다. Floyd-Warshall 알고리즘은 \\(0\\)번 정점부터 \\(|V|-1\\)까지 정점을 경유지로 하는 경로들에 대해 최단 시간을 갱신하는 과정을 반복한다.

음의 가중치를 갖는 사이클이 있는 경우 이 사이클에 속하는 정점에서 사이클을 이용하여 자신으로 돌아오면 이동한 거리가 음수이므로 최단 거리가 음수로 바뀌게 된다. 따라서 어떤 \\(i\\)에 대해 \\(dist[i][i] < 0\\)이면 음수 사이클이 있음을 알 수 있다.

## Code
``` c++
bool Floyd_Warshall(){
	for(int i=0; i<V; i++){
		for(int j=0; j<V; j++){
			dist[i][j] = adj[i][j];
		}
	}
	for(int i=0; i<V; i++)	dist[i][i] = 0;
	for(int k=0; k<V; k++){
		for(int i=0; i<V; i++){
			if(dist[i][k]==INF)	continue;
			for(int j=0; j<V; j++){
				dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j]);
			}
		}
	}
	for(int i=0; i<V; i++){
		if(dist[i][i]<0)	return false;
	}
	return true;
}
```


---
[^1]: \\(i\\)에서 \\(k\\)를 거쳐 \\(j\\)로 가는 경로
