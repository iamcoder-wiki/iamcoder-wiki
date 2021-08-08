# DFS

## 소개
깊이 우선 탐색(Depth-First Search, DFS)는 트리나 그래프를 탐색하는 알고리즘 중 하나다. 깊이 우선 탐색에서는 우선 한 노드에서 탐색을 시작하여 매번 간선을 타고 최대한 멀리까지 탐색한 후에 이전 노드로 돌아온다.

모든 노드를 탐색하는 경우는 DFS를 사용할 수 있지만, 어떤 정점까지 최단 거리를 찾거나 정점들을 시작점에서 부터 거리 순으로 탐색하기 위해서는 DFS 대신 [[ BFS ]]를 사용해야 한다. 

## Code

``` c++
vector<int> gp[MAX_N+1]; // graph data
bool vst[MAX_N+1] // visited?

void dfs(int x){	
 vst[x] = true;
	for(int i : gp[x]){
		if(!vst[i]){
   			dfs(i);
		}
	}
}
```

## DFS Numbering
[[ DFS Numbering ]] 참고
