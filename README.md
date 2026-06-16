```text
 ██████╗ ██████╗ ██████╗ ███████╗ ██████╗██╗      ██████╗ ███████╗███████╗
██╔════╝██╔═══██╗██╔══██╗██╔════╝██╔════╝██║     ██╔═══██╗╚══███╔╝██╔════╝
██║     ██║   ██║██║  ██║█████╗  ██║     ██║     ██║   ██║  ███╔╝ █████╗
██║     ██║   ██║██║  ██║██╔══╝  ██║     ██║     ██║   ██║ ███╔╝  ██╔══╝
╚██████╗╚██████╔╝██████╔╝███████╗╚██████╗███████╗╚██████╔╝███████╗███████╗
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝ ╚═════╝╚══════╝ ╚═════╝ ╚══════╝╚══════╝
              // D S & A   P A T T E R N   T R A I N E R
```

<div align="center">

`> fill the blanks · earn stars · master DS&A`

![React](https://img.shields.io/badge/React-19-00f5ff?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-00ff41?style=flat-square&logo=vite&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-00f5ff?style=flat-square&logo=tailwindcss&logoColor=black)
![Router](https://img.shields.io/badge/React_Router-7-00ff41?style=flat-square&logo=reactrouter&logoColor=black)
![status](https://img.shields.io/badge/status-WIP-ffd700?style=flat-square)

</div>

```text
> INITIALIZING PATTERN RECOGNITION TRAINING MODULE...
> [ TERMINAL ACTIVE ]
```

## `>` ABOUT

**CodeCloze** is a Wordle-style, fill-in-the-blank browser game for drilling
**data structures & algorithms** pattern recognition. You're shown a code
snippet with key tokens blanked out — type them back in, watch them flash
green (correct) or red (wrong), and earn stars for clean, hint-free solves.

It's wrapped in a CRT / hacker-terminal aesthetic: monospace Cascadia Code,
scanlines, a vignette glow, animated `█` cursors, and ASCII progress bars.

## `>` STATUS / DISCLAIMER

```text
> [ WARN ] CONTENT UNDER REVIEW — VERIFY BEFORE YOU TRUST
```

> ⚠️ **CodeCloze is a work in progress and its content is still being tested
> for accuracy.** Automated checks pass across all **270 snippets** (90 levels
> × Python / Java / C++) for *structure* and *syntax*, but the **algorithmic
> correctness of every level is still being manually verified**. Treat the
> solutions as study aids, not authoritative references — and if you spot a
> mistake, please [open an issue](https://github.com/mishazim/codecloze/issues).

## `>` FEATURES

```text
[+] Fill-in-the-blank code snippets across two categories
[+] 4 difficulty ranks with distinct neon color signatures
[+] 10 attempts per level · click the blurred title for a hint
[+] ★★★ scoring — three stars for a hint-free first-try solve
[+] Progress persisted locally (localStorage) — pick up where you left off
[+] Full keyboard navigation (arrow keys + Ctrl+Enter to EXECUTE)
[+] Retro terminal UI: scanlines, glow, glitch + boot animations
```

## `>` DIFFICULTY RANKS

| Signal | Rank | Tier | Category |
|:------:|:-----|:-----|:---------|
| 🟢 | `[ RANK-1 ]` | **EASY**   | `ALGORITHMS` / `DATA_STRUCTURES` |
| 🟡 | `[ RANK-2 ]` | **MEDIUM** | `ALGORITHMS` / `DATA_STRUCTURES` |
| 🔴 | `[ RANK-3 ]` | **HARD**   | `ALGORITHMS` / `DATA_STRUCTURES` |
| 🟣 | `[ RANK-4 ]` | **EXPERT** | `ALGORITHMS` / `DATA_STRUCTURES` |

> Ranks are **recognition difficulty** (how hard the pattern is to recall),
> not raw time/space complexity. 100+ levels and counting.

## `>` HOW TO PLAY

```text
01. SELECT CATEGORY ........ ALGORITHMS or DATA_STRUCTURES
02. CHOOSE RANK ............ difficulty 1–4
03. FILL THE BLANKS ........ type the missing tokens in the snippet
04. EXECUTE ............... submit with [ EXECUTE ] or Ctrl+Enter
05. READ THE SIGNAL ........ blanks flash green (✓) or red (✗)
06. NEED A HINT? .......... click the blurred title (costs your ★★★)
07. SCORE ................. solve hint-free on the first try for ★★★
```

## `>` QUICKSTART

```bash
> git clone https://github.com/mishazim/codecloze.git
> cd codecloze
> npm install
> npm run dev        # boot the dev server (Vite)  →  http://localhost:5173
```

```bash
> npm run build      # production build → ./dist
> npm run preview    # serve the production build locally
> npm run lint       # eslint
```

## `>` TECH STACK

```text
FRONTEND ...... React 19 · React Router 7
BUILD ......... Vite 8
STYLING ....... Tailwind CSS v4 · custom CRT theme · Cascadia Code
STATE ......... React hooks + Context · localStorage persistence
```

## `>` CONTENT SOURCE

Level content was seeded from my own interview-prep spreadsheet, included in
this repo for reference:

📄 [`reference/SWE_Interview_Algorithms.xlsx`](reference/SWE_Interview_Algorithms.xlsx)
— algorithms, data structures, a Big-O cheat sheet, and common interview
questions. It's what inspired CodeCloze in the first place.

## `>` ROADMAP

```text
[x] Core game loop, ★ scoring, 4 ranks, progress persistence
[x] Terminal UI: scanlines, glow, boot/glitch animations
[x] Automated structural + syntax validation (270 snippets) — see scripts/
[ ] Full manual correctness review of every level
[ ] Multi-language snippets — JS / Java / C++ (LanguagePicker built, needs data)
[ ] Live demo on GitHub Pages
```

## `>` VALIDATION

A lightweight preliminary validator lives in [`scripts/`](scripts/):

```bash
> node scripts/cc_extract.mjs | python scripts/cc_validate.py
```

It checks every level for structural integrity (placeholder ↔ blank
alignment, no gaps/dupes, non-empty answers, unique IDs) and reconstructs
each snippet to confirm it parses — Python via `ast.parse`, Java/C++ via a
bracket-balance smell test. It does **not** assert algorithmic correctness.

---

```text
CODECLOZE // ALL SYSTEMS OPERATIONAL █
```
