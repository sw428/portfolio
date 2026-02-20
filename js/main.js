/* ハンバーガーメニュー
--------------------------------*/
//  DOM取得
const header = document.querySelector(".header"); // ヘッダー全体
const toggle = document.querySelector(".header__toggle"); // ハンバーガーボタン
const nav = document.querySelector("#global-nav"); // オーバーレイナビ
const panel = document.querySelector(".header__nav-panel"); // メニューパネル本体

//  メニューを開く
function openMenu() {
  header.classList.add("is-open"); // 開いた状態クラス追加
  toggle.setAttribute("aria-expanded", "true"); // 開いている状態
  toggle.setAttribute("aria-label", "メニューを閉じる");
  nav.setAttribute("aria-hidden", "false"); // ナビ表示
  document.body.style.overflow = "hidden"; // 背景スクロール停止
}

//  メニューを閉じる
function closeMenu() {
  header.classList.remove("is-open"); // 状態解除
  toggle.setAttribute("aria-expanded", "false"); // 閉じている状態
  toggle.setAttribute("aria-label", "メニューを開く");
  nav.setAttribute("aria-hidden", "true"); // ナビ非表示
  document.body.style.overflow = ""; // スクロール復帰
}

//  ボタンクリックで開閉
toggle.addEventListener("click", () => {
  header.classList.contains("is-open") ? closeMenu() : openMenu();
});

//  背景クリックで閉じる
nav.addEventListener("click", (e) => {
  if (!panel.contains(e.target)) closeMenu();
});

//  メニュー内リンククリックで閉じる
nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") closeMenu();
});

//  ESCキーで閉じる
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && header.classList.contains("is-open")) {
    closeMenu();
  }
});

//  SP→PC切替時の事故防止
window.addEventListener("resize", () => {
  if (window.matchMedia("(min-width: 769px)").matches) {
    closeMenu();
  }
});

/* トグルボタン
--------------------------------*/
// クラスで開閉状態切り替えアクセシビリティに反映
document.querySelectorAll(".service__toggle").forEach((btn) => {
  btn.addEventListener("click", () => {
    const isOpen = btn.classList.toggle("is-open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });
});
