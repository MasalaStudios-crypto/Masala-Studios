# Masala Studios — Deployment Guide
## masalastudios.pro

### Option A: Netlify (Recommended — free, automatic HTTPS)

1. Go to [netlify.com](https://netlify.com) → New Site → Deploy manually
2. Drag and drop the entire `masala-studios/` folder
3. Site is live instantly at a Netlify URL
4. **Connect custom domain:**
   - Site Settings → Domain Management → Add custom domain → `masalastudios.pro`
   - Point your domain's DNS to Netlify:
     - `A record` → `75.2.60.5`
     - `CNAME www` → `[your-site].netlify.app`
   - Netlify auto-provisions SSL via Let's Encrypt
5. `netlify.toml` is already configured for routing + headers + cache

### Option B: Vercel

1. `npm install -g vercel`
2. `cd masala-studios && vercel --prod`
3. Connect `masalastudios.pro` in Vercel dashboard → Domains
4. `vercel.json` is already configured

### Option C: cPanel / Hosting (masalastudios.pro direct)

1. Upload ALL files to `public_html/`
2. `.htaccess` handles routing, HTTPS redirect, and caching
3. Ensure `mod_rewrite` is enabled

### Files structure
```
masala-studios/
├── index.html          ← Main entry point
├── favicon.svg         ← Favicon (SVG, all browsers)
├── robots.txt          ← SEO
├── sitemap.xml         ← SEO (update dates when content changes)
├── netlify.toml        ← Netlify deployment config
├── vercel.json         ← Vercel deployment config
├── .htaccess           ← Apache / cPanel routing
├── assets/
│   ├── css/style.css   ← Main stylesheet
│   ├── js/main.js      ← Main JS
│   └── images/         ← Static images
├── css/
│   ├── lang-selector.css ← Language dropdown styles
│   └── rtl.css         ← RTL language support
├── js/
│   ├── i18n.js         ← i18n engine (31 languages)
│   └── lang-selector.js ← Language switcher UI
└── locales/            ← Translation JSON files (31 languages)
    ├── es.json         ← Spanish (default)
    ├── en.json         ← English
    └── ...             ← 29 more languages
```

### Email routing (Proton Mail — masalastudios.pro)
| Address | Purpose |
|---|---|
| hola@masalastudios.pro | General / public contact |
| info@masalastudios.pro | Website form submissions |
| booking@masalastudios.pro | Productions & bookings |
| press@masalastudios.pro | Press & media |
| legal@masalastudios.pro | Contracts / NDAs |
| finance@masalastudios.pro | Billing & invoices |
| studio@masalastudios.pro | Studio operations |
| admin@masalastudios.pro | Admin / operations |
| juan@masalastudios.pro | Founder personal |

### Disconnect old Masala Head website
1. Remove old DNS records pointing to previous hosting
2. Add Netlify/Vercel DNS records for masalastudios.pro
3. SSL certificate auto-renews — no action needed
