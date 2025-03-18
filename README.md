
# Typed Japanese

A TypeScript type-level system for modeling Japanese grammar, enabling the expression of complete Japanese sentences through TypeScript's type system. This project creates a DSL that models Japanese grammar rules, allowing grammatically correct natural language subsets to be written and verified in a programming language.

## Overview

Typed Japanese explores an intermediate format for AI in language learning. For example, LLMs could return grammar analysis of Japanese sentences using this format instead of JSON, enabling verification through TypeScript's type checker to improve correctness.

Currently implemented:
- Complete verb conjugation system (Godan, Ichidan, and Irregular verbs)
- Support for all major conjugation forms

Planned features:
- Adjective conjugation
- Particles and their usage rules
- Noun classification and counter systems
- Grammatical structures
- Full sentence composition

## Verb System

### Verb Classes

Japanese verbs are categorized into three main classes:

1. **Godan Verbs (五段動詞)** - Also known as "Group 1" or "u-verbs"
   - Endings: う, く, ぐ, す, つ, ぬ, ぶ, む, る
   - Examples: 話す (hanasu - to speak), 書く (kaku - to write)

2. **Ichidan Verbs (一段動詞)** - Also known as "Group 2" or "ru-verbs"
   - Always end with る
   - Examples: 食べる (taberu - to eat), 見る (miru - to see)

3. **Irregular Verbs (不規則動詞)** - Only two main verbs
   - する (suru - to do)
   - 来る (kuru - to come)

### Conjugation Forms

The system supports these conjugation forms:

- 辞書形 (Dictionary form)
- ます形 (Polite form)
- て形 (Te form)
- た形 (Past form)
- ない形 (Negative form)
- 可能形 (Potential form)
- 受身形 (Passive form)
- 使役形 (Causative form)
- 意向形 (Volitional form)
- 命令形 (Imperative form)
- 条件形 (Conditional form)
- 仮定形 (Hypothetical form)

## Usage

```typescript
import type { GodanVerb, IchidanVerb, IrregularVerb, Conjugate } from './src/verb-types';

// Define verbs
type 話す = GodanVerb & { stem: '話'; ending: 'す' };
type 食べる = IchidanVerb & { stem: '食べ'; ending: 'る' };
type する = IrregularVerb & { dictionary: 'する' };

// Get conjugations as types
type 話すます形 = Conjugate<話す, 'ます形'>; // Evaluates to "話し"
type 食べるて形 = Conjugate<食べる, 'て形'>; // Evaluates to "食べて"
type する命令形 = Conjugate<する, '命令形'>; // Evaluates to "しろ"

// Type checking in action
const correct: 話すます形 = '話し';     // OK
const incorrect: 話すます形 = '話す';    // Type error!
```

## Technical Implementation

The system uses TypeScript's template literal types, conditional types, and mapped types to create a purely type-level representation of Japanese grammatical rules.

Key components:
- Type definitions for grammatical elements
- Rule mapping via conditional types
- String literal manipulation for form generation
- Type inference for grammatical validation

## Roadmap

1. **Phase 1** ✓ - Verb conjugation system
2. **Phase 2** - Adjective types and conjugation
3. **Phase 3** - Particles and basic grammar structures
4. **Phase 4** - Noun classification and counter system
5. **Phase 5** - Complete sentence composition

## Why Typed Japanese?

- **Educational tool** - Learn Japanese grammar through code
- **AI-assisted learning** - Provide structured formats for language analysis
- **Grammar verification** - Express and verify Japanese grammar in code
- **Integration potential** - Basis for typed Japanese language tools

## Limitations

- This is a type-level system only - it doesn't provide runtime functionality
- The system handles standard forms but doesn't account for linguistic nuances
- Some rare or archaic language patterns may not be accurately represented
