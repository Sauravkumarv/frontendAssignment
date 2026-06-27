import Link from 'next/link'

function ProductCard({ product }) {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card h-100 product-card">
        <img src={product.image} className="card-img-top" alt={product.title} />
        <div className="card-body d-flex flex-column">
          <h6 className="card-title">{product.title}</h6>
          <p className="text-muted small mb-1">{product.category}</p>
          <p className="fw-bold text-primary mb-1">${product.price.toFixed(2)}</p>
          {product.rating && (
            <p className="small text-warning mb-2">
              ★ {product.rating.rate} ({product.rating.count} reviews)
            </p>
          )}
          <Link href={`/product/${product.id}`} className="btn btn-outline-primary btn-sm mt-auto">
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
