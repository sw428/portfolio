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

//  背景クリックで閉じる  メニュー内リンククリックで閉じる
nav.addEventListener("click", (e) => {
  if (!panel.contains(e.target) || e.target.closest("a")) {
    closeMenu();
  }
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
  const detail = btn.nextElementSibling;

  btn.addEventListener("click", () => {
    const isOpen = btn.classList.toggle("is-open");

    btn.setAttribute("aria-expanded", String(isOpen));
    detail.hidden = !isOpen;
  });
});

/* Services page
===================================*/
/* トグルボタン
--------------------------------*/
const toggles = document.querySelectorAll(".service-card__toggle");

toggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const targetId = toggle.getAttribute("aria-controls");
    const body = document.getElementById(targetId);

    const isOpen = toggle.getAttribute("aria-expanded") === "true";

    toggle.setAttribute("aria-expanded", String(!isOpen));
    body.hidden = isOpen;
  });
});

/* work-media-project
===================================*/
// c-video の再生ボタンを押したら、controls を付けて動画を再生する
const videoBlocks = document.querySelectorAll(".c-video");

videoBlocks.forEach((videoBlock) => {
  const video = videoBlock.querySelector(".c-video__player");
  const playButton = videoBlock.querySelector(".c-video__play");
  const time = videoBlock.querySelector(".c-video__time");

  if (!video || !playButton) return;

  playButton.addEventListener("click", () => {
    // video に controls 属性を追加する
    video.controls = true;

    // 動画を再生する
    video.play();

    // 自作の再生ボタンと時間表示を消す
    playButton.hidden = true;

    if (time) {
      time.hidden = true;
    }
  });
});

// 印刷ボタンを取得
const printButton = document.querySelector(".js-print");

// 印刷ボタンが存在する場合だけ、クリック処理を付ける
if (printButton) {
  printButton.addEventListener("click", () => {
    window.print();
  });
}
