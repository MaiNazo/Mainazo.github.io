document.addEventListener("DOMContentLoaded", function() {
    const blogContainer = document.getElementById("blog-container");

    const jsonUrl = "blog.json";

    fetch(jsonUrl)
        .then(response => response.json())
        .then(blogData => {
            const categories = {};
            blogData.forEach(blog => {
                if (!categories[blog.category]) {
                    categories[blog.category] = [];
                }
                categories[blog.category].push(blog);
            });

            for (const category in categories) {
                const categorySection = document.createElement("section");
                categorySection.classList.add("category-section");

                // **横幅を広げるためのCSSを追加**
                categorySection.style.width = "700px";  // 900pxに広げる
                categorySection.style.margin = "0 auto";   // 中央揃えにする

                const categoryTitle = document.createElement("h2");
                categoryTitle.textContent = category;
                categorySection.appendChild(categoryTitle);

                categories[category].sort((a, b) => new Date(b.date) - new Date(a.date));

                categories[category].forEach(blog => {
                    const article = document.createElement("section");
                    article.classList.add("blog-article");
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
});
