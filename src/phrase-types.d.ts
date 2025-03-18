import {
  Adjective,
  AdjectiveConjugationForm,
  ConjugateAdjective,
  IAdjective,
  NaAdjective,
} from "./adjective-types";
import type {
  Verb,
  ConjugationForm,
  ConjugateVerb,
  IrregularVerb,
} from "./verb-types";

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
  | "よね"; // Combined emphasis and agreement

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

// Connect phrases with Japanese comma
export type ConnectedPhrases<
  P1 extends string,
  P2 extends string
> = `${P1}、${P2}`;

// Example adjectives
type いい = IAdjective & { stem: "い"; ending: "い"; irregular: true };
type 綺麗 = NaAdjective & { stem: "綺麗" };

// Examples for the target phrase "いいよ、来いよ"
type いいよ = PhraseWithParticle<ConjugateAdjective<いい, "基本形">, "よ">;
type 来いよ = PhraseWithParticle<
  ConjugateVerb<IrregularVerb & { dictionary: "来る" }, "命令形">,
  "よ"
>;
type いいよ来いよ = ConnectedPhrases<いいよ, 来いよ>;
