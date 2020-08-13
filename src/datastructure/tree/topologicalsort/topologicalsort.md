# Topological Sort

## 소개

Topological Sort는 위상 정렬이라고 하며, 방향 그래프에서 정점들을 정점 u에서 정점 v로 가는 간선이 있을 때, 정점 u가 정점 v보다 앞에 오도록 선형으로 정렬하는 것입니다. 이렇게 정점들을 정렬하면 어떤 작업을 수행할 때 올바른 순서를 알아낼 수 있습니다. 예를 들어, 수강해야 할 여러 수업들 중 한 수업보다 먼저 들어야 하는 수업이 있을 때, 위상 정렬을 이용하면 가능한 수강 순서를 알아낼 수 있을 것입니다. 그러나 이러한 위상 정렬을 하려면, 정렬하려고 하는 그래프가 사이클이 없는 방향성 비순환 그래프 (directed acyclic graph 또는 DAG) 이어야 합니다. 당연하게도 사이클이 존재한다면 사이클을 이루는 정점 간의 우선 순위를 결정할 수 없기 때문입니다. 그리고 정렬이 된 순서는 그래프의 구조에 따라 여러 종류가 나올 수 있게 됩니다.  

실제 컴퓨터 분야에서 이 알고리즘은 논리 합성, 데이터 직렬화, 코드 최적화의 한 방법인 Instruction Scheduling 등에서 사용됩니다. 



## Kahn's Algorithm

가장 대표적이고 많이 쓰이는 위상 정렬 알고리즘은 Kahn 이라는 사람이 처음 설명했다고 합니다. 먼저 indegree_(진입 차수 : 한 정점으로 향하는 간선의 개수)_가 0인 정점을 모두 찾습니다. 그리고 이 정점들을 그래프에서 제거합니다. 제거함에 따라 생기는 indegree가 0인 정점들을 다시 찾아 위 두 과정을 반복합니다. 이 과정을 그래프에서 정점이 없어질 때까지 수행한 뒤, 제거했던 순서대로 정점을 배열하면 위상 정렬이 완료됩니다. 이를 구현해보면 다음과 같습니다. 여기서 L은 앞으로 정렬된 정점 번호가 들어갈 배열이고, 현재는 비어있습니다. S는 queue 이고 정점 중 가리키는 간선의 개수가 0인 정점이 들어가게 됩니다.

 ``` c++
for(n : node){
  if(indegree[n]==0){
    S.push_back(n);
  }
}
while(!S.empty()){
  n = S.back(); S.pop_back();
  L.push_back(n);
  for(m : graph[n]){
    indegree[m]--;
    if(indegree[m]==0){
      S.push_back(m);
    }
  }
}
if(L.size()!=N)	return error;	// graph has at least one cycle
else	return L;	// a topologically sorted order
 ```

이 알고리즘은 시간복잡도가 \\(O(V+E)\\)로, 정점의 개수와 간선의 개수를 더한 것이 됩니다. 그 이유는 `S`에서 노드를 총 `n`번 꺼내게 되어 \\(O(V)\\), 모든 간선을 한 번씩 제거해서 \\(O(E)\\)가 되기 때문입니다.



## Using DFS

잘 알려진 깊이 우선 탐색(dfs, depth-first search)을 이용해도 위상 정렬을 할 수 있습니다. 그러나 dfs를 시작하는 정점은 꼭 indegree가 0인 정점이 아니어도 되고, 재귀호출을 한 함수가 끝날 때 값을 배열 L에 넣으면 됩니다. 이 때 위상 정렬한 결과는 배열 L에서 역순으로 뒤집어 준 것과 같다는 점을 유의해야 합니다. 그래서 배열 대신 Stack이라는 자료 구조를 활용하는 것도 가능합니다. 이를 구현해보면 다음과 같습니다.

``` c++
void visit(Node n){
  if(per[n])	return;
  if(tem[n])	stop();		// not DAG
  tem[n] = true;
  for(m : graph[n]){
    visit(m);
  }
  tem[n] = false;
  per[n] = true;
  L.push_back(L);
}

void topological_sort(){
  for(n : node){
    if(!per[n]){
      visit(n);
    }
  }
  return L;
}
```

이 코드의 시간복잡도는 위와 마찬가지로 선형인 \\(O(n)\\)입니다. 그러나 위의 코드보다는 조금 오래 걸릴 것입니다. 또한 이 알고리즘은 직관적인 이해가 보다 쉽지 않습니다. 그래서 일반적으로 위상 정렬만 할 경우에는 위의 알고리즘을 쓰게 됩니다. 그러나 dfs를 활용해서도 위상 정렬을 할 수 있다는 사실 정도는 알아두면 좋을 것입니다.



 ## Finding a Shortest Path

위상 정렬을 이용하면 DAG에서 최단 경로도 빠르게 찾아낼 수 있습니다. 위상 정렬을 한 결과를 저장한 배열이 있을 때 배열 위의 정점 s에서 배열 끝까지, 각 정점마다 간선으로 연결된 다른 정점까지의 최단 경로를 갱신해주면 됩니다. 이를 구현해보면 다음과 같습니다. 여기서 배열 `V`는 위상 정렬을 한 결과가 들어가있고, 배열 `d[u]`에는 정점 `s`에서 정점 `u`까지의 최단 경로가 들어가게 될 것입니다. 그리고 `w`는 `u`에서 `v`로 향하는 간선의 가중치를 의미합니다.

 ``` c++
d[s] = 0;

for(u : node){
	if(u!=s)	d[u] = INF;
}

for(u : V){
  for(v : graph[u]){
    if(d[v] > d[u] + w)	d[v] = d[u] + w;
  }
}
 ```

이 알고리즘은 위상 정렬을 할 때와 마찬가지로 시간복잡도가 \\(O(V+E)\\)입니다. 따라서 선형이므로 꽤나 빠르게 최단 경로를 찾을 수 있습니다. 그러나 이와 비슷한 시간복잡도를 가지고 좀 더 간결하게 코드를 짤 수 있는 dijkstra 알고리즘을 사용하는 것이 실전에서는 더 도움이 될 것입니다.



## 예시 

위상 정렬을 사용하여 해결할 수 있는 문제 중 대표적인 문제로는 [줄 세우기](https://www.acmicpc.net/problem/2252)가 있습니다. 이 문제는 vector 자료구조로 인접 리스트를 만들어 위상 정렬을 수행하면 바로 답을 구할 수 있습니다. 이에 대한 코드는 다음과 같습니다.

 ``` c++
int main(void) {
	for(i = 1; i <= m; i++) {
		scanf("%d %d", &p, &q);
		V[p].push_back(q);
		idg[q]++;
	}
	for(i = 1; i <= n; i++)
		if(idg[i] == 0)
			Q.push(i);
  
    while(!Q.empty()) {
      u = Q.front();
      Q.pop();
      ans[++cnt] = u;
      siz = V[u].size();
      for(i = 0; i < siz; i++) {
        v = V[u][i];
        idg[v]--;
        if(idg[v] == 0)
          Q.push(v);
      }
    }

    for(i = 1; i <= cnt; i++)
      printf("%d ", ans[i]);
	
	return 0;
}
 ```



