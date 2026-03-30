/* ══════════════════════════════════════════════
   Masala Studios — i18n Engine
   Adapted from APEX Intelligence i18n system
   Supports 31 languages with RTL + in-memory lang
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
  }

  async init() {
    // Priority: in-memory > browser lang > es
    const stored = this._getStored();
    const browserLang = navigator.language.split('-')[0];
    const browserFull = navigator.language; // e.g. pt-BR

    if (stored && this.supported.includes(stored)) {
      this.currentLang = stored;
    } else if (this.supported.includes(browserFull)) {
      this.currentLang = browserFull;
    } else if (this.supported.includes(browserLang)) {
      this.currentLang = browserLang;
    }

    await this.loadTranslations(this.currentLang);
    this.applyTranslations();
    this.updateHtmlAttrs();
    this._dispatchChange();
  }

  async loadTranslations(lang) {
    try {
      const res = await fetch(`/locales/${lang}.json`);
      if (!res.ok) throw new Error(res.status);
      this.translations = await res.json();
      this.currentLang = lang;
      return true;
    } catch(e) {
      console.warn(`[i18n] Failed to load ${lang}, falling back to es`);
      if (lang !== 'es') return await this.loadTranslations('es');
      return false;
    }
  }

  get(key) {
    return key.split('.').reduce((o, k) => o?.[k], this.translations) ?? null;
  }

  applyTranslations() {
    // Document title
    const t = this.translations;
    if (t.meta?.title) document.title = t.meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc && t.meta?.description) desc.content = t.meta.description;

    // All data-i18n elements
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
    if (this.rtlLanguages.includes(this.currentLang)) {
      html.dir = 'rtl';
      document.body.classList.add('rtl');
    } else {
      html.dir = 'ltr';
      document.body.classList.remove('rtl');
    }
  }

  async switchLanguage(lang) {
    if (!this.supported.includes(lang)) return false;
    window._masalaLang = lang;
    await this.loadTranslations(lang);
    this.applyTranslations();
    this.updateHtmlAttrs();
    this._dispatchChange();
    return true;
  }

  _getStored() {
    return window._masalaLang ?? null;
  }

  _dispatchChange() {
    document.dispatchEvent(new CustomEvent('masala:langchange', {
      detail: { lang: this.currentLang, rtl: this.rtlLanguages.includes(this.currentLang) }
    }));
  }
}

// Init on DOM ready
const masalaI18n = new MasalaI18n();
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => masalaI18n.init());
} else {
  masalaI18n.init();
}
window.masalaI18n = masalaI18n;
