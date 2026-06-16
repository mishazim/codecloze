export const mediumAlgorithms = [
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'algorithms',
    difficulty: 'medium',
    complexityRank: 8,
    description: 'Divides array in half, sorts each half, then merges them back together.',
    snippets: {
      python: {
        template: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = {{0}}
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if {{1}}:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + {{2}} + right[j:]`,
        blanks: [
          { id: 0, answer: 'len(arr) // 2' },
          { id: 1, answer: 'left[i] <= right[j]' },
          { id: 2, answer: 'left[i:]' },
        ],
      },
      java: {
        template: `static int[] mergeSort(int[] arr) {
    if (arr.length <= 1) return arr;
    int mid = {{0}};
    int[] left = mergeSort(Arrays.copyOfRange(arr, 0, mid));
    int[] right = mergeSort(Arrays.copyOfRange(arr, mid, arr.length));
    return merge(left, right);
}

static int[] merge(int[] left, int[] right) {
    int[] result = new int[left.length + right.length];
    int i = 0, j = 0, k = 0;
    while (i < left.length && j < right.length) {
        if ({{1}}) result[k++] = left[i++];
        else result[k++] = right[j++];
    }
    while (i < left.length) result[k++] = {{2}};
    while (j < right.length) result[k++] = right[j++];
    return result;
}`,
        blanks: [
          { id: 0, answer: 'arr.length / 2' },
          { id: 1, answer: 'left[i] <= right[j]' },
          { id: 2, answer: 'left[i++]' },
        ],
      },
      cpp: {
        template: `vector<int> merge(vector<int>& left, vector<int>& right) {
    vector<int> result;
    int i = 0, j = 0;
    while (i < left.size() && j < right.size()) {
        if ({{0}}) result.push_back(left[i++]);
        else result.push_back(right[j++]);
    }
    result.insert(result.end(), left.begin() + i, left.end());
    result.insert(result.end(), {{1}}, right.end());
    return result;
}

vector<int> mergeSort(vector<int> arr) {
    if (arr.size() <= 1) return arr;
    int mid = {{2}};
    auto left = mergeSort(vector<int>(arr.begin(), arr.begin() + mid));
    auto right = mergeSort(vector<int>(arr.begin() + mid, arr.end()));
    return merge(left, right);
}`,
        blanks: [
          { id: 0, answer: 'left[i] <= right[j]' },
          { id: 1, answer: 'right.begin() + j' },
          { id: 2, answer: 'arr.size() / 2' },
        ],
      },
    },
  },
  {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'algorithms',
    difficulty: 'medium',
    complexityRank: 10,
    description: 'Picks a pivot and partitions array into elements less/greater than pivot.',
    snippets: {
      python: {
        template: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, {{0}})
        quick_sort(arr, {{1}}, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = {{2}}
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return {{3}}`,
        blanks: [
          { id: 0, answer: 'pi - 1' },
          { id: 1, answer: 'pi + 1' },
          { id: 2, answer: 'arr[j], arr[i]' },
          { id: 3, answer: 'i + 1' },
        ],
      },
      java: {
        template: `static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, {{0}});
        quickSort(arr, {{1}}, high);
    }
}

static int partition(int[] arr, int low, int high) {
    int pivot = arr[high], i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            int temp = arr[i]; arr[i] = arr[j]; arr[j] = {{2}};
        }
    }
    int temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
    return {{3}};
}`,
        blanks: [
          { id: 0, answer: 'pi - 1' },
          { id: 1, answer: 'pi + 1' },
          { id: 2, answer: 'temp' },
          { id: 3, answer: 'i + 1' },
        ],
      },
      cpp: {
        template: `int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high], i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) swap(arr[++i], {{0}});
    }
    swap(arr[i + 1], arr[high]);
    return {{1}};
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, {{2}});
        quickSort(arr, pi + 1, high);
    }
}`,
        blanks: [
          { id: 0, answer: 'arr[j]' },
          { id: 1, answer: 'i + 1' },
          { id: 2, answer: 'pi - 1' },
        ],
      },
    },
  },
  {
    id: 'counting-sort',
    name: 'Counting Sort',
    category: 'algorithms',
    difficulty: 'medium',
    complexityRank: 6,
    description: 'Counts occurrences of each value and reconstructs sorted array.',
    snippets: {
      python: {
        template: `def counting_sort(arr, max_val):
    count = {{0}}
    for num in arr:
        count[num] += 1
    result = []
    for val, freq in enumerate(count):
        result.{{1}}([val] * freq)
    return result`,
        blanks: [
          { id: 0, answer: '[0] * (max_val + 1)' },
          { id: 1, answer: 'extend' },
        ],
      },
      java: {
        template: `static int[] countingSort(int[] arr, int maxVal) {
    int[] count = {{0}};
    for (int num : arr) count[num]++;
    int[] result = new int[arr.length];
    int idx = 0;
    for (int val = 0; val <= maxVal; val++) {
        for (int i = 0; i < {{1}}; i++) result[idx++] = val;
    }
    return result;
}`,
        blanks: [
          { id: 0, answer: 'new int[maxVal + 1]' },
          { id: 1, answer: 'count[val]' },
        ],
      },
      cpp: {
        template: `vector<int> countingSort(vector<int>& arr, int maxVal) {
    vector<int> count({{0}}, 0);
    for (int num : arr) count[num]++;
    vector<int> result;
    for (int val = 0; val <= maxVal; val++) {
        result.insert(result.end(), {{1}}, val);
    }
    return result;
}`,
        blanks: [
          { id: 0, answer: 'maxVal + 1' },
          { id: 1, answer: 'count[val]' },
        ],
      },
    },
  },
  {
    id: 'radix-sort',
    name: 'Radix Sort',
    category: 'algorithms',
    difficulty: 'medium',
    complexityRank: 6,
    description: 'Sorts by each digit from least significant to most significant.',
    snippets: {
      python: {
        template: `def radix_sort(arr):
    max_val = max(arr)
    exp = {{0}}
    while max_val // exp > 0:
        arr = counting_sort_by_digit(arr, exp)
        exp *= {{1}}
    return arr

def counting_sort_by_digit(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    for num in arr:
        index = {{2}}
        count[index] += 1
    for i in range(1, 10):
        count[i] += count[i - 1]
    for num in reversed(arr):
        index = (num // exp) % 10
        output[count[index] - 1] = num
        {{3}}
    return output`,
        blanks: [
          { id: 0, answer: '1' },
          { id: 1, answer: '10' },
          { id: 2, answer: '(num // exp) % 10' },
          { id: 3, answer: 'count[index] -= 1' },
        ],
      },
      java: {
        template: `static void countingSortByDigit(int[] arr, int exp) {
    int n = arr.length;
    int[] output = new int[n], count = new int[10];
    for (int num : arr) count[{{0}}]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        int index = (arr[i] / exp) % 10;
        output[count[index] - 1] = arr[i];
        {{1}};
    }
    System.arraycopy(output, 0, arr, 0, n);
}

static int[] radixSort(int[] arr) {
    int maxVal = Arrays.stream(arr).max().getAsInt();
    for (int exp = {{2}}; maxVal / exp > 0; exp *= {{3}}) {
        countingSortByDigit(arr, exp);
    }
    return arr;
}`,
        blanks: [
          { id: 0, answer: '(num / exp) % 10' },
          { id: 1, answer: 'count[index]--' },
          { id: 2, answer: '1' },
          { id: 3, answer: '10' },
        ],
      },
      cpp: {
        template: `void countingSortByDigit(vector<int>& arr, int exp) {
    int n = arr.size();
    vector<int> output(n), count(10, 0);
    for (int num : arr) count[{{0}}]++;
    for (int i = 1; i < 10; i++) count[i] += count[i - 1];
    for (int i = n - 1; i >= 0; i--) {
        int index = (arr[i] / exp) % 10;
        output[count[index] - 1] = arr[i];
        {{1}};
    }
    arr = output;
}

void radixSort(vector<int>& arr) {
    int maxVal = *max_element(arr.begin(), arr.end());
    for (int exp = {{2}}; maxVal / exp > 0; exp *= {{3}}) {
        countingSortByDigit(arr, exp);
    }
}`,
        blanks: [
          { id: 0, answer: '(num / exp) % 10' },
          { id: 1, answer: 'count[index]--' },
          { id: 2, answer: '1' },
          { id: 3, answer: '10' },
        ],
      },
    },
  },
  {
    id: 'sliding-window-variable',
    name: 'Sliding Window (Variable)',
    category: 'algorithms',
    difficulty: 'medium',
    complexityRank: 6,
    description: 'Expands/contracts window based on condition to find optimal subarray.',
    snippets: {
      python: {
        template: `def longest_unique_substring(s):
    char_index = {}
    left = 0
    max_len = 0
    for right, char in enumerate(s):
        if char in char_index and {{0}}:
            left = {{1}}
        char_index[char] = right
        max_len = max(max_len, {{2}})
    return max_len`,
        blanks: [
          { id: 0, answer: 'char_index[char] >= left' },
          { id: 1, answer: 'char_index[char] + 1' },
          { id: 2, answer: 'right - left + 1' },
        ],
      },
      java: {
        template: `static int longestUniqueSubstring(String s) {
    Map<Character, Integer> charIndex = new HashMap<>();
    int left = 0, maxLen = 0;
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        if (charIndex.containsKey(c) && {{0}}) {
            left = {{1}};
        }
        charIndex.put(c, right);
        maxLen = Math.max(maxLen, {{2}});
    }
    return maxLen;
}`,
        blanks: [
          { id: 0, answer: 'charIndex.get(c) >= left' },
          { id: 1, answer: 'charIndex.get(c) + 1' },
          { id: 2, answer: 'right - left + 1' },
        ],
      },
      cpp: {
        template: `int longestUniqueSubstring(string& s) {
    unordered_map<char, int> charIndex;
    int left = 0, maxLen = 0;
    for (int right = 0; right < s.size(); right++) {
        char c = s[right];
        if (charIndex.count(c) && {{0}}) {
            left = {{1}};
        }
        charIndex[c] = right;
        maxLen = max(maxLen, {{2}});
    }
    return maxLen;
}`,
        blanks: [
          { id: 0, answer: 'charIndex[c] >= left' },
          { id: 1, answer: 'charIndex[c] + 1' },
          { id: 2, answer: 'right - left + 1' },
        ],
      },
    },
  },
  {
    id: 'monotonic-stack',
    name: 'Monotonic Stack',
    category: 'algorithms',
    difficulty: 'medium',
    complexityRank: 6,
    description: 'Maintains a stack where elements are in monotonically increasing or decreasing order.',
    snippets: {
      python: {
        template: `def next_greater_element(nums):
    result = {{0}}
    stack = []
    for i in range(len(nums) - 1, -1, -1):
        while stack and {{1}}:
            stack.pop()
        result[i] = {{2}}
        stack.append(nums[i])
    return result`,
        blanks: [
          { id: 0, answer: '[-1] * len(nums)' },
          { id: 1, answer: 'stack[-1] <= nums[i]' },
          { id: 2, answer: 'stack[-1] if stack else -1' },
        ],
      },
      java: {
        template: `static int[] nextGreaterElement(int[] nums) {
    int[] result = {{0}};
    Deque<Integer> stack = new ArrayDeque<>();
    for (int i = nums.length - 1; i >= 0; i--) {
        while (!stack.isEmpty() && {{1}}) stack.pop();
        result[i] = {{2}};
        stack.push(nums[i]);
    }
    return result;
}`,
        blanks: [
          { id: 0, answer: 'new int[nums.length]' },
          { id: 1, answer: 'stack.peek() <= nums[i]' },
          { id: 2, answer: 'stack.isEmpty() ? -1 : stack.peek()' },
        ],
      },
      cpp: {
        template: `vector<int> nextGreaterElement(vector<int>& nums) {
    vector<int> result(nums.size(), {{0}});
    stack<int> st;
    for (int i = nums.size() - 1; i >= 0; i--) {
        while (!st.empty() && {{1}}) st.pop();
        result[i] = {{2}};
        st.push(nums[i]);
    }
    return result;
}`,
        blanks: [
          { id: 0, answer: '-1' },
          { id: 1, answer: 'st.top() <= nums[i]' },
          { id: 2, answer: 'st.empty() ? -1 : st.top()' },
        ],
      },
    },
  },
  {
    id: 'kadane',
    name: "Maximum Subarray (Kadane's)",
    category: 'algorithms',
    difficulty: 'medium',
    complexityRank: 6,
    description: 'Scans array tracking current and global max subarray sum.',
    snippets: {
      python: {
        template: `def max_subarray(nums):
    current_max = {{0}}
    global_max = nums[0]
    for num in nums[1:]:
        current_max = {{1}}
        global_max = {{2}}
    return global_max`,
        blanks: [
          { id: 0, answer: 'nums[0]' },
          { id: 1, answer: 'max(num, current_max + num)' },
          { id: 2, answer: 'max(global_max, current_max)' },
        ],
      },
      java: {
        template: `static int maxSubarray(int[] nums) {
    int currentMax = {{0}}, globalMax = nums[0];
    for (int i = 1; i < nums.length; i++) {
        currentMax = {{1}};
        globalMax = {{2}};
    }
    return globalMax;
}`,
        blanks: [
          { id: 0, answer: 'nums[0]' },
          { id: 1, answer: 'Math.max(nums[i], currentMax + nums[i])' },
          { id: 2, answer: 'Math.max(globalMax, currentMax)' },
        ],
      },
      cpp: {
        template: `int maxSubarray(vector<int>& nums) {
    int currentMax = {{0}}, globalMax = nums[0];
    for (int i = 1; i < nums.size(); i++) {
        currentMax = {{1}};
        globalMax = {{2}};
    }
    return globalMax;
}`,
        blanks: [
          { id: 0, answer: 'nums[0]' },
          { id: 1, answer: 'max(nums[i], currentMax + nums[i])' },
          { id: 2, answer: 'max(globalMax, currentMax)' },
        ],
      },
    },
  },
  {
    id: 'floyd-cycle-detection',
    name: "Floyd's Cycle Detection",
    category: 'algorithms',
    difficulty: 'medium',
    complexityRank: 6,
    description: 'Uses slow and fast pointers to detect cycles and find their start.',
    snippets: {
      python: {
        template: `def has_cycle(head):
    slow = {{0}}
    fast = head
    while fast and {{1}}:
        slow = {{2}}
        fast = fast.next.next
    return {{3}}`,
        blanks: [
          { id: 0, answer: 'head' },
          { id: 1, answer: 'fast.next' },
          { id: 2, answer: 'slow.next' },
          { id: 3, answer: 'fast == slow' },
        ],
      },
      java: {
        template: `static boolean hasCycle(ListNode head) {
    ListNode slow = {{0}}, fast = head;
    while (fast != null && {{1}} != null) {
        slow = {{2}};
        fast = fast.next.next;
    }
    return {{3}};
}`,
        blanks: [
          { id: 0, answer: 'head' },
          { id: 1, answer: 'fast.next' },
          { id: 2, answer: 'slow.next' },
          { id: 3, answer: 'fast == slow' },
        ],
      },
      cpp: {
        template: `bool hasCycle(ListNode* head) {
    ListNode* slow = {{0}};
    ListNode* fast = head;
    while (fast && {{1}}) {
        slow = {{2}};
        fast = fast->next->next;
    }
    return {{3}};
}`,
        blanks: [
          { id: 0, answer: 'head' },
          { id: 1, answer: 'fast->next' },
          { id: 2, answer: 'slow->next' },
          { id: 3, answer: 'fast == slow' },
        ],
      },
    },
  },
  {
    id: 'kmp',
    name: 'KMP Algorithm',
    category: 'algorithms',
    difficulty: 'medium',
    complexityRank: 6,
    description: 'Uses failure function to avoid redundant comparisons during pattern matching.',
    snippets: {
      python: {
        template: `def build_lps(pattern):
    lps = [0] * len(pattern)
    length, i = 0, 1
    while i < len(pattern):
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        elif length:
            length = {{0}}
        else:
            lps[i] = 0; i += 1
    return lps

def kmp_search(text, pattern):
    lps = build_lps(pattern)
    i = j = 0
    results = []
    while i < len(text):
        if text[i] == pattern[j]:
            i += 1; j += 1
        if j == len(pattern):
            results.append({{1}})
            j = {{2}}
        elif i < len(text) and text[i] != pattern[j]:
            j = lps[j - 1] if j else (i := i + 1) and 0
    return results`,
        blanks: [
          { id: 0, answer: 'lps[length - 1]' },
          { id: 1, answer: 'i - j' },
          { id: 2, answer: 'lps[j - 1]' },
        ],
      },
      java: {
        template: `static int[] buildLps(String pattern) {
    int[] lps = new int[pattern.length()];
    int length = 0, i = 1;
    while (i < pattern.length()) {
        if (pattern.charAt(i) == pattern.charAt(length)) {
            lps[i++] = ++length;
        } else if (length != 0) {
            length = {{0}};
        } else {
            lps[i++] = 0;
        }
    }
    return lps;
}

static List<Integer> kmpSearch(String text, String pattern) {
    int[] lps = buildLps(pattern);
    List<Integer> results = new ArrayList<>();
    int i = 0, j = 0;
    while (i < text.length()) {
        if (text.charAt(i) == pattern.charAt(j)) { i++; j++; }
        if (j == pattern.length()) {
            results.add({{1}});
            j = {{2}};
        } else if (i < text.length() && text.charAt(i) != pattern.charAt(j)) {
            if (j != 0) j = lps[j - 1]; else i++;
        }
    }
    return results;
}`,
        blanks: [
          { id: 0, answer: 'lps[length - 1]' },
          { id: 1, answer: 'i - j' },
          { id: 2, answer: 'lps[j - 1]' },
        ],
      },
      cpp: {
        template: `vector<int> buildLps(string& pattern) {
    vector<int> lps(pattern.size(), 0);
    int length = 0, i = 1;
    while (i < pattern.size()) {
        if (pattern[i] == pattern[length]) {
            lps[i++] = ++length;
        } else if (length) {
            length = {{0}};
        } else {
            lps[i++] = 0;
        }
    }
    return lps;
}

vector<int> kmpSearch(string& text, string& pattern) {
    auto lps = buildLps(pattern);
    vector<int> results;
    int i = 0, j = 0;
    while (i < text.size()) {
        if (text[i] == pattern[j]) { i++; j++; }
        if (j == pattern.size()) {
            results.push_back({{1}});
            j = {{2}};
        } else if (i < text.size() && text[i] != pattern[j]) {
            if (j) j = lps[j - 1]; else i++;
        }
    }
    return results;
}`,
        blanks: [
          { id: 0, answer: 'lps[length - 1]' },
          { id: 1, answer: 'i - j' },
          { id: 2, answer: 'lps[j - 1]' },
        ],
      },
    },
  },
  {
    id: 'trie',
    name: 'Trie (Prefix Tree)',
    category: 'algorithms',
    difficulty: 'medium',
    complexityRank: 6,
    description: 'Tree where each node represents a character; paths spell out strings.',
    snippets: {
      python: {
        template: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = {{0}}
            node = node.children[char]
        {{1}}

    def search(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                return {{2}}
            node = node.children[char]
        return node.is_end`,
        blanks: [
          { id: 0, answer: 'TrieNode()' },
          { id: 1, answer: 'node.is_end = True' },
          { id: 2, answer: 'False' },
        ],
      },
      java: {
        template: `class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    boolean isEnd = false;
}

class Trie {
    TrieNode root = new TrieNode();

    void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            node.children.putIfAbsent(c, {{0}});
            node = node.children.get(c);
        }
        {{1}};
    }

    boolean search(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            if (!node.children.containsKey(c)) return {{2}};
            node = node.children.get(c);
        }
        return node.isEnd;
    }
}`,
        blanks: [
          { id: 0, answer: 'new TrieNode()' },
          { id: 1, answer: 'node.isEnd = true' },
          { id: 2, answer: 'false' },
        ],
      },
      cpp: {
        template: `struct TrieNode {
    unordered_map<char, TrieNode*> children;
    bool isEnd = false;
};

