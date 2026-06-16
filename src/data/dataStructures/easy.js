export const easyDataStructures = [
  {
    id: 'dynamic-array',
    name: 'Dynamic Array (ArrayList/Vector)',
    category: 'dataStructures',
    difficulty: 'easy',
    complexityRank: 1,
    description: 'Array that resizes automatically (typically doubles) when capacity is exceeded.',
    snippets: {
      python: {
        template: `class DynamicArray:
    def __init__(self):
        self._data = [None]
        self._size = 0
        self._capacity = 1

    def append(self, val):
        if self._size == self._capacity:
            self._resize({{0}})
        self._data[self._size] = val
        self._size += 1

    def _resize(self, new_cap):
        new_data = [None] * new_cap
        for i in range(self._size):
            new_data[i] = self._data[i]
        self._data = new_data
        self._capacity = {{1}}

    def __getitem__(self, idx):
        if idx < 0 or idx >= self._size:
            raise IndexError("index out of range")
        return {{2}}`,
        blanks: [
          { id: 0, answer: '2 * self._capacity' },
          { id: 1, answer: 'new_cap' },
          { id: 2, answer: 'self._data[idx]' },
        ],
      },
      java: {
        template: `class DynamicArray {
    private Object[] data;
    private int size = 0, capacity = 1;

    DynamicArray() { data = new Object[1]; }

    void append(Object val) {
        if (size == capacity) resize({{0}});
        data[size++] = val;
    }

    private void resize(int newCap) {
        Object[] newData = new Object[newCap];
        System.arraycopy(data, 0, newData, 0, size);
        data = newData;
        capacity = {{1}};
    }

    Object get(int idx) {
        if (idx < 0 || idx >= size) throw new IndexOutOfBoundsException();
        return {{2}};
    }
}`,
        blanks: [
          { id: 0, answer: '2 * capacity' },
          { id: 1, answer: 'newCap' },
          { id: 2, answer: 'data[idx]' },
        ],
      },
      cpp: {
        template: `class DynamicArray {
    vector<int> data;
    int sz = 0, cap = 1;
public:
    DynamicArray() { data.resize(1); }

    void append(int val) {
        if (sz == cap) resize({{0}});
        data[sz++] = val;
    }

    void resize(int newCap) {
        data.resize(newCap);
        cap = {{1}};
    }

    int get(int idx) {
        if (idx < 0 || idx >= sz) throw out_of_range("index out of range");
        return {{2}};
    }
};`,
        blanks: [
          { id: 0, answer: '2 * cap' },
          { id: 1, answer: 'newCap' },
          { id: 2, answer: 'data[idx]' },
        ],
      },
    },
  },
  {
    id: 'stack',
    name: 'Stack',
    category: 'dataStructures',
    difficulty: 'easy',
    complexityRank: 1,
    description: 'LIFO structure supporting push and pop from the same end.',
    snippets: {
      python: {
        template: `class Stack:
    def __init__(self):
        self._data = []

    def push(self, val):
        {{0}}

    def pop(self):
        if self.is_empty():
            raise IndexError("pop from empty stack")
        return {{1}}

    def peek(self):
        return {{2}}

    def is_empty(self):
        return len(self._data) == 0`,
        blanks: [
          { id: 0, answer: 'self._data.append(val)' },
          { id: 1, answer: 'self._data.pop()' },
          { id: 2, answer: 'self._data[-1]' },
        ],
      },
      java: {
        template: `class Stack<T> {
    private List<T> data = new ArrayList<>();

    void push(T val) { {{0}}; }

    T pop() {
        if (isEmpty()) throw new EmptyStackException();
        return {{1}};
    }

    T peek() { return {{2}}; }

    boolean isEmpty() { return data.isEmpty(); }
}`,
        blanks: [
          { id: 0, answer: 'data.add(val)' },
          { id: 1, answer: 'data.remove(data.size() - 1)' },
          { id: 2, answer: 'data.get(data.size() - 1)' },
        ],
      },
      cpp: {
        template: `template<typename T>
class Stack {
    vector<T> data;
public:
    void push(T val) { {{0}}; }

    T pop() {
        if (isEmpty()) throw runtime_error("pop from empty stack");
        T val = {{1}};
        data.pop_back();
        return val;
    }

    T peek() { return {{2}}; }

    bool isEmpty() { return data.empty(); }
};`,
        blanks: [
          { id: 0, answer: 'data.push_back(val)' },
          { id: 1, answer: 'data.back()' },
          { id: 2, answer: 'data.back()' },
        ],
      },
    },
  },
  {
    id: 'queue',
    name: 'Queue',
    category: 'dataStructures',
    difficulty: 'easy',
    complexityRank: 1,
    description: 'FIFO structure supporting enqueue at back and dequeue from front.',
    snippets: {
      python: {
        template: `from collections import deque

class Queue:
    def __init__(self):
        self._data = deque()

    def enqueue(self, val):
        {{0}}

    def dequeue(self):
        if self.is_empty():
            raise IndexError("dequeue from empty queue")
        return {{1}}

    def peek(self):
        return {{2}}

    def is_empty(self):
        return len(self._data) == 0`,
        blanks: [
          { id: 0, answer: 'self._data.append(val)' },
          { id: 1, answer: 'self._data.popleft()' },
          { id: 2, answer: 'self._data[0]' },
        ],
      },
      java: {
        template: `class Queue<T> {
    private Deque<T> data = new ArrayDeque<>();

    void enqueue(T val) { {{0}}; }

    T dequeue() {
        if (isEmpty()) throw new NoSuchElementException("dequeue from empty queue");
        return {{1}};
    }

    T peek() { return {{2}}; }

    boolean isEmpty() { return data.isEmpty(); }
}`,
        blanks: [
          { id: 0, answer: 'data.addLast(val)' },
          { id: 1, answer: 'data.removeFirst()' },
          { id: 2, answer: 'data.peekFirst()' },
        ],
      },
      cpp: {
        template: `template<typename T>
class Queue {
    deque<T> data;
public:
    void enqueue(T val) { {{0}}; }

    T dequeue() {
        if (isEmpty()) throw runtime_error("dequeue from empty queue");
        T val = {{1}};
        data.pop_front();
        return val;
    }

    T peek() { return {{2}}; }

    bool isEmpty() { return data.empty(); }
};`,
        blanks: [
          { id: 0, answer: 'data.push_back(val)' },
          { id: 1, answer: 'data.front()' },
          { id: 2, answer: 'data.front()' },
        ],
      },
    },
  },
  {
    id: 'singly-linked-list',
    name: 'Singly Linked List',
    category: 'dataStructures',
    difficulty: 'easy',
    complexityRank: 6,
    description: 'Nodes each holding a value and a pointer to the next node.',
    snippets: {
      python: {
        template: `class Node:
    def __init__(self, val):
        self.val = val
        self.next = {{0}}

class SinglyLinkedList:
    def __init__(self):
        self.head = None

    def append(self, val):
        new_node = Node(val)
        if not self.head:
            self.head = new_node
            return
        curr = self.head
        while {{1}}:
            curr = curr.next
        curr.next = {{2}}`,
        blanks: [
          { id: 0, answer: 'None' },
          { id: 1, answer: 'curr.next' },
          { id: 2, answer: 'new_node' },
        ],
      },
      java: {
        template: `class Node {
    int val;
    Node next = {{0}};
    Node(int val) { this.val = val; }
}

class SinglyLinkedList {
    Node head = null;

    void append(int val) {
        Node newNode = new Node(val);
        if (head == null) { head = newNode; return; }
        Node curr = head;
        while ({{1}} != null) curr = curr.next;
        curr.next = {{2}};
    }
}`,
        blanks: [
          { id: 0, answer: 'null' },
          { id: 1, answer: 'curr.next' },
          { id: 2, answer: 'newNode' },
        ],
      },
      cpp: {
        template: `struct Node {
    int val;
    Node* next = {{0}};
    Node(int v) : val(v) {}
};

class SinglyLinkedList {
    Node* head = nullptr;
public:
    void append(int val) {
        Node* newNode = new Node(val);
        if (!head) { head = newNode; return; }
        Node* curr = head;
        while ({{1}}) curr = curr->next;
        curr->next = {{2}};
    }
};`,
        blanks: [
          { id: 0, answer: 'nullptr' },
          { id: 1, answer: 'curr->next' },
          { id: 2, answer: 'newNode' },
        ],
      },
    },
  },
  {
    id: 'doubly-linked-list',
    name: 'Doubly Linked List',
    category: 'dataStructures',
    difficulty: 'easy',
    complexityRank: 6,
    description: 'Nodes with pointers to both next and previous nodes.',
    snippets: {
      python: {
        template: `class Node:
    def __init__(self, val):
        self.val = val
        self.prev = {{0}}
        self.next = None

class DoublyLinkedList:
    def __init__(self):
        self.head = self.tail = None

    def append(self, val):
        node = Node(val)
        if not self.tail:
            self.head = self.tail = node
        else:
            node.prev = {{1}}
            self.tail.next = node
            self.tail = {{2}}`,
        blanks: [
          { id: 0, answer: 'None' },
          { id: 1, answer: 'self.tail' },
          { id: 2, answer: 'node' },
        ],
      },
      java: {
        template: `class Node {
    int val; Node prev = null, next = null;
    Node(int v) { val = v; }
}

class DoublyLinkedList {
    Node head = null, tail = null;

    void append(int val) {
        Node node = new Node(val);
        if (tail == null) { head = tail = node; return; }
        node.prev = {{0}};
        tail.next = node;
        tail = {{1}};
    }

    void prepend(int val) {
        Node node = new Node(val);
        if (head == null) { head = tail = node; return; }
        node.next = head;
        head.prev = {{2}};
        head = node;
    }
}`,
        blanks: [
          { id: 0, answer: 'tail' },
          { id: 1, answer: 'node' },
          { id: 2, answer: 'node' },
        ],
      },
      cpp: {
        template: `struct Node {
    int val; Node* prev = nullptr; Node* next = nullptr;
    Node(int v) : val(v) {}
};

class DoublyLinkedList {
    Node* head = nullptr; Node* tail = nullptr;
public:
    void append(int val) {
        Node* node = new Node(val);
        if (!tail) { head = tail = node; return; }
        node->prev = {{0}};
        tail->next = node;
        tail = {{1}};
    }

    void prepend(int val) {
        Node* node = new Node(val);
        if (!head) { head = tail = node; return; }
        node->next = head;
        head->prev = {{2}};
        head = node;
    }
};`,
        blanks: [
          { id: 0, answer: 'tail' },
          { id: 1, answer: 'node' },
          { id: 2, answer: 'node' },
        ],
      },
    },
  },
  {
    id: 'hash-map',
    name: 'Hash Map (Hash Table)',
    category: 'dataStructures',
    difficulty: 'easy',
    complexityRank: 6,
    description: 'Key-value store using a hash function to map keys to array buckets.',
    snippets: {
      python: {
        template: `class HashMap:
    def __init__(self, capacity=16):
        self.capacity = capacity
        self.buckets = [[] for _ in range(capacity)]

    def _hash(self, key):
        return {{0}}

    def put(self, key, value):
        idx = self._hash(key)
        for pair in self.buckets[idx]:
            if pair[0] == key:
                pair[1] = value
                return
        self.buckets[idx].append([key, value])

    def get(self, key):
        idx = self._hash(key)
        for pair in self.buckets[idx]:
            if {{1}}:
                return pair[1]
        return {{2}}`,
        blanks: [
          { id: 0, answer: 'hash(key) % self.capacity' },
          { id: 1, answer: 'pair[0] == key' },
          { id: 2, answer: 'None' },
        ],
      },
      java: {
        template: `class HashMap<K, V> {
    private int capacity;
    private List<List<Object[]>> buckets;

    HashMap(int capacity) {
        this.capacity = capacity;
        buckets = new ArrayList<>();
        for (int i = 0; i < capacity; i++) buckets.add(new ArrayList<>());
    }

    private int hash(K key) { return {{0}}; }

    void put(K key, V value) {
        int idx = hash(key);
        for (Object[] pair : buckets.get(idx)) {
            if (pair[0].equals(key)) { pair[1] = value; return; }
        }
        buckets.get(idx).add(new Object[]{key, value});
    }

    V get(K key) {
        int idx = hash(key);
        for (Object[] pair : buckets.get(idx)) {
            if ({{1}}) return (V) pair[1];
        }
        return {{2}};
    }
}`,
        blanks: [
          { id: 0, answer: 'Math.abs(key.hashCode() % capacity)' },
          { id: 1, answer: 'pair[0].equals(key)' },
          { id: 2, answer: 'null' },
        ],
      },
      cpp: {
        template: `template<typename K, typename V>
class HashMap {
    int capacity;
    vector<list<pair<K,V>>> buckets;

    int hash(K key) { return {{0}}; }
public:
    HashMap(int cap = 16) : capacity(cap), buckets(cap) {}

    void put(K key, V value) {
        int idx = hash(key);
        for (auto& pair : buckets[idx]) {
            if (pair.first == key) { pair.second = value; return; }
        }
        buckets[idx].push_back({key, value});
    }

    V* get(K key) {
        int idx = hash(key);
        for (auto& pair : buckets[idx]) {
            if ({{1}}) return &pair.second;
        }
        return {{2}};
    }
};`,
        blanks: [
          { id: 0, answer: 'std::hash<K>{}(key) % capacity' },
          { id: 1, answer: 'pair.first == key' },
          { id: 2, answer: 'nullptr' },
        ],
      },
    },
  },
  {
    id: 'hash-set',
    name: 'Hash Set',
    category: 'dataStructures',
    difficulty: 'easy',
    complexityRank: 6,
    description: 'Unordered collection of unique keys backed by a hash table.',
    snippets: {
      python: {
        template: `class HashSet:
    def __init__(self, capacity=16):
        self.capacity = capacity
        self.buckets = [[] for _ in range(capacity)]

    def _hash(self, key):
        return hash(key) % self.capacity

    def add(self, key):
        idx = self._hash(key)
        if key not in self.buckets[idx]:
            {{0}}

    def contains(self, key):
        idx = self._hash(key)
        return {{1}}

    def remove(self, key):
        idx = self._hash(key)
        if {{2}}:
            self.buckets[idx].remove(key)`,
        blanks: [
          { id: 0, answer: 'self.buckets[idx].append(key)' },
          { id: 1, answer: 'key in self.buckets[idx]' },
          { id: 2, answer: 'key in self.buckets[idx]' },
        ],
      },
      java: {
        template: `class HashSet<K> {
    private int capacity;
    private List<List<K>> buckets;

    HashSet(int capacity) {
        this.capacity = capacity;
        buckets = new ArrayList<>();
        for (int i = 0; i < capacity; i++) buckets.add(new ArrayList<>());
    }

    private int hash(K key) { return Math.abs(key.hashCode() % capacity); }

    void add(K key) {
        int idx = hash(key);
        if (!{{0}}) buckets.get(idx).add(key);
    }

    boolean contains(K key) { return {{1}}; }

    void remove(K key) {
        int idx = hash(key);
        if ({{2}}) buckets.get(idx).remove(key);
    }
}`,
        blanks: [
          { id: 0, answer: 'buckets.get(idx).contains(key)' },
          { id: 1, answer: 'buckets.get(hash(key)).contains(key)' },
          { id: 2, answer: 'contains(key)' },
        ],
      },
      cpp: {
        template: `template<typename K>
class HashSet {
    int capacity;
    vector<list<K>> buckets;
    int hash(K key) { return std::hash<K>{}(key) % capacity; }
public:
    HashSet(int cap = 16) : capacity(cap), buckets(cap) {}

    void add(K key) {
        int idx = hash(key);
        if (!{{0}}) buckets[idx].push_back(key);
    }

    bool contains(K key) {
        int idx = hash(key);
        return {{1}};
    }

    void remove(K key) {
        int idx = hash(key);
        if ({{2}}) buckets[idx].remove(key);
    }
};`,
        blanks: [
          { id: 0, answer: 'contains(key)' },
          { id: 1, answer: 'find(buckets[idx].begin(), buckets[idx].end(), key) != buckets[idx].end()' },
          { id: 2, answer: 'contains(key)' },
        ],
      },
    },
  },
  {
    id: 'binary-tree',
    name: 'Binary Tree',
    category: 'dataStructures',
    difficulty: 'easy',
    complexityRank: 6,
    description: 'Each node has at most two children (left and right).',
    snippets: {
      python: {
        template: `class TreeNode:
    def __init__(self, val):
        self.val = val
        self.left = {{0}}
        self.right = None

class BinaryTree:
    def __init__(self):
        self.root = None

    def insert_level_order(self, val):
        from collections import deque
        new_node = TreeNode(val)
        if not self.root:
            self.root = new_node; return
        queue = deque([self.root])
        while queue:
            node = queue.popleft()
            if not node.left:
                node.left = {{1}}; return
            queue.append(node.left)
            if not node.right:
                node.right = new_node; return
            {{2}}`,
        blanks: [
          { id: 0, answer: 'None' },
          { id: 1, answer: 'new_node' },
          { id: 2, answer: 'queue.append(node.right)' },
        ],
      },
      java: {
        template: `class TreeNode {
    int val; TreeNode left = {{0}}, right = null;
    TreeNode(int v) { val = v; }
}

class BinaryTree {
    TreeNode root = null;

    void insertLevelOrder(int val) {
        TreeNode newNode = new TreeNode(val);
        if (root == null) { root = newNode; return; }
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            TreeNode node = queue.poll();
            if (node.left == null) { node.left = {{1}}; return; }
            queue.add(node.left);
            if (node.right == null) { node.right = newNode; return; }
            {{2}};
        }
    }
}`,
        blanks: [
          { id: 0, answer: 'null' },
          { id: 1, answer: 'newNode' },
          { id: 2, answer: 'queue.add(node.right)' },
        ],
      },
      cpp: {
        template: `struct TreeNode {
    int val; TreeNode* left = {{0}}; TreeNode* right = nullptr;
    TreeNode(int v) : val(v) {}
};

class BinaryTree {
    TreeNode* root = nullptr;
public:
    void insertLevelOrder(int val) {
        TreeNode* newNode = new TreeNode(val);
        if (!root) { root = newNode; return; }
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            TreeNode* node = q.front(); q.pop();
            if (!node->left) { node->left = {{1}}; return; }
            q.push(node->left);
            if (!node->right) { node->right = newNode; return; }
            {{2}};
        }
    }
};`,
        blanks: [
          { id: 0, answer: 'nullptr' },
          { id: 1, answer: 'newNode' },
          { id: 2, answer: 'q.push(node->right)' },
        ],
      },
    },
  },
  {
    id: 'bst',
    name: 'Binary Search Tree (BST)',
    category: 'dataStructures',
    difficulty: 'easy',
    complexityRank: 6,
    description: 'Binary tree where left child < parent < right child.',
    snippets: {
      python: {
        template: `class BST:
    def __init__(self):
        self.root = None

    def insert(self, val):
        def _ins(node, val):
            if node is None:
                return TreeNode(val)
            if val < {{0}}:
                node.left = _ins(node.left, val)
            elif val > node.val:
                node.right = {{1}}
            return node
        self.root = _ins(self.root, val)

    def search(self, val):
        node = self.root
        while node:
            if val == node.val: return True
            node = node.left if {{2}} else node.right
        return False`,
        blanks: [
          { id: 0, answer: 'node.val' },
          { id: 1, answer: '_ins(node.right, val)' },
          { id: 2, answer: 'val < node.val' },
        ],
      },
      java: {
        template: `class BST {
    TreeNode root = null;

    TreeNode insert(TreeNode node, int val) {
        if (node == null) return new TreeNode(val);
        if (val < {{0}}) node.left = insert(node.left, val);
        else if (val > node.val) node.right = {{1}};
        return node;
    }

    boolean search(int val) {
        TreeNode node = root;
        while (node != null) {
            if (val == node.val) return true;
            node = {{2}} ? node.left : node.right;
        }
        return false;
    }
}`,
        blanks: [
          { id: 0, answer: 'node.val' },
          { id: 1, answer: 'insert(node.right, val)' },
          { id: 2, answer: 'val < node.val' },
        ],
      },
      cpp: {
        template: `class BST {
    TreeNode* root = nullptr;

    TreeNode* insert(TreeNode* node, int val) {
        if (!node) return new TreeNode(val);
        if (val < {{0}}) node->left = insert(node->left, val);
        else if (val > node->val) node->right = {{1}};
        return node;
    }
public:
    void insert(int val) { root = insert(root, val); }

    bool search(int val) {
        TreeNode* node = root;
        while (node) {
            if (val == node->val) return true;
            node = {{2}} ? node->left : node->right;
        }
        return false;
    }
};`,
        blanks: [
          { id: 0, answer: 'node->val' },
          { id: 1, answer: 'insert(node->right, val)' },
          { id: 2, answer: 'val < node->val' },
        ],
      },
    },
  },
  {
    id: 'string-builder',
    name: 'StringBuilder / StringBuffer',
    category: 'dataStructures',
    difficulty: 'easy',
    complexityRank: 6,
    description: 'Mutable character buffer that avoids repeated string allocation on concatenation.',
    snippets: {
      python: {
        template: `class StringBuilder:
    def __init__(self):
        self._parts = []

    def append(self, s):
        {{0}}
        return self

    def insert(self, idx, s):
        self._parts.insert(idx, s)
        return self

    def __len__(self):
        return sum({{1}})

    def build(self):
        return {{2}}`,
        blanks: [
          { id: 0, answer: 'self._parts.append(s)' },
          { id: 1, answer: 'len(p) for p in self._parts' },
          { id: 2, answer: "''.join(self._parts)" },
        ],
      },
      java: {
        template: `class MyStringBuilder {
    private StringBuilder sb = new StringBuilder();

    MyStringBuilder append(String s) {
        {{0}};
        return this;
    }

    MyStringBuilder insert(int idx, String s) {
        sb.insert(idx, s);
        return this;
    }

    int length() { return {{1}}; }

    String build() { return {{2}}; }
}`,
        blanks: [
          { id: 0, answer: 'sb.append(s)' },
          { id: 1, answer: 'sb.length()' },
          { id: 2, answer: 'sb.toString()' },
        ],
      },
      cpp: {
        template: `class StringBuilder {
    vector<string> parts;
public:
    StringBuilder& append(const string& s) {
        {{0}};
        return *this;
    }

    StringBuilder& insert(int idx, const string& s) {
        parts.insert(parts.begin() + idx, s);
        return *this;
    }

    int length() {
        return accumulate(parts.begin(), parts.end(), 0,
            [](int sum, const string& p){ return sum + {{1}}; });
    }

    string build() {
        string result;
        for (auto& p : parts) result += p;
        return {{2}};
    }
};`,
        blanks: [
          { id: 0, answer: 'parts.push_back(s)' },
          { id: 1, answer: 'p.size()' },
          { id: 2, answer: 'result' },
        ],
      },
    },
  },
]
