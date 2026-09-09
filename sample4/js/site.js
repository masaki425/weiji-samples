/* sample2/js/site.js — W Eiji サイトの最小限の振る舞い（依存なし）
   1. ナビの開閉（768px 未満）、言語切替でのハッシュ引き継ぎ
   2. 動画ファサード（クリック後に youtube-nocookie を読み込む）
   3. 確認用: ?w=<px> で body の幅を絞る、?fonts=1 で読み込めた書体を書き出す
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
    nav.setAttribute('data-ready', 'true');
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
    // Local files cannot supply the referrer YouTube requires; keep the photo link.
    if (location.protocol === 'file:') {
      $$('.p-talk__video').forEach(function (video) {
        var figure = $('figure', video);
        if (!figure || $('.p-talk__note', video)) return;
        var note = document.createElement('p');
        note.className = 'c-credit p-talk__note';
        note.textContent = document.documentElement.lang === 'en'
          ? 'This page is opened directly as a file, so the video cannot play in this frame (a YouTube restriction). Clicking the photo opens YouTube. To play it here, open the site with sample4/open-local.command.'
          : 'このページをファイルとして直接開いているため、この枠では再生できません（YouTube の制限）。写真をクリックすると YouTube で開きます。枠内で再生するには sample4/open-local.command で開いてください。';
        figure.insertAdjacentElement('afterend', note);
      });
      return;
    }
    if (location.origin === 'null') return;
    $$('.c-video[data-video-id]').forEach(function (wrap) {
      var facade = $('.p-talk__facade', wrap);
      var figure = $('figure', wrap);
      var btn = $('.p-talk__play', wrap);
      var target = $('.p-talk__embed', wrap);
      if (!facade || !figure || !btn || !target) return;
      var loaded = false;
      function play() {
        if (loaded) return;
        var id = encodeURIComponent(wrap.getAttribute('data-video-id'));
        var start = wrap.getAttribute('data-start');
        var iframe = document.createElement('iframe');
        iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0' +
          (start ? '&start=' + encodeURIComponent(start) : '');
        iframe.title = btn.getAttribute('aria-label') || 'YouTube video';
        iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.allowFullscreen = true;
        target.replaceChildren(iframe);
        loaded = true;
        figure.hidden = true;
        target.hidden = false;
        btn.hidden = true;
        iframe.tabIndex = 0;
        iframe.focus();
      }
      facade.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || (e.button && e.button !== 0)) return;
        e.preventDefault();
        play();
      });
      btn.addEventListener('click', play);
      btn.hidden = false;
    });
  }

  /* 3. 確認用 */
  function initReview() {
    var params = new URLSearchParams(location.search);
    var w = parseInt(params.get('w'), 10);
    if (w > 0) {
      document.body.style.maxWidth = w + 'px';
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
  initReview();
})();
