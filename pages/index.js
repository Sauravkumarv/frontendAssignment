import ProductList from '@/components/ProductList'

export async function getServerSideProps() {
  try {
    const res = await fetch('https://fakestoreapi.com/products')

    if (!res.ok) {
      return { props: { products: [], error: 'Failed to load products' } }
    }

    const products = await res.json()
    return { props: { products, error: null } }
  } catch {
    return { props: { products: [], error: 'Network error. Check your internet connection.' } }
  }
}

export default function Home({ products, error }) {
  if (error) {
    return (
      <div className="container py-5 text-center">
        <h1 className="text-danger mb-3">Something went wrong</h1>
        <p className="text-muted">{error}</p>
        <p className="small">Make sure you ran <code>npm run dev</code> and opened <code>http://localhost:3000</code></p>
      </div>
    )
  }

  return <ProductList products={products} />
}
