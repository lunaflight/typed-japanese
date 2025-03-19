// Interrogative elements by category
export type WhyInterrogative = "なぜ" | "なんで" | "どうして";
export type WhenInterrogative = "いつ";
export type WhereInterrogative = "どこ";
export type WhoInterrogative = "だれ" | "誰";
export type WhatInterrogative = "何" | "なに";
export type HowInterrogative = "どう" | "どうして";
export type WhatKindInterrogative = "どんな";
export type WhichInterrogative = "どれ";

// Combined interrogative adverb type
export type InterrogativeAdverb =
  | WhyInterrogative
  | WhenInterrogative
  | WhereInterrogative
  | WhoInterrogative
  | WhatInterrogative
  | HowInterrogative
  | WhatKindInterrogative
  | WhichInterrogative;
