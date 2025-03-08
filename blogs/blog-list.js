document.addEventListener("DOMContentLoaded", function () {
    const blogListContainer = document.getElementById("blog-list");
    const categoryButtons = document.querySelectorAll(".category-button");

    fetch("blog.json")
        .then(response => response.json())
        .then(blogs => {
            displayBlogs(blogs); // 初期表示（全記事）

            // 各カテゴリボタンにクリックイベントを設定
            categoryButtons.forEach(button => {
                button.addEventListener("click", function () {
                    const selectedCategory = this.dataset.category;

                    // 選択したカテゴリのみにフィルター
                    const filteredBlogs = selectedCategory === "all"
                        ? blogs
                        : blogs.filter(blog => blog.category === selectedCategory);

                    displayBlogs(filteredBlogs);
                });
            });
        })
        .catch(error => console.error("ブログデータの読み込みに失敗しました:", error));

    function displayBlogs(blogs) {
        blogListContainer.innerHTML = ""; // クリア

        if (blogs.length === 0) {
            const noResult = document.createElement("p");
            noResult.textContent = "該当する記事はありません。";
            noResult.classList.add("no-articles");
            blogListContainer.appendChild(noResult);
            return;
        }

        blogs.forEach(blog => {
            const blogElement = document.createElement("section");
            blogElement.classList.add("blog-post");
            blogElement.style.width = "700px";
            blogElement.innerHTML = `
                <h3><a href="${blog.url}">${blog.title}</a></h3>
                <p>${blog.date}<br>カテゴリ: ${blog.category}</p>
                <p>　${blog.content}</p>
            `;
            blogListContainer.appendChild(blogElement);
        });
    }
});
