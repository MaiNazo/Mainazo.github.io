window.addEventListener("load", function() {
    // ローディング画面をフェードアウト
    let loadingScreen = document.getElementById("loading-screen");
    let mainContent = document.getElementById("main-content");

    loadingScreen.style.opacity = "0";  // 透明にする
    setTimeout(function() {
        loadingScreen.style.display = "none";  // 非表示にする
        mainContent.style.display = "block";  // メインコンテンツを表示
    }, 500); // 0.5秒後に完全に消す
});

function toggleMenu() {
    document.getElementById("nav-menu").classList.toggle("show");
}
