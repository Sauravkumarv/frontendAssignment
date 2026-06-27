# Product Store

A responsive product listing web app built with **Next.js**, **React**, and **Bootstrap 5**. Products are fetched from the [Fake Store API](https://fakestoreapi.com/) using **Server-Side Rendering (SSR)** via `getServerSideProps`.

## Features

- Product listing with image, title, price, category, and rating
- Server-Side Rendering (SSR) for initial data load
- Client-side search by product title
- Loading spinner during search filtering
- Client-side pagination (8 products per page)
- Product detail page at `/product/[id]`
- Responsive layout using Bootstrap grid

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14 | React framework, routing, SSR |
| React 18 | UI components |
| Bootstrap 5 | Styling and responsive layout |
| Fetch API | Data fetching from public API |

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (comes with Node.js)
- Active internet connection (API data is fetched online)

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd sauravBribooks
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You should see output similar to:

```
▲ Next.js 14.x
- Local: http://localhost:3000
✓ Ready
```

### 4. Production build (optional)

```bash
npm run build
npm start
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the development server on port 3000 |
| `npm run build` | Creates an optimized production build |
| `npm start` | Runs the production server on port 3000 |

## Project Structure

```
sauravBribooks/
├── components/
│   ├── LoadingSpinner.jsx   # Loading indicator
│   ├── ProductCard.jsx      # Single product card
│   ├── ProductList.jsx      # Search, filter, pagination
│   └── SearchBar.jsx        # Search input
├── pages/
│   ├── _app.js              # App wrapper + Bootstrap import
│   ├── index.js             # Home page (SSR product list)
│   └── product/
│       └── [id].js          # Product detail page (SSR)
├── styles/
│   └── globals.css          # Custom styles
├── next.config.js
└── package.json
```

## Troubleshooting

**Port already in use (`EADDRINUSE`)**

```bash
npx kill-port 3000
npm run dev
```

**`next` command not found**

Use npm scripts instead:

```bash
npm run dev    # not: next dev
npm start      # not: next start
```

## Assumptions

1. **Pages Router over App Router** — The project uses Next.js **Pages Router** (`pages/` directory) because the assignment requires `getServerSideProps` for SSR.

2. **Public API dependency** — Product data comes from `https://fakestoreapi.com/products`. An active internet connection is required at runtime. If the API is down or slow, the app shows an error message on the listing page.

3. **Client-side search and pagination** — Initial product data is loaded on the server (SSR). Search filtering and pagination run in the browser since the full product list is already available after the first load.

4. **Fixed dev port** — The development and production servers run on **port 3000** (`next dev -p 3000` / `next start -p 3000`).

5. **No authentication** — The Fake Store API is public; no API keys or user login are required.

6. **Bootstrap via npm** — Bootstrap 5 is installed as an npm package and imported in `pages/_app.js`, not loaded from a CDN.

7. **Browser support** — Modern browsers with JavaScript enabled are assumed (React hydration is required for search and pagination).

8. **No environment variables** — No `.env` file is needed; the API URL is hardcoded in the page files.

## API Reference

- **All products:** `GET https://fakestoreapi.com/products`
- **Single product:** `GET https://fakestoreapi.com/products/:id`

## License

This project was created for educational purposes.
