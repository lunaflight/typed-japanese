import type { ConjugateAdjective, IAdjective } from "../adjective-types";
import type { InterrogativeAdverb, WhyInterrogative } from "../adverb-types";
import type { ProperNoun } from "../noun-types";
import type {
  ConnectedPhrases,
  InterrogativePhrase,
  PhraseWithParticle,
} from "../phrase-types";
import type { ConjugateVerb, GodanVerb, IrregularVerb } from "../verb-types";

type やる = GodanVerb & { stem: "や"; ending: "る" };
type 春日影 = ProperNoun<"春日影">;
type なんで春日影やったの = InterrogativePhrase<
  WhyInterrogative,
  春日影,
  やる,
  "た形",
  "の"
>;

type 来る = IrregularVerb & { dictionary: "来る" };
type いい = IAdjective & { stem: "い"; ending: "い"; irregular: true };

type いいよ = PhraseWithParticle<ConjugateAdjective<いい, "基本形">, "よ">;
type 来いよ = PhraseWithParticle<ConjugateVerb<来る, "命令形">, "よ">;
type いいよ来いよ = ConnectedPhrases<いいよ, 来いよ>;

// Verify correct implementation works
const correctPhrase1: いいよ = "いいよ";
const correctPhrase2: 来いよ = "来いよ";
const correctFullPhrase: いいよ来いよ = "いいよ、来いよ";

// @ts-expect-error
const wrongPhrase1: いいよ = "いい"; // Missing "よ" particle
// @ts-expect-error
const wrongPhrase2: 来いよ = "くるよ"; // Wrong verb form
// @ts-expect-error
const wrongFullPhrase1: いいよ来いよ = "いいよ来いよ"; // Missing comma
// @ts-expect-error
const wrongFullPhrase2: いいよ来いよ = "いいよ、くるよ、"; // Wrong verb form

// Test to confirm the types resolve correctly
type TestIiyo = いいよ extends `${string}よ` ? true : false; // Should be true
type TestKoiyo = 来いよ extends `${string}よ` ? true : false; // Should be true
type TestFullPhrase = いいよ来いよ extends `${string}、${string}`
  ? true
  : false; // Should be true

// Print results for visual confirmation
console.log("Test phrase: いいよ、来いよ");
console.log(`1. いいよ -> ${correctPhrase1}`);
console.log(`2. 来いよ -> ${correctPhrase2}`);
console.log(`3. Full phrase: ${correctFullPhrase}`);
