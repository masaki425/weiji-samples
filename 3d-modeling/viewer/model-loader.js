/* Classic scripts work without fetch/module CORS when this folder is opened locally.
   Only the two bundled building names are accepted. No remote dependencies. */
(function (global) {
  'use strict';
  const pending = new Map();
  const names = {rest: '休憩棟', management: '管理棟'};
  const timeoutMs = 60000;

  function failure(code, message) {
    const error = new Error(message);
    error.code = code;
    return error;
  }

  function registered(name) {
    return global.WEIJI_EMBEDDED && global.WEIJI_EMBEDDED[name];
  }

  function getItem(name) {
    if (registered(name)) return Promise.resolve(registered(name));
    if (pending.has(name)) return pending.get(name);
    const promise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      let settled = false;
      let timer;
      function finish(error) {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        script.onload = script.onerror = null;
        script.remove();
        if (error) reject(error);
        else if (!registered(name)) reject(failure('MODEL_DATA', names[name] + 'のデータが登録されていません。'));
        else resolve(registered(name));
      }
      script.async = true;
      script.src = 'assets/' + name + '.js';
      // Deliberately no type=module or crossorigin: local files have opaque origins.
      script.onload = () => finish();
      script.onerror = () => finish(failure('MODEL_SCRIPT', script.src));
      timer = setTimeout(() => finish(failure('MODEL_TIMEOUT', script.src)), timeoutMs);
      document.head.appendChild(script);
    });
    pending.set(name, promise);
    // Keep only in-flight requests here. The data script itself is the cache.
    promise.then(() => pending.delete(name), () => pending.delete(name));
    return promise;
  }

  function decode(item) {
    try {
      if (!item || typeof item.glb !== 'string' || !item.navigation) throw new Error('登録形式');
      const nav = item.navigation, grid = nav.grid;
      if (!Array.isArray(nav.views) || !nav.views.length || !grid ||
          grid.heights.length !== grid.width * grid.height) throw new Error('歩行データ');
      const raw = atob(item.glb), bytes = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
      const view = new DataView(bytes.buffer);
      if (bytes.length < 28 || view.getUint32(0, true) !== 0x46546c67 ||
          view.getUint32(4, true) !== 2 || view.getUint32(8, true) !== bytes.length) throw new Error('GLB');
      return {buffer: bytes.buffer, navigation: nav};
    } catch (error) {
      throw failure('MODEL_DATA', 'モデルまたは歩行データが不完全です。');
    }
  }

  async function load(name) {
    if (!Object.prototype.hasOwnProperty.call(names, name)) throw failure('MODEL_DATA', '棟の指定が不正です。');
    const item = await getItem(name);
    try { return decode(item); }
    catch (error) {
      // A truncated/old script must not poison subsequent retry attempts.
      if (!global.WEIJI_STANDALONE) delete global.WEIJI_EMBEDDED[name];
      throw error;
    }
  }

  function errorMessage(error) {
    const code = error && error.code;
    if (code === 'WEBGL') return '3D表示を開始できません。WebGLが利用できないか、描画用のメモリが不足しています。ほかの3D画面を閉じて再読み込みするか、別のブラウザをお試しください。';
    if (code === 'DEPENDENCY') return '表示に必要なスクリプトを読み込めません。ZIPをすべて展開し、viewerフォルダの中のファイルを一緒に置いて開き直してください。';
    if (code === 'MODEL_TEXTURE') return '展示画像（ポスター・蛇の回転）を表示できません。もう一度読み込み、改善しなければ更新版ZIPを新しいフォルダにすべて展開してください。';
    if (code === 'MODEL_DATA') return 'モデルデータが不完全か、異なる版が混在しています。更新版ZIPを新しいフォルダにすべて展開して開き直してください。';
    if (code === 'MODEL_SCRIPT' || code === 'MODEL_TIMEOUT') {
      const detail = code === 'MODEL_TIMEOUT' ? 'モデルの読込が時間内に終わりませんでした。' : 'モデルファイルを読み込めませんでした。';
      const local = global.location.protocol === 'file:';
      return detail + '\n' + (local
        ? 'ファイルが不足しているか、このブラウザでローカルの読込が制限されています。ZIPをすべて展開してください。改善しない場合は「単体版を開く」、またはREADMEのHTTP配信手順をお試しください。'
        : 'モデルファイルの不足、通信失敗、または配信設定による制限が考えられます。再試行し、改善しなければviewer/assetsを含めて配信されているか確認してください。') + '\n対象: ' + error.message;
    }
    return '3D表示の準備中に問題が起きました。再試行し、改善しなければ更新版ZIPを展開し直すか、別のブラウザをお試しください。';
  }
  global.WeijiModelLoader = Object.freeze({load, errorMessage});
})(window);
