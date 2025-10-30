import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, "..");

const ZENN_USERNAME = "ojoxux";

/**
 * Markdownファイルのフロントマターを解析
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) return null;

  const frontmatter = {};
  const lines = match[1].split("\n");

  for (const line of lines) {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // 引用符を削除
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // 配列の解析（topics）
    if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""))
        .filter((item) => item);
    }

    // booleanの解析
    if (value === "true") value = true;
    if (value === "false") value = false;

    frontmatter[key] = value;
  }

  return frontmatter;
}

/**
 * ZennのAPIから公開記事を取得
 */
async function getPublishedArticlesFromZenn() {
  try {
    const response = await fetch(
      `https://zenn.dev/api/articles?username=${ZENN_USERNAME}&order=latest`
    );
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.warn("⚠️  ZennのAPIから記事取得に失敗しました:", error.message);
    return [];
  }
}

/**
 * 記事情報を取得
 */
async function getArticles() {
  const articlesDir = path.join(rootDir, "articles");
  const files = await fs.readdir(articlesDir);
  const markdownFiles = files.filter((file) => file.endsWith(".md"));

  // ZennのAPIから公開記事情報を取得
  const zennArticles = await getPublishedArticlesFromZenn();
  const zennArticlesMap = new Map(
    zennArticles.map((article) => [article.slug + ".md", article])
  );

  const articles = [];

  for (const file of markdownFiles) {
    const filePath = path.join(articlesDir, file);
    const content = await fs.readFile(filePath, "utf-8");
    const frontmatter = parseFrontmatter(content);

    if (!frontmatter) continue;

    const slug = file.replace(".md", "");
    const zennArticle = zennArticlesMap.get(file);

    articles.push({
      filename: file,
      title: frontmatter.title || "タイトルなし",
      emoji: frontmatter.emoji || "📝",
      topics: Array.isArray(frontmatter.topics) ? frontmatter.topics : [],
      published: frontmatter.published !== false,
      // Zenn APIからの情報を追加
      zennUrl: zennArticle ? `https://zenn.dev/ojoxux/articles/${slug}` : null,
      likedCount: zennArticle?.liked_count || 0,
      publishedAt: zennArticle?.published_at || null,
    });
  }

  return articles;
}

/**
 * トピック別に記事を分類
 */
function categorizeArticles(articles) {
  const categories = {};

  for (const article of articles) {
    // 最初のトピックをカテゴリとして使用
    const category = article.topics[0] || "その他";

    if (!categories[category]) {
      categories[category] = [];
    }

    categories[category].push(article);
  }

  return categories;
}

/**
 * README.mdを生成
 */
function generateReadme(articles) {
  const categories = categorizeArticles(articles);

  let readme = `# Ojoxux の記事置き場

技術記事やメモを管理するリポジトリです。

## 投稿先

[![Zenn](https://img.shields.io/badge/Zenn-ojoxux-3EA8FF?style=flat&logo=zenn&logoColor=white)](https://zenn.dev/ojoxux)

## 📚 記事一覧

`;

  // カテゴリごとに記事を出力
  for (const [category, categoryArticles] of Object.entries(categories)) {
    readme += `### ${category}\n\n`;

    for (const article of categoryArticles) {
      const relativePath = `./articles/${article.filename}`;

      // 公開されている場合はZennへのリンク、未公開の場合はローカルファイルへのリンク
      const articleLink = article.zennUrl || relativePath;
      const linkText = article.title;

      // ステータス表示
      let status = "";
      if (article.zennUrl) {
        status = article.likedCount > 0 ? ` 💖${article.likedCount}` : "";
      } else if (!article.published) {
        status = " (未公開)";
      }

      readme += `- [${linkText}](${articleLink}) ${article.emoji}${status}`;

      // ローカルファイルへのリンクも追加（公開済みの場合）
      if (article.zennUrl) {
        readme += ` [[ソース]](${relativePath})`;
      }

      readme += "\n";
    }
  }

  return readme.trim() + "\n";
}

/**
 * メイン処理
 */
async function main() {
  try {
    console.log("📖 記事を読み込み中...");
    const articles = await getArticles();
    console.log(`✅ ${articles.length}件の記事を取得しました`);

    console.log("📝 READMEを生成中...");
    const readme = generateReadme(articles);

    const readmePath = path.join(rootDir, "README.md");
    await fs.writeFile(readmePath, readme, "utf-8");

    console.log("✨ README.mdを更新しました！");
  } catch (error) {
    console.error("❌ エラーが発生しました:", error);
    process.exit(1);
  }
}

main();
