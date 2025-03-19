import type { ProperNoun } from "../noun-types";
import type { IrregularVerb } from "../verb-types";
import type { ConditionalPhrase, DemonstrativeAction } from "../phrase-types";
import type { Demonstrative } from "../adverb-types";

// Define the proper noun "ヒンメル"
type ヒンメル = ProperNoun<"ヒンメル">;

// Define する verb
type する = IrregularVerb & { dictionary: "する" };

// Create the そうした pattern (past form of そうする)
type そうした = DemonstrativeAction<Demonstrative & "そう", する, "た形">;

// Create the conditional phrase "ヒンメルならそうした"
type ヒンメルならそうした = ConditionalPhrase<ヒンメル, "なら", そうした>;

// Tests
const properExample: ヒンメルならそうした = "ヒンメルならそうした";

// @ts-expect-error - Wrong conditional particle
const wrongExample1: ヒンメルならそうした = "ヒンメルはそうした";

// @ts-expect-error - Wrong verb form
const wrongExample2: ヒンメルならそうした = "ヒンメルならそうする";

// @ts-expect-error - Wrong demonstrative
const wrongExample3: ヒンメルならそうした = "ヒンメルならこうした";

// Type tests
type TestConditional = ヒンメルならそうした extends `${string}なら${string}`
  ? true
  : false; // Should be true
type TestDemonstrative = そうした extends `そう${string}` ? true : false; // Should be true

// Output for confirmation
console.log("Example phrase: ヒンメルならそうした");
console.log(`Parsed phrase: ${properExample}`);
