---
title: "TypeScriptの型をビジュアルで理解！「Visual Types」を試してみた"
emoji: "🧩"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: [TypeScript, 型パズル, type-challenges]
published: false
---

# はじめに

こんにちは、型パズル勉強中の Ojoxux です。

この記事は TypeScript の型に慣れていない方や、type-challenges で型パズルに挑戦している方に向けた記事です。

## 型って難しいよね

TypeScript の型システムは強力ですが、この型がどういう結果になるのかを理解するのが難しいですよね。

また [type-challenges](https://github.com/type-challenges/type-challenges) などで型パズルに挑戦していると、「この型、どういう流れで評価されてるの？」と頭を抱えた経験がある方も多いのではないでしょうか。

そんな悩みを解決してくれる素晴らしいサイトがあったので紹介します！

https://types.kitlangton.com/

## Visual Types とは

**Visual Types** は、TypeScript の型システムの様々な概念をシンプルにビジュアライズしてくれる型ビジュアライザです。

作者は [Effect-TS](https://github.com/Effect-TS/effect) のコミュニティでも活躍されている Kit Langton さんが公開しています。

https://x.com/kitlangton

## Visual Types を触ってみて...

実際に触ってみると、その良さがさらに実感できました。

### 様々なケースの入力と出力のセットで理解が深まる

最大の特徴は、**TypeScript の型システムの様々な概念について、様々なケースの入力と出力のセットが用意されている**んです。

例えば、**Subtypes as Subsets** のセクションでは、`A extends B`という部分型を**ベン図**を使って部分集合としてうまーく表現してくれてます。

いくつか例を見てみましょう。

`"kit" extends string`のケースでは、小さな円（"kit"）が大きな円（string）の中に含まれる様子がベン図で表示されます。これにより、「"kit" は string の部分集合だから成立する」という関係性が直感的に理解できます。

!["kit" extends string のベン図表示](/images/kit-extends-string.png)

一方、`false | "maybe" extends "maybe" | true`のケースでは、2 つの円が一部重なっているものの、完全には含まれていない様子が表示されます。`"maybe"`という共通部分があるため円が重なっていますが、左側には`false`、右側には`true`という独自の要素があるため、**完全に含まれる関係ではない**ことがベン図で一目瞭然です。

![false | "maybe" extends "maybe" | true のベン図表示](/images/false_maybe_extends_maybe_true.png)

このように、複数のケースを見比べることで、より理解が深まりそうです！

### 豊富なセクションが用意されている

Visual Types には以下のような幅広いセクションが用意されています。

**Foundation（基礎編）:**

- Types as Sets（型と集合）
- Literal Types（リテラル型）
- Union Types（ユニオン型）
- Subtypes as Subsets（部分型）
- Tuple Types（タプル型）
- Object Types（オブジェクト型）
- Intersection Types（交差型）

**Basic II（応用編）:**

- Type Aliases（型エイリアス）
- Generic Types（ジェネリック型）
- `typeof`演算子
- `as const`
- `unknown` vs `any`

**Object Patterns（オブジェクトパターン）:**

- `keyof`演算子
- Indexed Access（インデックスアクセス型）
- Mapped Types（マップ型）

**Conditional Types（条件付き型）:**

- Conditional Types（条件付き型）
- Reflexivity（反射性）
- Conditional Unions（条件付きユニオン）
- Conditional Non-Distribution（条件の分配防止）
- Conditional Filters（条件フィルタ）
- `infer`キーワード

**Utility Types（ユーティリティ型）:**

- Utility Types（`Pick`, `ReturnType`, `Parameters`）

TypeScript でよく使われるような概念をセクションごとにまとめてくれているので、一つ一つのセクションを見ていくだけでも非常に勉強になります。

## 実際に見てみよう：`Pick`の例

type-challenges における最初の鬼門、`Pick` を Visual Types で見てみましょう。

`Pick`とは、オブジェクト型から指定したプロパティだけを抽出するユーティリティ型のことです。

```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

中身を説明すると、`K extends keyof T`でオブジェクトのキーのみを受け付けて、`[P in K]: T[P]`でそれらのプロパティをマッピングする型なのですが、初見だとなんのこっちゃですよね。

Visual Types では、例えば以下の入出力ケースが挙げられています。

![Pick](/images/Pick-IO.png)

入力例として`"a" | "b"`が指定されていて、出力例では`"a"`と`"b"`のみのオブジェクト型になっています。これならわかりやすい！！

他にも Pick を使った様々な入出力ケースが用意されていて、Pick による型操作を直感的に学ぶことができます。

## まとめ

TypeScript の型システムは最初は難しく感じますが、このようなビジュアライザを使うことでよりとっつきやすくなりそうです！

Visual Types は以下のような時に特に役に立ちそうです！

- **TypeScript の型の基礎を学ぶ時** - 条件付き型や`infer`など、型システムの基本的な概念を視覚的に理解できる
- **チーム内での型の説明時** - ベン図などのビジュアルを使って、型の関係性を直感的に共有できる
- **公式ドキュメントの補助として** - 文章だけでは理解しづらい概念を、視覚的に確認できる

活用の幅は大きそうです！ただ、ユーティリティ型のセクションはまだ充実していないので、type-challenges で活用するためにも今後のアップデートを楽しみに待ちたいですね。

ぜひサイトを訪れて、型と仲良くなりましょう！！

https://types.kitlangton.com/
