// Adjective types
export type IAdjective = {
  type: "i-adjective";
  stem: string;
  ending: "い";
  irregular?: boolean;
};

export type NaAdjective = {
  type: "na-adjective";
  stem: string;
};

export type Adjective = IAdjective | NaAdjective;

// Adjective conjugation forms
export type AdjectiveConjugationForm =
  | "基本形" // Basic form
  | "丁寧形" // Polite form
  | "過去形" // Past form
  | "否定形"; // Negative form

// I-adjective conjugation mapping
type IAdjectiveConjugationMap = {
  い: {
    基本形: "い";
    丁寧形: "いです";
    過去形: "かった";
    否定形: "くない";
  };
};

// Special case for いい
type IrregularAdjectiveMap = {
  い: {
    過去形: "よかった";
    否定形: "よくない";
    て形: "よくて";
    丁寧形: "いいです";
  };
};

// Helper for I-adjective conjugation
type GetIAdjectiveConjugation<F extends AdjectiveConjugationForm> =
  F extends keyof IAdjectiveConjugationMap["い"]
    ? IAdjectiveConjugationMap["い"][F]
    : never;

// Helper for irregular いい conjugation
type GetIrregularAdjectiveConjugation<
  Stem extends string,
  F extends AdjectiveConjugationForm
> = Stem extends "い"
  ? F extends keyof IrregularAdjectiveMap["い"]
    ? IrregularAdjectiveMap["い"][F]
    : F extends keyof IAdjectiveConjugationMap["い"]
    ? IAdjectiveConjugationMap["い"][F]
    : never
  : never;

// Adjective conjugation type
export type ConjugateAdjective<
  A extends Adjective,
  F extends AdjectiveConjugationForm
> = A extends IAdjective
  ? A extends { irregular: true }
    ? F extends "基本形"
      ? `${A["stem"]}${A["ending"]}`
      : `${GetIrregularAdjectiveConjugation<A["stem"], F>}`
    : F extends "基本形"
    ? `${A["stem"]}${A["ending"]}`
    : `${A["stem"]}${GetIAdjectiveConjugation<F>}`
  : A extends NaAdjective
  ? F extends "基本形"
    ? `${A["stem"]}な`
    : F extends "丁寧形"
    ? `${A["stem"]}です`
    : F extends "過去形"
    ? `${A["stem"]}でした`
    : F extends "否定形"
    ? `${A["stem"]}ではない`
    : F extends "て形"
    ? `${A["stem"]}で`
    : never
  : never;

// Example usage
type いい基本形 = ConjugateAdjective<
  { type: "i-adjective"; stem: "い"; ending: "い"; irregular: true },
  "基本形"
>; // "いい"
// na-adjective
type 綺麗基本形 = ConjugateAdjective<
  { type: "na-adjective"; stem: "綺麗" },
  "基本形"
>; // "綺麗な"
// 綺麗な丁寧形
type 綺麗丁寧形 = ConjugateAdjective<
  { type: "na-adjective"; stem: "綺麗" },
  "丁寧形"
>; // "綺麗です"
