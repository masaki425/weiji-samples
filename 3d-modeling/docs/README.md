現在の画像使用は玄関ポスター、管理棟S08《蛇の回転錯視》、S12《エデンの海、錯視から解放された魚》の3件です。S08は提供された紫・黄の版を暫定表示し、S12は彩色の試作プリント写真を補正して暫定位置へ掲示しています。S12：写真提供：渡辺英治／錯視画像：北岡明佳。詳細は末尾の各更新をご覧ください。

# 大倉公園の二棟 — 内外をつないだ入館・回遊モデル

2025年の展覧会記録写真と大府市・文化財の公開情報から作った、寸法推定を含む建築・展示モデルです。追加版は作品リスト40項目の配置を調べ、現在は38項目を室内へ配置しています（S12は暫定掲示）。庭を加えた版では、中庭のA24《変身もんどり庵》も屋外に配置しました。計画と40項目の配置表は [PLAN.md](PLAN.md#10-追加依頼作品を含む展示内装)、写真との比較と限界は [REVIEW.md](REVIEW.md) です。



<!-- DETAIL INTRO -->
今回の追加では建具・木部・庭を詳細化し、梯子から樽内を覗く操作を加えました。[細部の一覧](out/details_overview.jpg) を確認できます。休憩棟の視点 **4 梯子から樽の中** で上り、ボタンで下りられます。
<!-- END DETAIL INTRO -->

## 玄関から室内を巡る

ブラウザでは、ZIPをすべて展開し、[viewer/index.html](viewer/index.html) をダブルクリックしてください。`viewer` フォルダ内の `assets`・`vendor`・各スクリプトは一緒に置きます。サーバー起動は不要な構成で、選択した棟だけデータを読み込みます。「棟」と「視点」を選び、ドラッグで見回し、WASD・矢印キーまたは画面の矢印で移動できます。

一つのファイルだけで渡す場合は [viewer/展示室を歩く.html](viewer/展示室を歩く.html) を使えます。約100MBで、両棟のデータを含む単体版です。旧 `index.html` のローカル読込で使っていたfetchを廃止し、どちらの入口も同じ読込処理を使います。更新時は古い版にファイルを混ぜず、ZIPを新しいフォルダへすべて展開してください。

**修正後の読込・切替・操作コードはNodeで検査済みです。ブラウザの実描画はCodexでは未検証で、Chromeの再確認手順を後述しています。Safari・Firefoxも未検証です。** Claudeの引き継ぎにある「単体版のfile://とindexのHTTPがChromeで描画できた」という結果は、修正前の外部確認です。

読込が失敗すると「もう一度読み込む」と「単体版を開く」を表示します。ファイル不足やローカル読込の制限、データ破損、WebGLの利用不可を分けて案内します。単体版でも問題が続く場合は、下記のHTTP配信、またはBlender版を使えます。

`out/rest.blend` と `out/management.blend` に、屋根・外壁・天井を表示した連続カメラ巡回を保存しています。ファイルを開くと玄関前の視点です。カメラ表示でタイムラインを再生すると、入口の段差から廊下を通り、各室の鑑賞位置を巡ります。途中で停止できます。タイムライン上の日本語マーカーが部屋の位置です。休憩棟は17視点、管理棟は15視点です。追加した庭と窓の鑑賞点を含み、巡回は室内から屋外へ続きます。時間と停止フレームは `out/walkthrough_viewpoints.json` と検証結果に記録しています。

自由に動く場合は、`Cameras_Lights` の `rest_free_walk` / `management_free_walk` をアクティブカメラにして、3Dビューの「ビュー → ナビゲーション → ウォークナビゲーション」（F3で `Walk Navigation` を検索）を使います。WASDとマウスで移動・見回し、左クリックで確定、Escで開始位置へ戻れます。日本語キーボードでショートカットが合わない場合もメニューから開始できます。標準の自由移動は壁をすり抜けることがあります。保存した巡回カメラの経路は、別途モデルの形状と照合しています。

まず `out/rest_walkthrough_overview.jpg` と `out/management_walkthrough_overview.jpg` で全32視点を確認できます。視点の位置・停止フレームは `out/walkthrough_viewpoints.json`、写真比較は `out/*_walk_*_comparison.jpg` です。

## モデル・画像の構成

`out/weiji_buildings.zip` は、二棟のモデル、画像、計画・検証結果、再生成スクリプト、必要な参照画像をまとめたものです。

`out/exhibition_overview.jpg` と `out/room_views.jpg` は主要な内装をまとめた以前の一覧です。S12追加後の確認には `out/eden_science_overview.jpg` と最新の `out/management_walkthrough_overview.jpg` を使ってください。写真との比較は `out/*_comparison.jpg`。元の建築初版は `archive/weiji_buildings_architecture_v1.zip` に保管しています（新しいZIPには含めません）。

`out/rest_layout.jpg` と `out/management_layout.jpg` は、作品番号をモデルのXY座標へ載せた作業用配置図です。実測図や正確な方位を示す図ではありません。

- `out/management.blend`: 管理棟。10畳・6畳の和室、広間、洋室、事務室の暫定構成。
- `out/rest.blend`: 休憩棟。10畳3室・6畳1室、L字の広縁、鋼板の入母屋屋根。
- `out/*_exterior.png`: 外観。
- `out/*_interior.png`: 内観。管理棟は和室、休憩棟は別の10畳間も出力。
- `out/*_cutaway.png`: 屋根と天井を一時的に隠した俯瞰。実際の建物に屋根がないという意味ではありません。

Blender 5.2.1 LTSで作成。数値の単位はメートルです。最初のカメラは入口から巡る `*_walkthrough` です。別の内観はOutlinerの `Cameras_Lights` 内のカメラを選び、アクティブカメラに切り替えて確認できます。

屋根は `Roof`、天井は `Ceilings` に分けてあります。内部を編集するときはこの2コレクションを一時的に非表示にしてください。窓・襖・障子は `Openings`、畳は `Floors`。作品と展示什器を隠す場合は `Artworks` と `Exhibit_Furniture` を非表示にできます。地下室の位置など未確認の補助形状は `Unverified` 内にあり、通常表示・レンダーから除外しています。

形状のCustom Propertiesに `evidence`（根拠）、`confidence`（観測の確度）、`estimated`（寸法推定）を保存しています。各畳部屋の `ROOM ...` オブジェクトとSceneにも部屋情報が入っています。写真で確認できた形状でも、寸法を測ったという意味ではありません。

作品は `Artworks`、展示台・椅子・キャプション等は `Exhibit_Furniture` にあります。`A01`〜`A24` は英司のリスト、`S01`〜`S16` は英治のリストで、発行版の番号に統一しました。各番号のEmptyを親として、その作品のパーツと専用什器をまとめて移動できます。親の `room`、`placement`、`placement_confidence`、`evidence`、`status` を確認してください。

A24は `Artworks` 内の屋外作品です。窓から見える中庭に、写真から推定した位置・向きで置いています。`Unverified` 内のS16（園路の蝶）は非表示の台帳オブジェクトだけです。S12は制作者の展示指示により、S09付近の合板壁へ暫定掲示しました。A23は室内の陶器4点を実装し、庭の別構成は省略しています。A01・A09・A18・S15は正確な位置が未確認のため、表に記録した暫定位置へ配置しています。

## 再生成

この環境ではBlenderを直接起動せず、ユーザーが用意した常駐ジョブランナーを使います。プロジェクト直下で:

```sh
python3 3d-modeling/tools/submit_job.py build --target both
```

建物と既存の確認画像を再生成した後、連続カメラ・入館画像・GLB・歩行データも生成します。短い試験には `--preview` を加えます。`--target rest` / `--target management` で建物の再構築を棟ごとに限定できます（続く巡回・書き出し処理は保存済みの二棟を更新します）。生成先は常に `3d-modeling/out/` で、既存の生成物を置換します。元の写真・サイトは変更しません。

既存モデルから1440×1000・48サンプルで撮影だけを行う場合:

```sh
python3 3d-modeling/tools/submit_job.py render --target both
```

ファイルを再読込して検証する場合:

```sh
python3 3d-modeling/tools/submit_job.py verify
```

コマンドは `.py` を書き終えた後に `.go` を作り、ジョブ名とログの保存先を表示します。処理終了は `queue/done/ジョブ名.log` の `exit=0`、完了マーカー、Python例外がないことを併せて確認してください。ランナーが停止していればキューは実行されません。3分以上開始応答がない場合は、ランナーの状態を確認する必要があります。

モデルの再生成にはBlender付属Python、同梱の `reference/details/*_artworks_before.json`・`placements.json` と `reference/entrance-poster.jpg`・`reference/entrance-poster.json` を使います。材質はノードで作成し、ポスター・S08・S12以外の作品写真・錯視画像・ドレス写真は使用していません。初版の襖の写真材質も、追加版では淡い色調の手続き材質へ置換しました。展覧会ポスター・S08・S12はユーザーの指定画像をパックし、GLBにも内蔵しています。S08には `reference/snakes/rotating-snakes.png` と `reference/snakes/texture.json`、文字の生成にはmacOSのヒラギノ角ゴシックW3を使います。別OSでは対応する日本語フォントのパスを指定してください。保存モデルの閲覧は画像の外部リンクに依存しません。星丸は指定の確認視点で、手前が丸・鏡像が六角星になるよう上縁を計算しています。他の錯視図版・原図・作品本文は概形による代理表現です。

配置台帳を編集する場合は `tools/placement_catalog.py` を変更して `python3 3d-modeling/tools/placement_catalog.py` を実行すると、`placements.json` とPLANの作品表が同じ内容に更新されます。比較画像を作るときだけ、原本の記録写真とPillowが必要です:

```sh
/opt/homebrew/bin/python3.10 3d-modeling/tools/compare_renders.py
/opt/homebrew/bin/python3.10 3d-modeling/tools/compare_exhibitions.py
```

ZIP作成は最新blendの再読込検査合格後に実行してください。比較用の縮小写真はZIPにも同梱します。原本 `files/` がない場所では比較画像の原本からの再作成だけはできませんが、Blenderモデルの再生成と既存比較画像の閲覧はできます。

保存済みモデルから入館カメラ・GLBを作り直す場合:

```sh
python3 3d-modeling/tools/submit_job.py walkthrough
```

Blenderジョブが完了した後、単体HTMLと比較画像を作ります:

```sh
python3 3d-modeling/tools/package_viewer.py
/opt/homebrew/bin/python3.10 3d-modeling/tools/compare_walkthrough.py
/opt/homebrew/bin/node 3d-modeling/tools/verify_viewer_data.cjs
/opt/homebrew/bin/node 3d-modeling/tools/verify_viewer_loading.cjs
python3 3d-modeling/tools/package_results.py
```

`tools/integrate_navigation.py` が入口・建具・床・天井と視点候補を生成し、`export_walkthrough.py` が実際のメッシュから歩行範囲とGLBを作ります。`assemble_walkthrough.py` が範囲内の連続する巡回カメラを保存し、各視点を撮影します。`verify_navigation.py` は保存後の全アニメーションフレーム、GLBと元blendのハッシュ、頭上の形状を確認します。`submit_job.py verify` は独立したGLB読み戻しとその確認画像も更新します。再生成後はBlenderの検証ジョブが完了してから、比較・棟別JS・単体HTML・Node読込検査2本を更新し、最後にZIPを作成してください。配布処理は各検査と最新データのハッシュが一致した場合だけ実行されます。

## 修正する場所

`tools/build_models.py` の `build_rest()` / `build_management()` に部屋の座標、外壁、開口、屋根を記述しています。畳は `room()`、建具は `aperture()`、屋根は `irimoya()` / `cross_roof()` / `gable()`、材質は `setup_materials()` です。確認済みの新資料が得られた場合は、PLANの推定表と該当座標を一緒に更新してください。

作品の形状と什器、追加カメラは `tools/exhibition_models.py` の `rest_item()` / `science_item()` / `populate()`、配置座標は `placements.json` です。魚560個・サイコロ5,920個・樽内の飛行機110個は見た目の密度を近づけるための推定個数で、実物を数えた結果ではありません。多数の部品は材質別にメッシュをまとめています。

`tools/board_room_details.py` は、人工芝の間と《問いの部屋》の板床の切り替わり、濃色の木製パネルを反映します。床仕上げの違いは写真で確認できますが、境界の絶対座標と開口幅は推定です。

写真の原本は `files/`、照合用縮小画像は `reference/`。既存の写真クレジットは `site/img/CREDITS.md` を参照してください。参照写真をモデルの外壁全体に貼り付けたフォトグラメトリではありません。


## 制作者の訂正を反映した確認視点

`out/rest_eden_stands_detail.png` で魚一枚ごとの針金脚、`out/management_circle_star_detail.png` で手前の丸と鏡像の六角星を確認できます。全景の内観と写真比較も更新済みです。二点を並べた確認画像は `out/corrections_overview.jpg` です。

`tools/exhibit_corrections.py` がA06の立った紙面・輪状の針金支持とS02の鏡・筒を生成し、`tools/ambiguous_rim.py` が丸／六角星へ投影される上縁を計算します。`build_models.py` から自動的に呼ばれるため、再生成時に別の手作業は必要ありません。`verify_corrections.py` は保存された頂点と鏡面を検査します。


## 入館モデルの推定範囲

管理棟の土間・上がり框、休憩棟の踏み段、玄関の正確な座標と戸形式は実測未確認です。二棟の位置関係は未確定なので、一つの公園模型には接続していません。写真で閉じている襖を保ち、広縁経由で展示室を巡ります。樽・魚・サイコロなどが床を占める部分は、周縁や開口から鑑賞する構成です。

元の訂正版は `archive/weiji_buildings_corrected_v3.zip` に保管しています。今回も書込みは `3d-modeling/` 内のみで、原本写真や公開サイトを変更していません。


## ブラウザ読込の構成と修正後の確認手順

`viewer/index.html` → `model-loader.js` → 選択した棟の `assets/rest.js` / `assets/management.js` の順で読み込みます。データJSには、元GLBをそのままbase64にしたものとnavigationが入っています。先に別の棟を読み込んでいても不足する棟だけを追加し、二度目の切替では登録済みデータを使います。`viewer.js` が復号後の形状と歩行データを受け取り、既存の描画・移動処理を行います。

`python3 3d-modeling/tools/package_viewer.py` が棟別JSと単体版HTMLを同時に再生成します。`export_walkthrough.py` は庭の形状と拡張した歩行範囲を含めて出力します。three.js r102はローカルに存在したMIT版を同梱し、ライセンスは `viewer/vendor/THREE-LICENSE.txt` と単体HTML内にあります。公開サイトへの組込みは行っていません。

Codexで実行した `verify_viewer_loading.cjs` は、実際のloaderとviewerコードをNode VMで実行します。script要素の読込、復号、棟切替、30視点、マウス・キー・画面ボタンのイベント、エラーと再試行を模擬DOMと模擬描画器で確認します。`out/viewer_loading_verification.json` の結果は、ブラウザのfile://制限やWebGL描画の確認を含みません。

以下は修正後にClaude側または通常のChromeで行う手順です。Codexではブラウザ起動が制限されているため、結果を待たずに検証対象と期待結果を引き継ぎます。

1. 更新版ZIPを新しいフォルダへ展開し、Chromeで `viewer/index.html` を直接開く（file://）。画面寸法を1440×900にそろえる。
2. 読込表示が消え、休憩棟の玄関と選択欄が表示されることを確認する。開発者ツールを使う場合、`window.weijiReady === true`、`window.weiji.state.building === 'rest'` が目安。GLB/JSONのfetch要求は発生せず、最初のデータ要求は `assets/rest.js` だけになる。
3. 休憩棟17視点、管理棟13視点を順に選ぶ。管理棟へ切り替えた時に `assets/management.js` が追加で読まれ、戻った時は棟データの読込を繰り返さない。各視点で展示と屋根・壁・天井が表示されること、星丸の指定位置で手前の丸と鏡の六角星が見えることを確認する。
4. 玄関でキャンバスをクリックし、W／矢印キーを短く押して移動、ドラッグして見回す。「玄関に戻る」で開始位置へ戻り、画面の矢印と回転ボタンも試す。壁・展示物を突き抜けないことを確認する。
5. Chromeのヘッドレス検証でも同じ操作と画面寸法を使う。起動後は一定秒数だけ待つ方法ではなく、`window.weijiReady` を最大90秒待つ。棟切替直後は一度falseになり、次のtrueで `window.weiji.state.building` も照合する。視点切替は `state.view`、移動は `state.position`、見回しは `state.direction` の変化を確認し、スクリーンショットも保存する。状態値だけで描画合格にしない。
6. HTTPでも同じ確認を行う。通常の作業環境でプロジェクト直下から次を実行し、`http://127.0.0.1:8768/index.html` を開く。サーバーはviewerフォルダを配信するため、URLに `3d-modeling/viewer/` は付けない。

```sh
python3 3d-modeling/tools/serve_viewer.py --port 8768
```

7. file://とHTTPのそれぞれで画面寸法を390×844にし、棟・視点の選択と画面の移動ボタンを確認する。比較用画像は `3d-modeling/out/browser-check/` に、方式・棟・画面寸法が分かる名前で保存する。
8. 展開した検証用コピーで `assets/rest.js` を一時的に別名にし、再読み込みすると対象ファイルと対処が表示されることを確認する。名前を戻して「もう一度読み込む」で復帰できること、単体版のリンクも開けることを確認する。原本データを削除しない。
9. 単体版 `展示室を歩く.html` のfile://でも両棟と操作を確認する。成功・失敗、ブラウザの版、エラー本文、画像を記録する。Safari・Firefoxの互換性は、各ブラウザで確認するまで未検証のままとする。

前回の読込不具合の修正ではモデルは不変でした。今回の庭の追加ではblend・GLB・navigation・A24の台帳を更新しています。計画はPLAN §12、読込方式の経緯は§11.8を参照してください。


## 庭と窓越しの内外を見る

休憩棟は「庭の園路から休憩棟」「中庭・変身もんどり庵」「庭から奥座敷の中へ」「庭からエデンの海へ」「広縁から中庭の小屋へ」「窓辺から庭木と竹垣へ」を追加しました。管理棟は「前庭から管理棟へ」「庭から研究ノートの広間へ」「窓の錯視箱と前庭」「西の窓から和室の中へ」を追加しています。窓と屋根を表示したまま、内外の同じ立体を見ます。

外構の根拠・推定範囲はPLAN §12。二棟の正確な距離・高低差が未確認なので、公園全体は接続していません。前庭の木や石の座標、庭側入口の絶対位置、A24と窓の距離は推定です。管理棟の窓外の軒は見える一部だけを表し、S04の実物の投影関係までは再現していません。A23の庭部分、S16の個々の蝶は位置を確定できず、省略しています。

`Site` は歩行する地面・園路・段、`SiteObstacles` は幹・垣・石など、`SiteFoliage` は葉です。新しい外構には `site_environment` と写真の `evidence` を付けています。植栽の枝葉は軽量な形状です。ガラスはBlenderで透過・反射、ビューアで半透明を使います。ブラウザ版では木目・影・反射の品質がCycles画像と異なります。

季節（11月の紅葉／公式写真の新緑）は制作者の確認待ちです。現在は11月を暫定採用しています。再生成コマンドの `--season november` または `--season green` で、落葉樹の葉色を切り替えられます（例：`python3 3d-modeling/tools/submit_job.py build --target both --season green`）。内部では `site_environment.py` の `SEASON` パラメータへ渡します。樹木の位置、常緑樹の色、作品は変わりません。季節変更後も下記と同じ書出し・検証・配布を行ってください。

既存の建物へ外構だけを再適用する場合は、`tools/site_environment.py` → `entrance_posters.py` の `apply(name)` → `apply_details.py` の `apply(name)` → `snakes_panel.py` の `apply(name)` → `watanabe_window.py` の `apply(name)` → `assemble_walkthrough.py` → `render_models.py` → `verify_models.py` → `verify_glb_import.py` を順に呼ぶキュースクリプトを作ります。Blenderを直接起動しません。通常の `submit_job.py build` には外構の生成を組み込み済みです。元の室内作品はA04の承認済み詳細化、S08の画像表示、S13の紙・シールへの訂正を除き、位置とメッシュのハッシュを `out/*_site_indoor_baseline.json` と照合します。制作者が後日作品を変更するときは、今回の不変検査を無断で上書きせず、新しい変更範囲と照合基準を計画に記録してください。

庭を含む比較画像の作成には `tools/compare_walkthrough.py`、`tools/compare_site.py`、`tools/placement_diagrams.py` を使います。`out/site_overview.jpg` に窓越しの代表画像、`out/site_verification.json` に両方向の視線・外構・作品保持の検査をまとめます。

Claude側のブラウザ確認では、上記file://・HTTP、1440×900・390×844に加え、次を確認してください。

- 休憩棟の「広縁から中庭の小屋へ」で、透明な窓の向こうに小屋、竹垣、庭木が見える。
- 「庭からエデンの海へ」では、窓越しに針金で立つ魚、畳、襖、天井が見える。「庭から奥座敷の中へ」では座卓と床の間が見える。
- 管理棟の「窓の錯視箱と前庭」で、窓外に植込み・柵・樹林・軒の一部が見える。「庭から研究ノートの広間へ」ではノート机と室内が見える。
- 庭から入口へ移動して段を上り、室内へ入れる。幹・竹垣・小屋・作品の中を通り抜けない。庭側入口と既存入口を確認する。
- 両棟の切替後も庭が欠落しない。管理棟の星丸の確認視点、休憩棟の魚の支持も保持される。

期待結果と実描画の結果は区別します。CodexのNode検査は更新した全30視点を対象としますが、Chromeの実描画・file制限・タッチ操作の結果はClaude側の確認待ちです。Safari・Firefoxも未検証です。


## 玄関のポスターを見る

休憩棟は「視点」の **17 玄関ポスター（庭側）**、管理棟は **13 玄関ポスター** を選んでください。管理棟は最初の「玄関前」からも右脇に見えます。休憩棟は写真で確認した庭側の入口へ貼り、従来の東側入口の推定モデルは保持しています。

- [ポスターの確認一覧](out/poster_overview.jpg)：棟ごとの玄関と近接画像。
- `out/rest_poster_comparison.jpg`：記録写真6412と休憩棟の玄関を比較。
- `out/management_poster_comparison.jpg`：公式外観と管理棟の暫定掲示場所を区別して掲載。
- `out/*_poster_detail.png`：Blenderの近接画像。`out/*_poster_glb_import.png` は標準glTFインポーターで読み戻した同じ視点です。

画像は展覧会の `files/poster.jpg`（制作：渡辺英司 / courtesy office SONO）の縮小コピー724×1024pxです。両棟に各1枚、幅0.515m・高さ約0.728mを暫定採用しました。休憩棟は庭側玄関の右の戸、管理棟は玄関右脇の壁です。掲示高・実寸・管理棟の掲示位置は制作者の確認待ちです。写真で確認できたことと推定の区別はPLAN §13に記録しています。

通常の `submit_job.py build` はポスターも再生成します。ポスターだけを再配置する場合はキュー内で `entrance_posters.py` の `apply(name)` を保存済みの棟へ適用して保存し、`assemble_walkthrough.py` → `render_posters.py` → `verify_models.py` → `verify_glb_import.py` と進めます。画像そのものを変更するときだけ `prepare_poster.py`（Pillow）が必要です。納品済み縮小画像からの再生成にPillowと原本写真は不要です。変更後は `finalize_site.py` でソース再生成と検査を更新し、`package_viewer.py`、Node検査2本、比較画像、ZIPの順に更新します。

前面の画像をGLB内のJPEGとして格納し、ブラウザではdata URLから復号します。追加の画像ファイル取得はありません。復号完了後に表示し、失敗・時間切れなら「展示画像（ポスター・蛇の回転）を表示できません」と再試行を案内します。棟切替時には画像用のGPU資源も破棄します。`window.weiji.state.posterTextures === 1` は画像を準備した状態の目安で、実描画の合格を意味しません。

Claude側の追加確認：file://とHTTPの `viewer/index.html`、単体版のfile://を開き、1440×900と390×844で上記2視点を選びます。青い面が上、橙の面が下になり、中央の「Morning Monsters / W Eiji」が正立して読めること、ポスターが壁や戸に埋まらず前面だけに出ることを確認してください。下半分の上下逆の題名は元のデザインです。両棟を往復し、見回し・移動も確認します。`out/browser-check/` へ画面を保存し、ブラウザ名・版・方式・結果を記録してください。JPEGのブラウザ復号・GPU描画はCodexでは未検証で、Safari・Firefoxも未検証です。

<!-- DETAIL README -->
## 建物・庭の細部と、樽の中を覗く

休憩棟の「視点」で **4 梯子から樽の中** を選ぶと、約3.2秒で梯子を上り、青い内壁と針金で下から支えた飛行機を見下ろします。上ではドラッグで見回し、**梯子を下りる** で床へ戻ります。樽の梯子に近づくと **梯子を上る** も表示されます。上にいる間はWASDで横へ移動しません。別の視点や「玄関に戻る」でも通常歩行へ戻れます。

Blenderの連続巡回にも同じ上昇・下降を加えました。静止カメラは `rest_walk_barrel_peek`、`rest_detail_barrel_peek`、`rest_barrel_inside`。梯子の踏板と金物は `rest_detail_barrel_ladder` で確認できます。写真の飛行機は、厚みのある胴体・翼・尾翼を持つ110機の概形にしています。個数は写真の密度からの推定です。

[細部の確認一覧](out/details_overview.jpg)、[樽を覗く画像](out/rest_detail_barrel_peek.png)、[写真・変更前・変更後の索引](out/detail_comparison_inventory.json) を確認してください。全76静止画（既存63＋新規13）と、標準GLB読戻し6枚を更新しました。細部カメラの名称は `out/*_detail_*.png`、全カメラの一覧は `out/verification.json` にあります。

Blenderの `Details_Architecture` と `Details_Garden` に追加部材をまとめています。A04・A24の細部は元の作品を親に持ちます。各メッシュの `fine_detail`・`detail_area`・`evidence` で対象と根拠を確認できます。`viewer_omit` が付く3メッシュずつは細かな砂利と樹皮で、GLBでは省略します。主要な砂利・竹垣・根・建具と、作品・梯子は両版に残ります。GLBは約52.1MB／20.8MB。通常は必要な棟だけを読むindex.htmlを使ってください。

通常のビルドは `apply_details.py` を自動適用します。個別の修正先は `architectural_details.py`、`garden_details.py`、`barrel_details.py`。近接視点は `detail_views.py`、保持範囲の基準は `detail_scope.py`、梯子経路の検査と書出しは `export_walkthrough.py`、巡回は `assemble_walkthrough.py` です。

保存モデルの検査は `verify_models.py` が細部の検査も行い、`verify_details.py` の単独キュー実行で `out/detail_verification.json` も更新します。写真比較は `/opt/homebrew/bin/python3.10 3d-modeling/tools/compare_details.py`。全画像を撮影して独立GLB読戻し、ビューア梱包、Nodeの2検査、比較画像の更新を済ませ、`write_detail_results.py` で検査結果を文書へ反映します。その後 `finalize_site.py` をキューで実行すると、ソースから再生成した全メッシュとレビュー済みモデルの一致・新緑パラメータを検査し、計画書をblend内へ同期して最終保存・再検査します。最後に `package_viewer.py` とNodeの2検査を再実行して保存ファイルのハッシュを揃え、`package_results.py` と `verify_package.py` でZIPを作成・照合します。

Claude側の実ブラウザ確認では、上記file://・HTTPのそれぞれで1440×900と390×844を使い、休憩棟の「梯子から樽の中」を選びます。縁越しに青い内壁・飛行機が見えること、上で見回せること、横移動で樽へ落ち込まないこと、下降と再上昇、途中の棟切替と「玄関に戻る」を確認してください。`window.weiji.state.station.mode` は上昇中 `up`、上で `top`、下降中 `down`、通常歩行時は `station === null` です。状態値だけで描画合格にはしません。

建物の「奥座敷」「洋室」、庭の「窓辺から庭木と竹垣へ」「中庭・変身もんどり庵」「前庭から管理棟へ」も確認し、初回の `weijiReady` までの秒数を記録してください。1分は実機確認の目安です。Nodeの模擬検査は18項目が合格しましたが、Chromeの画面と所要時間、Safari・Firefoxの互換性は未確認です。
<!-- END DETAIL README -->

<!-- SUPPORT README -->
## 樽の針金を確認する

今回の訂正では、支え110本を底板から各飛行機の腹側までにし、機体を貫いて上へ伸びる線を取り除きました。[修正前後の比較](out/rest_detail_barrel_peek_support_comparison.jpg) を確認できます。機体の位置・形・色は保持しています。

ビューアの休憩棟 **4 梯子から樽の中**、Blenderの `rest_walk_barrel_peek`・`rest_detail_barrel_peek`・`rest_barrel_inside` で見られます。写真の読み取りに従い下から支える形へ訂正しましたが、取り付け点・線径・曲がりは推定です。

`tools/barrel_supports.py` は針金だけを再生成します。`verify_barrel_supports.py` は保存頂点から110本を検査し、`out/barrel_support_verification.json` へ記録します。通常のビルドにも組込み済みです。キューの97番は6視点とGLB、98番は計画書の同期とソース再生成の確認です。比較は `compare_barrel_supports.py`、修正記録の追記は `write_support_results.py` を使います。管理棟を変更しない最終同期は `finalize_site.py` に `NOTES_TARGET='rest'` を渡します。

Claude側ではfile://とHTTPの両方で視点4を選び、機体から上へ出る針金が消え、下側の支えが機体の高さで終わることを確認してください。これまでの梯子の上昇・見回し・下降も確認対象です。Nodeの検査に実ブラウザ描画の確認は含まれません。
<!-- END SUPPORT README -->


## S08の画像表示（PLAN §15）

管理棟の視点 **6 洋室・錯視展示**（id: `gallery`）から、合板壁の大判パネルを見られます。ドラッグで壁の正面を向き、近づいて図柄を確認してください。Blenderの近接カメラは `management_snakes_detail`。室内の確認画像は `management_interior`・`management_walk_gallery`・`management_detail_gallery` です。

[写真・モデル・GLBの比較](out/snakes_overview.jpg) と [変更前後の比較](out/management_detail_gallery_snakes_comparison.jpg) を確認してください。錯視画像：北岡明佳《蛇の回転》。指定の `rotsnak4L.png` を2048pxへ縮小した紫・黄の版を暫定表示しています。写真の青・黄の横長版と一致する原図は未確認で、配色・環の数・余白が異なります。左右の端末は別配色・映像のため変更していません。

`snakes_panel.py` がパネル前面と作者名の文字メッシュを生成し、通常ビルドからも呼ばれます。`approved_images.py` はポスターとS08の画像・作者・ハッシュを限定します。GLBには休憩棟のJPEG1枚、管理棟のJPEG1枚とPNG1枚を内蔵し、ビューアで追加のfetchやネット接続は行いません。`prepare_snakes.py` は指定原本から縮小画像を再作成するときだけ使います。

今回の最終同期はキューで `finalize_site.py` に `NOTES_TARGET='management'` を渡します。S08の保存モデル検査は `snakes_panel.py` の `__main__`、関連画像の再撮影は `render_models.py` の `BUILD_ONLY='management'` と上記4カメラの `CAMERA_FILTER`、比較は `compare_snakes.py` を使用します。GLB読戻しのあと、`package_viewer.py` → Node検査2本 → `package_results.py` → `verify_package.py` で配布を更新します。

Claude側の確認：file://とHTTPのindex、単体版のfile://で、1440×900と390×844の両方を使います。管理棟の視点6で錯視の図柄が正立し、パネルの裏や側面には出ないこと、ポスターと共存することを確認してください。管理棟では `window.weiji.state.posterTextures === 1` かつ `snakesTextures === 1`、休憩棟では後者が0です。表示準備が終わったことを示す値で、スクリーンショットによる描画確認の代わりにはしません。棟を往復して、視点切替・移動・見回し・星丸の鏡・樽の梯子が保たれることも確認します。Chrome・Safari・Firefoxの実描画と実機読込時間は未検証です。


## 渡辺錯視を見る（PLAN §16）

ビューアで **管理棟 → 14 渡辺錯視（窓の紙とシール）** を選んでください。窓ガラスの左下に円と斜線の白紙、その右上に19個の丸シールが見えます。図は渡辺英治。旧版の窓台の代理ボードとキャプションを撤去しました。

[写真・近接・GLBの比較](out/watanabe_overview.jpg)、[鑑賞視点](out/management_walk_watanabe.png) を確認できます。Blenderは `management_watanabe_detail` が近接、`management_walk_watanabe` が鑑賞位置です。連続巡回にも14番を追加しました。既存の「窓辺の展示」（east）は別の窓を向くので、S13には新しい14番を使用してください。

紙とシールはガラスの内側表面に置いた薄いメッシュで、写真テクスチャは追加していません。紙280×198mm・シール径約8mm、既存北窓の左側ガラスへの割当は推定です。写真の庭木はこの窓の外構には再現できておらず、窓の厳密な同定も未確認です。緑の説明板・参加用の額と、別窓のシールは所在が確定できないため追加していません。

通常ビルドは `tools/watanabe_window.py` の `apply(name)` を自動で呼びます。修正対象だけの既存モデル更新にも同関数を使います。巡回の更新は `assemble_walkthrough.py` に `BUILD_ONLY='management'`、`RENDER_TOUR=False` を渡せば休憩棟を保存し直しません。すべてキュー経由で実行します。S13の検査は `watanabe_window.py` の単独実行または `verify_models.py`、比較は `compare_watanabe.py`。標準GLB読戻しには `verify_glb_import.py` の `BUILD_ONLY='management'`、`DETAIL_RENDER_ONLY=True`、`DETAIL_CAMERA='management_watanabe_detail'`、`DETAIL_OUTPUT='management_watanabe_glb_import.png'` を指定します。最終同期・配布の手順はS08と同じです。

Claude側の実描画確認：file://とHTTPでindex、file://で単体版を開き、1440×900・390×844の両方で管理棟の14番を選びます。紙が窓台の上の厚い板ではなくガラスに貼られ、黒い円と斜線、紙の右上から上方へ色シールが見えること、枠への埋まりやちらつきがないことを確認してください。ドラッグで見回し、WASDで前後移動し、玄関・他視点・休憩棟へ切り替えて戻れることも確認します。`window.weiji.state.view === 'watanabe'` と `walkable === true` は状態検査で、画像の目視確認とは別です。実ブラウザ描画・Safari・Firefoxは未検証です。


## 錯視側のエデンの海を見る（PLAN §17）

ビューアで **管理棟 → 15 錯視側のエデンの海（暫定掲示）** を選んでください。S09の合板壁の端に、道路と2台の白い車に色つきの魚を重ねた《エデンの海、錯視から解放された魚》を表示しています。薄いA2相当の白紙と小さなキャプション札を添えました。掲出場所と実寸は制作者の確認待ちです。

[試作写真・整形画像・Blender・GLBの比較](out/eden_science_overview.jpg)、[洋室への追加前後](out/management_gallery_rear_eden_science_comparison.jpg)、[鑑賞視点](out/management_walk_eden_science.png) を確認できます。Blenderの近接カメラは `management_eden_science_detail`、鑑賞カメラは `management_walk_eden_science`。連続巡回にも追加しました。既存の14番《渡辺錯視》、S08、他の作品の配置は保っています。

作品・魚：渡辺英治。**写真提供：渡辺英治／錯視画像：北岡明佳。** 今回の制作者指示による第3の画像例外です。左側の彩色プリントだけを切り出し、四隅から射影補正して2048×1536pxにしました。右の黒い版は使用していません。印刷と撮影による色・反りは残り、正面原図や会場の最終掲示そのものの復元ではありません。4:3の比率も仮定です。

再生成は `tools/eden_science.py` を通常ビルドから自動適用します。画像の作り直しだけは `/opt/homebrew/bin/python3.10 3d-modeling/tools/prepare_eden_science.py`（元写真が必要）。補正の四隅・変換行列・原本と出力のハッシュは `reference/eden-science/texture.json`。配布モデルの再生成には同梱の `eden-science.jpg` とJSONを使えます。

管理棟だけの巡回更新は `assemble_walkthrough.py` に `BUILD_ONLY='management', RENDER_TOUR=False`。関連撮影は `render_models.py` の `CAMERA_FILTER` に `management_walk_rear`、`management_gallery_rear`、上記2カメラを指定します。標準GLB読戻しは `verify_glb_import.py` に `BUILD_ONLY='management', DETAIL_RENDER_ONLY=True, DETAIL_CAMERA='management_eden_science_detail', DETAIL_OUTPUT='management_eden_science_glb_import.png'`。Blender関連はすべてキュー経由です。`eden_science.py` の単独実行で保存モデルのS12検査、`compare_eden_science.py` で比較画像と管理棟の配置図を更新します。最終同期・再生成検査・ZIPの手順はS08と同じです。

Claude側の実描画確認：file://とHTTPのindex、file://の単体版を1440×900・390×844で開き、管理棟15番を選びます。紙の表に彩色の魚と2台の車が正立し、端が切れず、机・椅子・別のプリントが混ざらないことを確認してください。S09と重ならず、札が下にあり、移動とドラッグで見回せることも確認します。管理棟の `window.weiji.state.edenTextures === 1`、休憩棟では0です。3つの許可画像、棟切替、S13、樽の梯子が保たれることを確認してください。Nodeの状態検査はWebGL描画・JPEG復号・ブラウザ互換性・実機速度の確認ではありません。
