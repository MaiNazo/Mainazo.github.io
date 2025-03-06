document.addEventListener("DOMContentLoaded", function () {
    // ブログフォルダ内のファイル一覧（手動で管理）
    const blogPosts = [
        { title: "マイ謎会爆誕！", url: "blogs/post1.html", date: "2025-04-01" },
    ];

    // 日付順にソート（最新のものを取得）
    blogPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 最新の記事を取得
    const latestPost = blogPosts[0];

    // 表示を更新
    document.getElementById("latest-post").innerHTML = `
        <h3><a href="${latestPost.url}">${latestPost.title}</a></h3>
        <p>投稿日: ${latestPost.date}</p>
    `;
});
