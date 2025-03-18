import type { PhraseWithParticle } from "../phrase-types";
import type { ConjugateAdjective, IAdjective } from "../adjective-types";

// This file tests the irregular adjective いい (good) and its conjugations

// Define the adjective
type いい例 = IAdjective & {
  dictionary: "いい";
  stem: "い";
  ending: "い";
  irregular: true;
};

// Test all conjugation forms
type いい基本形 = "いい" | "よい"; // Accept both forms
type いい過去形 = ConjugateAdjective<いい例, "過去形">; // よかった
type いい丁寧形 = ConjugateAdjective<いい例, "丁寧形">; // いいです
type いい否定形 = ConjugateAdjective<いい例, "否定形">; // よくない
type いいて形 = ConjugateAdjective<いい例, "て形">; // よくて

// Verify with particles
type いいよ = PhraseWithParticle<"いい", "よ">; // いいよ
type よかったね = PhraseWithParticle<いい過去形, "ね">; // よかったね

// Type checking
// These should work
const verifyBasic: いい基本形 = "よい";
const verifyPast: いい過去形 = "よかった";
const verifyNegative: いい否定形 = "よくない";
const verifyTe: いいて形 = "よくて";
const verifyPolite: いい丁寧形 = "いいです";

// These should now produce type errors because they have wrong forms
// @ts-expect-error - Wrong form
const wrongBasic: いい基本形 = "はい";
// @ts-expect-error - Should be よかった
const wrongPast: いい過去形 = "いかった";
// @ts-expect-error - Should be よくない
const wrongNegative: いい否定形 = "いくない";

// Print results
// Print results
console.log("Testing いい adjective conjugations:");
console.log(`Basic form: ${verifyBasic}`);
console.log(`Past form: ${verifyPast}`);
console.log(`Negative form: ${verifyNegative}`);
console.log(`Te form: ${verifyTe}`);
console.log(`Polite form: ${verifyPolite}`);

// Test with particles
const verifyWithParticle1: いいよ = "いいよ";
const verifyWithParticle2: よかったね = "よかったね";

console.log(`With particle: ${verifyWithParticle1}`);
console.log(`Past with particle: ${verifyWithParticle2}`);
