# Product Store — Project Guide (Samajhne ke liye)

Yeh file project ko step-by-step samjhaati hai. Pehle yeh padho, phir code files dekho.

---

## 1. Yeh project kya karta hai?

Ek **Product Listing Website** hai jisme:

- Products dikhte hain (image, title, price, category, rating)
- Search se product filter kar sakte ho
- Pagination hai (8 products ek page par)
- Kisi product par click karke detail page khulta hai

**Data kahan se aata hai?**  
Public API: `https://fakestoreapi.com/products`

---

## 2. Tech Stack (Kya use hua hai?)

| Technology | Kaam |
|------------|------|
| **Next.js** | React framework — pages, routing, SSR |
| **React** | UI banane ke liye |
| **Bootstrap 5** | Design, grid, cards, buttons |
| **Fetch API** | API se data lene ke liye |

---

## 3. Project ka folder structure

```
sauravBribooks/
│
├── pages/                    ← Next.js pages (URL yahan se bante hain)
│   ├── _app.js               ← Har page par Bootstrap load hota hai
│   ├── index.js              ← Home page (/) — product list
│   └── product/
│       └── [id].js           ← Detail page (/product/1, /product/2, ...)
│
├── components/               ← Reusable UI parts
│   ├── ProductList.jsx       ← Search + filter + pagination
│   ├── ProductCard.jsx       ← Ek product ka card
│   ├── SearchBar.jsx         ← Search input box
│   └── LoadingSpinner.jsx    ← Loading circle
│
├── styles/
│   └── globals.css           ← Extra styling (card hover, image size)
│
├── package.json              ← Dependencies aur scripts
└── next.config.js            ← Next.js settings
```

---

## 4. Kaunsi file kya karti hai?

### `pages/_app.js` — App ka entry point
- Har page se pehle yeh chalta hai
- Bootstrap CSS import karta hai
- Global CSS load karta hai

### `pages/index.js` — Home page (`/`)
**Sabse important file SSR ke liye.**

```javascript
export async function getServerSideProps() {
  try {
    const res = await fetch('https://fakestoreapi.com/products')
    if (!res.ok) {
      return { props: { products: [], error: 'Failed to load products' } }
    }
    const products = await res.json()
    return { props: { products, error: null } }
  } catch {
    return { props: { products: [], error: 'Network error. Check your internet.' } }
  }
}
```

- `getServerSideProps` = **Server-Side Rendering (SSR)**
- Matlab: page load hone se **pehle** server API se data le leta hai
- User ko pehle se bhara hua page milta hai (fast + SEO friendly)

Phir yeh data `ProductList` component ko pass hota hai.

### `components/ProductList.jsx` — Main listing logic
Server se `products` aate hain, phir **browser mein**:

1. **Search** — title se filter
2. **Spinner** — search karte waqt 300ms loading dikhta hai
3. **Pagination** — 8 products per page

> Note: Search aur pagination **client-side** hain (browser mein), kyunki data pehle hi aa chuka hai SSR se.

### `components/ProductCard.jsx` — Ek product ka card
- Image, title, price, category, rating dikhata hai
- "View Details" button → `/product/[id]` par le jaata hai

### `pages/product/[id].js` — Product detail page
- URL example: `/product/5` → product id = 5
- `[id]` = dynamic route (har product ke liye alag page)
- Yahan bhi **SSR** hai — `getServerSideProps` se ek product fetch hota hai

---

## 5. Data flow (Data kaise chalta hai?)

```
User browser khulta hai (localhost:3000)
        ↓
Next.js SERVER chalta hai
        ↓
getServerSideProps() → fakestoreapi.com se products fetch
        ↓
HTML page ready ban kar user ko bheja jaata hai
        ↓
Browser mein React interactive ho jaata hai
        ↓
User search karta hai → ProductList filter karta hai (client-side)
        ↓
User "View Details" click karta hai → /product/3
        ↓
Phir se SSR → ek product fetch → detail page dikhta hai
```

