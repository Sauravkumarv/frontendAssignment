import Link from 'next/link'
import { getProduct } from '@/lib/api'

export async function getServerSideProps({ params }) {
  try {
    const product = await getProduct(params.id)
    return { props: { product } }
  } catch {
    return { notFound: true }
  }
}

export default function ProductDetailPage({ product }) {
  return (
    <div className="container py-4">
      <Link href="/" className="btn btn-link mb-3 ps-0">
        ← Back to Products
      </Link>
      <div className="row">
        <div className="col-md-5 text-center mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{ maxHeight: '400px', objectFit: 'contain' }}
          />
        </div>
        <div className="col-md-7">
          <span className="badge bg-secondary mb-2">{product.category}</span>
          <h2>{product.title}</h2>
          <h3 className="text-primary">${product.price.toFixed(2)}</h3>
          {product.rating && (
            <p className="text-warning">
              ★ {product.rating.rate} ({product.rating.count} reviews)
            </p>
          )}
          <p className="text-muted mt-3">{product.description}</p>
        </div>
      </div>
    </div>
  )
}
