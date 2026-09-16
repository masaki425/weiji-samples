公園全体と真上の視点を、ドラッグで回転、ホイール／2本指ピンチで拡大縮小できるようにしました（PLAN §32）。[公園ビューアを開く](park/viewer/index.html)。全体表示では歩行を止め、「全体」で角度と距離を戻します。園路や室内を選ぶと従来の操作に戻ります。

休憩棟の東側玄関・ポスター・外装、小屋のカウンター方位、管理棟のノート室と星丸の鏡を修正しました（PLAN §31）。[公園ビューア](park/viewer/index.html)では、先に「公園内／休憩棟／管理棟」を選び、次に見る場所を選べます。休憩棟の「梯子から樽の中」で上り、ボタンで下りられます。[今回の写真比較](out/corrections31/comparisons.jpg)／[棟別ビューア](viewer/index.html)。

公園の地形・施設配置は§30、建物の最新版は§31、公園全体の回転操作は§32です。写真から分からない寸法・入口立面と平面の対応には推定を含みます。

現在の画像使用は休憩棟9作品・19面、玄関ポスター、管理棟S08《蛇の回転錯視》、S12《エデンの海、錯視から解放された魚》、進化ストリーム3図、月の錯視、ログビネンコ錯視です。休憩棟20画像、管理棟8画像を内蔵しています。S08は会場写真の青・黄2003年版（作者名・英文クレジットを含む）を転写し、S12は彩色の試作プリント写真を補正して暫定位置へ掲示しています。S12：写真提供：渡辺英治／錯視画像：北岡明佳。詳細は末尾の各更新をご覧ください。

# 大倉公園と二棟の展示モデル

