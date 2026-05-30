# ポートフォリオサイト

HTML / SCSS / JavaScript で制作した、複数ページ構成の静的ポートフォリオサイトです。

Figma のデザインテンプレートをもとに、Top / About / Services / Portfolio / Blog / Contact などのページをコーディングしました。  
レスポンシブ対応、SCSS のレイヤー分け、BEM を意識したクラス設計、JavaScript による基本的な UI 実装を行っています。

## 公開ページ

- https://sw428.github.io/portfolio/

## デザイン

- Figma template: [portfolio template](https://www.figma.com/community/file/1063415783897538948/portfolio-template)

## 制作時に意識した点

本制作では、まず壊れにくいHTML/CSS構造を作ることと、CSSの適用範囲・レイアウト・レンダリングの理解を優先しました。

タグ構造やネストの深さ、クラス名の粒度は、パーツの役割・余白設計・レスポンシブ対応・再利用性によって変わります。  
そのため、先に表示崩れを防ぐための構造理解とCSSの挙動確認を行い、完成後にBEMの命名や要素分けの意図を確認しました。

「まず壊れない形を作る」「次に設計意図を理解する」という順番を意識することで、納期に対応しながらも、現場ごとのCSS設計ルールや命名規約に合わせられるよう学習・検証を進めました。

## 実装機能

- 複数ページ構成（Top / About / Services / Portfolio / Blog / Contact）
- レスポンシブ対応（スマートフォン / PC）
- ハンバーガーメニュー
- `aria-*` 属性を使用したモバイルメニュー
  - メニューの開閉
  - ESC キーで閉じる
  - メニュー外クリックで閉じる
- アコーディオン UI
  - Top ページの Service セクション
  - Services ページ
- 動画再生 UI
  - 再生時にブラウザ標準の `controls` を表示
- `window.print()` を使用した印刷ボタン

## 使用技術

- HTML5
- SCSS（`@use` を使用した構成）
- JavaScript（Vanilla JS）
- Prettier

## CSS設計

- BEM を意識したクラス設計
- 名前空間プレフィックスを使用
  - `c-`：component
  - `l-`：layout
  - `u-`：utility
  - `t-`：typography
- SCSS を役割ごとに分割
  - `foundation`
  - `layout`
  - `components`
  - `utility`
  - `pages`

## ページ構成

| 階層 | ページ                                               | 親ページ      | URL                                                                  |
| ---- | ---------------------------------------------------- | ------------- | -------------------------------------------------------------------- |
| 0    | Top (`index.html`)                                   | -             | [Open](https://sw428.github.io/portfolio/index.html)                 |
| 1    | About (`about.html`)                                 | Top           | [Open](https://sw428.github.io/portfolio/about.html)                 |
| 1    | Services (`services.html`)                           | Top           | [Open](https://sw428.github.io/portfolio/services.html)              |
| 1    | Portfolio (`portfolio.html`)                         | Top           | [Open](https://sw428.github.io/portfolio/portfolio.html)             |
| 2    | Work Media Project (`work-media-project.html`)       | Portfolio     | [Open](https://sw428.github.io/portfolio/work-media-project.html)    |
| 1    | Blog Articles (`blog-articles.html`)                 | Top           | [Open](https://sw428.github.io/portfolio/blog-articles.html)         |
| 2    | Blog Agency Outsource (`blog-agency-outsource.html`) | Blog Articles | [Open](https://sw428.github.io/portfolio/blog-agency-outsource.html) |
| 1    | Contact (`contact.html`)                             | Top           | [Open](https://sw428.github.io/portfolio/contact.html)               |

## ディレクトリ構成

```text
portfolio/
  |- *.html
  |- css/
  |- scss/
  |  |- foundation/
  |  |- layout/
  |  |- components/
  |  |- pages/
  |  `- utility/
  |- js/
  |- img/
  `- video/
```

## セットアップ

このサイトでは SCSS のビルドに Sass を使用しています。

```bash
npm install
```

## SCSS のビルド

SCSS ファイルを編集する場合は、以下のコマンドで `scss/` から `css/` にコンパイルします。

```bash
npx sass scss:css --watch
```

## 確認方法

静的サイトのため、`index.html` をブラウザで直接開くか、VS Code の Live Server などを使用して確認できます。

## 補足

- 画像・動画素材は `img/` と `video/` に格納しています
- コンパイル後の CSS は `css/style.css` に出力しています
