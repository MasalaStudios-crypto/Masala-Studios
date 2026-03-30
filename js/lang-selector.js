/* ══════════════════════════════════════════════
   Masala Studios — Language Selector
   Dropdown toggle + search + switching
   ══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  const toggle   = document.getElementById('langToggle');
  const dropdown = document.getElementById('langDropdown');
  const current  = document.getElementById('currentLang');
  const search   = document.getElementById('langSearch');
  const listEl   = document.getElementById('langList');
  if (!toggle || !dropdown) return;

  const options = Array.from(listEl.querySelectorAll('.lang-option'));

  // Toggle open/close
  toggle.addEventListener('click', function (e) {
    e.stopPropagation();
    const isOpen = dropdown.classList.contains('show');
    dropdown.classList.toggle('show');
    toggle.classList.toggle('active');
    toggle.setAttribute('aria-expanded', String(!isOpen));
    dropdown.setAttribute('aria-hidden', String(isOpen));
    if (!isOpen) {
      setTimeout(() => search?.focus(), 50);
    } else {
      search.value = '';
      filterOptions('');
    }
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!toggle.contains(e.target) && !dropdown.contains(e.target)) {
      close();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') close();
  });

  // Search/filter
  search?.addEventListener('input', function () {
    filterOptions(this.value.trim().toLowerCase());
  });

  function filterOptions(query) {
    options.forEach(opt => {
      const name = opt.getAttribute('data-name')?.toLowerCase() ?? '';
      const lang = opt.getAttribute('data-lang')?.toLowerCase() ?? '';
      const match = !query || name.includes(query) || lang.includes(query);
      opt.classList.toggle('hidden', !match);
    });
  }

  // Language switch
  options.forEach(opt => {
    opt.addEventListener('click', async function () {
      const lang = this.getAttribute('data-lang');
      const code = this.getAttribute('data-name');

      // Update display
      if (current) {
        const translations = window.masalaI18n?.translations;
        const code2 = translations?.language?.code;
        current.textContent = lang.toUpperCase().slice(0,2);
      }

      // Mark active
      options.forEach(o => o.classList.remove('active'));
      this.classList.add('active');

      // Switch language via i18n engine
      if (window.masalaI18n) {
        await window.masalaI18n.switchLanguage(lang);
        // Update display code from loaded translations
        const code3 = window.masalaI18n.translations?.language?.code;
        if (code3 && current) current.textContent = code3;
      }

      // Update form option placeholders
      syncSelectOptions();

      close();
    });
  });

  // Sync select option text via data-i18n
  function syncSelectOptions() {
    document.querySelectorAll('select option[data-i18n]').forEach(opt => {
      const key = opt.getAttribute('data-i18n');
      const val = window.masalaI18n?.get(key);
      if (val) opt.textContent = val;
    });
  }

  function close() {
    dropdown.classList.remove('show');
    toggle.classList.remove('active');
    toggle.setAttribute('aria-expanded', 'false');
    dropdown.setAttribute('aria-hidden', 'true');
    search.value = '';
    filterOptions('');
  }

  // On lang change event — update current display + active option
  document.addEventListener('masala:langchange', function (e) {
    const lang = e.detail.lang;
    const code = window.masalaI18n?.translations?.language?.code;
    if (current && code) current.textContent = code;
    options.forEach(o => {
      o.classList.toggle('active', o.getAttribute('data-lang') === lang);
    });
    syncSelectOptions();
  });

  // Init from stored language
  const stored = window._masalaLang || 'es';
  options.forEach(o => {
    o.classList.toggle('active', o.getAttribute('data-lang') === stored);
  });
});