---

## 6. SSR vs Client-side (Simple difference)

| | SSR (`getServerSideProps`) | Client-side (`useState`, search) |
|---|---|---|
| **Kahan chalta hai** | Server par | Browser par |
| **Kab use kiya** | Pehli baar data load | Search, pagination |
| **Files** | `pages/index.js`, `pages/product/[id].js` | `components/ProductList.jsx` |

---

## 7. Project kaise chalayein? (Terminal se)

**Step 1** — Terminal kholo (VS Code/Cursor mein `Ctrl + ~`)

**Step 2** — Project folder mein jao:
```bash
cd d:\sauravBribooks
```

**Step 3** — Pehli baar dependencies install karo (sirf ek baar):
```bash
npm install
```

**Step 4** — Development server start karo:
```bash
npm run dev
```

**Step 5** — Browser mein kholo: **http://localhost:3000**

Terminal mein aisa dikhega:
```
▲ Next.js 14.2.35
- Local: http://localhost:3000
✓ Ready
```

**Server band karne ke liye:** terminal mein `Ctrl + C` dabao

### ✅ Sahi commands vs ❌ Galat commands

| ✅ Sahi | ❌ Galat |
|--------|---------|
| `npm run dev` | `next dev` |
| `npm run start` | `next start -p 3000` |
| `npm start` | `npm next start` |

> `next` directly mat chalao — hamesha `npm run` use karo.

### Production build (optional)
```bash
npm run build
npm start
```

> ⚠️ Port **3000** use karo (Next.js). Port 5173 nahi — woh purane Vite setup ka tha.

---

## 8. Common errors aur fix

### Error: `EADDRINUSE: address already in use :::3000`
Matlab port 3000 pehle se use ho raha hai (purana server chal raha hai).

**Fix:**
```bash
npx kill-port 3000
npm run dev
```

Ya seedha browser mein **http://localhost:3000** try karo — shayad server pehle se chal raha ho.

### Error: "Connection Failed" / page nahi khulta
1. Terminal mein `npm run dev` chal raha hai ya nahi check karo
2. URL sahi ho: `http://localhost:3000` (5173 nahi)
3. Internet on ho — API online se data leti hai
4. Terminal mein `✓ Ready` dikhe tab hi browser kholo

### Error: `next is not recognized`
`next` command directly mat chalao. Use karo: `npm run dev`

---

## 9. Kaunsi file pehle padhein? (Order)

1. `pages/index.js` — SSR samjho
2. `components/ProductList.jsx` — Search + pagination
3. `components/ProductCard.jsx` — UI card
4. `pages/product/[id].js` — Detail page + dynamic routing
5. `pages/_app.js` — Bootstrap setup

---

## 10. Assignment requirements — cover hua ya nahi?

| Requirement | Status | File |
|-------------|--------|------|
| React.js | ✅ | Saari `.jsx` files |
| Next.js | ✅ | `pages/` folder |
| Bootstrap | ✅ | `_app.js` |
| Fetch API | ✅ | `index.js`, `[id].js` |
| SSR (getServerSideProps) | ✅ | `index.js`, `[id].js` |
| Product cards | ✅ | `ProductCard.jsx` |
| Responsive grid | ✅ | Bootstrap `col-sm-6 col-md-4 col-lg-3` |
| Search bar | ✅ | `SearchBar.jsx` + `ProductList.jsx` |
| Loading spinner | ✅ | `LoadingSpinner.jsx` |
| Pagination (bonus) | ✅ | `ProductList.jsx` |
| Product detail page (bonus) | ✅ | `pages/product/[id].js` |

---

## 11. Short summary (Ek line mein)

**Next.js server se products fetch karta hai (SSR), Bootstrap se cards dikhata hai, aur browser mein search + pagination kaam karta hai.**

---

Koi file samajh nahi aaye to us file ka naam batao — us par alag se explain kar sakte hain.
