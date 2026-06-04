# BEMレビュー（指摘のみ）

## 前提
- このファイルは「命名の一貫性チェック結果」のみを記載します。
- コード修正は行っていません。

## 運用の軸（現行コード前提）
1. `c-`: 複数ページで再利用するコンポーネント
2. `l-`: レイアウト枠
3. `u-` / `t-`: ユーティリティ / タイポグラフィ
4. 無印BEM: ページ固有ブロック

## いつどう扱うか（判断基準）
1. 同じ責務を複数ページで使うなら `c-` 化する
2. そのページ内だけの配置・サイズ調整はページ側クラスで持つ
3. JS操作用クラスは見た目クラスと役割を分ける（可能なら `js-`）
4. 同一ブロック内で接頭辞を混在させない

## わかりにくい点・ずれている点
1. `c-`ブロックと無印modifierの同居
   - `blog-articles.html:73` の `c-blog-card blog-card--large`
   - ページ固有という意図は `scss/pages/_blog-articles.scss:60-63` にあるが、命名だけ見ると判断が分かれやすい

2. 同一フォーム内で接頭辞が不一致
   - `index.html:619` と `contact.html:93` の `contact-form__submit`
   - 親は `c-contact-form` 系のため、系統が分かれて見える

3. `service-card`内で別ブロック名が混在
   - `services.html:91` 以降で `service-card__*` と `service__icon` と `features__icon` が共存
   - 例: `services.html:94`, `services.html:124`

4. TopページとServicesページでサービス命名が二系統
   - Top: `index.html:91` の `service__*`
   - Services: `services.html:91` の `service-card__*`
   - 役割差が明文化されていないため、再利用境界が読み取りづらい

5. 同名ブロックをページごとに上書きしている構造
   - `contact-info` がページ間で構造差大
   - `scss/pages/_contact.scss:54` に `_home.scss` 側の影響を戻すコメントあり
   - 参照: `scss/pages/_home.scss:463`

6. 空のclass属性
   - `services.html:275` の `<div class="">`
   - 命名規則の観点でノイズ

7. JSセレクタ命名も二系統
   - `js/main.js:56` は `.service__toggle`
   - `js/main.js:71` は `.service-card__toggle`
   - HTML構造の差はあるが、命名規約としては分裂して見える

## 対処法（実装時ガイド）
1. `c-`ブロックと無印modifierの同居への対処
   - ページ限定の見た目差分は「ブロックmodifier」ではなく「ページ側ラッパー」で当てる
   - 例: `.blog-articles-page .c-blog-card { ... }` のように、意味はコンポーネント側に寄せる

2. `c-contact-form` と `contact-form__submit` の不一致への対処
   - 親ブロックに合わせて要素名もそろえる
   - フォーム内部は `c-contact-form__*` で統一し、別ブロック名を混在させない

3. `service-card` 内の `service__icon` / `features__icon` 混在への対処
   - どちらか1ブロックに寄せる
   - `service-card` を主語にするなら、内部要素は `service-card__*` に統一する
   - もし `features` を独立コンポーネントとして使うなら、`c-features` として責務を分離する

4. TopとServicesでサービス命名が二系統な点への対処
   - 役割を先に定義する
   - Top専用なら `service__*` のまま、再利用部品なら `c-service-card` へ寄せる
   - 「同じ構造を2ページ以上で使う」段階で `c-` 昇格する

5. `contact-info` のページ間上書きが多い点への対処
   - 共通部分を `components` に寄せ、ページ差分だけ `pages` に残す
   - 打ち消し記述（他ページの指定を戻す記述）は減らし、差分のみ上書きする

6. 空のclass属性への対処
   - 不要なら削除する
   - 役割があるなら意味のあるクラス名を付ける

7. JSセレクタ命名の二系統への対処
   - 見た目クラスとJSフックを分離する
   - 例: `.js-service-toggle` のようなJS専用クラスを付け、スタイル用クラスに依存しない

## 進め方（安全順）
1. まず規約を1枚に固定する（このファイルを基準化）
2. 新規実装から規約を適用する（既存は一気に直さない）
3. 影響範囲が狭い箇所から段階的に統一する（contact -> services -> blog の順など）
4. 命名変更時はHTML/SCSS/JSを同時確認して、参照切れを防ぐ