2025年の展覧会記録写真と大府市・文化財の公開情報から作った、寸法推定を含む建築・展示モデルです。追加版は作品リスト40項目の配置を調べ、現在は38項目を室内へ配置しています（S12は暫定掲示）。庭を加えた版では、中庭のA24《変身もんどり庵》も屋外に配置しました。計画と40項目の配置表は [PLAN.md](PLAN.md#10-追加依頼作品を含む展示内装)、写真との比較と限界は [REVIEW.md](REVIEW.md) です。



<!-- DETAIL INTRO -->
今回の追加では建具・木部・庭を詳細化し、梯子から樽内を覗く操作を加えました。[細部の一覧](out/details_overview.jpg) を確認できます。休憩棟の視点 **4 梯子から樽の中** で上り、ボタンで下りられます。
<!-- END DETAIL INTRO -->

## 玄関から室内を巡る

ブラウザでは、ZIPをすべて展開し、[viewer/index.html](viewer/index.html) をダブルクリックしてください。`viewer` フォルダ内の `assets`・`vendor`・各スクリプトは一緒に置きます。サーバー起動は不要な構成で、選択した棟だけデータを読み込みます。「棟」と「視点」を選び、ドラッグで見回し、WASD・矢印キーまたは画面の矢印で移動できます。

一つのファイルだけで渡す場合は [viewer/展示室を歩く.html](viewer/展示室を歩く.html) を使えます。約153.5MBで、両棟のデータを含む単体版です。旧 `index.html` のローカル読込で使っていたfetchを廃止し、どちらの入口も同じ読込処理を使います。更新時は古い版にファイルを混ぜず、ZIPを新しいフォルダへすべて展開してください。

**修正後の読込・切替・操作コードはNodeで検査済みです。ブラウザの実描画はCodexでは未検証で、Chromeの再確認手順を後述しています。Safari・Firefoxも未検証です。** Claudeの引き継ぎにある「単体版のfile://とindexのHTTPがChromeで描画できた」という結果は、修正前の外部確認です。

読込が失敗すると「もう一度読み込む」と「単体版を開く」を表示します。ファイル不足やローカル読込の制限、データ破損、WebGLの利用不可を分けて案内します。単体版でも問題が続く場合は、下記のHTTP配信、またはBlender版を使えます。

`out/rest.blend` と `out/management.blend` に、屋根・外壁・天井を表示した連続カメラ巡回を保存しています。ファイルを開くと玄関前の視点です。カメラ表示でタイムラインを再生すると、入口の段差から廊下を通り、各室の鑑賞位置を巡ります。途中で停止できます。タイムライン上の日本語マーカーが部屋の位置です。休憩棟は17視点、管理棟は27視点です。追加した庭と窓の鑑賞点を含み、巡回は室内から屋外へ続きます。時間と停止フレームは `out/walkthrough_viewpoints.json` と検証結果に記録しています。

自由に動く場合は、`Cameras_Lights` の `rest_free_walk` / `management_free_walk` をアクティブカメラにして、3Dビューの「ビュー → ナビゲーション → ウォークナビゲーション」（F3で `Walk Navigation` を検索）を使います。WASDとマウスで移動・見回し、左クリックで確定、Escで開始位置へ戻れます。日本語キーボードでショートカットが合わない場合もメニューから開始できます。標準の自由移動は壁をすり抜けることがあります。保存した巡回カメラの経路は、別途モデルの形状と照合しています。

休憩棟の最新の写真転写は [室内の確認画像](out/rest_photo_room_views.jpg) で確認できます。従来の全44歩行視点の一覧は `out/rest_walkthrough_overview.jpg` と `out/management_walkthrough_overview.jpg` です。休憩棟の旧一覧には転写前の画像が含まれます。視点の位置・停止フレームは `out/walkthrough_viewpoints.json`、写真比較は `out/*_walk_*_comparison.jpg` です。

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

A24は `Artworks` 内の屋外作品です。窓から見える中庭に、写真から推定した位置・向きで置いています。S16（園路の蝶）は§21で1点を玄関前の園路脇へ暫定配置しました。S12は制作者の展示指示により、S09付近の合板壁へ暫定掲示しました。A23は室内の陶器4点を実装し、庭の別構成は省略しています。A01・A09・A18は正確な位置が未確認のため、表に記録した暫定位置へ配置しています。

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

モデルの再生成にはBlender付属Python、同梱の `reference/details/*_artworks_before.json`・`placements.json` と `reference/entrance-poster.jpg`・`reference/entrance-poster.json` を使います。材質はノードで作成し、画像の使用はポスター・S08・S12・進化ストリーム3図・月・ログビネンコの6用途に限ります。初版の襖の写真材質も、追加版では淡い色調の手続き材質へ置換しました。展覧会ポスター・S08・S12・進化ストリーム3図はユーザーが指定した画像をパックし、GLBにも内蔵しています。S08には `reference/snakes-2003/rotating-snakes-2003.jpg` と同ディレクトリの `texture.json`、文字の生成にはmacOSのヒラギノ角ゴシックW3を使います。別OSでは対応する日本語フォントのパスを指定してください。保存モデルの閲覧は画像の外部リンクに依存しません。星丸は指定の確認視点で、手前が丸・鏡像が六角星になるよう上縁を計算しています。他の錯視図版・原図・作品本文は概形による代理表現です。

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

休憩棟は「庭の園路から休憩棟」「中庭・変身もんどり庵」「庭から奥座敷の中へ」「庭からエデンの海へ」「広縁から中庭の小屋へ」「窓辺から庭木と竹垣へ」を追加しました。管理棟は「前庭から管理棟へ」「庭から研究ノートの広間へ」「広間の窓から前庭」「西の窓から和室の中へ」を追加しています。窓と屋根を表示したまま、内外の同じ立体を見ます。

外構の根拠・推定範囲はPLAN §12。二棟の正確な距離・高低差が未確認なので、公園全体は接続していません。前庭の木や石の座標、庭側入口の絶対位置、A24と窓の距離は推定です。管理棟の窓外の軒は見える一部だけを表し、S04の実物の投影関係までは再現していません。A23の庭部分は省略しています。S16は§21で写真6449の1点を玄関前園路の脇へ暫定配置しました。実際の園路上の位置は未確認です。

`Site` は歩行する地面・園路・段、`SiteObstacles` は幹・垣・石など、`SiteFoliage` は葉です。新しい外構には `site_environment` と写真の `evidence` を付けています。植栽の枝葉は軽量な形状です。ガラスはBlenderで透過・反射、ビューアで半透明を使います。ブラウザ版では木目・影・反射の品質がCycles画像と異なります。

季節（11月の紅葉／公式写真の新緑）は制作者の確認待ちです。現在は11月を暫定採用しています。再生成コマンドの `--season november` または `--season green` で、落葉樹の葉色を切り替えられます（例：`python3 3d-modeling/tools/submit_job.py build --target both --season green`）。内部では `site_environment.py` の `SEASON` パラメータへ渡します。樹木の位置、常緑樹の色、作品は変わりません。季節変更後も下記と同じ書出し・検証・配布を行ってください。

通常の再生成は `build_models.py` を使います。管理棟では、従来の展示生成を行った後、`management_layout.py` が§19の間取り・位置・向きへ一括変換します。`placements.json` の `construction_position` は旧生成工程専用で、表示位置は `position` と `management_layout_data.py` が正本です。旧版への単独の外構・作品パスの再適用はせず、空のシーンから対象棟を再生成してください。管理棟は形状・材質・UVの保持と新座標を検査し、休憩棟には従来の不変検査を適用します。

庭を含む比較画像の作成には `tools/compare_walkthrough.py`、`tools/compare_site.py`、`tools/placement_diagrams.py` を使います。`out/site_overview.jpg` に窓越しの代表画像、`out/site_verification.json` に両方向の視線・外構・作品保持の検査をまとめます。

Claude側のブラウザ確認では、上記file://・HTTP、1440×900・390×844に加え、次を確認してください。

- 休憩棟の「広縁から中庭の小屋へ」で、透明な窓の向こうに小屋、竹垣、庭木が見える。
- 「庭からエデンの海へ」では、窓越しに針金で立つ魚、畳、襖、天井が見える。「庭から奥座敷の中へ」では座卓と床の間が見える。
- 管理棟の「広間の窓から前庭」で、窓外に植込み・柵・樹林が見える。「庭から研究ノートの広間へ」ではノート机と室内が見える。
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


## S08の画像表示（PLAN §15 → §25）

[元写真・補正画像・モデルの比較](out/snakes_2003_comparison.jpg)と[GLB読み戻しを含む一覧](out/snakes_overview.jpg)を確認してください。青・黄の横長「Rotating snakes, 2003」を記録写真6542から射影補正し、印刷された作者名・英文クレジットを含めて貼っています。蛇の回転（Rotating snakes, 2003）：北岡明佳／記録写真：青木兼治。

鑑賞視点は「司壁の右面・蛇の回転」。Blenderでは `management_snakes_detail` がパネルの近接、`management_work_s08` が左右の架台を含む全景です。パネル寸法1.41×0.90mは写真からの推定です。6501の左タブレットと6540の右iMacは別の内容なので、今回のパネル画像は貼らず、既存の画面表現を保っています。

`prepare_snakes.py` で四隅の射影補正を再現し、PNGの保存用原本とJPEG品質96・色差間引きなしの配布用画像を作ります。`snakes_2003.py` が通常ビルドの最終段階で前面全体へ適用し、初期版の作者名メッシュを除きます。文字や図は生成・補完しません。旧 `rotsnak4L.png` と `reference/snakes/` は履歴として保存し、現行の許可画像レジストリから外しています。

画像は.blendにパックし、GLB内に格納します。ビューアはdata URLから復号するため、file://でも追加の画像fetchはありません。管理棟は8画像、休憩棟はポスター1画像です。

最終同期はキューで `finalize_site.py` に `NOTES_TARGET='management'`。検査は `snakes_2003.py`、`verify_models.py`、標準GLB読戻し。関連撮影は `reference/snakes-2003/render_selection.json` の8視点です。比較は `compare_snakes.py`、配布は `package_viewer.py` → Node検査2本 → `verify_snakes_2003_release.py` → `package_results.py` → `verify_package.py` の順で更新します。

## 渡辺錯視を見る（PLAN §16）

ビューアで **管理棟 → 14 渡辺錯視（窓の紙とシール）** を選んでください。窓ガラスの左下に円と斜線の白紙、その右上に19個の丸シールが見えます。図は渡辺英治。旧版の窓台の代理ボードとキャプションを撤去しました。

[写真・近接・GLBの比較](out/watanabe_overview.jpg)、[鑑賞視点](out/management_walk_watanabe.png) を確認できます。Blenderは `management_watanabe_detail` が近接、`management_walk_watanabe` が鑑賞位置です。連続巡回にも14番を追加しました。既存の「窓辺の展示」（east）は別の窓を向くので、S13には新しい14番を使用してください。

紙とシールはガラスの内側表面に置いた薄いメッシュで、写真テクスチャは追加していません。紙280×198mm・シール径約8mm、§19で洋室MGの右側、S14の凹部に隣接するガラスへ移しました。窓枠の絶対座標は推定です。窓背景の庭木は概形で配置し、実際の枝ぶり・位置と窓の厳密な同定は未確認です。緑の説明板・参加用の額と、別窓のシールは所在が確定できないため追加していません。

通常ビルドは `tools/watanabe_window.py` の `apply(name)` を自動で呼びます。修正対象だけの既存モデル更新にも同関数を使います。巡回の更新は `assemble_walkthrough.py` に `BUILD_ONLY='management'`、`RENDER_TOUR=False` を渡せば休憩棟を保存し直しません。すべてキュー経由で実行します。S13の検査は `watanabe_window.py` の単独実行または `verify_models.py`、比較は `compare_watanabe.py`。標準GLB読戻しには `verify_glb_import.py` の `BUILD_ONLY='management'`、`DETAIL_RENDER_ONLY=True`、`DETAIL_CAMERA='management_watanabe_detail'`、`DETAIL_OUTPUT='management_watanabe_glb_import.png'` を指定します。最終同期・配布の手順はS08と同じです。

Claude側の実描画確認：file://とHTTPでindex、file://で単体版を開き、1440×900・390×844の両方で管理棟の14番を選びます。紙が窓台の上の厚い板ではなくガラスに貼られ、黒い円と斜線、紙の右上から上方へ色シールが見えること、枠への埋まりやちらつきがないことを確認してください。ドラッグで見回し、WASDで前後移動し、玄関・他視点・休憩棟へ切り替えて戻れることも確認します。`window.weiji.state.view === 'watanabe'` と `walkable === true` は状態検査で、画像の目視確認とは別です。実ブラウザ描画・Safari・Firefoxは未検証です。


## 錯視側のエデンの海を見る（PLAN §17）

ビューアで **管理棟 → 15 錯視側のエデンの海（暫定掲示）** を選んでください。S09の合板壁の端に、道路と2台の白い車に色つきの魚を重ねた《エデンの海、錯視から解放された魚》を表示しています。薄いA2相当の白紙と小さなキャプション札を添えました。掲出場所と実寸は制作者の確認待ちです。

[試作写真・整形画像・Blender・GLBの比較](out/eden_science_overview.jpg)、[洋室への追加前後](out/management_gallery_rear_eden_science_comparison.jpg)、[鑑賞視点](out/management_walk_eden_science.png) を確認できます。Blenderの近接カメラは `management_eden_science_detail`、鑑賞カメラは `management_walk_eden_science`。連続巡回にも追加しました。既存の14番《渡辺錯視》、S08、他の作品の配置は保っています。

作品・魚：渡辺英治。**写真提供：渡辺英治／錯視画像：北岡明佳。** 今回の制作者指示による第3の画像例外です。左側の彩色プリントだけを切り出し、四隅から射影補正して2048×1536pxにしました。右の黒い版は使用していません。印刷と撮影による色・反りは残り、正面原図や会場の最終掲示そのものの復元ではありません。4:3の比率も仮定です。

再生成は `tools/eden_science.py` を通常ビルドから自動適用します。画像の作り直しだけは `/opt/homebrew/bin/python3.10 3d-modeling/tools/prepare_eden_science.py`（元写真が必要）。補正の四隅・変換行列・原本と出力のハッシュは `reference/eden-science/texture.json`。配布モデルの再生成には同梱の `eden-science.jpg` とJSONを使えます。

管理棟だけの巡回更新は `assemble_walkthrough.py` に `BUILD_ONLY='management', RENDER_TOUR=False`。関連撮影は `render_models.py` の `CAMERA_FILTER` に `management_walk_rear`、`management_gallery_rear`、上記2カメラを指定します。標準GLB読戻しは `verify_glb_import.py` に `BUILD_ONLY='management', DETAIL_RENDER_ONLY=True, DETAIL_CAMERA='management_eden_science_detail', DETAIL_OUTPUT='management_eden_science_glb_import.png'`。Blender関連はすべてキュー経由です。`eden_science.py` の単独実行で保存モデルのS12検査、`compare_eden_science.py` で比較画像と管理棟の配置図を更新します。最終同期・再生成検査・ZIPの手順はS08と同じです。

Claude側の実描画確認：file://とHTTPのindex、file://の単体版を1440×900・390×844で開き、管理棟15番を選びます。紙の表に彩色の魚と2台の車が正立し、端が切れず、机・椅子・別のプリントが混ざらないことを確認してください。S09と重ならず、札が下にあり、移動とドラッグで見回せることも確認します。管理棟の `window.weiji.state.edenTextures === 1`、休憩棟では0です。3つの許可画像、棟切替、S13、樽の梯子が保たれることを確認してください。Nodeの状態検査はWebGL描画・JPEG復号・ブラウザ互換性・実機速度の確認ではありません。


## 写真の見通しから組み直した管理棟（PLAN §19）

[更新した配置図](out/management_layout.jpg) には、部屋ID・開口・窓・合板壁・作品番号を入れました。[写真／変更前／変更後](out/management_layout_overview.jpg) と [管理棟の全視点](out/management_all_views.jpg) で照合できます。MGFとMGRは一つの洋室の展示区画です。非展示の事務室MOも図に記載しています。

広間の受付と戸口を同じ壁にまとめ、板床の廊下を経て和室へ通じる開口を作りました。和室2室を敷居で直接つなぎ、星丸の部屋の右に体験コーナーを置きました。S08とS09は同じ合板壁の表裏、S14はその脇の凹部です。S11とS13は対向する側壁の窓へ移しました。S01の階段と星丸の鑑賞位置の間には歩行の余地を設けています。作品15項目の位置・向きは更新し、メッシュの局所形状、材質割当、UV、3件の許可済み画像は保持しています。この§19時点ではS16は未配置でした。§21で暫定配置へ更新しました。

**建物の実測図はありません。** 体験コーナーから洋室への戸口、建物全体の輪郭、玄関方位・寸法は暫定案です。S04の窓の同定、S12の掲出場所、S15の位置も確認待ちです。根拠と残る推定はPLAN §19の表をご覧ください。写真で確認できた局所関係から建物全体の外形を確定したものではありません。

ブラウザは `viewer/index.html` を開き、管理棟で次の視点を確認してください。

|視点|見るところ|
|---|---|
|6 洋室・合板壁の表|S08の合板壁と左右の通り抜け|
|7 和室に隣接する体験コーナー|窓台のS07、窓のS04、机のS06と壁際のS05|
|8 洋室・合板壁の裏|S09と床のS10、側壁の窓|
|14 渡辺錯視|S14の凹部の隣の窓に白紙とシール|
|15 錯視側のエデンの海|S09脇に掲示した許可画像。位置は暫定|
|16 和室2室のつながり|板床の隙間がなく、共通敷居を挟んで畳が続く|
|17 星丸の部屋から緑の机|開口越しに緑脚の机が見える|
|18 洋室奥の庭窓と壁面図|左右を見回すとS11とS13の窓、正面には長い解説図の壁|

Claudeによる実描画確認は、file://のindex・単体版とHTTPのindexで、1440×900と390×844の両方を使います。上の視点を切り替え、両脇の通路を歩き、ドラッグで窓と隣室を見回してください。5番の星丸の位置から移動を始められること、鏡の丸／星、ポスター、S08/S12の画像、休憩棟の樽の梯子も確認します。Chrome・Safari・Firefoxの実描画と1分以内の実機読込は未検証です。Nodeの検査は描画・JPEG復号・ブラウザ互換性を検証しません。

Blenderの管理棟だけを作り直すキューでは、`build_models.py` に `BUILD_ONLY='management', CAMERA_FILTER=['__skip__']`、次に `assemble_walkthrough.py` に `BUILD_ONLY='management', RENDER_TOUR=False`、最後に `render_models.py` に `BUILD_ONLY='management', SAMPLES=12` を渡します。`.py`を書き終えてから同名の`.go`を作り、ログの完了印・例外なし・exit=0を確認してください。直接Blenderを起動しません。

検査は `verify_photo_constraints.py`、`management_layout.py`、`verify_management_layout_navigation.py`、`verify_models.py`、`verify_glb_import.py`、Nodeの2本です。前者のPythonだけの歩行検査は書き出された実形状のグリッドを使い、各開口を横切れることを個別に確認します。最終同期は `finalize_site.py` に `NOTES_TARGET='management'` を渡します。比較は `compare_photo_constraints.py`、`draw_management_layout.py`、`compare_management_layout.py`、同梱は `package_results.py` と `verify_package.py` です。`reference/management-layout/local_artwork_geometry.json` が今回の作品形状の照合基準です。

§19は管理棟55静止視点・18鑑賞点、GLB約33.24MBです。写真対応の11視点は `management_photo_写真番号`。同じシーンで原本EXIFの焦点距離を使い、位置・姿勢は推定しました。写真側は全画面・反転なしです。原本写真の撮影：青木兼治。

写真6467では受付→廊下→畳、6463では星丸の右の緑机、6474と6479では合板の表裏と凹部、6478では窓→凹部→閉じた襖を確認できます。一方、6467の大窓と玄関位置、6460・6464の小室の開口概形、6483の窓割当と屋根を使う錯視は未解決です。建物全体の平面を確定したモデルではありません。

追加のブラウザ確認では、管理棟の3番「広間」から受付右の戸口→廊下→和室へ入り、16番から隣の畳室、17番から緑机へ通じることを確認してください。6・8番では同じ合板の左右を歩いて回り込み、14番では紙とシールの背後に庭木が見えることを確認します。写真対応11枚のカメラはBlender用で、ブラウザの18視点は歩行用です。対応写真の11枚を確認するときは比較シートを併用してください。

最終保存検査、28項目の写真カメラ検査、10開口の通過、18点の到達、GLB標準読戻し、Node読込、再生成照合の結果は [今回の検証記録](out/management_layout_release_verification.json) と [保存モデル検査](out/verification.json) にまとめます。休憩棟.blend・GLBは更新前のSHA-256と照合します。最新ZIPを別フォルダに展開し、上記file://・HTTP手順でClaudeによる実描画確認を行ってください。Chrome・Safari・Firefoxの実描画はこの検査の対象外です。

§19の保存検査は管理棟112/112・休憩棟82/82、間取り12項目と写真カメラ28項目が合格しました。巡回は9711フレーム・404.625秒。管理棟1866メッシュ、休憩棟5155メッシュを別出力先で再生成し、確認済みモデルと一致しました。これらの合格は、未解決とした写真4組や建物全体の平面を確定するものではありません。

比較画像をまとめて作り直す場合は、S08・S13・S12やポスターの比較を先に生成し、最後に `draw_management_layout.py` → `compare_management_layout.py` → `compare_photo_constraints.py` の順で現行の配置図・一覧を出力してください。過去の作品別比較ツールが出す配置図を§19の図で更新します。


## §20 制作者の見取り図を反映した管理棟（形状は§21で更新）

`files/OKURAOBU.pptx` の4スライドを読み、スライド3の外形・2本の司壁・未使用部分・赤線の端点を原本XMLから再抽出しました。管理棟の配置はこの見取り図を優先し、写真は窓・建具・材質・掲示高を補う資料にしています。スライド4の手描き図も洋室の対向窓と壁の両面の補助根拠です。

[重ね図](out/management_okuraobu_overlay.jpg)の左が原本の輪郭と矩形、右が実装した間取りです。赤線がモデル外形、茶が司壁、青緑が窓、白抜きが開口です。図中のS番号と写真番号で修正箇所を指定できます。灰色の元輪郭との数cmの差は壁を直交させた補正です。縮尺は約53坪を輪郭面積に合わせた推定で、実測ではありません。

ブラウザでは管理棟を選び、「玄関・廊下」「右側の広間・研究ノート」「玄関左・不思議な部屋」「和室2室のつながり」「中央・体験コーナー」「司壁の右面・蛇の回転」「司壁の左面・四角と丸」「渡辺錯視・図上側の窓」を確認してください。「星丸・床の間」は固定の光学鑑賞位置です。S04は中央くぼみ側の窓、S15はその下に続く壁、S12はS09と同じ司壁左面の暫定掲示です。古い節の視点番号より、最新の視点名を使ってください。

既存の作品15項目は局所形状・材質・UVを保ち、親の位置と向きを変更しました。ポスター・S08・S12の画像使用とクレジット、魚の針金・樽の支持線・星丸の訂正は継承しています。この§20時点ではS16は屋外の非表示登録でした。§21で暫定配置へ更新しました。休憩棟の.blendとGLBは変更前のSHA-256と照合します。

写真6463の「床の間右の開口越しに緑の机」は、今回の見取り図を優先した配置では同じ見通しになっていません。6460/6464の小室の開口、6483の屋根を使う錯視も既存概形の限界が残ります。図の正本化を、全写真・実寸の完全一致とは扱っていません。詳しくはPLAN §20と比較シートを参照してください。

現行の構築順は `build_models.py` の初期建築・作品作成後に `management_layout.py` が管理棟の建築を置換し、`management_layout_data.py` と `management_views.py` で配置・視点を確定する形です。`construction_position` は既存作品の生成用なので、表示位置を直す目的で上書きしません。

原本を再抽出するときだけPillow・NumPy・OpenCVのあるPythonを使います:

```sh
/opt/homebrew/bin/python3.10 3d-modeling/tools/parse_okuraobu.py
/opt/homebrew/bin/python3.10 3d-modeling/tools/placement_catalog.py
```

通常のBlender再生成には、同梱した `reference/okuraobu/source_geometry.json` と `before/management_layout_data.py` を使います。原本PPTXは書き換えません。管理棟だけのキュージョブでは `build_models.py` に `BUILD_ONLY='management'`、続く `assemble_walkthrough.py` に同じ指定と `RENDER_TOUR=False` を渡してください。最新版の管理棟84枚は `render_models.py` の同じ棟指定で再出力します。

比較画像の順序はS08・S13・S12・ポスター → `draw_management_layout.py` → `compare_management_layout.py` → `compare_photo_constraints.py` です。最後に `package_viewer.py`、Node検査2本、`verify_science_release.py`、`package_results.py`、`verify_package.py` で配布物を確認します。モデル・歩行・GLB・再生成の必須検査を先に済ませてください。

Claudeによる実描画の確認手順：新しいZIPを別フォルダへ全展開し、Chromeでindex.htmlをfile://とHTTPの両方から開き、両棟の切替・視点選択・見回し・移動を確認します。管理棟は玄関から上記の室を巡り、司壁の両端、S13の紙とシール、S12の画像、星丸の鏡像を確認してください。期待結果は読込エラーがなく、窓越しに内外が見え、壁と展示物を突き抜けずに移動できることです。実ブラウザの描画・1分以内の読込はCodex側では未検証です。Safari・Firefoxも確認待ちです。

写真11組は全画面の一致ではなく、各組に構図や概形の差が残ります。とくに6467・6464の窓の写り方、6471の雲形黒板、6536の紙の画角も未一致です。比較シートとPLAN §20.7に各組の確認範囲を記録しています。

§20時点の管理棟は55静止視点・18鑑賞地点、GLB約32.76MBでした。保存モデル112項目、歩行の全9741フレーム、標準GLB読み戻し8項目を確認しました。検証の集約は [最新の検証記録](out/management_layout_release_verification.json)、再生成は [メッシュ照合結果](out/site_regeneration_verification.json) を参照してください。これらは写真の全画面一致や実測寸法の確定を意味しません。

## §21 全16作品と付随展示

[viewer/index.html](viewer/index.html)をダブルクリックし、管理棟を選んでください。棟別の画像・モデルをローカルJSから読むため、file://でもサーバー起動は不要です。ZIPは全体を展開してから開きます。1ファイルで渡す場合は[単体版](viewer/展示室を歩く.html)を使います。管理棟GLBは§23の更新後で約44.29MB（base64のJSは約59.69MB）です。

- 「中央・体験コーナー」：偏心円のロトレリーフ、緑脚机、黄色回転台、24枚の模様付き円盤、雲形黒板。
- 「窓台の変身立体2組」「窓辺の兎／家鴨4体」：写真の数と色を反映した小立体。兎／家鴨は白と緑、青と紫がそれぞれ向かい合います。
- 「司壁の右面・蛇の回転」「司壁の左面・四角と丸」：パネルと紺の架台、裏の3枚の錯視図と6つの白い立体。
- 「質問箱とQ&Aカード」「進化ストリームの3段の図」：箱・用紙、写真で確認した6枚のカードと吹出し、3段の紙帯。司壁裏の12枚はスケッチによる暫定補足です。
- 「地袋の錯視スライド」「窓の岡崎げんき館錯視」「ドレスと投票欄」「凹部の進化シミュレーター」：PC、背面を開いた窓の箱、投票シールのある紙、凹部の棚と端末。
- 「園路の蝶瞰図（位置暫定）」：写真6449で確認した羽形と針金1点。園路の絶対位置は未確定です。

研究ノート17冊、受付、キャプション、STAFF ONLYの戸札も保持・追加しています。S08・S14・S02の親を見取り図の線端へ戻し、作品の寸法と面への取り付け位置を写真に合わせて修正しました。図の線端に直接対応する9項目は、EMUから換算した基準位置との差が最大約6.6mmです。これは原図とモデルの実装差で、現地での測量精度ではありません。

§21時点のBlender静止視点は84点でした。§22で近接3点を追加し、現在は87点、歩行の鑑賞地点は27点です。作品だけを詳しく見るカメラは `management_work_s01`〜`management_work_s16`、付随展示は `management_work_s_x01`・`s_x03`・`s_x04`・`s_x05` です。近接画像は[作品比較フォルダ](out/science_comparisons)、棚卸しは[PLAN §21](PLAN.md)と[一覧JSON](reference/science-faithful/inventory.json)を参照してください。各作品の存在・個数・図上の基準位置・可視性と、作品の完全再現を区別しています。

S03・端末画面は原図未提供のため、構成を形と色で近似しています。進化ストリームは§22で実物の手描き図へ更新しました。S08の版違いは§25で記録写真の2003年版へ更新しました。S12の掲出場所、S16の園路位置、作品の実寸、Q&Aカードの最終配置は確認待ちです。ドレスはPPTXの写真に合わせて1枚の服と4つの投票欄にしましたが、服写真そのものは権利未確認のため使っていません。§21時点の画像使用はポスター・S08・S12の3件でした。§22では進化ストリームを加えた4用途となり、現在は§24の月とログビネンコを加えた6用途です。

再生成は従来どおりキュー経由です。`build_models.py` と `assemble_walkthrough.py` に `BUILD_ONLY='management'` を渡し、後者に `RENDER_TOUR=False`、静止画は `render_models.py` の同じ棟指定と `SAMPLES=12` を渡します。`science_fidelity_data.py` が寸法・図上位置・写真の一覧、`science_fidelity.py` が形状と鑑賞点です。詳細検査は `verify_science_views.py`、形状変更範囲は `verify_science_scope.py`、最終集約は[検証記録](out/science_release_verification.json)です。

Claude側の実描画確認：展開した `index.html` をfile://とHTTPで開き、管理棟の上記視点すべてを選択して、作品の描画・ドラッグ・移動・棟切替を確認してください。とくに兎／家鴨が4体、窓台の変身立体が2組、司壁裏の図は左から魚入り道路・月・灰色幾何図、ドレス右に4投票欄、Q&Aと3段の紙帯が見えることを確認します。星丸は指定視点で手前が丸・鏡で星、S13はガラス上の紙とシール、S12は彩色魚が正立して見えることを確認してください。初回の `weijiReady` までの秒数も記録してください。Nodeの読込・操作検査はWebGL描画や実機速度の検査ではありません。Chrome・Safari・Firefoxの実描画は未検証です。

§21の最終検査：管理棟125項目・休憩棟82項目が合格。再生成では管理棟2337・休憩棟5155メッシュの形状・変換・材質が一致し、GLB標準読戻し8項目とNodeの読込・操作22項目も合格しました。管理棟は84静止画像・27鑑賞地点、比較画像は作品と付随展示20組です。休憩棟の.blend・GLBは変更前と同じSHA-256です。これらは実測精度・錯視原図の完全再現・ブラウザ実描画の保証ではありません。


## §22 進化ストリームの実際の手描き図

「進化ストリームの3段の図」で、模式線画を実物の手描きイラストと日本語の説明へ置き換えました。[元写真／補正画像／モデルの3組](out/evolution_strips_comparison.jpg)と、[補正画像](reference/evolution-strips/rectified_overview.jpg)を確認できます。図：渡辺英治／撮影：青木兼治。カタログの小松先生テキストによる帰属で、研究グループ内の共同作者・分担は未確認です。

6507・6508の近接写真を位置合わせして合成し、上段右端の白紙部分約1.85%だけ6481の全体写真を補助に用いました。PPTX image18は四隅・配置の参照に使い、画素は貼っていません。文字を打ち直したりイラストを生成したりせず、元写真の内容を転写しています。紙のしわ・陰影と、撮影・合成による局所的な解像度差は残ります。寸法は§21の推定幅3.25／2.85／2.80m、高さ0.43mです。

Blenderでは `management_evolution_neuron`、`management_evolution_vision`、`management_evolution_adventure` の3近接視点（4096×800px）を追加しました。静止視点は計87点、歩行の鑑賞地点は27点です。細かな本文を読む場合は、この近接PNGを原寸で確認してください。ビューアでは従来の「進化ストリームの3段の図」を選び、必要に応じて床の立体を避けて壁へ近づき、見回します。

再生成は `science_fidelity.py` から `evolution_strips.py` を呼び、3枚の前面と無地の裏面を作ります。画像の作り直しは `prepare_evolution_strips.py` と、四隅・射影行列を保持した `reference/evolution-strips/registration.json`・`textures.json` を使います。Blenderの実行は従来どおりキューのみです。§22時点の許可画像は4用途、管理棟6枚・休憩棟1枚でした（現状は§24参照）。

Claudeの実描画確認：新しいZIPを全展開し、Chromeのfile://とHTTPのindex、file://の単体版を1440×900・390×844で開きます。管理棟の「進化ストリームの3段の図」で、上が神経細胞、中が目、下が黄色いキャラクターの絵になり、左右反転・読み込みエラーがないことを確認してください。`window.weiji.state.evolutionTextures` は管理棟で3、休憩棟で0です。棟切替・見回し・移動・元の許可画像3件も確認します。実ブラウザの描画・速度はCodex側では未検証です。


§22の最終検査：保存モデルは管理棟125/125・休憩棟82/82、3図の専用検査19/19、GLB読戻し8/8、Nodeの読込・操作・再試行23/23が合格しました。再生成した検査対象メッシュも保存モデルと一致しました。3図以外の2208メッシュ、休憩棟の.blend・GLB、再出力対象外の75静止PNGは変更前と同一です。[配布の検証記録](out/evolution_release_verification.json)に対象・結果・ハッシュ、[SHA-256一覧](out/SHA256SUMS.json)に同梱ファイルを記録しています。Nodeでは実際のWebGL描画と読込速度は検査していません。


## §23 エデンの海がある司壁の3枚構成

壁の主パネルを4枚から3枚に修正しました。左から **S12《エデンの海、錯視から解放された魚》／月と崖／灰色の幾何図** です。S09の道路と車の単体パネル・旧札・比較用の車を除去し、S09は月と幾何図の2枚にしました。展示リストの登録題名には、初期展示のでっカー錯視も引き続き含めています。§23ではキャプションは3枚でした（§24で主札3枚＋月の補助札1枚に更新）。

3枚という枚数は制作者の指定です。11月7日の写真6479では「道路と車／月と崖／灰色の幾何図」が3枚並びます。後日制作のS12が左端の道路と差し替わったという解釈、3枚の内訳・順序・間隔は暫定で、制作者確認待ちです。紙幅0.70／0.63／0.63m・高さ0.52m・中心間隔1.07mは、写真の合板910×1820mmを物差しにした推定です。建物と司壁の寸法は変更していません。S12の画像は従来の試作プリントをそのまま保持しています（写真提供：渡辺英治／錯視画像：北岡明佳）。

[ビューア](viewer/index.html)で管理棟を選び、「司壁の3枚と四角と丸」または「司壁左端・エデンの海（差し替え暫定）」へ移動してください。Blenderの正面視点は `management_work_s09`、S12近接は `management_work_s12` と `management_eden_science_detail` です。[写真／変更前／変更後](out/three_panel_wall_comparison.jpg)、[写真6479との比較](reference/photo-constraints/photo_6479_comparison.jpg)、[S12の画像比較](out/eden_science_overview.jpg)を更新しています。

形状の修正は `tools/three_panel_wall.py`、寸法・注記は `science_fidelity_data.py` と `placements.json`、写真測定は `reference/three-panel-wall/measurements.json` です。`build_models.py` からの再生成にもこの修正を組み込んでいます。Blenderはキュー経由で実行してください。関連9静止画像を再出力し、対象外78枚と他作品・建物・庭・休憩棟の不変を照合しました。結果は[§23検証記録](out/three_panel_wall_release_verification.json)に集約しています。

Claudeの実描画確認：新しいZIPを全展開し、Chromeのfile://とHTTPのindex、file://の単体版を1440×900・390×844で開いてください。上記2視点で主図が3枚、札が3枚であること、左端の魚画像が正立していること、旧4枚目の位置が空いていることを確認します。見回し・移動・棟切替、進化ストリーム3図と他の画像の読込も確認してください。Nodeの検査は実ブラウザのWebGL描画や読込速度を測るものではありません。Safari・Firefoxの実描画も未検証です。


§23の最終検査：管理棟125/125・休憩棟82/82、司壁専用18/18、GLB読戻し8/8、Node24/24が合格しました。進化ストリーム3図の画像、対象外2142メッシュ、休憩棟の.blend・GLBは変更前と一致しています。§23時点の画像使用は4用途・管理棟6画像でした。


## 月とログビネンコを実際の図へ更新（§24）

司壁左面の中央「月の錯視」と右「ログビネンコ錯視」は、記録写真6517・6518の紙面を切り出し、射影補正した実際の図へ置き換えました。絵・文字の生成や補完はしていません。主図はS12／月／ログビネンコの3枚を保ち、説明札は写真の右下寄せに更新しました。月の札は上下2枚です。説明札の文字は無地、小図は色面で表しています。

[元写真・補正画像・モデルの比較2組](out/s09_photo_comparisons.jpg)、[月の近接](out/management_s09_moon.png)、[ログビネンコの近接](out/management_s09_logvinenko.png)、[3枚の壁面](out/management_work_s09.png) を確認できます。2図の幅は推定0.63m、高さは写真の比率から0.54mに調整しました。寸法、札の間隔、S12への差し替えの解釈は確認待ちです。

ビューアは `viewer/index.html` を開き、管理棟→「司壁の3枚と四角と丸」で中央の月と遺跡、右の濃淡の菱形を確認してください。近づくと図を大きく見られます。Blenderの近接カメラは `management_s09_moon`、`management_s09_logvinenko` です。

出典：**月の錯視の写真：撮影者未確認／ログビネンコ錯視：A. Logvinenko の図（展示写真からの転写）／記録写真：青木兼治**。画像使用は今回の指示に基づく例外5・6です。元画像の撮影者と権利は確認待ちです。§24時点の許可画像は管理棟8枚・休憩棟1枚でした。休憩棟は§26で20枚になっています。

再生成は `science_fidelity.py` → `three_panel_wall.py` → `s09_photo_panels.py` の順で適用します。画像の再補正は `prepare_s09_photo_panels.py`、四隅・出典・画像SHAは `reference/s09-photo-panels/textures.json` にあります。Blenderの実行は従来どおり `queue/` のランナー経由です。

Claude側の確認手順：file:// と HTTP の双方で `viewer/index.html` を開き、休憩棟→管理棟と切り替え、上記の司壁視点を選択します。主図が3枚で、中央の実景写真と右の菱形模様が正立し、月の下に補助札があることを確認してください。ドラッグ・移動・再切替、単体版でも同じ表示を確認し、初回読み込み秒数を記録してください。Node検査は実描画・実機速度の確認ではありません。Chrome・Safari・Firefoxでの実描画はClaude側の確認待ちです。

§24の検査結果：管理棟140/140、休憩棟82/82、図と変更範囲15/15、3枚構成18/18、GLB読み戻し8/8、Node読み込み25/25が合格しました。2図を含む8画像の画素がGLBと.blendで一致し、ソースからの再生成も一致しています。管理棟GLBは約50.6MB、管理棟JSは約68.1MBです。関連11視点を更新し、対象の写らない78視点と休憩棟の.blend・GLBは変更前と一致しています。検証の詳細は [§24リリース検査](out/s09_photo_release_verification.json)、ZIPの照合結果は `out/package_verification.txt` を参照してください。

## 蛇の回転を写真の青・黄の版へ更新（§25）

[元写真／補正画像／モデル](out/snakes_2003_comparison.jpg)で差し替えを確認できます。右端の縦書きと右下の英文も写真から転写しました。図の描き直しや色の補完はしていません。紙面の照明・反射は元写真に由来します。

Claudeによる実描画確認：file://で `viewer/index.html` と `viewer/展示室を歩く.html`、HTTPでindexを開き、管理棟の「司壁の右面・蛇の回転」を選択してください。青・黄の横長パネル、作者名、英文が正立して表示され、見回し・移動・棟切替後も表示されることを確認します。休憩棟のポスターと梯子、管理棟の他7画像も確認対象です。1440×900と390×844で検査してください。Chrome・Safari・Firefoxの実描画と実機読込速度は未検証です。Nodeは読込経路・画像バイト・操作の検査で、GPU描画を保証しません。

実寸・照明・左右端末の原映像は未確認事項として残します。パネルの版違いは解消しました。

.blend内の計画文は生成時点のスナップショットです。その後の検査・配布記録は同梱の `PLAN.md` §25と `REVIEW.md`、`out/snakes_2003_release_verification.json` を参照してください。

§25の検査結果：管理棟154/154、休憩棟82/82の全体検査が合格。S08専用14/14、標準GLB読み戻し8/8、Node読み込み25/25も合格した。ソース再生成は管理棟2158・休憩棟5155メッシュ（ポスター別検査）が一致。管理棟の8視点を再出力し、対象外81視点は変更前のSHAと照合する。管理棟GLBは54,118,052 bytes（約54.1MB）、配布JSは72,792,092 bytes（約72.8MB）、単体HTMLは143,338,406 bytes。両棟合計44の歩行鑑賞視点を維持。休憩棟の.blend・GLBは変更前とバイト一致。実ブラウザ描画・実機速度は未検証。 [検証記録](out/snakes_2003_release_verification.json)、[配布ZIP](out/weiji_buildings.zip)。ZIPの照合結果は `out/package_verification.txt`。

## 休憩棟の写真転写（§26）

9作品・19面を元写真から射影補正し、実際の図や文字を貼りました。対象は A03 線画、A05 新聞の額、A06 図鑑2冊、A07 百科事典の見える紙面、A08 文字ボード4枚、A10 背景画上部、A19 手形、A20 背表紙2枚、A21 箱の印刷面です。[元写真／補正画像／モデルの一覧](out/rest_photo_comparisons.jpg)、[作品別の大きな比較](out/rest_photo_comparisons/)、[室内の確認画像](out/rest_photo_room_views.jpg)をご覧ください。

作品：渡辺英司／記録写真：青木兼治。A03、A06、A07左ページの出典は「司さん作品写真」で、撮影者は未確認です。書籍・箱に含まれる元図についても出典・権利の確認事項をPLANに残しています。写真に見えない文字や絵を生成して補っていません。A05床の紙片、A06の3冊目、A07右下、A10背景画下部、反射の強いA18は近似表現を残しています。A07の船も既存の概形を保持しており、実写真の切り抜き構造と異なります。額内のラケットと球（A17）、樽・飛行機・魚・陶器などの立体は保持しました。

ブラウザ確認は `viewer/index.html` を file:// と HTTP の両方で開き、休憩棟の「樽の間」「エデンの海」「板の間・人工芝」「窓辺の作品」の視点から額・本・文字・背表紙を確認してください。写真は20画像（ポスター1＋今回19）をGLBと `assets/rest.js` に内蔵し、単体HTMLにも同じ画像を含めています。移動・見回し・梯子の操作は従来どおりです。19の接写は Blender の `rest_photo_*` カメラとPNGにあります。A03/A05/A10/A21の接写だけ確認用照明を使い、通常の巡回では消灯しています。

確認の期待結果は、新聞・手書き図・4枚それぞれ異なる木製文字・赤青のMEMORIESが見えること、棟を切り替えて管理棟の既存画像も表示されることです。Nodeは実際の読込・操作コード、内蔵画像のバイト、座標とUVを検査します。WebGLの画素表示・JPEGデコード・実際のfile/HTTP通信は検査範囲外で、Claudeのブラウザ確認待ちです。Safari・Firefoxは未検証です。

再生成は `tools/build_models.py` の休憩棟構築に `rest_photo_transfer.py` を組み込み済みです。写真の切り出しを再実行する場合だけ、プロジェクトの原本写真と OpenCV/Pillow を使い `prepare_rest_photos.py` を実行します。模型の再生成は同梱の補正画像とJSONを使用します。四隅、部分転写範囲、元画像と補正画像のSHA、貼付先は `reference/rest-photo-transfer/textures.json` です。

休憩棟のGLBは約59.7MB、棟別JSは約80.1MBです。画像追加に伴い容量目安を70MBへ改めました。保存モデル内の計画文は実装時点のスナップショットで、最終の実行結果は外部のPLAN末尾とverification.jsonを参照してください。

保存モデル検査は休憩棟168・管理棟154項目、転写専用86項目、GLB読み戻し8項目、Node読込26項目を照合しています。[リリース検証](out/rest_photo_release_verification.json)と[必須検査](out/verification.json)をご覧ください。Chrome・Safari・Firefoxの実描画と読込時間は未検証です。

## 公園全体を巡る（§27〜30）

ZIPを全部展開し、`park/viewer/index.html` を開きます。`park` と棟別の `viewer` を同じ `3d-modeling` 内に置いてください。案内図に基づく公園と、既存の二棟を同時に表示します。公園GLB約17.7MB、休憩棟約59.7MB、管理棟約54.2MB、合計約131.6MB。公園用単体HTMLはありません。

「真上から配置を見る」、茅葺門、中央広場、奥の門、石敷き、休憩棟の玄関を順に確認できます。公園18＋建物44の62視点。ドラッグで見回し、W/A/S/D・矢印で園路と室内を移動します。俯瞰・一部外観・施設接写は見回し専用です。梯子は休憩棟のボタンで上り下りできます。Blenderは `park/out/okura_park.blend` の `park_overview` と `park_walkthrough`、棟別のカメラは `rest::` / `management::` を使います。

地形・園路・池・水路・施設位置は案内図から起こしましたが、実寸・標高は推定です。元の建物・作品・画像は保持しています。操作・出典・再生成・Claudeへのブラウザ確認手順は [公園README](park/README.md)。GLB・Nodeの検査は完了し、実WebGL描画と実機速度は未検証です。

## 休憩棟外装の修正（§29・旧版の記録）

この節の庭側入口と小屋の暫定方向は§31で撤回しました。現在の開き方・確認手順は冒頭と§31を使ってください。

棟別ページを開くと「玄関（庭側・写真6412）」が表示されます。「玄関へ」ボタンもこの視点へ戻ります。ポスターの付いた濃色の引き戸、右側の格子窓、浅い庇、左側の竹垣を確認できます。「庭のガラス越しに展示」「広縁から庭」でも窓の下端を確認してください。「東側の開口（位置未確認）」は旧推定位置の記録として残しています。管理棟の初期表示は変更していません。

中庭の小屋は写真6397・6419の見通しから、カウンター面を長い棟側へ向けました。90度の向き変更は暫定です。小屋の白い背面両開き戸と内部壁は今回まだ一致していません。`out/architecture29/rest29_hut_counter.png` と `rest29_hut_from_room.png` で確認できます。Blenderには同名の近接カメラ6点を追加しました。固定カメラは保持し、巡回の接続経路だけを再計算しています。

公園ビューアの「休憩棟の玄関」も庭側へ変更しました。Blenderの公園巡回は、園路から外周を回ってこの玄関へ到達します。既存の作品画像・樽の覗き込み・管理棟の内容は保持しています。

Claudeへの確認：file://とHTTPの両方で、棟別ページの初期表示と「玄関へ」が庭側に戻ること、開口から室内へ移動できること、ガラス越しの内外、ポスター、A24の向き、公園側の玄関視点を確認してください。Safari／Firefoxおよび実WebGL描画は未検証です。

再生成は `tools/build_models.py` の休憩棟処理に `rest_exterior_fidelity.py` を組み込んであります。既存ファイルへの差分適用・巡回更新の実行例は `queue/done/287-rest-exterior-route.py`、最終レンダーは291、読戻し・再生成は292、公園統合は293、検証は294を参照。ジョブは新しい名前で投入してください。公園検査では `SOURCE_BASELINE='source_baseline29.json'` を指定し、旧28版の基準は上書きしません。旧 `finalize_site.py` と `finalize_park.py` は当時の対象をまとめて更新するため、この差分作業には使いません。


## 案内図に沿った公園配置（§30）

提供された案内図を正本として、公園モデルを更新しました。[案内図との重ね図](park/out/map_overlay.jpg)と[新しい平面配置](park/out/park_layout.jpg)で、外周、複数の園路、右側の池と流れ、左側の広場、高台の休憩棟、入口右手の管理棟を確認できます。旧§27〜28の池・施設の仮配置は新配置で置き換えました。建物の原本・作品・写真転写・棟別ビューアは変更しません。

利用方法・再生成は [公園README](park/README.md)。公園ビューアは18公園視点＋44建物視点です。図に沿った位置と、推定の実寸・高さを区別しています。現地の標高と正確な間隔、第三の便所は未確認。案内図そのものは材質に使っていません。§30当時の配布確認は `finalize_map.py` です。§31の形状検査は `finalize_corrections31.py`、今回のUI差分の配布検査は§32の `finalize_orbit32.py` です。

画像出典：公園案内図は制作者提供（図の制作者・発行年未確認）、参照と重ね図に限定。モデル内の既存画像の作者・撮影者は前節および公園ビューア下部を参照してください。


## §31の確認と再生成

ZIPを新しいフォルダへ全部展開してください。公園ビューアの「休憩棟」を選ぶと東側の正式な玄関へ移ります。「玄関に戻る」も棟別では東側です。ポスターは玄関引き戸の右葉。小屋のカウンターは同じ東方向に向きます。管理棟は「研究ノートの広間」「星丸・床の間」で確認できます。

公園ビューアの「前の場所／次の場所」は選んだエリア内を巡り、「全体」は公園俯瞰へ戻ります。「休憩棟」→「梯子から樽の中」、または「樽の梯子へ」で3.2秒かけて上ります。上ではドラッグで見回し、「梯子を下りる」で床へ戻ります。昇降中・上端では通常歩行を止め、他の場所を選ぶと昇降を取り消します。

Claudeへの描画確認：file://とHTTP、1200×800／390×844の両方で二段選択・前後・全体・梯子の上り下りを操作してください。休憩棟の入口とポスター、小屋のカウンター、17冊の3段配置、高窓・窓前台・受付小窓、星丸の鏡が木枠内に納まり丸→星が見えることを確認してください。Nodeは実行コードとデータを検査し、WebGL画素・スマホ実機速度は検査していません。

モデル修正は `tools/corrections31.py` を `build_models.py` の末尾工程から適用します。両棟の保存後、歩行データ・巡回カメラ・GLBを再生成し `tools/package_viewer.py` を実行します。公園は修正済み原本を `park/tools/inventory_sources.py`（BASELINE_OUTPUT=source_baseline31.json）で記録し、`prepare_map_navigation.py` で東側玄関へ接続してから再生成します。公園配置を変えない通常更新では `prepare_map_layout.py` を再実行する必要はありません。


最新版の確認：棟別25／26項目、棟別Node27項目、公園Node18項目が合格。管理棟の旧架台の補強棒2本を除去し、配置図も更新しました。公園版は全18視点を再出力しています。[6件の比較画像](out/corrections31/comparisons.jpg)、[管理棟の配置図](out/management_layout.jpg)、[検証記録](out/verification.json)をご覧ください。寸法の推定と実ブラウザの未検証はPLAN §31に記録しています。


## 公園全体の回転とズーム（§32）

ZIPを全部展開して `park/viewer/index.html` を開きます。「公園内」→「公園全体（案内図に基づく配置）」または「真上から配置を見る」を選んでください。

- マウスのドラッグ／1本指：公園の中心を軸に回転し、見る高さを変える。
- ホイール／2本指ピンチ：拡大縮小。指を広げると近づく。
- 「全体」：角度と距離を初期状態に戻す。
- 園路や室内を選ぶ：歩行と見回しへ戻る。

全体の2視点ではWASD／矢印キーを使わず、画面の歩行ボタンも隠します。距離60〜420m、仰角15〜89.5度の範囲で回せます。建物・作品・地形、棟別ビューアは変更していません。公園の3GLBも同一で、追加のダウンロードはありません。

Node28項目で回転、ホイールの単位、ズーム・角度の上下限、ピンチ、指を離す／取消、切替と全体への復帰、歩行と梯子を検査済みです。実ブラウザとタッチ実機はClaude確認待ち。確認手順・UIのみの再配布コマンドは [公園README](park/README.md) を参照してください。
