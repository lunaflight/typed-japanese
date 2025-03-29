import type { ProperNoun } from "../noun-types";
import type { GodanVerb, ConjugateVerb } from "../verb-types";
import type { PhraseWithParticle, ConnectedPhrases, InterrogativePhrase } from "../phrase-types";
import type { WhyInterrogative } from "../adverb-types";

// Define proper nouns
type 日本語 = ProperNoun<"日本語">;
type TypeScript = ProperNoun<"TypeScript">;

// Define verbs
type わかる = GodanVerb & { stem: "わか"; ending: "る" };
type 知る = GodanVerb & { stem: "知"; ending: "る" };
type 思う = GodanVerb & { stem: "思"; ending: "う" };

// Type representation for "日本語はわかってた"
// (I understood Japanese)
type 日本語はわかってた = PhraseWithParticle<
    日本語,
    "は"
> & ConjugateVerb<わかる, "て形"> & "た";

// Type representation for "知ろうと思わなかった"
// (I didn't think to learn)
type 知ろうと思わなかった = ConnectedPhrases<
    ConjugateVerb<知る, "意向形">,
    ConjugateVerb<思う, "ない形"> & "た"
>;

// Type representation for "なんでもっとTypeScriptを知ろうと思わなかったんだろう"
// (Why didn't I think to learn more TypeScript?!)
type なんでもっとTypeScriptを知ろうと思わなかったんだろう = InterrogativePhrase<
    WhyInterrogative,
    `もっと${TypeScript}を`,
    知ろうと思わなかった,
    "辞書形",
    "の"
>;

// Complete sentence type
type 完全な文 = "日本語はわかってたのに、なんでもっとTypeScriptを知ろうと思わなかったんだろう";

// Verify correct implementation works
const correctSentence: 完全な文 = "日本語はわかってたのに、なんでもっとTypeScriptを知ろうと思わなかったんだろう";

// Demonstrate usage in console
console.log("Generated sentence:", correctSentence);
