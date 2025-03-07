document.addEventListener("DOMContentLoaded", function() {
    const blogContainer = document.getElementById("blog-container");
    const filterContainer = document.createElement("div");
    filterContainer.id = "filter-container";
    document.body.insertBefore(filterContainer, blogContainer); // フィルターをブログの前に追加

    const jsonUrl = "blog.json";

    fetch(jsonUrl)
        .then(response => response.json())
        .then(blogData => {
            const categories = {};
            const tags = new Set();

            blogData.forEach(blog => {
                if (!categories[blog.category]) {
                    categories[blog.category] = [];
                }
                categories[blog.category].push(blog);

                if (blog.tags) {
                    blog.tags.forEach(tag => tags.add(tag));
                }
            });

            // タグフィルターの作成
            const allButton = document.createElement("button");
            allButton.textContent = "すべて表示";
            allButton.classList.add("filter-button");
            allButton.addEventListener("click", () => filterBlogs(null));
            filterContainer.appendChild(allButton);

            tags.forEach(tag => {
                const button = document.createElement("button");
                button.textContent = tag;
                button.classList.add("filter-button");
                button.addEventListener("click", () => filterBlogs(tag));
                filterContainer.appendChild(button);
            });

            // ブログ記事を表示
            for (const category in categories) {
                const categorySection = document.createElement("section");
                categorySection.classList.add("category-section");
                categorySection.style.Width = "900px";

                const categoryTitle = document.createElement("h2");
                categoryTitle.textContent = category;
                categorySection.appendChild(categoryTitle);

                categories[category].sort((a, b) => new Date(b.date) - new Date(a.date));

                categories[category].forEach(blog => {
                    const article = document.createElement("section");
                    article.classList.add("blog-article");
                    article.dataset.tags = blog.tags ? blog.tags.join(",") : ""; // データ属性にタグを保存
                    article.innerHTML = `<a href="${blog.url}"><h3>${blog.title}</h3></a><p>${blog.date}</p>`;
                    categorySection.appendChild(article);
                });

                blogContainer.appendChild(categorySection);
            }
        })
        .catch(error => {
            console.error("ブログデータの読み込みに失敗しました:", error);
            blogContainer.innerHTML = "<p>ブログの取得に失敗しました。</p>";
        });

    function filterBlogs(tag) {
        document.querySelectorAll(".blog-article").forEach(article => {
            const articleTags = article.dataset.tags.split(",");
            if (!tag || articleTags.includes(tag)) {
                article.style.display = "block";
            } else {
                article.style.display = "none";
            }
        });
    }
});
