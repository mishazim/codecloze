// Preliminary level validator (structural) + snippet extractor.
// Emits JSON to stdout: { issues: [...], snippets: [{id,lang,code}], stats }
import { pathToFileURL } from 'url'
import path from 'path'

const files = [
  ['algorithms/easy.js', 'easyAlgorithms'],
  ['algorithms/medium.js', 'mediumAlgorithms'],
  ['algorithms/hard.js', 'hardAlgorithms'],
  ['algorithms/expert.js', 'expertAlgorithms'],
  ['dataStructures/easy.js', 'easyDataStructures'],
  ['dataStructures/medium.js', 'mediumDataStructures'],
  ['dataStructures/hard.js', 'hardDataStructures'],
  ['dataStructures/expert.js', 'expertDataStructures'],
]
const ALL_LEVELS = []
for (const [rel, exportName] of files) {
  const mod = await import(pathToFileURL(path.resolve('src/data', rel)).href)
  const arr = mod[exportName]
  if (!Array.isArray(arr)) { console.error(`!! ${rel}: export ${exportName} missing/not array`); continue }
  ALL_LEVELS.push(...arr)
}

const issues = []
const snippets = []
const seenIds = new Set()
const langCount = { python: 0, java: 0, cpp: 0 }

function reconstruct(template, blanks) {
  return template.replace(/\{\{(\d+)\}\}/g, (_, n) => {
    const i = Number(n)
    const b = blanks[i]
    return b ? b.answer : `<<MISSING_BLANK_${i}>>`
  })
}

for (const lvl of ALL_LEVELS) {
  const tag = `${lvl.id || '(no-id)'} [${lvl.difficulty}/${lvl.category}]`
  // required fields
  for (const f of ['id', 'name', 'category', 'difficulty', 'snippets']) {
    if (lvl[f] === undefined) issues.push(`${tag}: missing field "${f}"`)
  }
  if (lvl.id) {
    if (seenIds.has(lvl.id)) issues.push(`${tag}: DUPLICATE id`)
    seenIds.add(lvl.id)
  }
  if (!lvl.snippets) continue
  if (!lvl.snippets.python) issues.push(`${tag}: missing PYTHON snippet`)

  for (const lang of Object.keys(lvl.snippets)) {
    const snip = lvl.snippets[lang]
    if (langCount[lang] !== undefined) langCount[lang]++
    if (!snip || typeof snip.template !== 'string' || !Array.isArray(snip.blanks)) {
      issues.push(`${tag} (${lang}): malformed snippet (template/blanks)`)
      continue
    }
    const ph = [...snip.template.matchAll(/\{\{(\d+)\}\}/g)].map(m => Number(m[1]))
    const phSet = new Set(ph)
    if (ph.length !== phSet.size) issues.push(`${tag} (${lang}): duplicate placeholder in template`)
    // contiguous 0..k-1
    for (let i = 0; i < snip.blanks.length; i++) {
      if (!phSet.has(i)) issues.push(`${tag} (${lang}): blank[${i}] has no {{${i}}} in template (unused)`)
    }
    for (const n of phSet) {
      if (!snip.blanks[n]) issues.push(`${tag} (${lang}): {{${n}}} in template but no blanks[${n}]`)
      else {
        if (snip.blanks[n].id !== n) issues.push(`${tag} (${lang}): blanks[${n}].id=${snip.blanks[n].id} != ${n}`)
        if (typeof snip.blanks[n].answer !== 'string' || snip.blanks[n].answer.trim() === '')
          issues.push(`${tag} (${lang}): blanks[${n}] empty/invalid answer`)
      }
    }
    if (phSet.size !== snip.blanks.length)
      issues.push(`${tag} (${lang}): placeholder count ${phSet.size} != blanks ${snip.blanks.length}`)

    snippets.push({ id: lvl.id, difficulty: lvl.difficulty, category: lvl.category, lang, code: reconstruct(snip.template, snip.blanks) })
  }
}

const stats = {
  totalLevels: ALL_LEVELS.length,
  byDifficulty: ALL_LEVELS.reduce((a, l) => (a[l.difficulty] = (a[l.difficulty] || 0) + 1, a), {}),
  byCategory: ALL_LEVELS.reduce((a, l) => (a[l.category] = (a[l.category] || 0) + 1, a), {}),
  langCount,
}
process.stdout.write(JSON.stringify({ issues, snippets, stats }))
