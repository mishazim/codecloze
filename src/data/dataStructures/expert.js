export const expertDataStructures = [
  {
    id: 'red-black-tree',
    name: 'Red-Black Tree',
    category: 'dataStructures',
    difficulty: 'expert',
    complexityRank: 3,
    description: 'Self-balancing BST with color invariants ensuring height ≤ 2 log n.',
    snippets: {
      python: {
        template: `RED, BLACK = True, False

class RBNode:
    def __init__(self, val):
        self.val = val
        self.color = {{0}}
        self.left = self.right = self.parent = None

class RedBlackTree:
    def __init__(self):
        self.NIL = RBNode(None)
        self.NIL.color = {{1}}
        self.root = self.NIL

    def _rotate_left(self, x):
        y = x.right
        x.right = y.left
        if y.left != self.NIL:
            y.left.parent = x
        y.parent = x.parent
        if x.parent is None:
            self.root = y
        elif x == x.parent.left:
            x.parent.left = y
        else:
            x.parent.right = {{2}}
        y.left = x
        x.parent = y`,
        blanks: [
          { id: 0, answer: 'RED' },
          { id: 1, answer: 'BLACK' },
          { id: 2, answer: 'y' },
        ],
      },
      java: {
        template: `static final boolean RED = true, BLACK = false;

class RBNode {
    int val;
    boolean color;
    RBNode left, right, parent;
    RBNode(int val) { this.val = val; this.color = {{0}}; }
}

class RedBlackTree {
    final RBNode NIL = new RBNode(0);
    RBNode root;

    RedBlackTree() {
        NIL.color = {{1}};
        root = NIL;
    }

    void rotateLeft(RBNode x) {
        RBNode y = x.right;
        x.right = y.left;
        if (y.left != NIL) y.left.parent = x;
        y.parent = x.parent;
        if (x.parent == null) root = y;
        else if (x == x.parent.left) x.parent.left = y;
        else x.parent.right = {{2}};
        y.left = x;
        x.parent = y;
    }
}`,
        blanks: [
          { id: 0, answer: 'RED' },
          { id: 1, answer: 'BLACK' },
          { id: 2, answer: 'y' },
        ],
      },
      cpp: {
        template: `const bool RED = true, BLACK = false;

struct RBNode {
    int val;
    bool color;
    RBNode *left, *right, *parent;
    RBNode(int v)
        : val(v), color({{0}}), left(nullptr), right(nullptr), parent(nullptr) {}
};

class RedBlackTree {
    RBNode* NIL;
    RBNode* root;

    void rotateLeft(RBNode* x) {
        RBNode* y = x->right;
        x->right = y->left;
        if (y->left != NIL) y->left->parent = x;
        y->parent = x->parent;
        if (!x->parent) root = y;
        else if (x == x->parent->left) x->parent->left = y;
        else x->parent->right = {{2}};
        y->left = x;
        x->parent = y;
    }

public:
    RedBlackTree() {
        NIL = new RBNode(0);
        NIL->color = {{1}};
        root = NIL;
    }
};`,
        blanks: [
          { id: 0, answer: 'RED' },
          { id: 1, answer: 'BLACK' },
          { id: 2, answer: 'y' },
        ],
      },
    },
  },
  {
    id: 'lsm-tree',
    name: 'LSM Tree (Log-Structured Merge-Tree)',
    category: 'dataStructures',
    difficulty: 'expert',
    complexityRank: 3,
    description: 'Writes to an in-memory buffer that is periodically merged into sorted on-disk levels.',
    snippets: {
      python: {
        template: `class LSMTree:
    def __init__(self, threshold=4):
        self.threshold = threshold
        self.memtable = {}
        self.sstables = []

    def put(self, key, value):
        self.memtable[key] = value
        if len(self.memtable) >= {{0}}:
            self._flush()

    def _flush(self):
        sorted_data = sorted(self.memtable.items())
        self.sstables.append({{1}})
        self.memtable.clear()

    def get(self, key):
        if key in self.memtable:
            return self.memtable[key]
        for sstable in reversed(self.sstables):
            for k, v in sstable:
                if {{2}}:
                    return v
        return None`,
        blanks: [
          { id: 0, answer: 'self.threshold' },
          { id: 1, answer: 'sorted_data' },
          { id: 2, answer: 'k == key' },
        ],
      },
      java: {
        template: `import java.util.*;

class LSMTree {
    int threshold;
    TreeMap<String,String> memtable = new TreeMap<>();
    List<List<Map.Entry<String,String>>> sstables = new ArrayList<>();

    LSMTree(int threshold) { this.threshold = threshold; }

    void put(String key, String value) {
        memtable.put(key, value);
        if (memtable.size() >= {{0}}) flush();
    }

    void flush() {
        List<Map.Entry<String,String>> sorted = new ArrayList<>(memtable.entrySet());
        sstables.add({{1}});
        memtable.clear();
    }

    String get(String key) {
        if (memtable.containsKey(key)) return memtable.get(key);
        for (int i = sstables.size() - 1; i >= 0; i--)
            for (Map.Entry<String,String> e : sstables.get(i))
                if ({{2}}) return e.getValue();
        return null;
    }
}`,
        blanks: [
          { id: 0, answer: 'threshold' },
          { id: 1, answer: 'sorted' },
          { id: 2, answer: 'e.getKey().equals(key)' },
        ],
      },
      cpp: {
        template: `#include <map>
#include <vector>
#include <string>
#include <algorithm>

class LSMTree {
    int threshold;
    std::map<std::string,std::string> memtable;
    std::vector<std::vector<std::pair<std::string,std::string>>> sstables;

public:
    LSMTree(int threshold) : threshold(threshold) {}

    void put(const std::string& key, const std::string& value) {
        memtable[key] = value;
        if ((int)memtable.size() >= {{0}}) flush();
    }

    void flush() {
        std::vector<std::pair<std::string,std::string>> sorted(
            memtable.begin(), memtable.end());
        sstables.push_back({{1}});
        memtable.clear();
    }

    std::string* get(const std::string& key) {
        if (memtable.count(key)) return &memtable[key];
        for (int i = sstables.size()-1; i >= 0; i--)
            for (auto& [k, v] : sstables[i])
                if ({{2}}) return &const_cast<std::string&>(v);
        return nullptr;
    }
};`,
        blanks: [
          { id: 0, answer: 'threshold' },
          { id: 1, answer: 'sorted' },
          { id: 2, answer: 'k == key' },
        ],
      },
    },
  },
  {
    id: 'bloom-filter-ds',
    name: 'Bloom Filter',
    category: 'dataStructures',
    difficulty: 'expert',
    complexityRank: 1,
    description: 'Probabilistic bit-array structure using multiple hashes; may have false positives, never false negatives.',
    snippets: {
      python: {
        template: `class BloomFilter:
    def __init__(self, size, hash_count):
        self.size = size
        self.hash_count = hash_count
        self.bits = {{0}}

    def _hashes(self, item):
        return [hash((item, i)) % self.size for i in range({{1}})]

    def add(self, item):
        for idx in self._hashes(item):
            self.bits[idx] = 1

    def might_contain(self, item):
        return all(self.bits[idx] for idx in {{2}})`,
        blanks: [
          { id: 0, answer: '[0] * size' },
          { id: 1, answer: 'self.hash_count' },
          { id: 2, answer: 'self._hashes(item)' },
        ],
      },
      java: {
        template: `class BloomFilter {
    int size, hashCount;
    int[] bits;

    BloomFilter(int size, int hashCount) {
        this.size = size;
        this.hashCount = hashCount;
        bits = {{0}};
    }

    int[] hashes(String item) {
        int[] h = new int[hashCount];
        for (int i = 0; i < {{1}}; i++)
            h[i] = Math.abs((item + i).hashCode()) % size;
        return h;
    }

    void add(String item) {
        for (int idx : hashes(item)) bits[idx] = 1;
    }

    boolean mightContain(String item) {
        for (int idx : {{2}}) if (bits[idx] == 0) return false;
        return true;
    }
}`,
        blanks: [
          { id: 0, answer: 'new int[size]' },
          { id: 1, answer: 'hashCount' },
          { id: 2, answer: 'hashes(item)' },
        ],
      },
      cpp: {
        template: `#include <vector>
#include <string>
#include <functional>

class BloomFilter {
    int size, hashCount;
    std::vector<int> bits;

    std::vector<int> hashes(const std::string& item) const {
        std::vector<int> h(hashCount);
        for (int i = 0; i < {{1}}; i++)
            h[i] = std::hash<std::string>{}(item + std::to_string(i)) % size;
        return h;
    }

public:
    BloomFilter(int size, int hashCount)
        : size(size), hashCount(hashCount), bits({{0}}) {}

    void add(const std::string& item) {
        for (int idx : hashes(item)) bits[idx] = 1;
    }

    bool mightContain(const std::string& item) const {
        for (int idx : {{2}}) if (!bits[idx]) return false;
        return true;
    }
};`,
        blanks: [
          { id: 0, answer: 'size, 0' },
          { id: 1, answer: 'hashCount' },
          { id: 2, answer: 'hashes(item)' },
        ],
      },
    },
  },
  {
    id: 'bitset',
    name: 'Bitset / Bit Array',
    category: 'dataStructures',
    difficulty: 'expert',
    complexityRank: 1,
    description: 'Compact array using individual bits to represent boolean flags.',
    snippets: {
      python: {
        template: `class Bitset:
    def __init__(self, size):
        self.size = size
        self.data = {{0}}

    def set(self, i):
        self.data[i // 32] |= {{1}}

    def clear(self, i):
        self.data[i // 32] &= ~(1 << (i % 32))

    def get(self, i):
        return bool(self.data[i // 32] & {{2}})

    def count(self):
        return sum(bin(word).count('1') for word in self.data)`,
        blanks: [
          { id: 0, answer: '[0] * ((size + 31) // 32)' },
          { id: 1, answer: '(1 << (i % 32))' },
          { id: 2, answer: '(1 << (i % 32))' },
        ],
      },
      java: {
        template: `class Bitset {
    int size;
    int[] data;

    Bitset(int size) {
        this.size = size;
        data = {{0}};
    }

    void set(int i)   { data[i / 32] |= {{1}}; }
    void clear(int i) { data[i / 32] &= ~(1 << (i % 32)); }
    boolean get(int i){ return (data[i / 32] & {{2}}) != 0; }

    int count() {
        int cnt = 0;
        for (int w : data) cnt += Integer.bitCount(w);
        return cnt;
    }
}`,
        blanks: [
          { id: 0, answer: 'new int[(size + 31) / 32]' },
          { id: 1, answer: '(1 << (i % 32))' },
          { id: 2, answer: '(1 << (i % 32))' },
        ],
      },
      cpp: {
        template: `#include <vector>
#include <cstdint>
#include <bit>

class Bitset {
    int size;
    std::vector<uint32_t> data;
public:
    Bitset(int size) : size(size), data({{0}}) {}

    void set(int i)   { data[i / 32] |= {{1}}; }
    void clear(int i) { data[i / 32] &= ~(1u << (i % 32)); }
    bool get(int i)   { return (data[i / 32] & {{2}}) != 0; }

    int count() {
        int cnt = 0;
        for (auto w : data) cnt += __builtin_popcount(w);
        return cnt;
    }
};`,
        blanks: [
          { id: 0, answer: '(size + 31) / 32, 0' },
          { id: 1, answer: '(1u << (i % 32))' },
          { id: 2, answer: '(1u << (i % 32))' },
        ],
      },
    },
  },
  {
    id: 'union-find-ds',
    name: 'Union-Find (Disjoint Set Union)',
    category: 'dataStructures',
    difficulty: 'expert',
    complexityRank: 2,
    description: 'Forest of trees tracking disjoint sets; path compression + union by rank for near-O(1).',
    snippets: {
      python: {
        template: `class DSU:
    def __init__(self, n):
        self.parent = {{0}}
        self.rank = [0] * n
        self.components = n

    def find(self, x):
        while self.parent[x] != x:
            self.parent[x] = {{1}}
            x = self.parent[x]
        return x

    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py: return False
        if self.rank[px] < self.rank[py]: px, py = py, px
        self.parent[py] = {{2}}
        if self.rank[px] == self.rank[py]: self.rank[px] += 1
        self.components -= 1
        return True`,
        blanks: [
          { id: 0, answer: 'list(range(n))' },
          { id: 1, answer: 'self.parent[self.parent[x]]' },
          { id: 2, answer: 'px' },
        ],
      },
      java: {
        template: `class DSU {
    int[] parent, rank;
    int components;

    DSU(int n) {
        parent = {{0}};
        rank = new int[n];
        components = n;
        for (int i = 0; i < n; i++) parent[i] = i;
    }

    int find(int x) {
        while (parent[x] != x) {
            parent[x] = {{1}};
            x = parent[x];
        }
        return x;
    }

    boolean union(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;
        if (rank[px] < rank[py]) { int tmp = px; px = py; py = tmp; }
        parent[py] = {{2}};
        if (rank[px] == rank[py]) rank[px]++;
        components--;
        return true;
    }
}`,
        blanks: [
          { id: 0, answer: 'new int[n]' },
          { id: 1, answer: 'parent[parent[x]]' },
          { id: 2, answer: 'px' },
        ],
      },
      cpp: {
        template: `#include <vector>
#include <numeric>

class DSU {
    std::vector<int> parent, rank_;
    int components;
public:
    DSU(int n) : parent(n), rank_(n, 0), components(n) {
        {{0}};
    }

    int find(int x) {
        while (parent[x] != x) {
            parent[x] = {{1}};
            x = parent[x];
        }
        return x;
    }

    bool unite(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return false;
        if (rank_[px] < rank_[py]) std::swap(px, py);
        parent[py] = {{2}};
        if (rank_[px] == rank_[py]) rank_[px]++;
        components--;
        return true;
    }
};`,
        blanks: [
          { id: 0, answer: 'iota(parent.begin(), parent.end(), 0)' },
          { id: 1, answer: 'parent[parent[x]]' },
          { id: 2, answer: 'px' },
        ],
      },
    },
  },
  {
    id: 'suffix-array-ds',
    name: 'Suffix Array',
    category: 'dataStructures',
    difficulty: 'expert',
    complexityRank: 8,
    description: 'Sorted array of all suffixes of a string with LCP array for fast queries.',
    snippets: {
      python: {
        template: `def build_suffix_array(s):
    n = len(s)
    sa = {{0}}
    rank = [0] * n
    for i, idx in enumerate(sa):
        rank[idx] = i
    return sa, rank

def kasai_lcp(s, sa, rank):
    n = len(s)
    lcp = [0] * n
    h = 0
    for i in range(n):
        if rank[i] > 0:
            j = sa[rank[i] - 1]
            while i + h < n and j + h < n and {{1}}:
                h += 1
            lcp[{{2}}] = h
            if h > 0: h -= 1
    return lcp`,
        blanks: [
          { id: 0, answer: 'sorted(range(n), key=lambda i: s[i:])' },
          { id: 1, answer: 's[i + h] == s[j + h]' },
          { id: 2, answer: 'rank[i]' },
        ],
      },
      java: {
        template: `import java.util.*;

class SuffixArray {
    static int[] build(String s) {
        int n = s.length();
        Integer[] sa = new Integer[n];
        for (int i = 0; i < n; i++) sa[i] = i;
        Arrays.sort(sa, (a, b) -> {{0}});
        int[] result = new int[n];
        for (int i = 0; i < n; i++) result[i] = sa[i];
        return result;
    }

    static int[] kasaiLcp(String s, int[] sa) {
        int n = s.length();
        int[] rank = new int[n], lcp = new int[n];
        for (int i = 0; i < n; i++) rank[sa[i]] = i;
        int h = 0;
        for (int i = 0; i < n; i++) {
            if (rank[i] > 0) {
                int j = sa[rank[i] - 1];
                while (i + h < n && j + h < n && {{1}}) h++;
                lcp[{{2}}] = h;
                if (h > 0) h--;
            }
        }
        return lcp;
    }
}`,
        blanks: [
          { id: 0, answer: 's.substring(a).compareTo(s.substring(b))' },
          { id: 1, answer: 's.charAt(i + h) == s.charAt(j + h)' },
          { id: 2, answer: 'rank[i]' },
        ],
      },
      cpp: {
        template: `#include <vector>
#include <string>
#include <numeric>
#include <algorithm>

std::vector<int> buildSuffixArray(const std::string& s) {
    int n = s.size();
    std::vector<int> sa(n);
    std::iota(sa.begin(), sa.end(), 0);
    std::sort(sa.begin(), sa.end(), [&](int a, int b) {
        return {{0}};
    });
    return sa;
}

std::vector<int> kasaiLcp(const std::string& s, const std::vector<int>& sa) {
    int n = s.size();
    std::vector<int> rank_(n), lcp(n, 0);
    for (int i = 0; i < n; i++) rank_[sa[i]] = i;
    int h = 0;
    for (int i = 0; i < n; i++) {
        if (rank_[i] > 0) {
            int j = sa[rank_[i] - 1];
            while (i + h < n && j + h < n && {{1}}) h++;
            lcp[{{2}}] = h;
            if (h) h--;
        }
    }
    return lcp;
}`,
        blanks: [
          { id: 0, answer: 's.substr(a) < s.substr(b)' },
          { id: 1, answer: 's[i + h] == s[j + h]' },
          { id: 2, answer: 'rank_[i]' },
        ],
      },
    },
  },
]
