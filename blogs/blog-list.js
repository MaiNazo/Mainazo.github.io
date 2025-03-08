document.addEventListener("DOMContentLoaded", function () {
    const blogListContainer = document.getElementById("blog-list");
    const categoryFilter = document.getElementById("category-filter");

    // JSON を読み込む
    fetch("blog.json")
        .then(response => response.json())
        .then(blogs => {
            displayBlogs(blogs);

            // カテゴリフィルターの変更イベント
            categoryFilter.addEventListener("change", function () {
                const selectedCategory = categoryFilter.value;
                const filteredBlogs = selectedCategory === "all"
                    ? blogs
                    : blogs.filter(blog => blog.category === selectedCategory);

                displayBlogs(filteredBlogs);
            });
        })
        .catch(error => console.error("ブログデータの読み込みに失敗しました:", error));

    // 記事を表示する関数
    function displayBlogs(blogs) {
        blogListContainer.innerHTML = ""; // 一度リストをクリア

        if (blogs.length === 0) {
            // 記事がない場合の表示
            const noResult = document.createElement("p");
            noResult.textContent = "該当する記事はありません。";
            noResult.classList.add("no-articles");
            blogListContainer.appendChild(noResult);
            return;
        }

        blogs.forEach(blog => {
            const blogElement = document.createElement("section");
            blogElement.classList.add("blog-post");
            blogElement.innerHTML = `
                <h3><a href="${blog.url}">${blog.title}</a></h3>
                <p>${blog.date}<br>カテゴリ: ${blog.category}</p>
                <p>　${blog.content}</p>
            `;
            blogListContainer.appendChild(blogElement);
        });
    }
});
