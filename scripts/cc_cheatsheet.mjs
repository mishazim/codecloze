// Extracts every level with filled-in solutions (all languages) + blank answers.
// Emits JSON array to stdout for the Python cheat-sheet builder.
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
const ALL = []
for (const [rel, name] of files) {
  const mod = await import(pathToFileURL(path.resolve('src/data', rel)).href)
  ALL.push(...mod[name])
}

const fill = (template, blanks) =>
  template.replace(/\{\{(\d+)\}\}/g, (_, n) => (blanks[Number(n)] ? blanks[Number(n)].answer : `<<?${n}>>`))

const out = ALL.map(l => {
  const langs = {}
  for (const lang of Object.keys(l.snippets || {})) {
    const s = l.snippets[lang]
    langs[lang] = {
      code: fill(s.template, s.blanks),
      blanks: s.blanks.map(b => b.answer),
    }
  }
  return {
    id: l.id, name: l.name, category: l.category, difficulty: l.difficulty,
    description: l.description || '', langs,
  }
})
process.stdout.write(JSON.stringify(out))
