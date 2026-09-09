/* sample1/js/site.js — W Eiji サイトの最小限の振る舞い（依存なし）
   1. ナビの開閉（768px 未満）、言語切替でのハッシュ引き継ぎ
   2. 動画ファサード（クリック後に youtube-nocookie を読み込む）
   3. ギャラリーの絞り込みとライトボックス（<dialog>）
   4. 確認用: ?w=<px> で body の幅を絞る、?fonts=1 で読み込めた書体を書き出す
   design/styleguide.js から必要な部分だけ移植した。 */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* 1. ナビ */
  function initNav() {
    var toggle = $('.c-nav__toggle');
    var nav = toggle && toggle.closest('.c-nav');
    if (!nav) return;
    function setOpen(open) {
      nav.setAttribute('data-open', open ? 'true' : 'false');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    toggle.addEventListener('click', function () {
      setOpen(nav.getAttribute('data-open') !== 'true');
    });
    nav.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.getAttribute('data-open') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* 1b. 言語切替: 開いている #id を相手言語の同名ページに引き継ぐ（id は両言語で同じ） */
  function initLangSwitch() {
    $$('.c-lang a[hreflang]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (!location.hash) return;
        e.preventDefault();
        location.href = a.getAttribute('href') + location.hash;
      });
    });
  }

  /* 2. 動画ファサード */
  function initVideo() {
    $$('.c-video[data-video-id]').forEach(function (wrap) {
      var btn = $('.c-video__facade', wrap);
      if (!btn) return;
      btn.addEventListener('click', function () {
        var id = encodeURIComponent(wrap.getAttribute('data-video-id'));
        var start = wrap.getAttribute('data-start');
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0' +
          (start ? '&start=' + encodeURIComponent(start) : '');
        iframe.title = btn.getAttribute('aria-label') || 'YouTube video';
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.allowFullscreen = true;
        wrap.replaceChildren(iframe);
      }, { once: true });
    });
  }

  /* 3. ギャラリー: 絞り込みとライトボックス */
  function initGallery(gallery) {
    var items = $$('.c-gallery__grid > li', gallery);
    var filters = $$('.c-gallery__filters [data-filter]', gallery);
    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var tag = btn.getAttribute('data-filter');
        filters.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
        items.forEach(function (li) { li.hidden = tag !== 'all' && li.getAttribute('data-tag') !== tag; });
      });
    });

    var dialog = $('.c-lightbox', gallery);
    if (!dialog || typeof dialog.showModal !== 'function') return; /* 非対応なら項目はリンクとして働く */
    var img = $('img', dialog);
    var text = $('.c-lightbox__text', dialog);
    var links = $$('.c-gallery__item', gallery);
    var current = 0;

    function visible() {
      return links.filter(function (a) { var li = a.closest('li'); return !(li && li.hidden); });
    }
    function show(i) {
      var list = visible();
      if (!list.length) return;
      current = (i + list.length) % list.length;
      var a = list[current];
      var thumb = $('img', a);
      img.src = a.getAttribute('data-full') || a.getAttribute('href');
      img.alt = thumb ? thumb.alt : '';
      if (text) text.textContent = a.getAttribute('data-caption') || '';
    }
    links.forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        show(visible().indexOf(a));
        dialog.showModal();
      });
    });
    var close = $('[data-close]', dialog);
    var prev = $('[data-prev]', dialog);
    var next = $('[data-next]', dialog);
    if (close) close.addEventListener('click', function () { dialog.close(); });
    if (prev) prev.addEventListener('click', function () { show(current - 1); });
    if (next) next.addEventListener('click', function () { show(current + 1); });
    dialog.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); }
    });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', function () { img.removeAttribute('src'); });
  }

  /* 4. 確認用 */
  function initReview() {
    var params = new URLSearchParams(location.search);
    var w = parseInt(params.get('w'), 10);
    if (w > 0) {
      document.body.style.maxWidth = w + 'px';
      document.body.style.outline = '1px dashed #D9D9D9';
    }
    if (params.has('fonts') && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        var loaded = [];
        document.fonts.forEach(function (f) {
          if (f.status === 'loaded') loaded.push(f.family + ' ' + f.weight + ' ' + f.style);
        });
        var pre = document.createElement('pre');
        pre.id = 'fonts-report';
        pre.textContent = loaded.join('\n') || '(no fonts loaded)';
        document.body.appendChild(pre);
      });
    }
  }

  initNav();
  initLangSwitch();
  initVideo();
  $$('.c-gallery').forEach(initGallery);
  initReview();
})();
