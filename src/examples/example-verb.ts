import type {
  GodanVerb,
  IchidanVerb,
  IrregularVerb,
  ConjugateVerb,
} from "../verb-types";

// Example Godan verbs (五段動詞)
type 話す = GodanVerb & { stem: "話"; ending: "す" };
type 書く = GodanVerb & { stem: "書"; ending: "く" };
type 遊ぶ = GodanVerb & { stem: "遊"; ending: "ぶ" };
type 読む = GodanVerb & { stem: "読"; ending: "む" };
type 死ぬ = GodanVerb & { stem: "死"; ending: "ぬ" };
type 買う = GodanVerb & { stem: "買"; ending: "う" };
type 待つ = GodanVerb & { stem: "待"; ending: "つ" };
type 泳ぐ = GodanVerb & { stem: "泳"; ending: "ぐ" };
type 走る = GodanVerb & { stem: "走"; ending: "る" };

// Example Ichidan verbs (一段動詞)
type 食べる = IchidanVerb & { stem: "食べ"; ending: "る" };
type 見る = IchidanVerb & { stem: "見"; ending: "る" };
type 着る = IchidanVerb & { stem: "着"; ending: "る" };
type 寝る = IchidanVerb & { stem: "寝"; ending: "る" };
type 起きる = IchidanVerb & { stem: "起き"; ending: "る" };

// Example Irregular verbs (不規則動詞)
type する = IrregularVerb & { dictionary: "する" };
type 来る = IrregularVerb & { dictionary: "来る" };
type くる = IrregularVerb & { dictionary: "くる" };

// Examples of conjugation for Godan verbs
// 話す (to speak)
type 話す辞書形 = ConjugateVerb<話す, "辞書形">; // 話す
type 話すます形 = ConjugateVerb<話す, "ます形">; // 話し
type 話すて形 = ConjugateVerb<話す, "て形">; // 話して
type 話すた形 = ConjugateVerb<話す, "た形">; // 話した
type 話すない形 = ConjugateVerb<話す, "ない形">; // 話さ
type 話す可能形 = ConjugateVerb<話す, "可能形">; // 話せ
type 話す命令形 = ConjugateVerb<話す, "命令形">; // 話せ

// 買う (to buy)
type 買うます形 = ConjugateVerb<買う, "ます形">; // 買い
type 買うて形 = ConjugateVerb<買う, "て形">; // 買って
type 買うた形 = ConjugateVerb<買う, "た形">; // 買った
type 買う意向形 = ConjugateVerb<買う, "意向形">; // 買お
// Examples of conjugation for Ichidan verbs
// 食べる (to eat)
type 食べる辞書形 = ConjugateVerb<食べる, "辞書形">; // 食べる
type 食べるます形 = ConjugateVerb<食べる, "ます形">; // 食べ
type 食べるて形 = ConjugateVerb<食べる, "て形">; // 食べて
type 食べるた形 = ConjugateVerb<食べる, "た形">; // 食べた
type 食べるない形 = ConjugateVerb<食べる, "ない形">; // 食べ
type 食べる可能形 = ConjugateVerb<食べる, "可能形">; // 食べられ
type 食べる命令形 = ConjugateVerb<食べる, "命令形">; // 食べろ

// Examples of conjugation for Irregular verbs
// する (to do)
type する辞書形 = ConjugateVerb<する, "辞書形">; // する
type するます形 = ConjugateVerb<する, "ます形">; // し
type するて形 = ConjugateVerb<する, "て形">; // して
type するた形 = ConjugateVerb<する, "た形">; // した
type するない形 = ConjugateVerb<する, "ない形">; // し
type する可能形 = ConjugateVerb<する, "可能形">; // でき
type する命令形 = ConjugateVerb<する, "命令形">; // しろ

// 来る (to come)
type 来るます形 = ConjugateVerb<来る, "ます形">; // 来
type 来るて形 = ConjugateVerb<来る, "て形">; // 来て
type 来る命令形 = ConjugateVerb<来る, "命令形">; // 来い

// Type checking
// These should work
const verifyHanasu: 話すます形 = "話し";
const verifyTaberu: 食べるて形 = "食べて";
const verifySuru: する命令形 = "しろ";

// @ts-expect-error
const wrongHanasu: 話すます形 = "話す"; // Type error: '話す' is not assignable to type '話し'
// @ts-expect-error
const wrongTaberu: 食べるて形 = "食べた"; // Type error: '食べた' is not assignable to type '食べて'
// @ts-expect-error
const wrongSuru: する命令形 = "する"; // Type error: 'する' is not assignable to type 'しろ'
