export const easyAlgorithms = [
  {
    id: 'linear-search',
    name: 'Linear Search',
    category: 'algorithms',
    difficulty: 'easy',
    complexityRank: 6,
    description: 'Scans each element one by one until the target is found.',
    snippets: {
      python: {
        template: `def linear_search(arr, target):
    for i, val in enumerate(arr):
        if {{0}}:
            return {{1}}
    return {{2}}`,
        blanks: [
          { id: 0, answer: 'val == target' },
          { id: 1, answer: 'i' },
          { id: 2, answer: '-1' },
        ],
      },
      java: {
        template: `static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if ({{0}}) return {{1}};
    }
    return {{2}};
}`,
        blanks: [
          { id: 0, answer: 'arr[i] == target' },
          { id: 1, answer: 'i' },
          { id: 2, answer: '-1' },
        ],
      },
      cpp: {
        template: `int linearSearch(vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if ({{0}}) return {{1}};
    }
    return {{2}};
}`,
        blanks: [
          { id: 0, answer: 'arr[i] == target' },
          { id: 1, answer: 'i' },
          { id: 2, answer: '-1' },
        ],
      },
    },
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'algorithms',
    difficulty: 'easy',
    complexityRank: 3,
    description: 'Repeatedly halves the search space on a sorted array.',
    snippets: {
      python: {
        template: `def binary_search(arr, target):
    left, right = 0, {{0}}
    while {{1}}:
        mid = {{2}}
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = {{3}}
        else:
            right = mid - 1
    return -1`,
        blanks: [
          { id: 0, answer: 'len(arr) - 1' },
          { id: 1, answer: 'left <= right' },
          { id: 2, answer: '(left + right) // 2' },
          { id: 3, answer: 'mid + 1' },
        ],
      },
      java: {
        template: `static int binarySearch(int[] arr, int target) {
    int left = 0, right = {{0}};
    while ({{1}}) {
        int mid = {{2}};
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = {{3}};
        else right = mid - 1;
    }
    return -1;
}`,
        blanks: [
          { id: 0, answer: 'arr.length - 1' },
          { id: 1, answer: 'left <= right' },
          { id: 2, answer: '(left + right) / 2' },
          { id: 3, answer: 'mid + 1' },
        ],
      },
      cpp: {
        template: `int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = {{0}};
    while ({{1}}) {
        int mid = {{2}};
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = {{3}};
        else right = mid - 1;
    }
    return -1;
}`,
        blanks: [
          { id: 0, answer: 'arr.size() - 1' },
          { id: 1, answer: 'left <= right' },
          { id: 2, answer: '(left + right) / 2' },
          { id: 3, answer: 'mid + 1' },
        ],
      },
    },
  },
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'algorithms',
    difficulty: 'easy',
    complexityRank: 10,
    description: 'Repeatedly swaps adjacent elements if they are in the wrong order.',
    snippets: {
      python: {
        template: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range({{0}}):
            if {{1}}:
                arr[j], arr[j + 1] = {{2}}
    return arr`,
        blanks: [
          { id: 0, answer: 'n - i - 1' },
          { id: 1, answer: 'arr[j] > arr[j + 1]' },
          { id: 2, answer: 'arr[j + 1], arr[j]' },
        ],
      },
      java: {
        template: `static int[] bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < {{0}}; j++) {
            if ({{1}}) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = {{2}};
            }
        }
    }
    return arr;
}`,
        blanks: [
          { id: 0, answer: 'n - i - 1' },
          { id: 1, answer: 'arr[j] > arr[j + 1]' },
          { id: 2, answer: 'temp' },
        ],
      },
      cpp: {
        template: `vector<int> bubbleSort(vector<int> arr) {
    int n = arr.size();
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < {{0}}; j++) {
            if ({{1}}) swap(arr[j], {{2}});
        }
    }
    return arr;
}`,
        blanks: [
          { id: 0, answer: 'n - i - 1' },
          { id: 1, answer: 'arr[j] > arr[j + 1]' },
          { id: 2, answer: 'arr[j + 1]' },
        ],
      },
    },
  },
  {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    category: 'algorithms',
    difficulty: 'easy',
    complexityRank: 10,
    description: 'Builds sorted array one item at a time by inserting into correct position.',
    snippets: {
      python: {
        template: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = {{0}}
        j = i - 1
        while j >= 0 and {{1}}:
            arr[j + 1] = arr[j]
            j -= 1
        arr[{{2}}] = key
    return arr`,
        blanks: [
          { id: 0, answer: 'arr[i]' },
          { id: 1, answer: 'arr[j] > key' },
          { id: 2, answer: 'j + 1' },
        ],
      },
      java: {
        template: `static int[] insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = {{0}};
        int j = i - 1;
        while (j >= 0 && {{1}}) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[{{2}}] = key;
    }
    return arr;
}`,
        blanks: [
          { id: 0, answer: 'arr[i]' },
          { id: 1, answer: 'arr[j] > key' },
          { id: 2, answer: 'j + 1' },
        ],
      },
      cpp: {
        template: `vector<int> insertionSort(vector<int> arr) {
    for (int i = 1; i < arr.size(); i++) {
        int key = {{0}};
        int j = i - 1;
        while (j >= 0 && {{1}}) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[{{2}}] = key;
    }
    return arr;
}`,
        blanks: [
          { id: 0, answer: 'arr[i]' },
          { id: 1, answer: 'arr[j] > key' },
          { id: 2, answer: 'j + 1' },
        ],
      },
    },
  },
  {
    id: 'selection-sort',
    name: 'Selection Sort',
    category: 'algorithms',
    difficulty: 'easy',
    complexityRank: 10,
    description: 'Finds the minimum element and places it at the beginning each pass.',
    snippets: {
      python: {
        template: `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = {{0}}
        for j in range(i + 1, n):
            if {{1}}:
                min_idx = j
        arr[i], arr[min_idx] = {{2}}
    return arr`,
        blanks: [
          { id: 0, answer: 'i' },
          { id: 1, answer: 'arr[j] < arr[min_idx]' },
          { id: 2, answer: 'arr[min_idx], arr[i]' },
        ],
      },
      java: {
        template: `static int[] selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n; i++) {
        int minIdx = {{0}};
        for (int j = i + 1; j < n; j++) {
            if ({{1}}) minIdx = j;
        }
        int temp = arr[i]; arr[i] = arr[minIdx]; arr[minIdx] = {{2}};
    }
    return arr;
}`,
        blanks: [
          { id: 0, answer: 'i' },
          { id: 1, answer: 'arr[j] < arr[minIdx]' },
          { id: 2, answer: 'temp' },
        ],
      },
      cpp: {
        template: `vector<int> selectionSort(vector<int> arr) {
    int n = arr.size();
    for (int i = 0; i < n; i++) {
        int minIdx = {{0}};
        for (int j = i + 1; j < n; j++) {
            if ({{1}}) minIdx = j;
        }
        swap(arr[i], {{2}});
    }
    return arr;
}`,
        blanks: [
          { id: 0, answer: 'i' },
          { id: 1, answer: 'arr[j] < arr[minIdx]' },
          { id: 2, answer: 'arr[minIdx]' },
        ],
      },
    },
  },
  {
    id: 'fibonacci-memoization',
    name: 'Fibonacci (Memoization)',
    category: 'algorithms',
    difficulty: 'easy',
    complexityRank: 6,
    description: 'Stores previously computed Fibonacci values to avoid recomputation.',
    snippets: {
      python: {
        template: `def fib(n, memo=None):
    if memo is None:
        memo = {}
    if {{0}}:
        return n
    if n in memo:
        return {{1}}
    memo[n] = {{2}}
    return memo[n]`,
        blanks: [
          { id: 0, answer: 'n <= 1' },
          { id: 1, answer: 'memo[n]' },
          { id: 2, answer: 'fib(n - 1, memo) + fib(n - 2, memo)' },
        ],
      },
      java: {
        template: `static int fib(int n, Map<Integer, Integer> memo) {
    if ({{0}}) return n;
    if (memo.containsKey(n)) return {{1}};
    memo.put(n, {{2}});
    return memo.get(n);
}`,
        blanks: [
          { id: 0, answer: 'n <= 1' },
          { id: 1, answer: 'memo.get(n)' },
          { id: 2, answer: 'fib(n - 1, memo) + fib(n - 2, memo)' },
        ],
      },
      cpp: {
        template: `int fib(int n, unordered_map<int,int>& memo) {
    if ({{0}}) return n;
    if (memo.count(n)) return {{1}};
    memo[n] = {{2}};
    return memo[n];
}`,
        blanks: [
          { id: 0, answer: 'n <= 1' },
          { id: 1, answer: 'memo[n]' },
          { id: 2, answer: 'fib(n - 1, memo) + fib(n - 2, memo)' },
        ],
      },
    },
  },
  {
    id: 'dfs',
    name: 'Depth-First Search (DFS)',
    category: 'algorithms',
    difficulty: 'easy',
    complexityRank: 6,
    description: 'Explores as far as possible along each branch before backtracking.',
    snippets: {
      python: {
        template: `def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    {{0}}
    for neighbor in graph[start]:
        if {{1}}:
            dfs(graph, neighbor, visited)
    return visited`,
        blanks: [
          { id: 0, answer: 'visited.add(start)' },
          { id: 1, answer: 'neighbor not in visited' },
        ],
      },
      java: {
        template: `static void dfs(Map<Integer, List<Integer>> graph,
                    int start, Set<Integer> visited) {
    {{0}};
    for (int neighbor : graph.get(start)) {
        if ({{1}}) dfs(graph, neighbor, visited);
    }
}`,
        blanks: [
          { id: 0, answer: 'visited.add(start)' },
          { id: 1, answer: '!visited.contains(neighbor)' },
        ],
      },
      cpp: {
        template: `void dfs(unordered_map<int, vector<int>>& graph,
         int start, unordered_set<int>& visited) {
    {{0}};
    for (int neighbor : graph[start]) {
        if ({{1}}) dfs(graph, neighbor, visited);
    }
}`,
        blanks: [
          { id: 0, answer: 'visited.insert(start)' },
          { id: 1, answer: '!visited.count(neighbor)' },
        ],
      },
    },
  },
  {
    id: 'bfs',
    name: 'Breadth-First Search (BFS)',
    category: 'algorithms',
    difficulty: 'easy',
    complexityRank: 6,
    description: 'Explores all neighbors at present depth before moving to next level.',
    snippets: {
      python: {
        template: `from collections import deque

def bfs(graph, start):
    visited = {start}
    queue = {{0}}
    while queue:
        node = {{1}}
        for neighbor in graph[node]:
            if {{2}}:
                visited.add(neighbor)
                queue.append(neighbor)
    return visited`,
        blanks: [
          { id: 0, answer: 'deque([start])' },
          { id: 1, answer: 'queue.popleft()' },
          { id: 2, answer: 'neighbor not in visited' },
        ],
      },
      java: {
        template: `static Set<Integer> bfs(Map<Integer, List<Integer>> graph, int start) {
    Set<Integer> visited = new HashSet<>();
    visited.add(start);
    Queue<Integer> queue = {{0}};
    while (!queue.isEmpty()) {
        int node = {{1}};
        for (int neighbor : graph.get(node)) {
            if ({{2}}) {
                visited.add(neighbor);
                queue.add(neighbor);
            }
        }
    }
    return visited;
}`,
        blanks: [
          { id: 0, answer: 'new LinkedList<>(Collections.singletonList(start))' },
          { id: 1, answer: 'queue.poll()' },
          { id: 2, answer: '!visited.contains(neighbor)' },
        ],
      },
      cpp: {
        template: `unordered_set<int> bfs(unordered_map<int, vector<int>>& graph, int start) {
    unordered_set<int> visited = {{0}};
    queue<int> q;
    q.push(start);
    while (!q.empty()) {
        int node = {{1}};
        q.pop();
        for (int neighbor : graph[node]) {
            if ({{2}}) {
                visited.insert(neighbor);
                q.push(neighbor);
            }
        }
    }
    return visited;
}`,
        blanks: [
          { id: 0, answer: '{start}' },
          { id: 1, answer: 'q.front()' },
          { id: 2, answer: '!visited.count(neighbor)' },
        ],
      },
    },
  },
  {
    id: 'inorder-traversal',
    name: 'Inorder Traversal',
    category: 'algorithms',
    difficulty: 'easy',
    complexityRank: 6,
    description: 'Visits left subtree, root, right subtree (sorted order for BST).',
    snippets: {
      python: {
        template: `def inorder(root, result=None):
    if result is None:
        result = []
    if root:
        {{0}}
        result.append(root.val)
        {{1}}
    return result`,
        blanks: [
          { id: 0, answer: 'inorder(root.left, result)' },
          { id: 1, answer: 'inorder(root.right, result)' },
        ],
      },
      java: {
        template: `static List<Integer> inorder(TreeNode root, List<Integer> result) {
    if (root != null) {
        {{0}};
        result.add(root.val);
        {{1}};
    }
    return result;
}`,
        blanks: [
          { id: 0, answer: 'inorder(root.left, result)' },
          { id: 1, answer: 'inorder(root.right, result)' },
        ],
      },
      cpp: {
        template: `void inorder(TreeNode* root, vector<int>& result) {
    if (root) {
        {{0}};
        result.push_back(root->val);
        {{1}};
    }
}`,
        blanks: [
          { id: 0, answer: 'inorder(root->left, result)' },
          { id: 1, answer: 'inorder(root->right, result)' },
        ],
      },
    },
  },
  {
    id: 'preorder-traversal',
    name: 'Preorder Traversal',
    category: 'algorithms',
    difficulty: 'easy',
    complexityRank: 6,
    description: 'Visits root, left subtree, right subtree.',
    snippets: {
      python: {
        template: `def preorder(root, result=None):
    if result is None:
        result = []
    if root:
        result.append(root.val)
        {{0}}
        {{1}}
    return result`,
        blanks: [
          { id: 0, answer: 'preorder(root.left, result)' },
          { id: 1, answer: 'preorder(root.right, result)' },
        ],
      },
      java: {
        template: `static List<Integer> preorder(TreeNode root, List<Integer> result) {
    if (root != null) {
        result.add(root.val);
        {{0}};
        {{1}};
    }
    return result;
}`,
        blanks: [
          { id: 0, answer: 'preorder(root.left, result)' },
          { id: 1, answer: 'preorder(root.right, result)' },
        ],
      },
      cpp: {
        template: `void preorder(TreeNode* root, vector<int>& result) {
    if (root) {
        result.push_back(root->val);
        {{0}};
        {{1}};
    }
}`,
        blanks: [
          { id: 0, answer: 'preorder(root->left, result)' },
          { id: 1, answer: 'preorder(root->right, result)' },
        ],
      },
    },
  },
  {
    id: 'postorder-traversal',
    name: 'Postorder Traversal',
    category: 'algorithms',
    difficulty: 'easy',
    complexityRank: 6,
    description: 'Visits left subtree, right subtree, root.',
    snippets: {
      python: {
        template: `def postorder(root, result=None):
    if result is None:
        result = []
    if root:
        {{0}}
        {{1}}
        result.append(root.val)
    return result`,
        blanks: [
          { id: 0, answer: 'postorder(root.left, result)' },
          { id: 1, answer: 'postorder(root.right, result)' },
        ],
      },
      java: {
        template: `static List<Integer> postorder(TreeNode root, List<Integer> result) {
    if (root != null) {
        {{0}};
        {{1}};
        result.add(root.val);
    }
    return result;
}`,
        blanks: [
          { id: 0, answer: 'postorder(root.left, result)' },
          { id: 1, answer: 'postorder(root.right, result)' },
        ],
      },
      cpp: {
        template: `void postorder(TreeNode* root, vector<int>& result) {
    if (root) {
        {{0}};
        {{1}};
        result.push_back(root->val);
    }
}`,
        blanks: [
          { id: 0, answer: 'postorder(root->left, result)' },
          { id: 1, answer: 'postorder(root->right, result)' },
        ],
      },
    },
  },
  {
    id: 'level-order-traversal',
    name: 'Level-Order Traversal',
    category: 'algorithms',
    difficulty: 'easy',
    complexityRank: 6,
    description: 'Visits nodes level by level using a queue.',
    snippets: {
      python: {
        template: `from collections import deque

def level_order(root):
    if not root:
        return []
    result = []
    queue = {{0}}
    while queue:
        node = {{1}}
        result.append(node.val)
        if node.left:
            {{2}}
        if node.right:
            queue.append(node.right)
    return result`,
        blanks: [
          { id: 0, answer: 'deque([root])' },
          { id: 1, answer: 'queue.popleft()' },
          { id: 2, answer: 'queue.append(node.left)' },
        ],
      },
      java: {
        template: `static List<Integer> levelOrder(TreeNode root) {
    if (root == null) return new ArrayList<>();
    List<Integer> result = new ArrayList<>();
    Queue<TreeNode> queue = new LinkedList<>();
    {{0}};
    while (!queue.isEmpty()) {
        TreeNode node = {{1}};
        result.add(node.val);
        if (node.left != null) {{2}};
        if (node.right != null) queue.add(node.right);
    }
    return result;
}`,
        blanks: [
          { id: 0, answer: 'queue.add(root)' },
          { id: 1, answer: 'queue.poll()' },
          { id: 2, answer: 'queue.add(node.left)' },
        ],
      },
      cpp: {
        template: `vector<int> levelOrder(TreeNode* root) {
    if (!root) return {};
    vector<int> result;
    queue<TreeNode*> q;
    {{0}};
    while (!q.empty()) {
        TreeNode* node = {{1}};
        q.pop();
        result.push_back(node->val);
        if (node->left) {{2}};
        if (node->right) q.push(node->right);
    }
    return result;
}`,
        blanks: [
          { id: 0, answer: 'q.push(root)' },
          { id: 1, answer: 'q.front()' },
          { id: 2, answer: 'q.push(node->left)' },
        ],
      },
    },
  },
  {
    id: 'two-pointers',
    name: 'Two Pointers',
    category: 'algorithms',
    difficulty: 'easy',
    complexityRank: 6,
    description: 'Uses two indices moving toward each other to find pairs/subarrays.',
    snippets: {
      python: {
        template: `def two_sum_sorted(arr, target):
    left, right = {{0}}
    while left < right:
        total = arr[left] + arr[right]
        if total == target:
            return [left, right]
        elif total < target:
            {{1}}
        else:
            {{2}}
    return []`,
        blanks: [
          { id: 0, answer: '0, len(arr) - 1' },
          { id: 1, answer: 'left += 1' },
          { id: 2, answer: 'right -= 1' },
        ],
      },
      java: {
        template: `static int[] twoSumSorted(int[] arr, int target) {
    int left = 0, right = {{0}};
    while (left < right) {
        int total = arr[left] + arr[right];
        if (total == target) return new int[]{left, right};
        else if (total < target) {{1}};
        else {{2}};
    }
    return new int[]{};
}`,
        blanks: [
          { id: 0, answer: 'arr.length - 1' },
          { id: 1, answer: 'left++' },
          { id: 2, answer: 'right--' },
        ],
      },
      cpp: {
        template: `vector<int> twoSumSorted(vector<int>& arr, int target) {
    int left = 0, right = {{0}};
    while (left < right) {
        int total = arr[left] + arr[right];
        if (total == target) return {left, right};
        else if (total < target) {{1}};
        else {{2}};
    }
    return {};
}`,
        blanks: [
          { id: 0, answer: 'arr.size() - 1' },
          { id: 1, answer: 'left++' },
          { id: 2, answer: 'right--' },
        ],
      },
    },
  },
  {
    id: 'sliding-window-fixed',
    name: 'Sliding Window (Fixed)',
    category: 'algorithms',
    difficulty: 'easy',
    complexityRank: 6,
    description: 'Maintains a window of fixed size, slides across array tracking aggregate.',
    snippets: {
      python: {
        template: `def max_sum_subarray(arr, k):
    window_sum = sum(arr[:k])
    max_sum = {{0}}
    for i in range(k, len(arr)):
        window_sum += {{1}}
        max_sum = max(max_sum, window_sum)
    return max_sum`,
        blanks: [
          { id: 0, answer: 'window_sum' },
          { id: 1, answer: 'arr[i] - arr[i - k]' },
        ],
      },
      java: {
        template: `static int maxSumSubarray(int[] arr, int k) {
    int windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += arr[i];
    int maxSum = {{0}};
    for (int i = k; i < arr.length; i++) {
        windowSum += {{1}};
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}`,
        blanks: [
          { id: 0, answer: 'windowSum' },
          { id: 1, answer: 'arr[i] - arr[i - k]' },
        ],
      },
      cpp: {
        template: `int maxSumSubarray(vector<int>& arr, int k) {
    int windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += arr[i];
    int maxSum = {{0}};
    for (int i = k; i < arr.size(); i++) {
        windowSum += {{1}};
        maxSum = max(maxSum, windowSum);
    }
    return maxSum;
}`,
        blanks: [
          { id: 0, answer: 'windowSum' },
          { id: 1, answer: 'arr[i] - arr[i - k]' },
        ],
      },
    },
  },
  {
    id: 'xor-single-number',
    name: 'Finding Single Number (XOR)',
    category: 'algorithms',
    difficulty: 'easy',
    complexityRank: 6,
    description: 'XOR all elements; pairs cancel out leaving the unique element.',
    snippets: {
      python: {
        template: `def single_number(nums):
    result = {{0}}
    for num in nums:
        result {{1}} num
    return result`,
        blanks: [
          { id: 0, answer: '0' },
          { id: 1, answer: '^=' },
        ],
      },
      java: {
        template: `static int singleNumber(int[] nums) {
    int result = {{0}};
    for (int num : nums) result {{1}} num;
    return result;
}`,
        blanks: [
          { id: 0, answer: '0' },
          { id: 1, answer: '^=' },
        ],
      },
      cpp: {
        template: `int singleNumber(vector<int>& nums) {
    int result = {{0}};
    for (int num : nums) result {{1}} num;
    return result;
}`,
        blanks: [
          { id: 0, answer: '0' },
          { id: 1, answer: '^=' },
        ],
      },
    },
  },
]
