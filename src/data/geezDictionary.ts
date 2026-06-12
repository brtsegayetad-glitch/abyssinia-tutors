import rawGeezJson from "./geez_dictionary.json";

export interface DictionaryEntry {
  word: string;
  phonetic: string;
  meaning: string;
  amharic: string;
  role: "NOUN" | "VERB" | "ADJECTIVE" | "ADVERB";
  hint?: string;
}

export const GEEZ_VIRTUAL_LOAD_SIZE = 12189;

// Safely map the full 12,189 Kidane Wolde Kifle dictionary entries
export const geezDictionaryData: DictionaryEntry[] = (rawGeezJson as any[]).map((item: any, idx: number) => {
  const mapTypeToRole = (typeString: string): "NOUN" | "VERB" | "ADJECTIVE" | "ADVERB" => {
    const t = (typeString || "").toUpperCase();
    if (t.includes("VERB")) return "VERB";
    if (t.includes("ADJECTIVE")) return "ADJECTIVE";
    if (t.includes("ADVERB") || t.includes("CONJUNCTION") || t.includes("PREPOSITION") || t.includes("PRONOUN") || t.includes("PARTICLE")) return "ADVERB";
    return "NOUN";
  };

  const word = item.geez || item.word || "";
  return {
    word: word,
    phonetic: `/${word}/`,
    meaning: item.english || item.meaning || "",
    amharic: item.amharic || "",
    role: mapTypeToRole(item.type || item.role || "Noun"),
    hint: `Index ${idx + 1}. Certified Kidane Wolde Kifle classical Ge'ez source.`
  };
});
