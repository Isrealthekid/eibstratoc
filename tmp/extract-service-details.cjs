const fs = require('node:fs');
const source = fs.readFileSync('EIB-STRATOC-Website-Copy-2026.txt', 'utf8').replace(/\r/g, '');
const details = {};
for (let number = 3; number <= 8; number++) {
  const start = source.indexOf(`\nC${number}. `);
  const end = source.indexOf(`\nC${number + 1}. `, start + 1);
  const block = source.slice(start, end);
  const slug = block.match(/Proposed route: \/services\/([^\n]+)/)[1];
  const field = (label, next) => block.split(label + ':\n')[1].split(next)[0].trim().replace(/\n/g, ' ');
  const body = block.slice(block.indexOf('Section heading:'), block.indexOf('\nCTA:'));
  const sections = [...body.matchAll(/(?:^|\n)(Section heading|Application|Closing copy): ?([^\n]*)\n([\s\S]*?)(?=\n(?:Section heading|Application|Closing copy):|$)/g)].map((match) => {
    const content = match[3].trim();
    const list = content.split('\n').filter(line => line.startsWith('- ')).map(line => line.slice(2));
    const prose = content.split('\n').filter(line => !line.startsWith('- ')).join('\n').trim();
    return { title: match[2].trim(), kind: match[1], paragraphs: prose ? prose.split(/\n\s*\n/).map(p => p.replace(/\n/g, ' ')) : [], items: list };
  });
  details[slug] = {
    eyebrow: field('Hero eyebrow', 'Hero heading:'),
    heading: field('Hero heading', 'Hero introduction:'),
    introduction: field('Hero introduction', 'Section heading:'),
    sections,
    cta: block.match(/\nCTA: ([^\n]+)/)[1],
  };
  console.log(slug, sections.length, 'sections');
}
fs.writeFileSync('lib/service-details.json', JSON.stringify(details, null, 2) + '\n');
