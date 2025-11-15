---
title: "型パズルがわからない？じゃあこれ見て！！"
emoji: "🧩"
type: "tech" # tech: 技術記事 / idea: アイデア
topics: [TypeScript, 型パズル, type-challenges]
published: false
---

こんにちは、型パズル勉強中の Ojoxux です。

この記事は「TypeScriptの型操作がどうやって動いてるの？」といった型に慣れていない方や、type-challengesで型パズルに挑戦している方にもおすすめの記事となっています。


## 型って難しいよね

TypeScriptの型システムは強力ですが、複雑な型操作になると「今何が起きているのか」を理解するのが難しいですよね。

特にtype-challengesなどで型パズルに挑戦していると、「この型、どういう流れで評価されてるの？」と頭を抱えた経験がある方も多いのではないでしょうか。

そんな悩みを解決してくれる素晴らしいサイトがあったので紹介します！

https://types.kitlangton.com/

## Visual Types とは

**Visual Types** は、TypeScriptの型システムの様々な概念をシンプルにビジュアライズしてくれる型ビジュアライザです。

作者は [Effect-TS](https://github.com/Effect-TS/effect) のコミュニティでも活躍されているKit Langton さんが公開しています。

## Visual Typesを触ってみて...

実際に触ってみると、その良さがさらに実感できました。

### 様々なケースの入力と出力のセットで理解が深まる

最大の特徴は、**TypeScriptの型システムの様々な概念について、様々なケースの入力と出力のセットが用意されている**んです。

例えば、**Subtypes as Subsets** のセクションでは、`A extends B`という部分型を**ベン図**を使って部分集合としてうまーく表現してくれてます。

いくつか例を見てみましょう。

`true extends boolean`のケースでは、小さな円（true）が大きな円（boolean）の中に含まれる様子がベン図で表示されます。これにより、「trueはbooleanの部分集合だから成立する」という関係性が直感的に理解できます。

<!-- ここに画像を追加予定 -->

一方、`false | "maybe" extends "maybe" | true`のケースでは、2つの円が一部重なっているものの、完全には含まれていない様子が表示されます。`"maybe"`という共通部分があるため円が重なっていますが、左側には`false`、右側には`true`という独自の要素があるため、**完全に含まれる関係ではない**ことがベン図で一目瞭然です。

<!-- ここに画像を追加予定 -->

このように、複数のケースを見比べることで、より理解が深まりそうです！

### 豊富なセクションが用意されている

Visual Typesには以下のような幅広いセクションが用意されています。

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

TypeScriptでよく使われるような概念をセクションごとにまとめてくれているので、一つ一つのセクションを見ていくだけでも非常に勉強になります。

## 実際に見てみよう：`Pick`の例

type-challengesでよく最初に解かれる`Pick`を、Visual Typesで見てみましょう。

`Pick`は、オブジェクト型から指定したプロパティだけを抽出するユーティリティ型のことです。

Visual Typesでは、例えば`Pick`のケースが用意されています。

```typescript
Pick<{ x: number; y: number; z: number }, "x" | "y">
```

↓ 出力はこのように表示される ↓

```typescript
{ x: number; y: number }
```

入力例として`"x" | "y"`を指定されていて、出力例では`z`プロパティが除外されて`x`と`y`だけになっています。わかりやすい！

他にもPickを使った様々なケースが用意されており、Pickの動作を直感的に学ぶことができます。


## まとめ

TypeScriptの型システムは最初は難しく感じますが、このようなビジュアライザを使うことでより深く理解することができます。

もちろん、公式ドキュメントの補助として使ったりもできると思うので活用の幅は大きそうです！ただ、ユーティリティ型のセクションはまだ充実していないので、今後のアップデートを楽しみに待ちたいところです。

ぜひサイトを訪れて、いろいろな型を試してみてください！

https://types.kitlangton.com/


