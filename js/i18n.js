/* ══════════════════════════════════════════════
   Masala Studios — i18n Engine v2
   Hybrid: bundled translations (instant, works everywhere)
   + async fetch fallback for future languages
   31 languages, RTL support
   ══════════════════════════════════════════════ */

class MasalaI18n {
  constructor() {
    this.currentLang = 'es';
    this.translations = {};
    this.rtlLanguages = ['ar', 'ur', 'fa', 'he'];
    this.supported = [
      'es','en','fr','de','it','pt-BR','ru','ar','hi','bn','ur','pa',
      'zh','zh-TW','ja','ko','id','ms','vi','tl','th','tr','nl','pl',
      'uk','el','fa','sw','am','yo','ha'
    ];
    // Use bundled translations if available (no fetch needed)
    this._bundle = window.MASALA_LOCALES || null;
  }

  async init() {
    // Detect starting language: in-memory > browser lang > es
    const stored = window._masalaLang ?? null;
    const browserLang = navigator.language;
    const browserShort = browserLang.split('-')[0];

    if (stored && this.supported.includes(stored)) {
      this.currentLang = stored;
    } else if (this.supported.includes(browserLang)) {
      this.currentLang = browserLang;
    } else if (this.supported.includes(browserShort)) {
      this.currentLang = browserShort;
    }

    await this.loadTranslations(this.currentLang);
    this.applyTranslations();
    this.updateHtmlAttrs();
    this._dispatch();
  }

  async loadTranslations(lang) {
    // 1. Try bundled (instant, no network needed)
    if (this._bundle && this._bundle[lang]) {
      this.translations = this._bundle[lang];
      this.currentLang = lang;
      return true;
    }

    // 2. Fallback: fetch JSON (works on masalastudios.pro)
    try {
      const res = await fetch(`/locales/${lang}.json`);
      if (!res.ok) throw new Error(res.status);
      this.translations = await res.json();
      this.currentLang = lang;
      // Cache into bundle for future calls
      if (!this._bundle) this._bundle = {};
      this._bundle[lang] = this.translations;
      return true;
    } catch (e) {
      console.warn(`[i18n] Could not load ${lang}, falling back to es`);
      // Try bundle fallback to es
      if (lang !== 'es') {
        if (this._bundle?.es) {
          this.translations = this._bundle.es;
          this.currentLang = 'es';
          return true;
        }
        return await this.loadTranslations('es');
      }
      return false;
    }
  }

  get(key) {
    return key.split('.').reduce((o, k) => o?.[k], this.translations) ?? null;
  }

  applyTranslations() {
    const t = this.translations;
    if (!t || Object.keys(t).length === 0) return;

    // Document title + meta description
    if (t.meta?.title) document.title = t.meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && t.meta?.description) metaDesc.content = t.meta.description;

    // All elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = this.get(key);
      if (val == null) return;
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = val;
      } else {
        el.innerHTML = val;
      }
    });
  }

  updateHtmlAttrs() {
    const html = document.documentElement;
    html.lang = this.currentLang;
    const isRTL = this.rtlLanguages.includes(this.currentLang);
    html.dir = isRTL ? 'rtl' : 'ltr';
    document.body.classList.toggle('rtl', isRTL);
  }

  async switchLanguage(lang) {
    if (!this.supported.includes(lang)) return false;
    window._masalaLang = lang;
    const ok = await this.loadTranslations(lang);
    if (!ok) return false;
    this.applyTranslations();
    this.updateHtmlAttrs();
    this._dispatch();
    return true;
  }

  _dispatch() {
    document.dispatchEvent(new CustomEvent('masala:langchange', {
      detail: { lang: this.currentLang, rtl: this.rtlLanguages.includes(this.currentLang) }
    }));
  }
}

// Bootstrap
const masalaI18n = new MasalaI18n();
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => masalaI18n.init());
} else {
  masalaI18n.init();
}
window.masalaI18n = masalaI18n;
