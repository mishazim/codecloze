export const mediumDataStructures = [
  {
    id: 'min-heap',
    name: 'Priority Queue (Min/Max Heap)',
    category: 'dataStructures',
    difficulty: 'medium',
    complexityRank: 3,
    description: 'Queue where each dequeue returns the element with highest/lowest priority.',
    snippets: {
      python: {
        template: `import heapq

class MinHeap:
    def __init__(self):
        self._heap = []

    def push(self, val):
        {{0}}

    def pop(self):
        return {{1}}

    def peek(self):
        return self._heap[0]

    def heapify(self, arr):
        self._heap = arr
        {{2}}

    def __len__(self):
        return len(self._heap)`,
        blanks: [
          { id: 0, answer: 'heapq.heappush(self._heap, val)' },
          { id: 1, answer: 'heapq.heappop(self._heap)' },
          { id: 2, answer: 'heapq.heapify(self._heap)' },
        ],
      },
      java: {
        template: `import java.util.PriorityQueue;

class MinHeap {
    private PriorityQueue<Integer> heap = {{0}};

    public void push(int val) { heap.offer(val); }

    public int pop() {
        return {{1}};
    }

    public int peek() { return heap.peek(); }

    public void heapify(int[] arr) {
        heap.clear();
        for (int x : arr) heap.offer(x);
    }

    public int size() { return {{2}}; }
}`,
        blanks: [
          { id: 0, answer: 'new PriorityQueue<>()' },
          { id: 1, answer: 'heap.poll()' },
          { id: 2, answer: 'heap.size()' },
        ],
      },
      cpp: {
        template: `#include <queue>
#include <vector>

class MinHeap {
    std::priority_queue<int, std::vector<int>, {{0}}> heap;
public:
    void push(int val) { heap.push(val); }

    int pop() {
        int top = {{1}};
        heap.pop();
        return top;
    }

    int peek() { return heap.top(); }

    void heapify(std::vector<int>& arr) {
        heap = std::priority_queue<int, std::vector<int>, {{2}}>(arr.begin(), arr.end());
    }

    int size() { return heap.size(); }
};`,
        blanks: [
          { id: 0, answer: 'std::greater<int>' },
          { id: 1, answer: 'heap.top()' },
          { id: 2, answer: 'std::greater<int>' },
        ],
      },
    },
  },
  {
    id: 'deque',
    name: 'Deque (Double-Ended Queue)',
    category: 'dataStructures',
    difficulty: 'medium',
    complexityRank: 1,
    description: 'Supports insert and remove from both front and back.',
    snippets: {
      python: {
        template: `class Deque:
    def __init__(self):
        self._data = []

    def push_front(self, val):
        self._data.insert({{0}}, val)

    def push_back(self, val):
        self._data.append(val)

    def pop_front(self):
        return self._data.pop({{1}})

    def pop_back(self):
        return {{2}}

    def peek_front(self):
        return self._data[0]

    def peek_back(self):
        return self._data[-1]`,
        blanks: [
          { id: 0, answer: '0' },
          { id: 1, answer: '0' },
          { id: 2, answer: 'self._data.pop()' },
        ],
      },
      java: {
        template: `import java.util.ArrayDeque;

class Deque {
    private ArrayDeque<Integer> data = new ArrayDeque<>();

    public void pushFront(int val) { data.addFirst(val); }
    public void pushBack(int val)  { data.{{0}}(val); }

    public int popFront() { return {{1}}; }
    public int popBack()  { return {{2}}; }

    public int peekFront() { return data.peekFirst(); }
    public int peekBack()  { return data.peekLast(); }
}`,
        blanks: [
          { id: 0, answer: 'addLast' },
          { id: 1, answer: 'data.pollFirst()' },
          { id: 2, answer: 'data.pollLast()' },
        ],
      },
      cpp: {
        template: `#include <deque>

class Deque {
    std::deque<int> data;
public:
    void pushFront(int val) { data.push_front(val); }
    void pushBack(int val)  { data.{{0}}(val); }

    int popFront() {
        int v = data.{{1}}();
        data.pop_front();
        return v;
    }
    int popBack() {
        int v = data.back();
        data.pop_back();
        return v;
    }

    int peekFront() { return {{2}}; }
    int peekBack()  { return data.back(); }
};`,
        blanks: [
          { id: 0, answer: 'push_back' },
          { id: 1, answer: 'front' },
          { id: 2, answer: 'data.front()' },
        ],
      },
    },
  },
  {
    id: 'circular-buffer',
    name: 'Circular Buffer (Ring Buffer)',
    category: 'dataStructures',
    difficulty: 'medium',
    complexityRank: 1,
    description: 'Fixed-size array used as a queue with wrap-around head/tail pointers.',
    snippets: {
      python: {
        template: `class CircularBuffer:
    def __init__(self, capacity):
        self.capacity = capacity
        self.buffer = [None] * capacity
        self.head = self.tail = self.size = 0

    def enqueue(self, val):
        if self.size == self.capacity:
            raise OverflowError("buffer full")
        self.buffer[self.tail] = val
        self.tail = {{0}}
        self.size += 1

    def dequeue(self):
        if self.size == 0:
            raise IndexError("buffer empty")
        val = self.buffer[self.head]
        self.head = {{1}}
        self.size -= 1
        return {{2}}`,
        blanks: [
          { id: 0, answer: '(self.tail + 1) % self.capacity' },
          { id: 1, answer: '(self.head + 1) % self.capacity' },
          { id: 2, answer: 'val' },
        ],
      },
      java: {
        template: `class CircularBuffer {
    private int capacity, head, tail, size;
    private int[] buffer;

    CircularBuffer(int capacity) {
        this.capacity = capacity;
        buffer = new int[capacity];
        head = tail = size = 0;
    }

    void enqueue(int val) {
        if (size == capacity) throw new RuntimeException("buffer full");
        buffer[tail] = val;
        tail = {{0}};
        size++;
    }

    int dequeue() {
        if (size == 0) throw new RuntimeException("buffer empty");
        int val = buffer[head];
        head = {{1}};
        size--;
        return {{2}};
    }
}`,
        blanks: [
          { id: 0, answer: '(tail + 1) % capacity' },
          { id: 1, answer: '(head + 1) % capacity' },
          { id: 2, answer: 'val' },
        ],
      },
      cpp: {
        template: `#include <vector>
#include <stdexcept>

class CircularBuffer {
    int capacity, head, tail, size;
    std::vector<int> buffer;
public:
    CircularBuffer(int cap)
        : capacity(cap), head(0), tail(0), size(0), buffer(cap) {}

    void enqueue(int val) {
        if (size == capacity) throw std::overflow_error("buffer full");
        buffer[tail] = val;
        tail = {{0}};
        size++;
    }

    int dequeue() {
        if (size == 0) throw std::underflow_error("buffer empty");
        int val = buffer[head];
        head = {{1}};
        size--;
        return {{2}};
    }
};`,
        blanks: [
          { id: 0, answer: '(tail + 1) % capacity' },
          { id: 1, answer: '(head + 1) % capacity' },
          { id: 2, answer: 'val' },
        ],
      },
    },
  },
  {
    id: 'graph-adjacency-list',
    name: 'Graph (Adjacency List)',
    category: 'dataStructures',
    difficulty: 'medium',
    complexityRank: 6,
    description: 'Array/map of lists where each entry stores neighbors of a vertex.',
    snippets: {
      python: {
        template: `class Graph:
    def __init__(self, directed=False):
        self.adj = {}
        self.directed = directed

    def add_vertex(self, v):
        if v not in self.adj:
            self.adj[v] = {{0}}

    def add_edge(self, u, v, weight=1):
        self.add_vertex(u); self.add_vertex(v)
        self.adj[u].append((v, weight))
        if not {{1}}:
            self.adj[v].append((u, weight))

    def neighbors(self, v):
        return {{2}}`,
        blanks: [
          { id: 0, answer: '[]' },
          { id: 1, answer: 'self.directed' },
          { id: 2, answer: 'self.adj.get(v, [])' },
        ],
      },
      java: {
        template: `import java.util.*;

class Graph {
    private Map<Integer, List<int[]>> adj = new HashMap<>();
    private boolean directed;

    Graph(boolean directed) { this.directed = directed; }

    void addVertex(int v) {
        adj.putIfAbsent(v, {{0}});
    }

    void addEdge(int u, int v, int weight) {
        addVertex(u); addVertex(v);
        adj.get(u).add(new int[]{v, weight});
        if (!{{1}}) adj.get(v).add(new int[]{u, weight});
    }

    List<int[]> neighbors(int v) {
        return {{2}};
    }
}`,
        blanks: [
          { id: 0, answer: 'new ArrayList<>()' },
          { id: 1, answer: 'directed' },
          { id: 2, answer: 'adj.getOrDefault(v, Collections.emptyList())' },
        ],
      },
      cpp: {
        template: `#include <unordered_map>
#include <vector>

class Graph {
    std::unordered_map<int, std::vector<std::pair<int,int>>> adj;
    bool directed;
public:
    Graph(bool directed) : directed(directed) {}

    void addVertex(int v) {
        if (!adj.count(v)) adj[v] = {{0}};
    }

    void addEdge(int u, int v, int weight = 1) {
        addVertex(u); addVertex(v);
        adj[u].push_back({v, weight});
        if (!{{1}}) adj[v].push_back({u, weight});
    }

    std::vector<std::pair<int,int>> neighbors(int v) {
        return {{2}};
    }
};`,
        blanks: [
          { id: 0, answer: '{}' },
          { id: 1, answer: 'directed' },
          { id: 2, answer: 'adj.count(v) ? adj[v] : std::vector<std::pair<int,int>>{}' },
        ],
      },
    },
  },
  {
    id: 'graph-adjacency-matrix',
    name: 'Graph (Adjacency Matrix)',
    category: 'dataStructures',
    difficulty: 'medium',
    complexityRank: 1,
    description: 'V×V matrix where entry [i][j] = 1 if edge exists between i and j.',
    snippets: {
      python: {
        template: `class GraphMatrix:
    def __init__(self, n):
        self.n = n
        self.matrix = {{0}}

    def add_edge(self, u, v, weight=1):
        self.matrix[u][v] = {{1}}
        self.matrix[v][u] = weight

    def has_edge(self, u, v):
        return self.matrix[u][v] {{2}} 0

    def neighbors(self, u):
        return [v for v in range(self.n) if self.matrix[u][v] != 0]`,
        blanks: [
          { id: 0, answer: '[[0] * n for _ in range(n)]' },
          { id: 1, answer: 'weight' },
          { id: 2, answer: '!=' },
        ],
      },
      java: {
        template: `import java.util.*;

class GraphMatrix {
    private int n;
    private int[][] matrix;

    GraphMatrix(int n) {
        this.n = n;
        matrix = {{0}};
    }

    void addEdge(int u, int v, int weight) {
        matrix[u][v] = {{1}};
        matrix[v][u] = weight;
    }

    boolean hasEdge(int u, int v) { return matrix[u][v] {{2}} 0; }

    List<Integer> neighbors(int u) {
        List<Integer> res = new ArrayList<>();
        for (int v = 0; v < n; v++) if (matrix[u][v] != 0) res.add(v);
        return res;
    }
}`,
        blanks: [
          { id: 0, answer: 'new int[n][n]' },
          { id: 1, answer: 'weight' },
          { id: 2, answer: '!=' },
        ],
      },
      cpp: {
        template: `#include <vector>

class GraphMatrix {
    int n;
    std::vector<std::vector<int>> matrix;
public:
    GraphMatrix(int n) : n(n), matrix({{0}}) {}

    void addEdge(int u, int v, int weight = 1) {
        matrix[u][v] = {{1}};
        matrix[v][u] = weight;
    }

    bool hasEdge(int u, int v) { return matrix[u][v] {{2}} 0; }

    std::vector<int> neighbors(int u) {
        std::vector<int> res;
        for (int v = 0; v < n; v++) if (matrix[u][v] != 0) res.push_back(v);
        return res;
    }
};`,
        blanks: [
          { id: 0, answer: 'n, std::vector<int>(n, 0)' },
          { id: 1, answer: 'weight' },
          { id: 2, answer: '!=' },
        ],
      },
    },
  },
  {
    id: 'linked-hash-map',
    name: 'LinkedHashMap',
    category: 'dataStructures',
    difficulty: 'medium',
    complexityRank: 6,
    description: 'Hash map that also maintains insertion order via a doubly linked list.',
    snippets: {
      python: {
        template: `from collections import OrderedDict

class LinkedHashMap:
    def __init__(self):
        self._map = {{0}}

    def put(self, key, value):
        self._map[key] = value

    def get(self, key, default=None):
        return {{1}}

    def remove(self, key):
        if key in self._map:
            del self._map[key]

    def keys_in_order(self):
        return {{2}}`,
        blanks: [
          { id: 0, answer: 'OrderedDict()' },
          { id: 1, answer: 'self._map.get(key, default)' },
          { id: 2, answer: 'list(self._map.keys())' },
        ],
      },
      java: {
        template: `import java.util.*;

class LinkedHashMap<K, V> {
    private java.util.LinkedHashMap<K, V> map = {{0}};

    public void put(K key, V value) { map.put(key, value); }

    public V get(K key, V defaultVal) {
        return {{1}};
    }

    public void remove(K key) { map.remove(key); }

    public List<K> keysInOrder() {
        return {{2}};
    }
}`,
        blanks: [
          { id: 0, answer: 'new java.util.LinkedHashMap<>()' },
          { id: 1, answer: 'map.getOrDefault(key, defaultVal)' },
          { id: 2, answer: 'new ArrayList<>(map.keySet())' },
        ],
      },
      cpp: {
        template: `#include <list>
#include <unordered_map>

template<typename K, typename V>
class LinkedHashMap {
    std::list<std::pair<K,V>> order;
    std::unordered_map<K, typename std::list<std::pair<K,V>>::iterator> mp;
public:
    void put(K key, V val) {
        if (mp.count(key)) { mp[key]->second = val; return; }
        order.{{0}}({key, val});
        mp[key] = {{1}};
    }

    V* get(K key) {
        if (!mp.count(key)) return nullptr;
        return &mp[key]->second;
    }

    void remove(K key) {
        if (!mp.count(key)) return;
        order.erase(mp[key]);
        mp.{{2}}(key);
    }
};`,
        blanks: [
          { id: 0, answer: 'push_back' },
          { id: 1, answer: 'std::prev(order.end())' },
          { id: 2, answer: 'erase' },
        ],
      },
    },
  },
  {
    id: 'circular-linked-list',
    name: 'Circular Linked List',
    category: 'dataStructures',
    difficulty: 'medium',
    complexityRank: 6,
    description: 'Last node points back to the head forming a circle.',
    snippets: {
      python: {
        template: `class Node:
    def __init__(self, val):
        self.val = val
        self.next = None

class CircularLinkedList:
    def __init__(self):
        self.head = None

    def append(self, val):
        new_node = Node(val)
        if not self.head:
            self.head = new_node
            new_node.next = {{0}}
            return
        curr = self.head
        while curr.next != self.head:
            curr = curr.next
        curr.next = new_node
        new_node.next = {{1}}

    def traverse(self):
        if not self.head: return []
        result, curr = [], self.head
        while True:
            result.append(curr.val)
            curr = curr.next
            if {{2}}: break
        return result`,
        blanks: [
          { id: 0, answer: 'self.head' },
          { id: 1, answer: 'self.head' },
          { id: 2, answer: 'curr == self.head' },
        ],
      },
      java: {
        template: `import java.util.*;

class Node {
    int val; Node next;
    Node(int val) { this.val = val; }
}

class CircularLinkedList {
    Node head;

    void append(int val) {
        Node newNode = new Node(val);
        if (head == null) {
            head = newNode;
            newNode.next = {{0}};
            return;
        }
        Node curr = head;
        while (curr.next != head) curr = curr.next;
        curr.next = newNode;
        newNode.next = {{1}};
    }

    List<Integer> traverse() {
        if (head == null) return new ArrayList<>();
        List<Integer> result = new ArrayList<>();
        Node curr = head;
        do {
            result.add(curr.val);
            curr = curr.next;
        } while ({{2}});
        return result;
    }
}`,
        blanks: [
          { id: 0, answer: 'head' },
          { id: 1, answer: 'head' },
          { id: 2, answer: 'curr != head' },
        ],
      },
      cpp: {
        template: `#include <vector>

struct Node {
    int val; Node* next;
    Node(int v) : val(v), next(nullptr) {}
};

class CircularLinkedList {
    Node* head = nullptr;
public:
    void append(int val) {
        Node* newNode = new Node(val);
        if (!head) {
            head = newNode;
            newNode->next = {{0}};
            return;
        }
        Node* curr = head;
        while (curr->next != head) curr = curr->next;
        curr->next = newNode;
        newNode->next = {{1}};
    }

    std::vector<int> traverse() {
        if (!head) return {};
        std::vector<int> result;
        Node* curr = head;
        do {
            result.push_back(curr->val);
            curr = curr->next;
        } while ({{2}});
        return result;
    }
};`,
        blanks: [
          { id: 0, answer: 'head' },
          { id: 1, answer: 'head' },
          { id: 2, answer: 'curr != head' },
        ],
      },
    },
  },
  {
    id: 'skip-list',
    name: 'Skip List',
    category: 'dataStructures',
    difficulty: 'medium',
    complexityRank: 6,
    description: 'Layered linked lists providing O(log n) search via express lanes.',
    snippets: {
      python: {
        template: `import random

class SkipNode:
    def __init__(self, val, level):
        self.val = val
        self.forward = {{0}}

class SkipList:
    MAX_LEVEL = 16

    def __init__(self):
        self.head = SkipNode(float('-inf'), self.MAX_LEVEL)
        self.level = 0

    def _random_level(self):
        lvl = 0
        while random.random() < 0.5 and lvl < self.MAX_LEVEL - 1:
            lvl += 1
        return lvl

    def search(self, target):
        curr = self.head
        for i in range({{1}}, -1, -1):
            while curr.forward[i] and curr.forward[i].val < target:
                curr = curr.forward[i]
        curr = curr.forward[0]
        return curr is not None and {{2}}`,
        blanks: [
          { id: 0, answer: '[None] * (level + 1)' },
          { id: 1, answer: 'self.level' },
          { id: 2, answer: 'curr.val == target' },
        ],
      },
      java: {
        template: `import java.util.Random;

class SkipNode {
    int val;
    SkipNode[] forward;
    SkipNode(int val, int level) {
        this.val = val;
        forward = {{0}};
    }
}

class SkipList {
    static final int MAX_LEVEL = 16;
    SkipNode head = new SkipNode(Integer.MIN_VALUE, MAX_LEVEL);
    int level = 0;
    Random rand = new Random();

    int randomLevel() {
        int lvl = 0;
        while (rand.nextDouble() < 0.5 && lvl < MAX_LEVEL - 1) lvl++;
        return lvl;
    }

    boolean search(int target) {
        SkipNode curr = head;
        for (int i = {{1}}; i >= 0; i--) {
            while (curr.forward[i] != null && curr.forward[i].val < target)
                curr = curr.forward[i];
        }
        curr = curr.forward[0];
        return curr != null && {{2}};
    }
}`,
        blanks: [
          { id: 0, answer: 'new SkipNode[level + 1]' },
          { id: 1, answer: 'level' },
          { id: 2, answer: 'curr.val == target' },
        ],
      },
      cpp: {
        template: `#include <vector>
#include <climits>
#include <cstdlib>

struct SkipNode {
    int val;
    std::vector<SkipNode*> forward;
    SkipNode(int v, int level) : val(v), forward({{0}}) {}
};

class SkipList {
    static const int MAX_LEVEL = 16;
    SkipNode* head = new SkipNode(INT_MIN, MAX_LEVEL);
    int level = 0;

    int randomLevel() {
        int lvl = 0;
        while ((double)rand() / RAND_MAX < 0.5 && lvl < MAX_LEVEL - 1) lvl++;
        return lvl;
    }

public:
    bool search(int target) {
        SkipNode* curr = head;
        for (int i = {{1}}; i >= 0; i--) {
            while (curr->forward[i] && curr->forward[i]->val < target)
                curr = curr->forward[i];
        }
        curr = curr->forward[0];
        return curr && {{2}};
    }
};`,
        blanks: [
          { id: 0, answer: 'level + 1, nullptr' },
          { id: 1, answer: 'level' },
          { id: 2, answer: 'curr->val == target' },
        ],
      },
    },
  },
]