class Trie {
    TrieNode* root = new TrieNode();
public:
    void insert(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children.count(c)) node->children[c] = {{0}};
            node = node->children[c];
        }
        {{1}};
    }

    bool search(string word) {
        TrieNode* node = root;
        for (char c : word) {
            if (!node->children.count(c)) return {{2}};
            node = node->children[c];
        }
        return node->isEnd;
    }
};`,
        blanks: [
          { id: 0, answer: 'new TrieNode()' },
          { id: 1, answer: 'node->isEnd = true' },
          { id: 2, answer: 'false' },
        ],
      },
    },
  },
  {
    id: 'lru-cache',
    name: 'LRU Cache (LinkedHashMap)',
    category: 'algorithms',
    difficulty: 'medium',
    complexityRank: 1,
    description: 'Combines a doubly linked list and hash map to evict least recently used items.',
    snippets: {
      python: {
        template: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {{0}}

    def get(self, key):
        if key not in self.cache:
            return -1
        self.cache.{{1}}(key)
        return self.cache[key]

    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem({{2}})`,
        blanks: [
          { id: 0, answer: 'OrderedDict()' },
          { id: 1, answer: 'move_to_end' },
          { id: 2, answer: 'last=False' },
        ],
      },
      java: {
        template: `class LRUCache extends LinkedHashMap<Integer, Integer> {
    private int capacity;

    LRUCache(int capacity) {
        super(16, 0.75f, {{0}});
        this.capacity = capacity;
    }

    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        return size() > {{1}};
    }

    int get(int key) {
        return {{2}};
    }
}`,
        blanks: [
          { id: 0, answer: 'true' },
          { id: 1, answer: 'capacity' },
          { id: 2, answer: 'getOrDefault(key, -1)' },
        ],
      },
      cpp: {
        template: `class LRUCache {
    int cap;
    list<pair<int,int>> lst;
    unordered_map<int, list<pair<int,int>>::iterator> mp;
public:
    LRUCache(int capacity) : cap(capacity) {}

    int get(int key) {
        if (!mp.count(key)) return -1;
        lst.splice({{0}}, lst, mp[key]);
        return mp[key]->second;
    }

    void put(int key, int val) {
        if (mp.count(key)) lst.erase(mp[key]);
        else if (lst.size() == cap) {
            mp.erase({{1}});
            lst.pop_back();
        }
        lst.push_front({key, val});
        mp[key] = {{2}};
    }
};`,
        blanks: [
          { id: 0, answer: 'lst.begin()' },
          { id: 1, answer: 'lst.back().first' },
          { id: 2, answer: 'lst.begin()' },
        ],
      },
    },
  },
  {
    id: 'union-find',
    name: 'Union-Find (Disjoint Set Union)',
    category: 'algorithms',
    difficulty: 'medium',
    complexityRank: 2,
    description: 'Tracks partitions with path compression and union by rank for near-O(1) ops.',
    snippets: {
      python: {
        template: `class UnionFind:
    def __init__(self, n):
        self.parent = {{0}}
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = {{1}}
        return self.parent[x]

    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx == ry:
            return False
        if self.rank[rx] < self.rank[ry]:
            rx, ry = ry, rx
        self.parent[ry] = {{2}}
        if self.rank[rx] == self.rank[ry]:
            self.rank[rx] += 1
        return True`,
        blanks: [
          { id: 0, answer: 'list(range(n))' },
          { id: 1, answer: 'self.find(self.parent[x])' },
          { id: 2, answer: 'rx' },
        ],
      },
      java: {
        template: `class UnionFind {
    int[] parent, rank;

    UnionFind(int n) {
        parent = {{0}};
        rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }

    int find(int x) {
        if (parent[x] != x) parent[x] = {{1}};
        return parent[x];
    }

    boolean union(int x, int y) {
        int rx = find(x), ry = find(y);
        if (rx == ry) return false;
        if (rank[rx] < rank[ry]) { int t = rx; rx = ry; ry = t; }
        parent[ry] = {{2}};
        if (rank[rx] == rank[ry]) rank[rx]++;
        return true;
    }
}`,
        blanks: [
          { id: 0, answer: 'new int[n]' },
          { id: 1, answer: 'find(parent[x])' },
          { id: 2, answer: 'rx' },
        ],
      },
      cpp: {
        template: `class UnionFind {
    vector<int> parent, rnk;
public:
    UnionFind(int n) : parent(n), rnk(n, 0) {
        {{0}};
    }

    int find(int x) {
        if (parent[x] != x) parent[x] = {{1}};
        return parent[x];
    }

    bool unite(int x, int y) {
        int rx = find(x), ry = find(y);
        if (rx == ry) return false;
        if (rnk[rx] < rnk[ry]) swap(rx, ry);
        parent[ry] = {{2}};
        if (rnk[rx] == rnk[ry]) rnk[rx]++;
        return true;
    }
};`,
        blanks: [
          { id: 0, answer: 'iota(parent.begin(), parent.end(), 0)' },
          { id: 1, answer: 'find(parent[x])' },
          { id: 2, answer: 'rx' },
        ],
      },
    },
  },
  {
    id: 'kahn-topological-sort',
    name: "Kahn's Algorithm (Topological Sort)",
    category: 'algorithms',
    difficulty: 'medium',
    complexityRank: 6,
    description: 'Uses in-degree counts and a queue to produce topological ordering.',
    snippets: {
      python: {
        template: `from collections import deque

def kahn_topo_sort(graph, n):
    in_degree = {{0}}
    for u in graph:
        for v in graph[u]:
            in_degree[v] += 1
    queue = deque({{1}})
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if {{2}}:
                queue.append(neighbor)
    return order if len(order) == n else []`,
        blanks: [
          { id: 0, answer: '[0] * n' },
          { id: 1, answer: '[i for i in range(n) if in_degree[i] == 0]' },
          { id: 2, answer: 'in_degree[neighbor] == 0' },
        ],
      },
      java: {
        template: `static List<Integer> kahnTopoSort(Map<Integer, List<Integer>> graph, int n) {
    int[] inDegree = {{0}};
    for (int u : graph.keySet())
        for (int v : graph.get(u)) inDegree[v]++;
    Queue<Integer> queue = new LinkedList<>();
    for (int i = 0; i < n; i++) if ({{1}}) queue.add(i);
    List<Integer> order = new ArrayList<>();
    while (!queue.isEmpty()) {
        int node = queue.poll();
        order.add(node);
        for (int neighbor : graph.getOrDefault(node, List.of())) {
            if (--inDegree[neighbor] == 0) queue.add(neighbor);
        }
    }
    return order.size() == n ? order : new ArrayList<>();
}`,
        blanks: [
          { id: 0, answer: 'new int[n]' },
          { id: 1, answer: 'inDegree[i] == 0' },
        ],
      },
      cpp: {
        template: `vector<int> kahnTopoSort(unordered_map<int, vector<int>>& graph, int n) {
    vector<int> inDegree(n, 0);
    for (auto& [u, neighbors] : graph)
        for (int v : neighbors) inDegree[v]++;
    queue<int> q;
    for (int i = 0; i < n; i++) if ({{0}}) q.push(i);
    vector<int> order;
    while (!q.empty()) {
        int node = q.front(); q.pop();
        order.push_back(node);
        for (int neighbor : graph[node]) {
            if ({{1}}) q.push(neighbor);
        }
    }
    return order.size() == n ? order : vector<int>{};
}`,
        blanks: [
          { id: 0, answer: 'inDegree[i] == 0' },
          { id: 1, answer: '--inDegree[neighbor] == 0' },
        ],
      },
    },
  },
  {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    category: 'algorithms',
    difficulty: 'medium',
    complexityRank: 8,
    description: 'Greedily selects the nearest unvisited vertex and updates neighbors.',
    snippets: {
      python: {
        template: `import heapq

def dijkstra(graph, src):
    dist = {node: float('inf') for node in graph}
    dist[src] = {{0}}
    pq = [(0, src)]
    while pq:
        d, u = {{1}}
        if d > dist[u]:
            continue
        for v, w in graph[u]:
            if {{2}}:
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))
    return dist`,
        blanks: [
          { id: 0, answer: '0' },
          { id: 1, answer: 'heapq.heappop(pq)' },
          { id: 2, answer: 'dist[u] + w < dist[v]' },
        ],
      },
      java: {
        template: `static Map<Integer, Integer> dijkstra(Map<Integer, List<int[]>> graph, int src) {
    Map<Integer, Integer> dist = new HashMap<>();
    for (int node : graph.keySet()) dist.put(node, Integer.MAX_VALUE);
    dist.put(src, {{0}});
    PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
    pq.add(new int[]{0, src});
    while (!pq.isEmpty()) {
        int[] curr = {{1}};
        int d = curr[0], u = curr[1];
        if (d > dist.get(u)) continue;
        for (int[] edge : graph.get(u)) {
            int v = edge[0], w = edge[1];
            if ({{2}}) {
                dist.put(v, dist.get(u) + w);
                pq.add(new int[]{dist.get(v), v});
            }
        }
    }
    return dist;
}`,
        blanks: [
          { id: 0, answer: '0' },
          { id: 1, answer: 'pq.poll()' },
          { id: 2, answer: 'dist.get(u) + w < dist.get(v)' },
        ],
      },
      cpp: {
        template: `unordered_map<int,int> dijkstra(
        unordered_map<int, vector<pair<int,int>>>& graph, int src) {
    unordered_map<int,int> dist;
    for (auto& [node, _] : graph) dist[node] = INT_MAX;
    dist[src] = {{0}};
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, src});
    while (!pq.empty()) {
        auto [d, u] = {{1}};
        pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : graph[u]) {
            if ({{2}}) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}`,
        blanks: [
          { id: 0, answer: '0' },
          { id: 1, answer: 'pq.top()' },
          { id: 2, answer: 'dist[u] + w < dist[v]' },
        ],
      },
    },
  },
  {
    id: 'boyer-moore-voting',
    name: 'Boyer-Moore Voting Algorithm',
    category: 'algorithms',
    difficulty: 'medium',
    complexityRank: 6,
    description: 'Cancels out different elements to find candidate majority element.',
    snippets: {
      python: {
        template: `def majority_element(nums):
    count = 0
    candidate = None
    for num in nums:
        if count == 0:
            candidate = {{0}}
        count += {{1}}
    return candidate`,
        blanks: [
          { id: 0, answer: 'num' },
          { id: 1, answer: '1 if num == candidate else -1' },
        ],
      },
      java: {
        template: `static int majorityElement(int[] nums) {
    int count = 0, candidate = 0;
    for (int num : nums) {
        if (count == 0) candidate = {{0}};
        count += {{1}};
    }
    return candidate;
}`,
        blanks: [
          { id: 0, answer: 'num' },
          { id: 1, answer: 'num == candidate ? 1 : -1' },
        ],
      },
      cpp: {
        template: `int majorityElement(vector<int>& nums) {
    int count = 0, candidate = 0;
    for (int num : nums) {
        if (count == 0) candidate = {{0}};
        count += {{1}};
    }
    return candidate;
}`,
        blanks: [
          { id: 0, answer: 'num' },
          { id: 1, answer: 'num == candidate ? 1 : -1' },
        ],
      },
    },
  },
  {
    id: 'fisher-yates-shuffle',
    name: 'Fisher-Yates Shuffle',
    category: 'algorithms',
    difficulty: 'medium',
    complexityRank: 6,
    description: 'Iterates backward swapping each element with a random preceding element.',
    snippets: {
      python: {
        template: `import random

def fisher_yates_shuffle(arr):
    n = len(arr)
    for i in range(n - 1, 0, -1):
        j = {{0}}
        arr[i], arr[j] = {{1}}
    return arr`,
        blanks: [
          { id: 0, answer: 'random.randint(0, i)' },
          { id: 1, answer: 'arr[j], arr[i]' },
        ],
      },
      java: {
        template: `static int[] fisherYatesShuffle(int[] arr) {
    Random rand = new Random();
    for (int i = arr.length - 1; i > 0; i--) {
        int j = {{0}};
        int temp = arr[i]; arr[i] = arr[j]; arr[j] = {{1}};
    }
    return arr;
}`,
        blanks: [
          { id: 0, answer: 'rand.nextInt(i + 1)' },
          { id: 1, answer: 'temp' },
        ],
      },
      cpp: {
        template: `vector<int> fisherYatesShuffle(vector<int> arr) {
    int n = arr.size();
    for (int i = n - 1; i > 0; i--) {
        int j = {{0}};
        swap(arr[i], {{1}});
    }
    return arr;
}`,
        blanks: [
          { id: 0, answer: 'rand() % (i + 1)' },
          { id: 1, answer: 'arr[j]' },
        ],
      },
    },
  },
  {
    id: 'topological-sort-dfs',
    name: 'Topological Sort (DFS)',
    category: 'algorithms',
    difficulty: 'medium',
    complexityRank: 6,
    description: 'DFS-based ordering of DAG vertices such that all edges go forward.',
    snippets: {
      python: {
        template: `def topo_sort_dfs(graph):
    visited = set()
    stack = []

    def dfs(v):
        visited.add(v)
        for neighbor in graph.get(v, []):
            if {{0}}:
                dfs(neighbor)
        {{1}}

    for node in graph:
        if node not in visited:
            dfs(node)
    return {{2}}`,
        blanks: [
          { id: 0, answer: 'neighbor not in visited' },
          { id: 1, answer: 'stack.append(v)' },
          { id: 2, answer: 'stack[::-1]' },
        ],
      },
      java: {
        template: `static List<Integer> topoSortDfs(Map<Integer, List<Integer>> graph) {
    Set<Integer> visited = new HashSet<>();
    Deque<Integer> stack = new ArrayDeque<>();

    for (int node : graph.keySet()) {
        if (!visited.contains(node)) dfs(graph, node, visited, stack);
    }
    return {{0}};
}

static void dfs(Map<Integer, List<Integer>> graph, int v,
                Set<Integer> visited, Deque<Integer> stack) {
    visited.add(v);
    for (int neighbor : graph.getOrDefault(v, List.of())) {
        if ({{1}}) dfs(graph, neighbor, visited, stack);
    }
    {{2}};
}`,
        blanks: [
          { id: 0, answer: 'new ArrayList<>(stack)' },
          { id: 1, answer: '!visited.contains(neighbor)' },
          { id: 2, answer: 'stack.push(v)' },
        ],
      },
      cpp: {
        template: `void dfs(unordered_map<int, vector<int>>& graph, int v,
         unordered_set<int>& visited, vector<int>& result) {
    visited.insert(v);
    for (int neighbor : graph[v]) {
        if ({{0}}) dfs(graph, neighbor, visited, result);
    }
    {{1}};
}

vector<int> topoSortDfs(unordered_map<int, vector<int>>& graph) {
    unordered_set<int> visited;
    vector<int> result;
    for (auto& [node, _] : graph) {
        if (!visited.count(node)) dfs(graph, node, visited, result);
    }
    {{2}};
    return result;
}`,
        blanks: [
          { id: 0, answer: '!visited.count(neighbor)' },
          { id: 1, answer: 'result.push_back(v)' },
          { id: 2, answer: 'reverse(result.begin(), result.end())' },
        ],
      },
    },
  },
  {
    id: 'jump-game',
    name: 'Jump Game',
    category: 'algorithms',
    difficulty: 'medium',
    complexityRank: 6,
    description: 'Greedy approach to determine if you can reach the last index.',
    snippets: {
      python: {
        template: `def can_jump(nums):
    max_reach = {{0}}
    for i, jump in enumerate(nums):
        if {{1}}:
            return False
        max_reach = {{2}}
    return True`,
        blanks: [
          { id: 0, answer: '0' },
          { id: 1, answer: 'i > max_reach' },
          { id: 2, answer: 'max(max_reach, i + jump)' },
        ],
      },
      java: {
        template: `static boolean canJump(int[] nums) {
    int maxReach = {{0}};
    for (int i = 0; i < nums.length; i++) {
        if ({{1}}) return false;
        maxReach = {{2}};
    }
    return true;
}`,
        blanks: [
          { id: 0, answer: '0' },
          { id: 1, answer: 'i > maxReach' },
          { id: 2, answer: 'Math.max(maxReach, i + nums[i])' },
        ],
      },
      cpp: {
        template: `bool canJump(vector<int>& nums) {
    int maxReach = {{0}};
    for (int i = 0; i < nums.size(); i++) {
        if ({{1}}) return false;
        maxReach = {{2}};
    }
    return true;
}`,
        blanks: [
          { id: 0, answer: '0' },
          { id: 1, answer: 'i > maxReach' },
          { id: 2, answer: 'max(maxReach, i + nums[i])' },
        ],
      },
    },
  },
]
