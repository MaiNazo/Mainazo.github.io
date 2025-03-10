function toggleMenu() {
    document.getElementById("nav-menu").classList.toggle("show");
}

document.addEventListener("DOMContentLoaded", function () {
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header-container").innerHTML = data;

            // ヘッダーを読み込んだ後にタイトルを変更
            const pageTitle = document.body.getAttribute("data-title"); // data-titleの値を取得
            if (pageTitle) {
                document.getElementById("page-title").textContent = pageTitle;
            }
        });
});
