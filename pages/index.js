import { useEffect, useState } from 'react'
import ProductList from '@/components/ProductList'
import LoadingSpinner from '@/components/LoadingSpinner'
import { getProducts } from '@/lib/api'

export async function getServerSideProps() {
  try {
    const products = await getProducts()
    return { props: { products, error: null } }
  } catch {
    return { props: { products: [], error: 'Failed to load products' } }
  }
}

export default function Home({ products: serverProducts, error: serverError }) {
  const [products, setProducts] = useState(serverProducts)
  const [error, setError] = useState(serverError)
  const [loading, setLoading] = useState(Boolean(serverError))

  useEffect(() => {
    if (!serverError && serverProducts.length > 0) return

    setLoading(true)
    getProducts()
      .then((data) => {
        setProducts(data)
        setError(null)
      })
      .catch(() => {
        setError('Unable to load products. Please refresh the page.')
      })
      .finally(() => setLoading(false))
  }, [serverError, serverProducts.length])

  if (loading) return <LoadingSpinner />

  if (error) {
    return (
      <div className="container py-5 text-center">
        <h1 className="text-danger mb-3">Something went wrong</h1>
        <p className="text-muted">{error}</p>
        <button className="btn btn-primary mt-2" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    )
  }

  return <ProductList products={products} />
}
