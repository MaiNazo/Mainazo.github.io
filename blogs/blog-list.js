document.addEventListener("DOMContentLoaded", function () {
    const blogContainer = document.getElementById("blog-container");
    const markdownUrl = "blogs/sample.md"; // ここを実際の Markdown ファイルのパスに変更

    fetch(markdownUrl)
        .then(response => response.text())
        .then(markdownText => {
            const converter = new showdown.Converter();
            const htmlContent = converter.makeHtml(markdownText);
            blogContainer.innerHTML = htmlContent;
        })
        .catch(error => {
            console.error("Markdown の読み込みに失敗しました:", error);
            blogContainer.innerHTML = "<p>ブログ記事を取得できませんでした。</p>";
        });
});
