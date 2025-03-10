fetch('blogs/blog.json')
  .then(response => response.json())
  .then(data => {
    if (!Array.isArray(data) || data.length === 0) {
      console.warn("ブログデータがありません");
      document.getElementById("latest-blog").innerHTML = "<p>まだ記事がありません</p>";
      return;
    }

    // 最新の日付順にソート（万が一順番がバラバラでもOK）
    data.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 最新の記事（ソート後の一番最初の要素）
    let latestPost = data[0];

    // タイトルが長すぎる場合は省略（オプション）
    let maxLength = 20; // 20文字以上は省略
    let shortTitle = latestPost.title.length > maxLength ? latestPost.title.substring(0, maxLength) + "..." : latestPost.title;

    // HTMLにデータを埋め込む
    document.getElementById("blog-title").innerHTML =
      `${shortTitle}<br><a href="blogs/${latestPost.url}" class="button">記事を読む</a>`;
  })
  .catch(error => console.error("ブログデータの取得に失敗しました:", error));

function toggleMenu() {
    document.getElementById("nav-menu").classList.toggle("show");
}
