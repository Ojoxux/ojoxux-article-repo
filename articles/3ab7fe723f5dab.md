---
title: "型がわからない？じゃあこれ見て！！"
emoji: "🧩"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: [TypeScript, 型パズル, type-challenges]
published: false
---

こんにちは、型パズル勉強中の Ojoxux です。

この記事は「TypeScript の型操作がどうやって動いてるの？」といった型に慣れていない方や、type-challenges で型パズルに挑戦している方にもおすすめの記事となっています。

## 型って難しいよね

TypeScript の型システムは強力ですが、複雑な型操作になると「この型がどういう結果になるのか」を理解するのが難しいですよね。

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

`true extends boolean`のケースでは、小さな円（true）が大きな円（boolean）の中に含まれる様子がベン図で表示されます。これにより、「true は boolean の部分集合だから成立する」という関係性が直感的に理解できます。

![true extends boolean](/images/true_extends_boolean.png)

一方、`false | "maybe" extends "maybe" | true`のケースでは、2 つの円が一部重なっているものの、完全には含まれていない様子が表示されます。`"maybe"`という共通部分があるため円が重なっていますが、左側には`false`、右側には`true`という独自の要素があるため、**完全に含まれる関係ではない**ことがベン図で一目瞭然です。

![false | "maybe" extends "maybe" | true](/images/false_maybe_extends_maybe_true.png)

このように、複数のケースを見比べることで、より理解が深まりそうです！

### 豊富なセクションが用意されている

Visual Types には以下のような幅広いセクションが用意されています。

**Foundation(基礎編):**

- Types as Sets（型を集合として）
- Literal Types（リテラル型）
- Union Types（ユニオン型）
- Subtypes as Subsets（部分型と部分集合）
- Tuple Types（タプル型）
- Object Types（オブジェクト型）
- Intersection Types（インターセクション型）

**Basic Ⅱ(応用編):**

- Type Aliases（型エイリアス）
- Generic Types（ジェネリック型）
- `typeof`演算子
- `as const`
- `unknown` vs `any`

**Object Patterns（オブジェクトパターン）:**

- `keyof`演算子
- Indexed Access（インデックスアクセス）
- Mapped Types（マップ型）

**Conditional Types（条件付き型）:**

- Conditional Types（条件付き型）
- Reflexivity（反射性）
- Conditional Unions
- Conditional Non-Distribution
- Contidional Filters
- `infer`キーワード

**Utility Types（ユーティリティ型）:**

- Utility Types（`Pick`, `ReturnType`, `Parameters`）

TypeScript でよく使われるような概念をセクションごとにまとめてくれているので、一つ一つのセクションを見ていくだけでも非常に勉強になります。

## 実際に見てみよう：`Pick`の例

type-challenges でよく最初に解かれる`Pick`を、Visual Types で見てみましょう。

`Pick`は、オブジェクト型から指定したプロパティだけを抽出するユーティリティ型のことです。

```typescript
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

おなじみのコードですね。
Visual Types では、例えば以下のケースの I/O が用意されています。

![Pick](/images/Pick-IO.png)

入力例として`"x" | "y"`を指定されていて、出力例では`z`プロパティが除外されて`x`と`y`だけになっています。わかりやすい！

他にも Pick を使った様々なケースが用意されており、Pick の動作を直感的に学ぶことができます。

## まとめ

TypeScript の型システムは最初は難しく感じますが、このようなビジュアライザを使うことでより深く理解することができます。

もちろん、公式ドキュメントの補助として使ったりもできると思うので活用の幅は大きそうです！ただ、ユーティリティ型のセクションはまだ充実していないので、今後のアップデートを楽しみに待ちたいところです。

ぜひサイトを訪れて、いろいろな型を試してみてください！

https://types.kitlangton.com/
