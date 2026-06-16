"""Reads the extractor JSON on stdin; validates syntax of reconstructed snippets."""
import sys, ast, json
sys.stdout.reconfigure(encoding="utf-8")

data = json.load(sys.stdin)
issues = list(data["issues"])
stats = data["stats"]

py_fail = []
brace_fail = []

PAIRS = {")": "(", "]": "[", "}": "{"}
OPEN = set("([{")

def balanced(code):
    # crude: ignores string/char literals & comments, good enough for a smell test
    stack = []
    for ch in code:
        if ch in OPEN:
            stack.append(ch)
        elif ch in PAIRS:
            if not stack or stack.pop() != PAIRS[ch]:
                return False
    return not stack

for s in data["snippets"]:
    if s["lang"] == "python":
        try:
            ast.parse(s["code"])
        except SyntaxError as e:
            py_fail.append((s["id"], f"{e.msg} (line {e.lineno})", s["code"]))
    else:
        if not balanced(s["code"]):
            brace_fail.append((s["id"], s["lang"]))

print("=" * 64)
print("CODECLOZE — PRELIMINARY LEVEL VALIDATION")
print("=" * 64)
print(f"Total levels:   {stats['totalLevels']}")
print(f"By difficulty:  {stats['byDifficulty']}")
print(f"By category:    {stats['byCategory']}")
print(f"Snippets/lang:  {stats['langCount']}")
print()
print(f"Structural issues:      {len(issues)}")
print(f"Python syntax failures: {len(py_fail)}")
print(f"Brace-balance failures: {len(brace_fail)} (java/cpp)")
print()

if issues:
    print("--- STRUCTURAL ISSUES ---")
    for i in issues:
        print(f"  [X] {i}")
    print()

if py_fail:
    print("--- PYTHON SYNTAX FAILURES (reconstructed snippet won't parse) ---")
    for pid, msg, code in py_fail:
        print(f"\n  [X] {pid}: {msg}")
        for ln in code.splitlines():
            print(f"        | {ln}")
    print()

if brace_fail:
    print("--- BRACKET-BALANCE FAILURES (java/cpp smell test) ---")
    for pid, lang in brace_fail:
        print(f"  [X] {pid} ({lang})")
    print()

if not issues and not py_fail and not brace_fail:
    print(">>> ALL PRELIMINARY CHECKS PASSED")
