// Base verb types
export type GodanVerb = {
  type: "godan";
  stem: string;
  ending: "う" | "く" | "ぐ" | "す" | "つ" | "ぬ" | "ぶ" | "む" | "る";
};

export type IchidanVerb = {
  type: "ichidan";
  stem: string;
  ending: "る";
};

export type IrregularVerb = {
  type: "irregular";
  dictionary: "する" | "来る" | "くる";
};

export type Verb = GodanVerb | IchidanVerb | IrregularVerb;

// Conjugation forms
export type ConjugationForm =
  | "辞書形" // Dictionary form
  | "ます形" // Polite form
  | "て形" // Te form
  | "た形" // Past form
  | "ない形" // Negative form
  | "可能形" // Potential form
  | "受身形" // Passive form
  | "使役形" // Causative form
  | "意向形" // Volitional form
  | "命令形" // Imperative form
  | "条件形" // Conditional form
  | "仮定形"; // Hypothetical form

// Godan verb conjugation map - maps endings to their various conjugated forms
type GodanConjugationMap = {
  う: {
    ます形: "い";
    て形: "って";
    た形: "った";
    ない形: "わ";
    可能形: "え";
    受身形: "わ";
    使役形: "わ";
    意向形: "お";
    命令形: "え";
    条件形: "え";
    仮定形: "え";
  };
  く: {
    ます形: "き";
    て形: "いて";
    た形: "いた";
    ない形: "か";
    可能形: "け";
    受身形: "か";
    使役形: "か";
    意向形: "こ";
    命令形: "け";
    条件形: "け";
    仮定形: "け";
  };
  ぐ: {
    ます形: "ぎ";
    て形: "いで";
    た形: "いだ";
    ない形: "が";
    可能形: "げ";
    受身形: "が";
    使役形: "が";
    意向形: "ご";
    命令形: "げ";
    条件形: "げ";
    仮定形: "げ";
  };
  す: {
    ます形: "し";
    て形: "して";
    た形: "した";
    ない形: "さ";
    可能形: "せ";
    受身形: "さ";
    使役形: "さ";
    意向形: "そ";
    命令形: "せ";
    条件形: "せ";
    仮定形: "せ";
  };
  つ: {
    ます形: "ち";
    て形: "って";
    た形: "った";
    ない形: "た";
    可能形: "て";
    受身形: "た";
    使役形: "た";
    意向形: "と";
    命令形: "て";
    条件形: "て";
    仮定形: "て";
  };
  ぬ: {
    ます形: "に";
    て形: "んで";
    た形: "んだ";
    ない形: "な";
    可能形: "ね";
    受身形: "な";
    使役形: "な";
    意向形: "の";
    命令形: "ね";
    条件形: "ね";
    仮定形: "ね";
  };
  ぶ: {
    ます形: "び";
    て形: "んで";
    た形: "んだ";
    ない形: "ば";
    可能形: "べ";
    受身形: "ば";
    使役形: "ば";
    意向形: "ぼ";
    命令形: "べ";
    条件形: "べ";
    仮定形: "べ";
  };
  む: {
    ます形: "み";
    て形: "んで";
    た形: "んだ";
    ない形: "ま";
    可能形: "め";
    受身形: "ま";
    使役形: "ま";
    意向形: "も";
    命令形: "め";
    条件形: "め";
    仮定形: "め";
  };
  る: {
    ます形: "り";
    て形: "って";
    た形: "った";
    ない形: "ら";
    可能形: "れ";
    受身形: "ら";
    使役形: "ら";
    意向形: "ろ";
    命令形: "れ";
    条件形: "れ";
    仮定形: "れ";
  };
};

// Irregular verb conjugation map
type IrregularConjugationMap = {
  する: {
    辞書形: "する";
    ます形: "し";
    て形: "して";
    た形: "した";
    ない形: "し";
    可能形: "でき";
    受身形: "され";
    使役形: "させ";
    意向形: "しよう";
    命令形: "しろ";
    条件形: "すれ";
    仮定形: "すれ";
  };
  来る: {
    辞書形: "来る";
    ます形: "来";
    て形: "来て";
    た形: "来た";
    ない形: "来";
    可能形: "来られ";
    受身形: "来られ";
    使役形: "来させ";
    意向形: "来よう";
    命令形: "来い";
    条件形: "来れ";
    仮定形: "来れ";
  };
  くる: {
    辞書形: "くる";
    ます形: "き";
    て形: "きて";
    た形: "きた";
    ない形: "こ";
    可能形: "こられ";
    受身形: "こられ";
    使役形: "こさせ";
    意向形: "こよう";
    命令形: "こい";
    条件形: "くれ";
    仮定形: "くれ";
  };
};

// Helper type to ensure we get string literals from the maps
type StringLiteral<T> = T extends string ? T : never;

// Helper utility types for conjugation
type GetGodanConjugation<
  E extends GodanVerb["ending"],
  F extends ConjugationForm
> = F extends keyof GodanConjugationMap[E]
  ? StringLiteral<GodanConjugationMap[E][F]>
  : never;

type GetIrregularConjugation<
  V extends IrregularVerb,
  F extends ConjugationForm
> = V["dictionary"] extends keyof IrregularConjugationMap
  ? F extends keyof IrregularConjugationMap[V["dictionary"]]
    ? StringLiteral<IrregularConjugationMap[V["dictionary"]][F]>
    : never
  : never;

// Main conjugation type
export type ConjugateVerb<
  V extends Verb,
  F extends ConjugationForm
> = V extends GodanVerb
  ? F extends "辞書形"
    ? `${V["stem"]}${V["ending"]}`
    : `${V["stem"]}${GetGodanConjugation<V["ending"], F>}`
  : V extends IchidanVerb
  ? F extends "辞書形"
    ? `${V["stem"]}${V["ending"]}`
    : F extends "ます形"
    ? `${V["stem"]}`
    : F extends "て形"
    ? `${V["stem"]}て`
    : F extends "た形"
    ? `${V["stem"]}た`
    : F extends "ない形"
    ? `${V["stem"]}`
    : F extends "可能形" | "受身形" | "使役形" | "仮定形" | "条件形"
    ? `${V["stem"]}られ`
    : F extends "意向形"
    ? `${V["stem"]}よう`
    : F extends "命令形"
    ? `${V["stem"]}ろ`
    : never
  : V extends IrregularVerb
  ? GetIrregularConjugation<V, F>
  : never;

// Example usage (we keep this for documentation)
type 話す = GodanVerb & { stem: "話"; ending: "す" };
type 食べる = IchidanVerb & { stem: "食べ"; ending: "る" };
type する = IrregularVerb & { dictionary: "する" };

// Type-level conjugation tests
type 話すます形 = ConjugateVerb<話す, "ます形">; // Evaluates to "話し"
type 食べるて形 = ConjugateVerb<食べる, "て形">; // Evaluates to "食べて"
type する命令形 = ConjugateVerb<する, "命令形">; // Evaluates to "しろ"
