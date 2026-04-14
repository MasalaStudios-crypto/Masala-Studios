# Masala Studios

**Productora Audiovisual** — [masalastudios.pro](https://masalastudios.pro)

> Arte sin barreras expresivas. Producimos contenido audiovisual de alto impacto.

---

## Descripción

Sitio web oficial de Masala Studios. Frontend estático de alto rendimiento con soporte para 31 idiomas, UI Apex-Intelligence, y despliegue en Netlify/Vercel/cPanel.

## Stack Tecnológico

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **i18n:** Sistema propio con 31 idiomas y 868 strings cada uno
- **SEO:** Open Graph, Twitter Cards, sitemap.xml, robots.txt
- **Deploy:** Netlify (recomendado), Vercel, Apache/cPanel
- **Seguridad:** CSP, X-Frame-Options, RTL support

## Idiomas Soportados

`es` `en` `fr` `de` `pt-BR` `it` `nl` `pl` `ru` `uk` `ar` `fa` `ur` `hi` `bn` `pa` `ja` `ko` `zh` `zh-TW` `id` `ms` `tl` `vi` `th` `tr` `el` `am` `ha` `sw` `yo`

## Despliegue

Ver [`DEPLOY.md`](./DEPLOY.md) para instrucciones completas (Netlify, Vercel, cPanel).

### Rápido (Netlify)
```
1. netlify.com → New Site → Deploy manually
2. Arrastra la carpeta completa
3. Conecta masalastudios.pro en Domain Management
```

## Estructura

```
Masala-Studios/
├── index.html          # Entrada principal
├── assets/             # CSS, JS e imágenes principales
├── css/                # lang-selector.css, rtl.css
├── js/                 # i18n.js, lang-selector.js, locales-bundle.js
├── locales/            # 31 archivos JSON de traducción
├── netlify.toml        # Config Netlify
├── vercel.json         # Config Vercel
├── .htaccess           # Config Apache
├── sitemap.xml
└── robots.txt
```

## Contacto

- General: hola@masalastudios.pro
- Producciones: booking@masalastudios.pro
- Prensa: press@masalastudios.pro

---

*Masala Studios © 2024 — Juan Ospina*
