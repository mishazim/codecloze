export const hardAlgorithms = [
  {
    id: 'lcs',
    name: 'Longest Common Subsequence (LCS)',
    category: 'algorithms',
    difficulty: 'hard',
    complexityRank: 10,
    description: 'DP table comparing two sequences to find the longest common subsequence.',
    snippets: {
      python: {
        template: `def lcs(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if {{0}}:
                dp[i][j] = {{1}}
            else:
                dp[i][j] = max(dp[i - 1][j], {{2}})
    return dp[m][n]`,
        blanks: [
          { id: 0, answer: 's1[i - 1] == s2[j - 1]' },
          { id: 1, answer: 'dp[i - 1][j - 1] + 1' },
          { id: 2, answer: 'dp[i][j - 1]' },
        ],
      },
      java: {
        template: `static int lcs(String s1, String s2) {
    int m = s1.length(), n = s2.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if ({{0}}) dp[i][j] = {{1}};
            else dp[i][j] = Math.max(dp[i - 1][j], {{2}});
        }
    }
    return dp[m][n];
}`,
        blanks: [
          { id: 0, answer: 's1.charAt(i - 1) == s2.charAt(j - 1)' },
          { id: 1, answer: 'dp[i - 1][j - 1] + 1' },
          { id: 2, answer: 'dp[i][j - 1]' },
        ],
      },
      cpp: {
        template: `int lcs(string& s1, string& s2) {
    int m = s1.size(), n = s2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if ({{0}}) dp[i][j] = {{1}};
            else dp[i][j] = max(dp[i - 1][j], {{2}});
        }
    }
    return dp[m][n];
}`,
        blanks: [
          { id: 0, answer: 's1[i - 1] == s2[j - 1]' },
          { id: 1, answer: 'dp[i - 1][j - 1] + 1' },
          { id: 2, answer: 'dp[i][j - 1]' },
        ],
      },
    },
  },
  {
    id: 'lis',
    name: 'Longest Increasing Subsequence (LIS)',
    category: 'algorithms',
    difficulty: 'hard',
    complexityRank: 8,
    description: 'Finds longest subsequence where each element is greater than the previous.',
    snippets: {
      python: {
        template: `def lis(nums):
    if not nums:
        return 0
    dp = [1] * len(nums)
    for i in range(1, len(nums)):
        for j in range(i):
            if {{0}}:
                dp[i] = {{1}}
    return {{2}}`,
        blanks: [
          { id: 0, answer: 'nums[j] < nums[i]' },
          { id: 1, answer: 'max(dp[i], dp[j] + 1)' },
          { id: 2, answer: 'max(dp)' },
        ],
      },
      java: {
        template: `static int lis(int[] nums) {
    if (nums.length == 0) return 0;
    int[] dp = new int[nums.length];
    Arrays.fill(dp, 1);
    for (int i = 1; i < nums.length; i++) {
        for (int j = 0; j < i; j++) {
            if ({{0}}) dp[i] = {{1}};
        }
    }
    return {{2}};
}`,
        blanks: [
          { id: 0, answer: 'nums[j] < nums[i]' },
          { id: 1, answer: 'Math.max(dp[i], dp[j] + 1)' },
          { id: 2, answer: 'Arrays.stream(dp).max().getAsInt()' },
        ],
      },
      cpp: {
        template: `int lis(vector<int>& nums) {
    if (nums.empty()) return 0;
    vector<int> dp(nums.size(), 1);
    for (int i = 1; i < nums.size(); i++) {
        for (int j = 0; j < i; j++) {
            if ({{0}}) dp[i] = {{1}};
        }
    }
    return {{2}};
}`,
        blanks: [
          { id: 0, answer: 'nums[j] < nums[i]' },
          { id: 1, answer: 'max(dp[i], dp[j] + 1)' },
          { id: 2, answer: '*max_element(dp.begin(), dp.end())' },
        ],
      },
    },
  },
  {
    id: 'knapsack-01',
    name: '0/1 Knapsack',
    category: 'algorithms',
    difficulty: 'hard',
    complexityRank: 10,
    description: 'DP over items and capacity to maximize value without exceeding weight limit.',
    snippets: {
      python: {
        template: `def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range({{0}})]
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            if weights[i - 1] <= w:
                dp[i][w] = max({{1}},
                               values[i - 1] + dp[i - 1][w - weights[i - 1]])
            else:
                dp[i][w] = {{2}}
    return dp[n][capacity]`,
        blanks: [
          { id: 0, answer: 'n + 1' },
          { id: 1, answer: 'dp[i - 1][w]' },
          { id: 2, answer: 'dp[i - 1][w]' },
        ],
      },
      java: {
        template: `static int knapsack(int[] weights, int[] values, int capacity) {
    int n = weights.length;
    int[][] dp = new int[{{0}}][capacity + 1];
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            if (weights[i - 1] <= w)
                dp[i][w] = Math.max({{1}},
                    values[i - 1] + dp[i - 1][w - weights[i - 1]]);
            else dp[i][w] = {{2}};
        }
    }
    return dp[n][capacity];
}`,
        blanks: [
          { id: 0, answer: 'n + 1' },
          { id: 1, answer: 'dp[i - 1][w]' },
          { id: 2, answer: 'dp[i - 1][w]' },
        ],
      },
      cpp: {
        template: `int knapsack(vector<int>& weights, vector<int>& values, int capacity) {
    int n = weights.size();
    vector<vector<int>> dp({{0}}, vector<int>(capacity + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= capacity; w++) {
            if (weights[i - 1] <= w)
                dp[i][w] = max({{1}},
                    values[i - 1] + dp[i - 1][w - weights[i - 1]]);
            else dp[i][w] = {{2}};
        }
    }
    return dp[n][capacity];
}`,
        blanks: [
          { id: 0, answer: 'n + 1' },
          { id: 1, answer: 'dp[i - 1][w]' },
          { id: 2, answer: 'dp[i - 1][w]' },
        ],
      },
    },
  },
  {
    id: 'coin-change',
    name: 'Coin Change (Min Coins)',
    category: 'algorithms',
    difficulty: 'hard',
    complexityRank: 10,
    description: 'DP to find minimum number of coins that sum to a target amount.',
    snippets: {
      python: {
        template: `def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[{{0}}] = 0
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], {{1}})
    return dp[amount] if {{2}} else -1`,
        blanks: [
          { id: 0, answer: '0' },
          { id: 1, answer: 'dp[i - coin] + 1' },
          { id: 2, answer: "dp[amount] != float('inf')" },
        ],
      },
      java: {
        template: `static int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, Integer.MAX_VALUE);
    dp[{{0}}] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i && dp[i - coin] != Integer.MAX_VALUE)
                dp[i] = Math.min(dp[i], {{1}});
        }
    }
    return {{2}};
}`,
        blanks: [
          { id: 0, answer: '0' },
          { id: 1, answer: 'dp[i - coin] + 1' },
          { id: 2, answer: 'dp[amount] == Integer.MAX_VALUE ? -1 : dp[amount]' },
        ],
      },
      cpp: {
        template: `int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, INT_MAX);
    dp[{{0}}] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i && dp[i - coin] != INT_MAX)
                dp[i] = min(dp[i], {{1}});
        }
    }
    return {{2}};
}`,
        blanks: [
          { id: 0, answer: '0' },
          { id: 1, answer: 'dp[i - coin] + 1' },
          { id: 2, answer: 'dp[amount] == INT_MAX ? -1 : dp[amount]' },
        ],
      },
    },
  },
  {
    id: 'edit-distance',
    name: 'Edit Distance (Levenshtein)',
    category: 'algorithms',
    difficulty: 'hard',
    complexityRank: 10,
    description: 'DP to find minimum insertions, deletions, substitutions to transform one string to another.',
    snippets: {
      python: {
        template: `def edit_distance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1):
        dp[i][0] = {{0}}
    for j in range(n + 1):
        dp[0][j] = j
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                dp[i][j] = {{1}}
            else:
                dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], {{2}})
    return dp[m][n]`,
        blanks: [
          { id: 0, answer: 'i' },
          { id: 1, answer: 'dp[i - 1][j - 1]' },
          { id: 2, answer: 'dp[i - 1][j - 1]' },
        ],
      },
      java: {
        template: `static int editDistance(String word1, String word2) {
    int m = word1.length(), n = word2.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 0; i <= m; i++) dp[i][0] = {{0}};
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (word1.charAt(i - 1) == word2.charAt(j - 1))
                dp[i][j] = {{1}};
            else
                dp[i][j] = 1 + Math.min(dp[i - 1][j],
                                Math.min(dp[i][j - 1], {{2}}));
        }
    }
    return dp[m][n];
}`,
        blanks: [
          { id: 0, answer: 'i' },
          { id: 1, answer: 'dp[i - 1][j - 1]' },
          { id: 2, answer: 'dp[i - 1][j - 1]' },
        ],
      },
      cpp: {
        template: `int editDistance(string& word1, string& word2) {
    int m = word1.size(), n = word2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 0; i <= m; i++) dp[i][0] = {{0}};
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (word1[i - 1] == word2[j - 1])
                dp[i][j] = {{1}};
            else
                dp[i][j] = 1 + min({dp[i - 1][j], dp[i][j - 1], {{2}}});
        }
    }
    return dp[m][n];
}`,
        blanks: [
          { id: 0, answer: 'i' },
          { id: 1, answer: 'dp[i - 1][j - 1]' },
          { id: 2, answer: 'dp[i - 1][j - 1]' },
        ],
      },
    },
  },
  {
    id: 'segment-tree',
    name: 'Segment Tree',
    category: 'algorithms',
    difficulty: 'hard',
    complexityRank: 3,
    description: 'Binary tree where each node stores aggregate of a range.',
    snippets: {
      python: {
        template: `class SegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * ({{0}})
        self._build(arr, 0, 0, self.n - 1)

    def _build(self, arr, node, start, end):
        if start == end:
            self.tree[node] = arr[start]
        else:
            mid = (start + end) // 2
            self._build(arr, {{1}}, start, mid)
            self._build(arr, 2 * node + 2, mid + 1, end)
            self.tree[node] = {{2}}

    def query(self, node, start, end, l, r):
        if r < start or end < l:
            return 0
        if l <= start and end <= r:
            return self.tree[node]
        mid = (start + end) // 2
        return (self.query(2 * node + 1, start, mid, l, r) +
                self.query(2 * node + 2, mid + 1, end, l, r))`,
        blanks: [
          { id: 0, answer: '4 * self.n' },
          { id: 1, answer: '2 * node + 1' },
          { id: 2, answer: 'self.tree[2 * node + 1] + self.tree[2 * node + 2]' },
        ],
      },
      java: {
        template: `class SegmentTree {
    int[] tree;
    int n;

    SegmentTree(int[] arr) {
        n = arr.length;
        tree = new int[{{0}}];
        build(arr, 0, 0, n - 1);
    }

    void build(int[] arr, int node, int start, int end) {
        if (start == end) { tree[node] = arr[start]; return; }
        int mid = (start + end) / 2;
        build(arr, {{1}}, start, mid);
        build(arr, 2 * node + 2, mid + 1, end);
        tree[node] = {{2}};
    }

    int query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) return 0;
        if (l <= start && end <= r) return tree[node];
        int mid = (start + end) / 2;
        return query(2 * node + 1, start, mid, l, r) +
               query(2 * node + 2, mid + 1, end, l, r);
    }
}`,
        blanks: [
          { id: 0, answer: '4 * n' },
          { id: 1, answer: '2 * node + 1' },
          { id: 2, answer: 'tree[2 * node + 1] + tree[2 * node + 2]' },
        ],
      },
      cpp: {
        template: `class SegmentTree {
    vector<int> tree;
    int n;
public:
    SegmentTree(vector<int>& arr) : n(arr.size()), tree({{0}}, 0) {
        build(arr, 0, 0, n - 1);
    }

    void build(vector<int>& arr, int node, int start, int end) {
        if (start == end) { tree[node] = arr[start]; return; }
        int mid = (start + end) / 2;
        build(arr, {{1}}, start, mid);
        build(arr, 2 * node + 2, mid + 1, end);
        tree[node] = {{2}};
    }

    int query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) return 0;
        if (l <= start && end <= r) return tree[node];
        int mid = (start + end) / 2;
        return query(2 * node + 1, start, mid, l, r) +
               query(2 * node + 2, mid + 1, end, l, r);
    }
};`,
        blanks: [
          { id: 0, answer: '4 * n' },
          { id: 1, answer: '2 * node + 1' },
          { id: 2, answer: 'tree[2 * node + 1] + tree[2 * node + 2]' },
        ],
      },
    },
  },
  {
    id: 'fenwick-tree',
    name: 'Fenwick Tree (BIT)',
    category: 'algorithms',
    difficulty: 'hard',
    complexityRank: 3,
    description: 'Uses binary representation of indices for efficient prefix sum queries.',
    snippets: {
      python: {
        template: `class FenwickTree:
    def __init__(self, n):
        self.n = n
        self.tree = [0] * (n + 1)

    def update(self, i, delta):
        while i <= self.n:
            self.tree[i] += delta
            i += {{0}}

    def prefix_sum(self, i):
        total = 0
        while i > 0:
            total += self.tree[i]
            i -= {{1}}
        return total

    def range_sum(self, l, r):
        return self.prefix_sum(r) - {{2}}`,
        blanks: [
          { id: 0, answer: 'i & (-i)' },
          { id: 1, answer: 'i & (-i)' },
          { id: 2, answer: 'self.prefix_sum(l - 1)' },
        ],
      },
      java: {
        template: `class FenwickTree {
    int[] tree;
    int n;

    FenwickTree(int n) { this.n = n; tree = new int[n + 1]; }

    void update(int i, int delta) {
        for (; i <= n; i += {{0}}) tree[i] += delta;
    }

    int prefixSum(int i) {
        int total = 0;
        for (; i > 0; i -= {{1}}) total += tree[i];
        return total;
    }

    int rangeSum(int l, int r) {
        return prefixSum(r) - {{2}};
    }
}`,
        blanks: [
          { id: 0, answer: 'i & (-i)' },
          { id: 1, answer: 'i & (-i)' },
          { id: 2, answer: 'prefixSum(l - 1)' },
        ],
      },
      cpp: {
        template: `class FenwickTree {
    vector<int> tree;
    int n;
public:
    FenwickTree(int n) : n(n), tree(n + 1, 0) {}

    void update(int i, int delta) {
        for (; i <= n; i += {{0}}) tree[i] += delta;
    }

    int prefixSum(int i) {
        int total = 0;
        for (; i > 0; i -= {{1}}) total += tree[i];
        return total;
    }

    int rangeSum(int l, int r) {
        return prefixSum(r) - {{2}};
    }
};`,
        blanks: [
          { id: 0, answer: 'i & (-i)' },
          { id: 1, answer: 'i & (-i)' },
          { id: 2, answer: 'prefixSum(l - 1)' },
        ],
      },
    },
  },
  {
    id: 'kruskal',
    name: "Kruskal's Algorithm",
    category: 'algorithms',
    difficulty: 'hard',
    complexityRank: 8,
    description: "Sorts edges by weight and adds them if they don't form a cycle (Union-Find).",
    snippets: {
      python: {
        template: `def kruskal(edges, n):
    edges.sort(key=lambda e: {{0}})
    parent = list(range(n))
    rank = [0] * n

    def find(x):
        if parent[x] != x:
            parent[x] = find(parent[x])
        return parent[x]

    def union(x, y):
        rx, ry = find(x), find(y)
        if rx == ry:
            return False
        if rank[rx] < rank[ry]: rx, ry = ry, rx
        parent[ry] = rx
        if rank[rx] == rank[ry]: rank[rx] += 1
        return True

    mst, total = [], 0
    for u, v, w in edges:
        if {{1}}:
            mst.append((u, v, w))
            total += w
    return mst, total`,
        blanks: [
          { id: 0, answer: 'e[2]' },
          { id: 1, answer: 'union(u, v)' },
        ],
      },
      java: {
        template: `static List<int[]> kruskal(int[][] edges, int n) {
    Arrays.sort(edges, Comparator.comparingInt(e -> {{0}}));
    int[] parent = new int[n], rank = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;

    // find with path compression
    // union by rank omitted for brevity

    List<int[]> mst = new ArrayList<>();
    int total = 0;
    for (int[] e : edges) {
        int pu = find(parent, e[0]), pv = find(parent, e[1]);
        if (pu != pv) {
            parent[pu] = pv;
            mst.add({{1}});
            total += e[2];
        }
    }
    return mst;
}

static int find(int[] parent, int x) {
    if (parent[x] != x) parent[x] = find(parent, parent[x]);
    return parent[x];
}`,
        blanks: [
          { id: 0, answer: 'e[2]' },
          { id: 1, answer: 'e' },
        ],
      },
      cpp: {
        template: `int find(vector<int>& parent, int x) {
    if (parent[x] != x) parent[x] = find(parent, parent[x]);
    return parent[x];
}

pair<vector<tuple<int,int,int>>, int> kruskal(
        vector<tuple<int,int,int>> edges, int n) {
    sort(edges.begin(), edges.end(),
         [](auto& a, auto& b){ return {{0}}; });
    vector<int> parent(n), rnk(n, 0);
    iota(parent.begin(), parent.end(), 0);

    vector<tuple<int,int,int>> mst;
    int total = 0;
    for (auto [u, v, w] : edges) {
        int pu = find(parent, u), pv = find(parent, v);
        if (pu != pv) {
            parent[pu] = pv;
            mst.push_back({{1}});
            total += w;
        }
    }
    return {mst, total};
}`,
        blanks: [
          { id: 0, answer: 'get<2>(a) < get<2>(b)' },
          { id: 1, answer: '{u, v, w}' },
        ],
      },
    },
  },
  {
    id: 'prim',
    name: "Prim's Algorithm",
    category: 'algorithms',
    difficulty: 'hard',
    complexityRank: 8,
    description: 'Grows MST by always adding the cheapest edge connecting tree to non-tree vertex.',
    snippets: {
      python: {
        template: `import heapq

def prim(graph, start=0):
    visited = set()
    pq = [(0, start, -1)]
    mst, total = [], 0
    while pq and len(visited) < len(graph):
        cost, u, parent = {{0}}
        if u in visited:
            continue
        {{1}}
        if parent != -1:
            mst.append((parent, u, cost))
            total += cost
        for v, w in graph[u]:
            if {{2}}:
                heapq.heappush(pq, (w, v, u))
    return mst, total`,
        blanks: [
          { id: 0, answer: 'heapq.heappop(pq)' },
          { id: 1, answer: 'visited.add(u)' },
          { id: 2, answer: 'v not in visited' },
        ],
      },
      java: {
        template: `static List<int[]> prim(Map<Integer, List<int[]>> graph, int start) {
    Set<Integer> visited = new HashSet<>();
    PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
    pq.add(new int[]{0, start, -1});
    List<int[]> mst = new ArrayList<>();
    int total = 0;
    while (!pq.isEmpty() && visited.size() < graph.size()) {
        int[] curr = {{0}};
        int cost = curr[0], u = curr[1], parent = curr[2];
        if (visited.contains(u)) continue;
        {{1}};
        if (parent != -1) { mst.add(new int[]{parent, u, cost}); total += cost; }
        for (int[] edge : graph.get(u)) {
            if ({{2}}) pq.add(new int[]{edge[1], edge[0], u});
        }
    }
    return mst;
}`,
        blanks: [
          { id: 0, answer: 'pq.poll()' },
          { id: 1, answer: 'visited.add(u)' },
          { id: 2, answer: '!visited.contains(edge[0])' },
        ],
      },
      cpp: {
        template: `pair<vector<tuple<int,int,int>>, int> prim(
        unordered_map<int, vector<pair<int,int>>>& graph, int start) {
    unordered_set<int> visited;
    priority_queue<tuple<int,int,int>, vector<tuple<int,int,int>>, greater<>> pq;
    pq.push({0, start, -1});
    vector<tuple<int,int,int>> mst;
    int total = 0;
    while (!pq.empty() && visited.size() < graph.size()) {
        auto [cost, u, parent] = {{0}};
        pq.pop();
        if (visited.count(u)) continue;
        {{1}};
        if (parent != -1) { mst.push_back({parent, u, cost}); total += cost; }
        for (auto [v, w] : graph[u]) {
            if ({{2}}) pq.push({w, v, u});
        }
    }
    return {mst, total};
}`,
        blanks: [
          { id: 0, answer: 'pq.top()' },
          { id: 1, answer: 'visited.insert(u)' },
          { id: 2, answer: '!visited.count(v)' },
        ],
      },
    },
  },
  {
    id: 'bellman-ford',
    name: 'Bellman-Ford Algorithm',
    category: 'algorithms',
    difficulty: 'hard',
    complexityRank: 10,
    description: 'Relaxes all edges V-1 times to find shortest paths, detects negative cycles.',
    snippets: {
      python: {
        template: `def bellman_ford(edges, n, src):
    dist = [float('inf')] * n
    dist[src] = {{0}}
    for _ in range(n - 1):
        for u, v, w in edges:
            if dist[u] != float('inf') and {{1}}:
                dist[v] = {{2}}
    for u, v, w in edges:
        if dist[u] != float('inf') and dist[u] + w < dist[v]:
            return None  # negative cycle detected
    return dist`,
        blanks: [
          { id: 0, answer: '0' },
          { id: 1, answer: 'dist[u] + w < dist[v]' },
          { id: 2, answer: 'dist[u] + w' },
        ],
      },
      java: {
        template: `static int[] bellmanFord(int[][] edges, int n, int src) {
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[src] = {{0}};
    for (int i = 0; i < n - 1; i++) {
        for (int[] e : edges) {
            if (dist[e[0]] != Integer.MAX_VALUE && {{1}})
                dist[e[1]] = {{2}};
        }
    }
    for (int[] e : edges) {
        if (dist[e[0]] != Integer.MAX_VALUE && dist[e[0]] + e[2] < dist[e[1]])
            return null; // negative cycle
    }
    return dist;
}`,
        blanks: [
          { id: 0, answer: '0' },
          { id: 1, answer: 'dist[e[0]] + e[2] < dist[e[1]]' },
          { id: 2, answer: 'dist[e[0]] + e[2]' },
        ],
      },
      cpp: {
        template: `vector<int> bellmanFord(vector<tuple<int,int,int>>& edges, int n, int src) {
    vector<int> dist(n, INT_MAX);
    dist[src] = {{0}};
    for (int i = 0; i < n - 1; i++) {
        for (auto [u, v, w] : edges) {
            if (dist[u] != INT_MAX && {{1}})
                dist[v] = {{2}};
        }
    }
    for (auto [u, v, w] : edges) {
        if (dist[u] != INT_MAX && dist[u] + w < dist[v]) return {}; // negative cycle
    }
    return dist;
}`,
        blanks: [
          { id: 0, answer: '0' },
          { id: 1, answer: 'dist[u] + w < dist[v]' },
          { id: 2, answer: 'dist[u] + w' },
        ],
      },
    },
  },
  {
    id: 'quick-select',
    name: 'Quick Select',
    category: 'algorithms',
    difficulty: 'hard',
    complexityRank: 10,
    description: 'Partition-based selection to find kth smallest element in average O(n).',
    snippets: {
      python: {
        template: `def quick_select(arr, k):
    def partition(low, high):
        pivot = arr[high]
        i = low
        for j in range(low, high):
            if arr[j] <= pivot:
                arr[i], arr[j] = arr[j], arr[i]
                i += 1
        arr[i], arr[high] = arr[high], arr[i]
        return i

    left, right = 0, len(arr) - 1
    while left <= right:
        pi = partition(left, right)
        if pi == {{0}}:
            return arr[pi]
        elif pi < k:
            left = {{1}}
        else:
            right = {{2}}`,
        blanks: [
          { id: 0, answer: 'k' },
          { id: 1, answer: 'pi + 1' },
          { id: 2, answer: 'pi - 1' },
        ],
      },
      java: {
        template: `static int partition(int[] arr, int low, int high) {
    int pivot = arr[high], i = low;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) { int t = arr[i]; arr[i] = arr[j]; arr[j] = t; i++; }
    }
    int t = arr[i]; arr[i] = arr[high]; arr[high] = t;
    return i;
}

static int quickSelect(int[] arr, int k) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int pi = partition(arr, left, right);
        if (pi == {{0}}) return arr[pi];
        else if (pi < k) left = {{1}};
        else right = {{2}};
    }
    return -1;
}`,
        blanks: [
          { id: 0, answer: 'k' },
          { id: 1, answer: 'pi + 1' },
          { id: 2, answer: 'pi - 1' },
        ],
      },
      cpp: {
        template: `int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high], i = low;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) swap(arr[i++], arr[j]);
    }
    swap(arr[i], arr[high]);
    return i;
}

int quickSelect(vector<int>& arr, int k) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int pi = partition(arr, left, right);
        if (pi == {{0}}) return arr[pi];
        else if (pi < k) left = {{1}};
        else right = {{2}};
    }
    return -1;
}`,
        blanks: [
          { id: 0, answer: 'k' },
          { id: 1, answer: 'pi + 1' },
          { id: 2, answer: 'pi - 1' },
        ],
      },
    },
  },
  {
    id: 'tarjan-scc',
    name: "Tarjan's SCC Algorithm",
    category: 'algorithms',
    difficulty: 'hard',
    complexityRank: 6,
    description: 'DFS with a stack to find all strongly connected components.',
    snippets: {
      python: {
        template: `def tarjan_scc(graph):
    n = len(graph)
    index_counter = [0]
    index = {}; lowlink = {}
    on_stack = {}; stack = []
    sccs = []

    def strongconnect(v):
        index[v] = lowlink[v] = {{0}}
        index_counter[0] += 1
        stack.append(v); on_stack[v] = True
        for w in graph[v]:
            if w not in index:
                strongconnect(w)
                lowlink[v] = {{1}}
            elif on_stack.get(w):
                lowlink[v] = min(lowlink[v], index[w])
        if lowlink[v] == index[v]:
            scc = []
            while True:
                w = stack.pop(); on_stack[w] = False
                scc.append(w)
                if {{2}}: break
            sccs.append(scc)

    for v in range(n):
        if v not in index:
            strongconnect(v)
    return sccs`,
        blanks: [
          { id: 0, answer: 'index_counter[0]' },
          { id: 1, answer: 'min(lowlink[v], lowlink[w])' },
          { id: 2, answer: 'w == v' },
        ],
      },
      java: {
        template: `static List<List<Integer>> tarjanScc(List<List<Integer>> graph) {
    int n = graph.size();
    int[] index = new int[n], lowlink = new int[n];
    boolean[] onStack = new boolean[n];
    Arrays.fill(index, -1);
    Deque<Integer> stack = new ArrayDeque<>();
    List<List<Integer>> sccs = new ArrayList<>();
    int[] counter = {0};

    for (int v = 0; v < n; v++) {
        if (index[v] == -1) strongconnect(graph, v, index, lowlink, onStack, stack, sccs, counter);
    }
    return sccs;
}

static void strongconnect(List<List<Integer>> graph, int v,
        int[] index, int[] lowlink, boolean[] onStack,
        Deque<Integer> stack, List<List<Integer>> sccs, int[] counter) {
    index[v] = lowlink[v] = {{0}};
    stack.push(v); onStack[v] = true;
    for (int w : graph.get(v)) {
        if (index[w] == -1) {
            strongconnect(graph, w, index, lowlink, onStack, stack, sccs, counter);
            lowlink[v] = {{1}};
        } else if (onStack[w]) {
            lowlink[v] = Math.min(lowlink[v], index[w]);
        }
    }
    if (lowlink[v] == index[v]) {
        List<Integer> scc = new ArrayList<>();
        int w;
        do { w = stack.pop(); onStack[w] = false; scc.add(w); } while ({{2}});
        sccs.add(scc);
    }
}`,
        blanks: [
          { id: 0, answer: 'counter[0]++' },
          { id: 1, answer: 'Math.min(lowlink[v], lowlink[w])' },
          { id: 2, answer: 'w != v' },
        ],
      },
      cpp: {
        template: `void strongconnect(vector<vector<int>>& graph, int v,
        vector<int>& index, vector<int>& lowlink, vector<bool>& onStack,
        stack<int>& st, vector<vector<int>>& sccs, int& counter) {
    index[v] = lowlink[v] = {{0}};
    st.push(v); onStack[v] = true;
    for (int w : graph[v]) {
        if (index[w] == -1) {
            strongconnect(graph, w, index, lowlink, onStack, st, sccs, counter);
            lowlink[v] = {{1}};
        } else if (onStack[w]) {
            lowlink[v] = min(lowlink[v], index[w]);
        }
    }
    if (lowlink[v] == index[v]) {
        vector<int> scc;
        int w;
        do { w = st.top(); st.pop(); onStack[w] = false; scc.push_back(w); } while ({{2}});
        sccs.push_back(scc);
    }
}`,
        blanks: [
          { id: 0, answer: 'counter++' },
          { id: 1, answer: 'min(lowlink[v], lowlink[w])' },
          { id: 2, answer: 'w != v' },
        ],
      },
    },
  },
  {
    id: 'a-star',
    name: 'A* Search Algorithm',
    category: 'algorithms',
    difficulty: 'hard',
    complexityRank: 8,
    description: "Combines Dijkstra's with a heuristic to guide search toward goal.",
    snippets: {
      python: {
        template: `import heapq

def a_star(graph, start, goal, heuristic):
    open_set = [({{0}}, start)]
    g_score = {start: 0}
    came_from = {}
    while open_set:
        _, current = heapq.heappop(open_set)
        if current == goal:
            path = []
            while current in came_from:
                path.append(current)
                current = came_from[current]
            return [start] + path[::-1]
        for neighbor, cost in graph[current]:
            tentative_g = {{1}}
            if tentative_g < g_score.get(neighbor, float('inf')):
                came_from[neighbor] = current
                g_score[neighbor] = tentative_g
                f = tentative_g + {{2}}
                heapq.heappush(open_set, (f, neighbor))
    return None`,
        blanks: [
          { id: 0, answer: 'heuristic(start, goal)' },
          { id: 1, answer: 'g_score[current] + cost' },
          { id: 2, answer: 'heuristic(neighbor, goal)' },
        ],
      },
      java: {
        template: `static List<Integer> aStar(Map<Integer, List<int[]>> graph,
        int start, int goal, BiFunction<Integer, Integer, Integer> heuristic) {
    Map<Integer, Integer> gScore = new HashMap<>();
    gScore.put(start, 0);
    Map<Integer, Integer> cameFrom = new HashMap<>();
    PriorityQueue<int[]> open = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
    open.add(new int[]{{{0}}, start});
    while (!open.isEmpty()) {
        int current = open.poll()[1];
        if (current == goal) {
            List<Integer> path = new ArrayList<>();
            while (cameFrom.containsKey(current)) {
                path.add(0, current); current = cameFrom.get(current);
            }
            path.add(0, start); return path;
        }
        for (int[] edge : graph.getOrDefault(current, List.of())) {
            int neighbor = edge[0], cost = edge[1];
            int tentativeG = {{1}};
            if (tentativeG < gScore.getOrDefault(neighbor, Integer.MAX_VALUE)) {
                cameFrom.put(neighbor, current);
                gScore.put(neighbor, tentativeG);
                open.add(new int[]{tentativeG + {{2}}, neighbor});
            }
        }
    }
    return null;
}`,
        blanks: [
          { id: 0, answer: 'heuristic.apply(start, goal)' },
          { id: 1, answer: 'gScore.get(current) + cost' },
          { id: 2, answer: 'heuristic.apply(neighbor, goal)' },
        ],
      },
      cpp: {
        template: `vector<int> aStar(unordered_map<int, vector<pair<int,int>>>& graph,
        int start, int goal, function<int(int,int)> heuristic) {
    unordered_map<int,int> gScore;
    gScore[start] = 0;
    unordered_map<int,int> cameFrom;
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> open;
    open.push({{{0}}, start});
    while (!open.empty()) {
        auto [f, current] = open.top(); open.pop();
        if (current == goal) {
            vector<int> path;
            while (cameFrom.count(current)) { path.push_back(current); current = cameFrom[current]; }
            path.push_back(start); reverse(path.begin(), path.end()); return path;
        }
        for (auto [neighbor, cost] : graph[current]) {
            int tentativeG = {{1}};
            if (!gScore.count(neighbor) || tentativeG < gScore[neighbor]) {
                cameFrom[neighbor] = current;
                gScore[neighbor] = tentativeG;
                open.push({tentativeG + {{2}}, neighbor});
            }
        }
    }
    return {};
}`,
        blanks: [
          { id: 0, answer: 'heuristic(start, goal)' },
          { id: 1, answer: 'gScore[current] + cost' },
          { id: 2, answer: 'heuristic(neighbor, goal)' },
        ],
      },
    },
  },
  {
    id: 'manacher',
    name: "Manacher's Algorithm",
    category: 'algorithms',
    difficulty: 'hard',
    complexityRank: 6,
    description: 'Finds all palindromic substrings in linear time using symmetry.',
    snippets: {
      python: {
        template: `def manacher(s):
    t = '#' + '#'.join(s) + '#'
    n = len(t)
    p = [0] * n
    c = r = 0
    for i in range(n):
        mirror = {{0}}
        if i < r:
            p[i] = min(r - i, p[mirror])
        while (i + p[i] + 1 < n and i - p[i] - 1 >= 0
               and t[i + p[i] + 1] == {{1}}):
            p[i] += 1
        if i + p[i] > r:
            c, r = i, {{2}}
    max_len = max(p)
    center = p.index(max_len)
    start = (center - max_len) // 2
    return s[start: start + max_len]`,
        blanks: [
          { id: 0, answer: '2 * c - i' },
          { id: 1, answer: 't[i - p[i] - 1]' },
          { id: 2, answer: 'i + p[i]' },
        ],
      },
      java: {
        template: `static String manacher(String s) {
    String t = "#" + String.join("#", s.split("")) + "#";
    int n = t.length();
    int[] p = new int[n];
    int c = 0, r = 0;
    for (int i = 0; i < n; i++) {
        int mirror = {{0}};
        if (i < r) p[i] = Math.min(r - i, p[mirror]);
        while (i + p[i] + 1 < n && i - p[i] - 1 >= 0
               && t.charAt(i + p[i] + 1) == {{1}})
            p[i]++;
        if (i + p[i] > r) { c = i; r = {{2}}; }
    }
    int maxLen = 0, center = 0;
    for (int i = 0; i < n; i++) if (p[i] > maxLen) { maxLen = p[i]; center = i; }
    int start = (center - maxLen) / 2;
    return s.substring(start, start + maxLen);
}`,
        blanks: [
          { id: 0, answer: '2 * c - i' },
          { id: 1, answer: 't.charAt(i - p[i] - 1)' },
          { id: 2, answer: 'i + p[i]' },
        ],
      },
      cpp: {
        template: `string manacher(string s) {
    string t = "#";
    for (char c : s) { t += c; t += '#'; }
    int n = t.size();
    vector<int> p(n, 0);
    int c = 0, r = 0;
    for (int i = 0; i < n; i++) {
        int mirror = {{0}};
        if (i < r) p[i] = min(r - i, p[mirror]);
        while (i + p[i] + 1 < n && i - p[i] - 1 >= 0
               && t[i + p[i] + 1] == {{1}})
            p[i]++;
        if (i + p[i] > r) { c = i; r = {{2}}; }
    }
    int maxLen = *max_element(p.begin(), p.end());
    int center = max_element(p.begin(), p.end()) - p.begin();
    int start = (center - maxLen) / 2;
    return s.substr(start, maxLen);
}`,
        blanks: [
          { id: 0, answer: '2 * c - i' },
          { id: 1, answer: 't[i - p[i] - 1]' },
          { id: 2, answer: 'i + p[i]' },
        ],
      },
    },
  },
  {
    id: 'rabin-karp',
    name: 'Rabin-Karp Algorithm',
    category: 'algorithms',
    difficulty: 'hard',
    complexityRank: 10,
    description: 'Uses rolling hash to find pattern in text, checking hash matches first.',
    snippets: {
      python: {
        template: `def rabin_karp(text, pattern, base=256, mod=101):
    n, m = len(text), len(pattern)
    h = {{0}}
    p_hash = t_hash = 0
    for i in range(m):
        p_hash = (base * p_hash + ord(pattern[i])) % mod
        t_hash = (base * t_hash + ord(text[i])) % mod
    results = []
    for i in range(n - m + 1):
        if p_hash == t_hash and text[i:i + m] == pattern:
            results.append(i)
        if i < n - m:
            t_hash = ({{1}} - ord(text[i]) * h + ord(text[i + m])) % mod
            t_hash = {{2}}
    return results`,
        blanks: [
          { id: 0, answer: 'pow(base, m - 1, mod)' },
          { id: 1, answer: 'base * t_hash' },
          { id: 2, answer: '(t_hash + mod) % mod' },
        ],
      },
      java: {
        template: `static List<Integer> rabinKarp(String text, String pattern, int base, int mod) {
    int n = text.length(), m = pattern.length();
    long h = 1;
    for (int i = 0; i < m - 1; i++) h = (h * base) % mod;
    long pHash = 0, tHash = 0;
    for (int i = 0; i < m; i++) {
        pHash = (base * pHash + pattern.charAt(i)) % mod;
        tHash = ({{0}}) % mod;
    }
    List<Integer> results = new ArrayList<>();
    for (int i = 0; i <= n - m; i++) {
        if (pHash == tHash && text.substring(i, i + m).equals(pattern)) results.add(i);
        if (i < n - m) {
            tHash = (base * ({{1}}) + text.charAt(i + m)) % mod;
            tHash = {{2}};
        }
    }
    return results;
}`,
        blanks: [
          { id: 0, answer: 'base * tHash + text.charAt(i)' },
          { id: 1, answer: 'tHash - text.charAt(i) * h' },
          { id: 2, answer: '(tHash + mod) % mod' },
        ],
      },
      cpp: {
        template: `vector<int> rabinKarp(string& text, string& pattern, int base, int mod) {
    int n = text.size(), m = pattern.size();
    long h = 1;
    for (int i = 0; i < m - 1; i++) h = (h * base) % mod;
    long pHash = 0, tHash = 0;
    for (int i = 0; i < m; i++) {
        pHash = (base * pHash + pattern[i]) % mod;
        tHash = ({{0}}) % mod;
    }
    vector<int> results;
    for (int i = 0; i <= n - m; i++) {
        if (pHash == tHash && text.substr(i, m) == pattern) results.push_back(i);
        if (i < n - m) {
            tHash = (base * ({{1}}) + text[i + m]) % mod;
            tHash = {{2}};
        }
    }
    return results;
}`,
        blanks: [
          { id: 0, answer: 'base * tHash + text[i]' },
          { id: 1, answer: 'tHash - text[i] * h' },
          { id: 2, answer: '(tHash + mod) % mod' },
        ],
      },
    },
  },
]
