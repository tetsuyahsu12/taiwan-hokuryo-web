/* ============================================================
   Taiwan Hokuryo - Main JS
   - 行動版選單
   - 中／日 語言切換
   - Scroll reveal
   - Header 滾動陰影
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Mobile menu ---------- */
  const menuBtn   = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      document.body.classList.toggle('hk-menu-open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobileNav.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        document.body.classList.remove('hk-menu-open');
      })
    );
  }

  /* ---------- Language switch (TW / JP) ---------- */
  // 之後整合 WordPress 時可改用 Polylang / WPML 的官方切換邏輯
  const langButtons = document.querySelectorAll('[data-lang-btn]');
  const setLang = (lang) => {
    document.documentElement.setAttribute('lang', lang === 'jp' ? 'ja' : 'zh-Hant');
    langButtons.forEach(b =>
      b.classList.toggle('active', b.dataset.langBtn === lang)
    );
    try { localStorage.setItem('hk_lang', lang); } catch (e) {}
  };
  langButtons.forEach(b => b.addEventListener('click', () => setLang(b.dataset.langBtn)));
  // 初始化（預設中文）
  let initLang = 'tw';
  try { initLang = localStorage.getItem('hk_lang') || 'tw'; } catch (e) {}
  setLang(initLang);

  /* ---------- Scroll reveal ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.hk-reveal').forEach(el => io.observe(el));

  /* ---------- Header shadow on scroll ---------- */
  const header = document.querySelector('[data-header]');
  if (header) {
    const onScroll = () => {
      if (window.scrollY > 8) header.classList.add('shadow-md', 'bg-white');
      else header.classList.remove('shadow-md');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 表單防呆 (僅前端示範) ---------- */
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const ok = form.checkValidity();
      if (!ok) { form.reportValidity(); return; }
      alert('表單已送出（範例）。WordPress 整合後將串接 Contact Form 7 / WPForms 處理。');
      form.reset();
    });
  }
})();
