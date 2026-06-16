export const hardDataStructures = [
  {
    id: 'avl-tree',
    name: 'AVL Tree',
    category: 'dataStructures',
    difficulty: 'hard',
    complexityRank: 3,
    description: 'Self-balancing BST maintaining balance factor of -1, 0, or 1 via rotations.',
    snippets: {
      python: {
        template: `class AVLNode:
    def __init__(self, val):
        self.val = val
        self.left = self.right = None
        self.height = 1

def height(node):
    return node.height if node else 0

def get_balance(node):
    return {{0}} if node else 0

def rotate_right(y):
    x, T2 = y.left, y.left.right
    x.right = y
    y.left = {{1}}
    y.height = 1 + max(height(y.left), height(y.right))
    x.height = 1 + max(height(x.left), height(x.right))
    return {{2}}

def rotate_left(x):
    y, T2 = x.right, x.right.left
    y.left = x
    x.right = T2
    x.height = 1 + max(height(x.left), height(x.right))
    y.height = 1 + max(height(y.left), height(y.right))
    return y`,
        blanks: [
          { id: 0, answer: 'height(node.left) - height(node.right)' },
          { id: 1, answer: 'T2' },
          { id: 2, answer: 'x' },
        ],
      },
      java: {
        template: `class AVLNode {
    int val, height;
    AVLNode left, right;
    AVLNode(int val) { this.val = val; height = 1; }
}

static int height(AVLNode node) { return node == null ? 0 : node.height; }

static int getBalance(AVLNode node) {
    return node == null ? 0 : {{0}};
}

static AVLNode rotateRight(AVLNode y) {
    AVLNode x = y.left, T2 = y.left.right;
    x.right = y;
    y.left = {{1}};
    y.height = 1 + Math.max(height(y.left), height(y.right));
    x.height = 1 + Math.max(height(x.left), height(x.right));
    return {{2}};
}

static AVLNode rotateLeft(AVLNode x) {
    AVLNode y = x.right, T2 = x.right.left;
    y.left = x;
    x.right = T2;
    x.height = 1 + Math.max(height(x.left), height(x.right));
    y.height = 1 + Math.max(height(y.left), height(y.right));
    return y;
}`,
        blanks: [
          { id: 0, answer: 'height(node.left) - height(node.right)' },
          { id: 1, answer: 'T2' },
          { id: 2, answer: 'x' },
        ],
      },
      cpp: {
        template: `struct AVLNode {
    int val, height;
    AVLNode *left, *right;
    AVLNode(int v) : val(v), height(1), left(nullptr), right(nullptr) {}
};

int height(AVLNode* node) { return node ? node->height : 0; }

int getBalance(AVLNode* node) {
    return node ? {{0}} : 0;
}

AVLNode* rotateRight(AVLNode* y) {
    AVLNode* x = y->left, *T2 = y->left->right;
    x->right = y;
    y->left = {{1}};
    y->height = 1 + std::max(height(y->left), height(y->right));
    x->height = 1 + std::max(height(x->left), height(x->right));
    return {{2}};
}

AVLNode* rotateLeft(AVLNode* x) {
    AVLNode* y = x->right, *T2 = x->right->left;
    y->left = x;
    x->right = T2;
    x->height = 1 + std::max(height(x->left), height(x->right));
    y->height = 1 + std::max(height(y->left), height(y->right));
    return y;
}`,
        blanks: [
          { id: 0, answer: 'height(node->left) - height(node->right)' },
          { id: 1, answer: 'T2' },
          { id: 2, answer: 'x' },
        ],
      },
    },
  },
  {
    id: 'segment-tree-ds',
    name: 'Segment Tree',
    category: 'dataStructures',
    difficulty: 'hard',
    complexityRank: 3,
    description: 'Binary tree where each node stores an aggregate over a subarray range.',
    snippets: {
      python: {
        template: `class SegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        self._build(arr, 1, 0, self.n - 1)

    def _build(self, arr, node, start, end):
        if start == end:
            self.tree[node] = arr[start]; return
        mid = (start + end) // 2
        self._build(arr, {{0}}, start, mid)
        self._build(arr, 2 * node + 1, mid + 1, end)
        self.tree[node] = {{1}}

    def update(self, node, start, end, idx, val):
        if start == end:
            self.tree[node] = val; return
        mid = (start + end) // 2
        if idx <= mid:
            self.update(2 * node, start, mid, idx, val)
        else:
            self.update(2 * node + 1, mid + 1, end, idx, val)
        self.tree[node] = {{2}}`,
        blanks: [
          { id: 0, answer: '2 * node' },
          { id: 1, answer: 'self.tree[2 * node] + self.tree[2 * node + 1]' },
          { id: 2, answer: 'self.tree[2 * node] + self.tree[2 * node + 1]' },
        ],
      },
      java: {
        template: `class SegmentTree {
    int n;
    int[] tree;

    SegmentTree(int[] arr) {
        n = arr.length;
        tree = new int[4 * n];
        build(arr, 1, 0, n - 1);
    }

    void build(int[] arr, int node, int start, int end) {
        if (start == end) { tree[node] = arr[start]; return; }
        int mid = (start + end) / 2;
        build(arr, {{0}}, start, mid);
        build(arr, 2 * node + 1, mid + 1, end);
        tree[node] = {{1}};
    }

    void update(int node, int start, int end, int idx, int val) {
        if (start == end) { tree[node] = val; return; }
        int mid = (start + end) / 2;
        if (idx <= mid) update(2 * node, start, mid, idx, val);
        else update(2 * node + 1, mid + 1, end, idx, val);
        tree[node] = {{2}};
    }
}`,
        blanks: [
          { id: 0, answer: '2 * node' },
          { id: 1, answer: 'tree[2 * node] + tree[2 * node + 1]' },
          { id: 2, answer: 'tree[2 * node] + tree[2 * node + 1]' },
        ],
      },
      cpp: {
        template: `#include <vector>

class SegmentTree {
    int n;
    std::vector<int> tree;

    void build(std::vector<int>& arr, int node, int start, int end) {
        if (start == end) { tree[node] = arr[start]; return; }
        int mid = (start + end) / 2;
        build(arr, {{0}}, start, mid);
        build(arr, 2 * node + 1, mid + 1, end);
        tree[node] = {{1}};
    }

public:
    SegmentTree(std::vector<int>& arr)
        : n(arr.size()), tree(4 * arr.size()) {
        build(arr, 1, 0, n - 1);
    }

    void update(int node, int start, int end, int idx, int val) {
        if (start == end) { tree[node] = val; return; }
        int mid = (start + end) / 2;
        if (idx <= mid) update(2 * node, start, mid, idx, val);
        else update(2 * node + 1, mid + 1, end, idx, val);
        tree[node] = {{2}};
    }
};`,
        blanks: [
          { id: 0, answer: '2 * node' },
          { id: 1, answer: 'tree[2 * node] + tree[2 * node + 1]' },
          { id: 2, answer: 'tree[2 * node] + tree[2 * node + 1]' },
        ],
      },
    },
  },
  {
    id: 'fenwick-tree-ds',
    name: 'Fenwick Tree (BIT)',
    category: 'dataStructures',
    difficulty: 'hard',
    complexityRank: 3,
    description: 'Implicitly structured tree using LSB of index for efficient prefix queries.',
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

    def query(self, i):
        total = 0
        while i > 0:
            total += self.tree[i]
            i -= {{1}}
        return total

    def range_query(self, l, r):
        return {{2}}`,
        blanks: [
          { id: 0, answer: 'i & (-i)' },
          { id: 1, answer: 'i & (-i)' },
          { id: 2, answer: 'self.query(r) - self.query(l - 1)' },
        ],
      },
      java: {
        template: `class FenwickTree {
    int n;
    int[] tree;

    FenwickTree(int n) {
        this.n = n;
        tree = new int[n + 1];
    }

    void update(int i, int delta) {
        for (; i <= n; i += {{0}}) tree[i] += delta;
    }

    int query(int i) {
        int total = 0;
        for (; i > 0; i -= {{1}}) total += tree[i];
        return total;
    }

    int rangeQuery(int l, int r) {
        return {{2}};
    }
}`,
        blanks: [
          { id: 0, answer: 'i & (-i)' },
          { id: 1, answer: 'i & (-i)' },
          { id: 2, answer: 'query(r) - query(l - 1)' },
        ],
      },
      cpp: {
        template: `#include <vector>

class FenwickTree {
    int n;
    std::vector<int> tree;
public:
    FenwickTree(int n) : n(n), tree(n + 1, 0) {}

    void update(int i, int delta) {
        for (; i <= n; i += {{0}}) tree[i] += delta;
    }

    int query(int i) {
        int total = 0;
        for (; i > 0; i -= {{1}}) total += tree[i];
        return total;
    }

    int rangeQuery(int l, int r) {
        return {{2}};
    }
};`,
        blanks: [
          { id: 0, answer: 'i & (-i)' },
          { id: 1, answer: 'i & (-i)' },
          { id: 2, answer: 'query(r) - query(l - 1)' },
        ],
      },
    },
  },
  {
    id: 'lfu-cache',
    name: 'LFU Cache',
    category: 'dataStructures',
    difficulty: 'hard',
    complexityRank: 1,
    description: 'Tracks access frequency; evicts least frequently used item (ties broken by recency).',
    snippets: {
      python: {
        template: `from collections import defaultdict, OrderedDict

class LFUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.min_freq = 0
        self.key_val = {}
        self.key_freq = {}
        self.freq_keys = {{0}}

    def _update(self, key):
        freq = self.key_freq[key]
        self.key_freq[key] = {{1}}
        self.freq_keys[freq].pop(key)
        if not self.freq_keys[freq] and self.min_freq == freq:
            self.min_freq += 1
        self.freq_keys[freq + 1][key] = None

    def get(self, key):
        if key not in self.key_val: return -1
        self._update(key)
        return {{2}}

    def put(self, key, value):
        if not self.capacity: return
        if key in self.key_val:
            self.key_val[key] = value; self._update(key)
        else:
            if len(self.key_val) >= self.capacity:
                evict, _ = self.freq_keys[self.min_freq].popitem(last=False)
                del self.key_val[evict]; del self.key_freq[evict]
            self.key_val[key] = value
            self.key_freq[key] = 1
            self.freq_keys[1][key] = None
            self.min_freq = 1`,
        blanks: [
          { id: 0, answer: 'defaultdict(OrderedDict)' },
          { id: 1, answer: 'freq + 1' },
          { id: 2, answer: 'self.key_val[key]' },
        ],
      },
      java: {
        template: `import java.util.*;

class LFUCache {
    int capacity, minFreq;
    Map<Integer,Integer> keyVal = new HashMap<>(), keyFreq = new HashMap<>();
    Map<Integer, LinkedHashSet<Integer>> freqKeys = new HashMap<>();

    LFUCache(int capacity) { this.capacity = capacity; }

    private void update(int key) {
        int freq = keyFreq.get(key);
        keyFreq.put(key, {{0}});
        freqKeys.get(freq).remove(key);
        if (freqKeys.get(freq).isEmpty() && minFreq == freq) minFreq++;
        freqKeys.computeIfAbsent(freq + 1, k -> new LinkedHashSet<>()).add(key);
    }

    public int get(int key) {
        if (!keyVal.containsKey(key)) return -1;
        update(key);
        return {{1}};
    }

    public void put(int key, int value) {
        if (capacity == 0) return;
        if (keyVal.containsKey(key)) { keyVal.put(key, value); update(key); return; }
        if (keyVal.size() >= capacity) {
            int evict = freqKeys.get(minFreq).iterator().next();
            freqKeys.get(minFreq).remove(evict);
            keyVal.remove(evict); keyFreq.remove(evict);
        }
        keyVal.put(key, value); keyFreq.put(key, 1);
        freqKeys.computeIfAbsent(1, k -> {{2}}).add(key);
        minFreq = 1;
    }
}`,
        blanks: [
          { id: 0, answer: 'freq + 1' },
          { id: 1, answer: 'keyVal.get(key)' },
          { id: 2, answer: 'new LinkedHashSet<>()' },
        ],
      },
      cpp: {
        template: `#include <unordered_map>
#include <list>

class LFUCache {
    int capacity, minFreq = 0;
    std::unordered_map<int,int> keyVal, keyFreq;
    std::unordered_map<int, std::list<int>> freqKeys;
    std::unordered_map<int, std::list<int>::iterator> keyIter;

    void update(int key) {
        int freq = keyFreq[key];
        keyFreq[key] = {{0}};
        freqKeys[freq].erase(keyIter[key]);
        if (freqKeys[freq].empty() && minFreq == freq) minFreq++;
        freqKeys[freq + 1].push_front(key);
        keyIter[key] = {{1}};
    }

public:
    LFUCache(int cap) : capacity(cap) {}

    int get(int key) {
        if (!keyVal.count(key)) return -1;
        update(key);
        return {{2}};
    }

    void put(int key, int value) {
        if (!capacity) return;
        if (keyVal.count(key)) { keyVal[key] = value; update(key); return; }
        if ((int)keyVal.size() >= capacity) {
            int evict = freqKeys[minFreq].back();
            freqKeys[minFreq].pop_back();
            keyVal.erase(evict); keyFreq.erase(evict); keyIter.erase(evict);
        }
        keyVal[key] = value; keyFreq[key] = 1;
        freqKeys[1].push_front(key);
        keyIter[key] = freqKeys[1].begin();
        minFreq = 1;
    }
};`,
        blanks: [
          { id: 0, answer: 'freq + 1' },
          { id: 1, answer: 'freqKeys[freq + 1].begin()' },
          { id: 2, answer: 'keyVal[key]' },
        ],
      },
    },
  },
  {
    id: 'b-tree',
    name: 'B-Tree',
    category: 'dataStructures',
    difficulty: 'hard',
    complexityRank: 3,
    description: 'Self-balancing search tree with multiple keys per node and many children.',
    snippets: {
      python: {
        template: `class BTreeNode:
    def __init__(self, t, leaf=False):
        self.t = t
        self.keys = []
        self.children = []
        self.leaf = {{0}}

    def search(self, key):
        i = 0
        while i < len(self.keys) and {{1}}:
            i += 1
        if i < len(self.keys) and self.keys[i] == key:
            return self
        if self.leaf:
            return None
        return {{2}}

class BTree:
    def __init__(self, t):
        self.root = BTreeNode(t, leaf=True)
        self.t = t

    def search(self, key):
        return self.root.search(key)`,
        blanks: [
          { id: 0, answer: 'leaf' },
          { id: 1, answer: 'key > self.keys[i]' },
          { id: 2, answer: 'self.children[i].search(key)' },
        ],
      },
      java: {
        template: `import java.util.*;

class BTreeNode {
    int t;
    List<Integer> keys = new ArrayList<>();
    List<BTreeNode> children = new ArrayList<>();
    boolean leaf;

    BTreeNode(int t, boolean leaf) {
        this.t = t;
        this.leaf = {{0}};
    }

    BTreeNode search(int key) {
        int i = 0;
        while (i < keys.size() && {{1}}) i++;
        if (i < keys.size() && keys.get(i) == key) return this;
        if (leaf) return null;
        return {{2}};
    }
}

class BTree {
    BTreeNode root; int t;
    BTree(int t) { this.t = t; root = new BTreeNode(t, true); }
    BTreeNode search(int key) { return root.search(key); }
}`,
        blanks: [
          { id: 0, answer: 'leaf' },
          { id: 1, answer: 'key > keys.get(i)' },
          { id: 2, answer: 'children.get(i).search(key)' },
        ],
      },
      cpp: {
        template: `#include <vector>

struct BTreeNode {
    int t;
    std::vector<int> keys;
    std::vector<BTreeNode*> children;
    bool leaf;

    BTreeNode(int t, bool leaf) : t(t), leaf({{0}}) {}

    BTreeNode* search(int key) {
        int i = 0;
        while (i < (int)keys.size() && {{1}}) i++;
        if (i < (int)keys.size() && keys[i] == key) return this;
        if (leaf) return nullptr;
        return {{2}};
    }
};

class BTree {
    BTreeNode* root; int t;
public:
    BTree(int t) : t(t), root(new BTreeNode(t, true)) {}
    BTreeNode* search(int key) { return root->search(key); }
};`,
        blanks: [
          { id: 0, answer: 'leaf' },
          { id: 1, answer: 'key > keys[i]' },
          { id: 2, answer: 'children[i]->search(key)' },
        ],
      },
    },
  },
  {
    id: 'suffix-tree',
    name: 'Suffix Tree',
    category: 'dataStructures',
    difficulty: 'hard',
    complexityRank: 6,
    description: 'Compressed trie of all suffixes enabling O(m) substring queries.',
    snippets: {
      python: {
        template: `class SuffixTreeNode:
    def __init__(self):
        self.children = {}
        self.suffix_index = -1

class SuffixTree:
    def __init__(self, text):
        self.root = SuffixTreeNode()
        self.text = text
        self._build()

    def _build(self):
        for i in range(len(self.text)):
            self._insert_suffix({{0}}, i)

    def _insert_suffix(self, suffix, index):
        node = self.root
        for char in suffix:
            if char not in node.children:
                node.children[char] = {{1}}
            node = node.children[char]
        node.suffix_index = {{2}}`,
        blanks: [
          { id: 0, answer: 'self.text[i:]' },
          { id: 1, answer: 'SuffixTreeNode()' },
          { id: 2, answer: 'index' },
        ],
      },
      java: {
        template: `import java.util.*;

class SuffixTreeNode {
    Map<Character, SuffixTreeNode> children = new HashMap<>();
    int suffixIndex = -1;
}

class SuffixTree {
    SuffixTreeNode root = new SuffixTreeNode();
    String text;

    SuffixTree(String text) { this.text = text; build(); }

    void build() {
        for (int i = 0; i < text.length(); i++)
            insertSuffix({{0}}, i);
    }

    void insertSuffix(String suffix, int index) {
        SuffixTreeNode node = root;
        for (char c : suffix.toCharArray()) {
            node.children.putIfAbsent(c, {{1}});
            node = node.children.get(c);
        }
        node.suffixIndex = {{2}};
    }
}`,
        blanks: [
          { id: 0, answer: 'text.substring(i)' },
          { id: 1, answer: 'new SuffixTreeNode()' },
          { id: 2, answer: 'index' },
        ],
      },
      cpp: {
        template: `#include <unordered_map>
#include <string>

struct SuffixTreeNode {
    std::unordered_map<char, SuffixTreeNode*> children;
    int suffixIndex = -1;
};

class SuffixTree {
    SuffixTreeNode* root = new SuffixTreeNode();
    std::string text;

    void insertSuffix(const std::string& suffix, int index) {
        SuffixTreeNode* node = root;
        for (char c : suffix) {
            if (!node->children.count(c))
                node->children[c] = {{0}};
            node = node->children[c];
        }
        node->suffixIndex = {{1}};
    }

public:
    SuffixTree(const std::string& text) : text(text) {
        for (int i = 0; i < (int)text.size(); i++)
            insertSuffix({{2}}, i);
    }
};`,
        blanks: [
          { id: 0, answer: 'new SuffixTreeNode()' },
          { id: 1, answer: 'index' },
          { id: 2, answer: 'text.substr(i)' },
        ],
      },
    },
  },
  {
    id: 'trie-ds',
    name: 'Trie (Prefix Tree)',
    category: 'dataStructures',
    difficulty: 'hard',
    complexityRank: 6,
    description: 'Tree where each edge represents a character; paths from root spell out keys.',
    snippets: {
      python: {
        template: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False
        self.count = 0

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = {{0}}
            node = node.children[char]
            node.count += 1
        {{1}}

    def starts_with(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return {{2}}
            node = node.children[char]
        return node.count`,
        blanks: [
          { id: 0, answer: 'TrieNode()' },
          { id: 1, answer: 'node.is_end = True' },
          { id: 2, answer: '0' },
        ],
      },
      java: {
        template: `import java.util.*;

class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    boolean isEnd;
    int count;
}

class Trie {
    TrieNode root = new TrieNode();

    void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            node.children.putIfAbsent(c, {{0}});
            node = node.children.get(c);
            node.count++;
        }
        {{1}};
    }

    int startsWith(String prefix) {
        TrieNode node = root;
        for (char c : prefix.toCharArray()) {
            if (!node.children.containsKey(c)) return {{2}};
            node = node.children.get(c);
        }
        return node.count;
    }
}`,
        blanks: [
          { id: 0, answer: 'new TrieNode()' },
          { id: 1, answer: 'node.isEnd = true' },
          { id: 2, answer: '0' },
        ],
      },
      cpp: {
        template: `#include <unordered_map>
#include <string>

struct TrieNode {
    std::unordered_map<char, TrieNode*> children;
    bool isEnd = false;
    int count = 0;
};

class Trie {
    TrieNode* root = new TrieNode();
public:
    void insert(const std::string& word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children.count(c))
                node->children[c] = {{0}};
            node = node->children[c];
            node->count++;
        }
        {{1}};
    }

    int startsWith(const std::string& prefix) {
        TrieNode* node = root;
        for (char c : prefix) {
            if (!node->children.count(c)) return {{2}};
            node = node->children[c];
        }
        return node->count;
    }
};`,
        blanks: [
          { id: 0, answer: 'new TrieNode()' },
          { id: 1, answer: 'node->isEnd = true' },
          { id: 2, answer: '0' },
        ],
      },
    },
  },
]
