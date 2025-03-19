import type {
  Adjective,
  AdjectiveConjugationForm,
  ConjugateAdjective,
  IAdjective,
  NaAdjective,
} from "./adjective-types";
import type {
  ConjugateVerb,
  ConjugationForm,
  GodanVerb,
  IchidanVerb,
  IrregularVerb,
  Verb,
} from "./verb-types";
import type { InterrogativeAdverb, WhyInterrogative } from "./adverb-types";
import type { ProperNoun } from "./noun-types";

// Particle system
export type Particle =
  | "は" // Topic marker
  | "が" // Subject marker
  | "を" // Direct object marker
  | "に" // Indirect object/direction marker
  | "へ" // Direction marker
  | "で" // Means/location marker
  | "と" // And/with marker
  | "から" // From marker
  | "まで" // Until marker
  | "よ" // Emphasis particle
  | "ね" // Agreement seeking particle
  | "か" // Question particle
  | "よね" // Combined emphasis and agreement
  | "の" // Nominalizer/question particle
  | "だ" // Copula as particle
  | "も"; // Also/even particle

// Punctuation marks
export type PunctuationMark =
  | "、" // Japanese comma (読点/とうてん)
  | "。" // Japanese period (句点/くてん)
  | "！" // Exclamation mark
  | "？" // Question mark
  | "「" // Opening quotation mark
  | "」" // Closing quotation mark
  | "『" // Opening double quotation mark
  | "』"; // Closing double quotation mark

// Conditional particles
export type ConditionalParticle = "なら" | "たら" | "れば" | "と";

// Phrase composition types
export type NounPhrase<Noun extends string> = `${Noun}`;

export type AdjectivalPhrase<
  A extends Adjective,
  F extends AdjectiveConjugationForm = "基本形"
> = ConjugateAdjective<A, F>;

export type VerbPhrase<
  V extends Verb,
  F extends ConjugationForm = "辞書形"
> = ConjugateVerb<V, F>;

// Phrase with particle
export type PhraseWithParticle<
  Phrase extends string,
  P extends Particle
> = `${Phrase}${P}`;

// Demonstrative + action pattern (そうする, etc.)
export type DemonstrativeAction<
  Demo extends string,
  V extends Verb,
  F extends ConjugationForm = "辞書形"
> = `${Demo}${ConjugateVerb<V, F>}`;

// Conditional phrase with なら
export type ConditionalPhrase<
  Subject extends string,
  CP extends ConditionalParticle,
  Result extends string
> = `${Subject}${CP}${Result}`;

// Connect phrases with Japanese comma
export type ConnectedPhrases<
  P1 extends string,
  P2 extends string
> = `${P1}、${P2}`;

// Interrogative phrase type
export type InterrogativePhrase<
  Adv extends InterrogativeAdverb,
  Subject extends string,
  V extends Verb,
  VForm extends ConjugationForm,
  QP extends Particle = "か"
> = `${Adv}${Subject}${ConjugateVerb<V, VForm>}${QP}`;

// Basic building blocks for phrase parts
export type PhrasePart =
  | VerbPart
  | AdjectivePart
  | NounPart
  | AdverbPart
  | ParticlePart
  | IntensifierPart
  | ContractedPart
  | NestedPhrasePart
  | PunctuationPart;

// Part type definitions
export type VerbPart<
  V extends Verb = Verb,
  F extends ConjugationForm = ConjugationForm
> = {
  type: "verb";
  verb: V;
  form: F;
  value: ConjugateVerb<V, F>;
};

export type AdjectivePart<
  A extends Adjective = Adjective,
  F extends AdjectiveConjugationForm = AdjectiveConjugationForm
> = {
  type: "adjective";
  adjective: A;
  form: F;
  value: ConjugateAdjective<A, F>;
};

export type NounPart<N extends string = string> = {
  type: "noun";
  noun: N;
  value: N;
};

export type AdverbPart<A extends string = string> = {
  type: "adverb";
  adverb: A;
  value: A;
};

export type ParticlePart<P extends Particle = Particle> = {
  type: "particle";
  particle: P;
  value: P;
};

export type IntensifierPart<I extends string = string> = {
  type: "intensifier";
  intensifier: I;
  value: I;
};

export type ContractedPart<
  Original extends string = string,
  Contracted extends string = string
> = {
  type: "contracted";
  original: Original;
  value: Contracted;
};

export type NestedPhrasePart<V extends string = string> = {
  type: "nestedPhrase";
  value: V;
};

export type PunctuationPart<P extends PunctuationMark = PunctuationMark> = {
  type: "punctuation";
  punctuation: P;
  value: P;
};

type PhraseSequence<Parts extends PhrasePart[] = PhrasePart[]> = {
  parts: Parts;
  value: JoinPhrasePartsValue<Parts>;
};

export type NestedPhrase<T extends PhraseSequence<any>> = {
  type: "nestedPhrase";
  value: T["value"];
};

// Type helpers for joining phrase parts
type JoinPhrasePartsValue<Parts extends readonly PhrasePart[]> =
  Parts extends readonly [
    infer First extends PhrasePart,
    ...infer Rest extends PhrasePart[]
  ]
    ? `${First["value"]}${JoinPhrasePartsValue<Rest>}`
    : "";

// Define the pattern type for why-intensifier with emphasis particle
export type WhyIntensifierPatternWithEmphasis<
  Why extends WhyInterrogative,
  Intensifier extends string,
  V extends Verb,
  P extends Extract<Particle, "よ" | "ね">
> = PhraseSequence<
  [
    AdverbPart<Why>,
    IntensifierPart<Intensifier>,
    VerbPart<V, "て形">,
    ContractedPart<"ん">,
    ParticlePart<"だ">,
    ParticlePart<P>
  ]
>;

// Examples for the target phrase "いいよ、来いよ"
type いい = IAdjective & { stem: "い"; ending: "い"; irregular: true };
type いいよ = PhraseWithParticle<ConjugateAdjective<いい, "基本形">, "よ">;
type 来る = IrregularVerb & { dictionary: "来る" };
type 来いよ = PhraseWithParticle<ConjugateVerb<来る, "命令形">, "よ">;
type いいよ来いよ = ConnectedPhrases<いいよ, 来いよ>;
