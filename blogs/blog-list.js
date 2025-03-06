document.addEventListener("DOMContentLoaded", function() {
    const blogContainer = document.getElementById("blog-container");

    // GitHub Pages の JSON ファイルのパス（リポジトリ名に応じて修正）
    const jsonUrl = "../blog.json";

    // JSONファイルを取得
    fetch(jsonUrl)
        .then(response => response.json())
        .then(blogData => {
            // カテゴリごとに分類
            const categories = {};
            blogData.forEach(blog => {
                if (!categories[blog.category]) {
                    categories[blog.category] = [];
                }
                categories[blog.category].push(blog);
            });

            // カテゴリごとに表示
            for (const category in categories) {
                // カテゴリ名を表示
                const categoryTitle = document.createElement("h2");
                categoryTitle.textContent = category;
                blogContainer.appendChild(categoryTitle);

                // 記事リストを作成
                const list = document.createElement("ul");

                // 記事を新しい順にソート
                categories[category].sort((a, b) => new Date(b.date) - new Date(a.date));

                categories[category].forEach(blog => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `<a href="${blog.url}">${blog.title} (${blog.date})</a>`;
                    list.appendChild(listItem);
                });

                blogContainer.appendChild(list);
            }
        })
        .catch(error => {
            console.error("ブログデータの読み込みに失敗しました:", error);
            blogContainer.innerHTML = "<p>ブログの取得に失敗しました。</p>";
        });
});
