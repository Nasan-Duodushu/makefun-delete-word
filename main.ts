// The Word You'd Delete From the Dictionary — one word to erase forever.
// The pick has to carry the joke by itself: a word whose double meanings
// and daily misuse make its absence the punchline. Writes /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const LIMIT = 77;

// Erase it and a thousand arguments end at once: nobody can misuse a word
// that no longer exists, and nobody can correct them for it either. The
// dictionary gets quieter; the group chat gets less smug.
const WORD = "Literally";

function validate(word: string): string {
  const trimmed = word.trim();
  const length = [...trimmed].length;
  if (length < 1 || length > LIMIT) {
    throw new Error(`entry must be 1-${LIMIT} chars, got ${length}`);
  }
  if (trimmed.split(/\s+/).length !== 1) {
    throw new Error("entry must be exactly one word");
  }
  if (!/^[A-Za-z]+$/.test(trimmed)) {
    throw new Error("entry must be a real word, spelled plainly");
  }
  return trimmed;
}

const entry = validate(WORD);
mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, "entry.txt"), `${entry}\n`, "utf8");
console.log(`${[...entry].length} chars -> ${join(OUTPUT_DIR, "entry.txt")}`);
console.log(entry);
